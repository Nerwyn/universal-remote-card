import { CSSResult, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import {
	ActionType,
	DirectionAction,
	IActions,
	ITouchpadConfig,
} from '../models/interfaces';

import {
	DIRECTION_KEYS,
	DOUBLE_TAP_WINDOW,
	HOLD_TIME,
	NAVIGATION_KEYS,
	REPEAT_DELAY,
} from '../models/constants';
import { BaseRemoteElement } from './base-remote-element';

@customElement('remote-touchpad')
export class RemoteTouchpad extends BaseRemoteElement {
	@property() config!: ITouchpadConfig;

	clickTimer?: ReturnType<typeof setTimeout>;
	clickCount: number = 0;

	holdTimer?: ReturnType<typeof setTimeout>;
	holdInterval?: ReturnType<typeof setInterval>;
	hold: boolean = false;
	holdStart: boolean = false;
	holdMove: boolean = false;
	direction?: DirectionAction;
	fireDragAction: boolean = true;

	async onClick(e: PointerEvent) {
		e.stopImmediatePropagation();
		this.clickCount++;
		const multiPrefix = this.getMultiPrefix();

		if (
			this.renderTemplate(
				this.config.double_tap_action?.action ?? 'none',
			) != 'none' ||
			this.renderTemplate(
				this.config.multi_double_tap_action?.action ?? 'none',
			) != 'none'
		) {
			// Double tap action is defined
			const doubleTapAction: ActionType = `${
				this.pointers > 2 ? 'multi_' : ''
			}double_tap_action`;

			if (this.clickCount > 1) {
				// Double tap action is triggered
				this.fireHapticEvent('success');
				await this.sendAction(doubleTapAction);
				this.endAction();
			} else {
				// Single tap action is triggered if double tap is not within window
				if (!this.clickTimer) {
					const doubleTapWindow =
						(this.renderTemplate(
							this.config[doubleTapAction]?.double_tap_window ??
								(this.config.double_tap_action
									?.double_tap_window as number),
						) as number) ?? DOUBLE_TAP_WINDOW;
					this.clickTimer = setTimeout(async () => {
						this.fireHapticEvent('light');
						await this.sendAction(`${multiPrefix}tap_action`);
						this.endAction();
					}, doubleTapWindow);
				}
			}
		} else {
			// No double tap action defined, tap action is triggered
			this.fireHapticEvent('light');
			await this.sendAction(`${multiPrefix}tap_action`);
			this.endAction();
		}
	}

	async onPointerDown(e: PointerEvent) {
		super.onPointerDown(e);
		this.holdStart = true;
		this.swiping = false;

		if (!this.holdTimer) {
			this.setHoldTimer();
		}
	}

	async onPointerUp(e: PointerEvent) {
		super.onPointerUp(e);
		if (this.hold || this.holdMove) {
			e.stopImmediatePropagation();
			if (e.cancelable) {
				e.preventDefault();
			}
			let holdMove = false;
			if (this.pointers > 1) {
				holdMove = true;
			}
			this.endAction();
			if (holdMove) {
				this.holdMove = true;
			}
		} else if (!this.holdMove && (!('isPrimary' in e) || e.isPrimary)) {
			await this.onClick(e);
		}
	}

	async onPointerMove(e: PointerEvent) {
		if (!this.initialX || !this.initialY || !this.holdStart) {
			return;
		}
		super.onPointerMove(e);
		const multiPrefix = this.getMultiPrefix();

		// Only consider significant enough movement
		const totalDeltaX = (this.currentX ?? 0) - this.initialX;
		const totalDeltaY = (this.currentY ?? 0) - this.initialY;
		if (
			this.renderTemplate(
				this.config[`${multiPrefix}drag_action`]?.action ?? 'none',
			) != 'none'
		) {
			// Drag actions
			const sensitivity = 0.5;
			if (
				this.holdMove ||
				Math.abs(Math.abs(totalDeltaX) - Math.abs(totalDeltaY)) >
					sensitivity
			) {
				if (this.fireDragAction) {
					clearTimeout(this.holdTimer);
					this.holdTimer = undefined;
					this.holdMove = true;

					const repeatDelay = this.renderTemplate(
						this.config[`${multiPrefix}drag_action`]
							?.repeat_delay ?? 0, // default to 0 instead of normal repeat delay
					) as number;
					if (repeatDelay) {
						this.fireDragAction = false;
						setTimeout(() => {
							this.fireDragAction = true;
						}, repeatDelay);
					}

					await this.sendAction(`${multiPrefix}drag_action`);
				}
			}
		} else {
			const sensitivity = 16;
			if (
				Math.abs(Math.abs(totalDeltaX) - Math.abs(totalDeltaY)) >
				sensitivity
			) {
				// Directional actions
				if (Math.abs(totalDeltaX) > Math.abs(totalDeltaY)) {
					this.direction = totalDeltaX < 0 ? 'left' : 'right';
				} else {
					this.direction = totalDeltaY < 0 ? 'up' : 'down';
				}
				if (!this.holdMove) {
					this.fireHapticEvent('light');
					await this.sendAction(
						`${multiPrefix}tap_action`,
						this.getActions(),
					);
					this.holdMove = true;

					if (this.holdTimer) {
						clearTimeout(this.holdTimer);
						this.holdTimer = undefined;
						this.setHoldTimer();
					}
				}
			}
		}
	}

	endAction() {
		clearTimeout(this.clickTimer as ReturnType<typeof setTimeout>);
		this.clickTimer = undefined;
		this.clickCount = 0;

		clearTimeout(this.holdTimer as ReturnType<typeof setTimeout>);
		clearInterval(this.holdInterval as ReturnType<typeof setInterval>);
		this.holdTimer = undefined;
		this.holdInterval = undefined;

		this.hold = false;
		this.holdStart = false;
		this.holdMove = false;
		this.direction = undefined;

		super.endAction();
	}

	getActions(): IActions {
		return (
			this.direction ? this.config[this.direction] : this.config
		) as IActions;
	}

	getMultiPrefix(): 'multi_' | '' {
		return this.pointers > 1 ? 'multi_' : '';
	}

	setHoldTimer() {
		const holdAction = `${this.getMultiPrefix()}hold_action`;
		const actions = this.getActions();

		const holdTime = this.renderTemplate(
			actions[holdAction as ActionType]?.hold_time ?? HOLD_TIME,
		) as number;

		this.holdTimer = setTimeout(async () => {
			this.hold = true;
			const actions = this.getActions();
			const multiPrefix = this.getMultiPrefix();

			let repeat =
				this.renderTemplate(actions.hold_action?.action as string) ==
				'repeat';
			let repeatDelay = this.renderTemplate(
				actions.hold_action?.repeat_delay ?? REPEAT_DELAY,
			) as number;
			if (multiPrefix == 'multi_' && actions.multi_hold_action) {
				repeat =
					this.renderTemplate(
						actions.multi_hold_action?.action as string,
					) == 'repeat';
				repeatDelay = this.renderTemplate(
					actions.multi_hold_action?.repeat_delay ?? REPEAT_DELAY,
				) as number;
			}
			if (repeat) {
				if (!this.holdInterval) {
					this.holdInterval = setInterval(async () => {
						this.fireHapticEvent('selection');
						await this.sendAction(
							`${this.getMultiPrefix()}tap_action`,
							this.getActions(),
						);
					}, repeatDelay);
				}
			} else {
				this.fireHapticEvent('medium');
				await this.sendAction(`${multiPrefix}hold_action`, actions);
			}
		}, holdTime);
	}

	render() {
		this.setValue();
		return html`
			<toucharea
				part="toucharea"
				tabindex="0"
				@pointerdown=${this.onPointerDown}
				@pointerup=${this.onPointerUp}
				@pointermove=${this.onPointerMove}
				@pointercancel=${this.onPointerCancel}
				@pointerleave=${this.onPointerLeave}
				@contextmenu=${this.onContextMenu}
			>
				<div class="toucharea-row" part="top-row">
					<remote-icon-label
						id="up"
						part="up"
						.hass=${this.hass}
						.config=${this.config.up ?? {}}
						.icons=${this.icons}
					></remote-icon-label>
				</div>
				<div class="toucharea-row" part="center-row">
					<remote-icon-label
						id="left"
						part="left"
						.hass=${this.hass}
						.config=${this.config.left ?? {}}
						.icons=${this.icons}
					></remote-icon-label>
					<remote-icon-label
						id="center"
						part="center"
						.hass=${this.hass}
						.config=${this.config}
						.icons=${this.icons}
					></remote-icon-label>
					<remote-icon-label
						id="right"
						part="right"
						.hass=${this.hass}
						.config=${this.config.right ?? {}}
						.icons=${this.icons}
					></remote-icon-label>
				</div>
				<div class="toucharea-row" part="bottom-row">
					<remote-icon-label
						id="down"
						part="down"
						.hass=${this.hass}
						.config=${this.config.down ?? {}}
						.icons=${this.icons}
					></remote-icon-label>
				</div>
				${this.buildRipple()}
			</toucharea>
			${this.buildStyles(this.config.styles)}
		`;
	}

	async onKey(e: KeyboardEvent) {
		if (NAVIGATION_KEYS.includes(e.key)) {
			e.preventDefault();
			e.stopImmediatePropagation();
			if (!e.repeat) {
				if (e.shiftKey) {
					this.pointers++;
				}
				const direction = e.type == 'keydown' ? 'Down' : 'Up';

				await this[`onPointer${direction}`](
					new window.PointerEvent(
						`pointer${direction.toLowerCase()}`,
						{
							...e,
							isPrimary: true,
							clientX: 64,
							clientY: 64,
						},
					),
				);
				if (direction == 'Up') {
					this.holdMove = false;
				}

				if (direction == 'Down' && DIRECTION_KEYS.includes(e.key)) {
					e.preventDefault();

					if (!e.repeat) {
						await this.onPointerMove(
							new window.PointerEvent('pointermove', {
								...e,
								isPrimary: true,
								clientX:
									64 +
									(e.key == 'ArrowRight'
										? 32
										: e.key == 'ArrowLeft'
										? -32
										: 0),
								clientY:
									64 +
									(e.key == 'ArrowUp'
										? -32
										: e.key == 'ArrowDown'
										? 32
										: 0),
							}),
						);
					}
				}
			}
		}
	}

	firstUpdated() {
		super.firstUpdated();
		this.removeAttribute('tabindex');
		const children =
			this.shadowRoot?.querySelectorAll('remote-icon-label') ?? [];
		for (const child of children) {
			child.removeAttribute('tabindex');
		}
	}

	static get styles(): CSSResult | CSSResult[] {
		return [
			super.styles as CSSResult,
			css`
				:host {
					display: contents;

					--mdc-ripple-press-opacity: 0.04;
				}

				toucharea {
					border-radius: 32px;
					flex-grow: 1;
					height: 250px;
					width: -moz-available;
					width: -webkit-fill-available;
					width: fill-available;
					background: var(
						--lovelace-background,
						var(--primary-background-color, rgb(111, 118, 125))
					);
					touch-action: none;
					text-align: center;
					position: relative;
					overflow: hidden;
					display: flex;
					flex-direction: column;
					flex-wrap: nowrap;
					justify-content: space-between;
					pointer-events: all;
					transition: box-shadow 180ms ease-in-out;
				}
				toucharea:focus-visible {
					box-shadow: 0 0 0 2px
						var(--icon-color, var(--primary-text-color));
				}

				.toucharea-row {
					min-height: var(--size, 48px);
					display: flex;
					flex-direction: row;
					flex-wrap: nowrap;
					width: -moz-available;
					width: -webkit-fill-available;
					width: fill-available;
					justify-content: space-around;
					align-items: center;
				}
			`,
		];
	}
}

@customElement('remote-icon-label')
export class IconLabelContainer extends BaseRemoteElement {
	render() {
		this.setValue();
		return html`
			${this.buildIcon(this.config.icon)}${this.buildLabel(
				this.config.label,
			)}${this.buildStyles(this.config.styles)}
		`;
	}
}
