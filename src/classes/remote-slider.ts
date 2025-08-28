import { CSSResult, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { RANGE_MAX, RANGE_MIN, STEP, STEP_COUNT } from '../models/constants';
import { ISliderConfig } from '../models/interfaces';
import { BaseRemoteElement } from './base-remote-element';

@customElement('remote-slider')
export class RemoteSlider extends BaseRemoteElement {
	@property() config!: ISliderConfig;

	@state() thumbOffset: number = 0;
	@state() sliderOn: boolean = true;

	range: [number, number] = [RANGE_MIN, RANGE_MAX];
	step: number = STEP;

	vertical: boolean = false;

	pressedTimeout?: ReturnType<typeof setTimeout>;

	set _value(value: string | number | boolean | undefined) {
		value = Math.max(
			Math.min(Number(value) ?? this.range[0], this.range[1]),
			this.range[0],
		);
		if (this.precision) {
			value = Number(value.toFixed(this.precision));
		} else {
			value = Math.trunc(value as number);
		}
		this.value = value;
	}

	onInput(e: InputEvent) {
		const slider = e.currentTarget as HTMLInputElement;

		if (!this.swiping) {
			clearTimeout(this.getValueFromHassTimer);
			this.getValueFromHass = false;
			this._value = slider.value;
			this.sliderOn = true;
		}
	}

	onPointerDown(e: PointerEvent) {
		super.onPointerDown(e);

		// Delay pressed state to fix initial slider thumb transition
		this.pressed = false;
		this.pressedTimeout = setTimeout(() => (this.pressed = true), 150);

		if (!this.swiping) {
			clearTimeout(this.getValueFromHassTimer);
			this.getValueFromHass = false;
			this.sliderOn = true;
		}
	}

	async onPointerUp(e: PointerEvent) {
		clearTimeout(this.pressedTimeout);
		super.onPointerUp(e);
		const slider = e.currentTarget as HTMLInputElement;

		if (!this.swiping && this.pointers) {
			this._value = slider.value;
			this.fireHapticEvent('light');
			await this.sendAction('tap_action');
		} else {
			this.getValueFromHass = true;
			this.setValue();
			this.setSliderState();
		}

		this.endAction();
		this.resetGetValueFromHass();
	}

	onPointerMove(e: PointerEvent) {
		super.onPointerMove(e);
		const slider = e.currentTarget as HTMLInputElement;

		// Disable swipe detection for vertical sliders
		if (!this.vertical && this.pointers) {
			// Only consider significant enough movement
			const sensitivity = 50;
			if (
				Math.abs((this.currentX ?? 0) - (this.initialX ?? 0)) <
				Math.abs((this.currentY ?? 0) - (this.initialY ?? 0)) -
					sensitivity
			) {
				this.swiping = true;
				this.getValueFromHass = true;
				this.setValue();
				this.setSliderState();
			} else {
				this._value = slider.value;
			}
		} else {
			this._value = slider.value;
		}
	}

	setValue() {
		super.setValue();
		if (this.getValueFromHass) {
			this._value = this.value;
		}
	}

	setThumbOffset() {
		const width = this.vertical ? this.clientHeight : this.clientWidth;
		const thumbWidth =
			this.shadowRoot?.querySelector('.thumb')?.clientWidth ?? 48;
		const maxOffset = (width - thumbWidth) / 2;

		this.thumbOffset = Math.min(
			Math.max(
				Math.round(
					((width - thumbWidth) / (this.range[1] - this.range[0])) *
						((this.value as number) -
							(this.range[0] + this.range[1]) / 2),
				),
				-1 * maxOffset,
			),
			maxOffset,
		);

		this.style.setProperty(
			'--thumb-offset',
			`${(this.rtl && !this.vertical ? -1 : 1) * this.thumbOffset}px`,
		);
	}

	setSliderState() {
		this.sliderOn =
			!(
				this.value == undefined ||
				['off', 'idle', null, undefined].includes(
					this.hass.states[this.entityId as string]?.state,
				)
			) || ((this.value as number) ?? this.range[0]) > this.range[0];
	}

	buildBackground() {
		return html`<div class="background" part="background"></div>`;
	}

	buildTooltip() {
		return html` <div class="tooltip" part="tooltip"></div> `;
	}

	buildThumb() {
		return html`<div class="thumb" part="thumb">
			<div class="active" part="active"></div>
		</div>`;
	}

	buildSlider() {
		return html`
			<input
				type="range"
				part="range"
				tabindex="-1"
				min="${this.range[0]}"
				max="${this.range[1]}"
				step=${this.step}
				value="${this.range[0]}"
				.value="${this.value}"
				@input=${this.onInput}
				@pointerdown=${this.onPointerDown}
				@pointerup=${this.onPointerUp}
				@pointermove=${this.onPointerMove}
				@pointercancel=${this.onPointerCancel}
				@pointerleave=${this.onPointerLeave}
				@contextmenu=${this.onContextMenu}
			/>
		`;
	}

	render() {
		this.setValue();

		if (this.config.range) {
			this.range[0] = parseFloat(
				(this.renderTemplate(
					this.config.range[0] as unknown as string,
				) as string) ?? RANGE_MIN,
			);
			this.range[1] = parseFloat(
				(this.renderTemplate(
					this.config.range[1] as unknown as string,
				) as string) ?? RANGE_MAX,
			);
		}

		if (this.config.step) {
			this.step = Number(this.renderTemplate(this.config.step));
		} else {
			this.step = (this.range[1] - this.range[0]) / STEP_COUNT;
		}
		const splitStep = this.step.toString().split('.');
		if (splitStep.length > 1) {
			this.precision = splitStep[1].length;
		} else {
			this.precision = 0;
		}

		this.vertical =
			this.renderTemplate(this.config.vertical ?? false) == true;
		if (this.vertical) {
			this.setAttribute('vertical', '');
		} else {
			this.removeAttribute('vertical');
		}

		this.style.setProperty(
			'--feature-height',
			`${this.vertical ? this.clientWidth : this.clientHeight}px`,
		);
		this.style.setProperty(
			'--feature-width',
			`${this.vertical ? this.clientHeight : this.clientWidth}px`,
		);
		this.style.setProperty(
			'--tooltip-label',
			`'${this.renderTemplate('{{ value }}{{ unit }}')}'`,
		);

		this.setThumbOffset();
		this.setSliderState();

		return html`
			<div
				class="container ${classMap({
					off: !this.sliderOn,
				})}"
				part="container"
			>
				${this.buildBackground()}${this.buildSlider()}
				${this.buildThumb()}${this.buildIcon(this.config.icon)}
				${this.buildLabel(this.config.label)}
			</div>
			${this.buildTooltip()}${this.buildStyles(this.config.styles)}
		`;
	}

	updated() {
		super.updated();

		// Set readonly if action is none
		if (
			this.renderTemplate(this.config.tap_action?.action as string) ==
			'none'
		) {
			this.setAttribute('readonly', '');
		} else {
			this.removeAttribute('readonly');
		}
	}

	async onKey(e: KeyboardEvent) {
		const keys = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'];
		if (keys.includes(e.key)) {
			e.preventDefault();
			e.stopImmediatePropagation();
			if (e.type == 'keydown') {
				this.getValueFromHass = false;
				this.pressed = true;
				this._value = Math.min(
					Math.max(
						parseFloat((this.value ?? this.range[0]) as string) +
							((e.key == 'ArrowLeft') != this.rtl ||
							e.key == 'ArrowDown'
								? -1
								: 1) *
								this.step,
						this.range[0],
					),
					this.range[1],
				);
			} else {
				await this.sendAction('tap_action');
				this.endAction();
				this.resetGetValueFromHass();
			}
		}
	}

	static get styles(): CSSResult | CSSResult[] {
		return [
			super.styles as CSSResult,
			css`
				:host {
					display: flex;
					flex-flow: column;
					flex-grow: 0;
					place-content: center space-evenly;
					align-items: center;
					position: relative;
					height: unset;
					width: 100%;
					border: none;
					border-radius: 25px;
					padding: 0px;
					box-sizing: border-box;
					line-height: 0;
					outline: 0px;
					overflow: visible;
					font-size: inherit;
					color: inherit;
					pointer-events: none;
					transition: box-shadow 180ms ease-in-out;

					--color: var(--primary-text-color);
					--height: 48px;
					--thumb-translate: var(--thumb-offset) 0;
					--thumb-transition: translate 180ms ease-in-out,
						background 180ms ease-in-out;
					--tooltip-transform: translate(
						var(--thumb-offset),
						calc(-0.5 * var(--feature-height) - 0.4em - 10px)
					);
				}
				:host(:focus-visible) {
					box-shadow: 0 0 0 2px
						var(--icon-color, var(--primary-text-color));
				}

				.container {
					all: inherit;
					overflow: hidden;
					height: var(--height);
					align-self: center;
					color: var(
						--background,
						var(
							--lovelace-background,
							var(--primary-background-color)
						)
					);
				}

				.background {
					position: absolute;
					width: 100%;
					height: var(--background-height, 100%);
					background: var(
						--background,
						var(
							--lovelace-background,
							var(--primary-background-color)
						)
					);
				}

				input {
					position: absolute;
					appearance: none;
					-webkit-appearance: none;
					-moz-appearance: none;
					height: inherit;
					width: inherit;
					background: none;
					overflow: hidden;
					touch-action: pan-y;
					pointer-events: all;
					cursor: pointer;
				}
				input:focus-visible {
					outline: none;
				}

				::-webkit-slider-thumb {
					appearance: none;
					-webkit-appearance: none;
					height: var(--height, 48px);
					width: var(--thumb-width, 48px);
					opacity: 0;
				}
				::-moz-range-thumb {
					appearance: none;
					-moz-appearance: none;
					height: var(--height, 48px);
					width: var(--thumb-width, 48px);
					opacity: 0;
				}

				.thumb {
					height: var(--height, 48px);
					width: var(--thumb-width, 48px);
					border-radius: var(
						--thumb-border-radius,
						var(--height, 48px)
					);
					background: var(--color);
					opacity: var(--opacity, 1);
					position: absolute;
					pointer-events: none;
					translate: var(--thumb-translate);
					transition: var(--thumb-transition);
				}
				.thumb .active {
					height: 100%;
					width: 100vw;
					position: absolute;
					right: calc(var(--thumb-width, 48px) / 2);
					background: inherit;
				}

				.tooltip {
					background: var(--clear-background-color);
					color: var(--primary-text-color);
					position: absolute;
					border-radius: 0.8em;
					padding: 0.2em 0.4em;
					height: 20px;
					width: fit-content;
					line-height: 20px;
					transform: var(--tooltip-transform);
					display: var(--tooltip-display);
					transition: opacity 180ms ease-in-out 0s;
					opacity: 0;
				}
				.tooltip::after {
					content: var(--tooltip-label, 0);
				}

				.icon {
					color: var(
						--icon-color,
						var(
							--background,
							var(
								--lovelace-background,
								var(--primary-background-color)
							)
						)
					);
					translate: var(--thumb-translate);
					transition: var(--thumb-transition);

					--mdc-icon-size: var(--size, 32px);
				}

				.off .thumb {
					visibility: hidden;
				}

				:host([pressed]) {
					--thumb-transition: background 180ms ease-in-out;
				}
				:host(:focus-visible) .tooltip,
				:host([pressed]) .tooltip {
					transition: opacity 540ms ease-in-out 0s;
					opacity: 1;
				}

				:host([readonly]) input {
					pointer-events: none;
					cursor: default;
				}

				:host([dir='rtl']) .thumb {
					scale: -1;
				}

				:host([vertical]) {
					width: fit-content;
					align-self: stretch;

					--tooltip-transform: translate(
						calc(-0.3 * var(--feature-height) - 0.8em - 18px),
						calc(-1 * var(--thumb-offset))
					);
				}
				:host([vertical]) .container {
					height: var(--feature-width);
					width: var(--height);

					--thumb-translate: 0 calc(-1 * var(--thumb-offset));
				}
				:host([vertical]) .background {
					transform: rotate(270deg);
					width: var(--feature-width);
					height: var(
						--background-height,
						var(--feature-height)
					) !important;
				}
				:host([vertical]) input {
					transform: rotate(270deg);
					height: var(--feature-height);
					width: var(--feature-width);
					touch-action: none;
				}
				:host([vertical]) .thumb {
					transform: rotate(270deg);
				}
				:host([vertical]) .thumb .active {
					width: 100vh;
				}

				:host([dir='rtl'][vertical]) input,
				:host([dir='rtl'][vertical]) .thumb {
					transform: rotate(90deg);
				}
			`,
		];
	}
}
