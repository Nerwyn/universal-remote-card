import { CSSResult, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ICirclepadConfig } from '../models/interfaces';
import { BaseRemoteElement } from './base-remote-element';
import './remote-button';
import { RemoteButton } from './remote-button';

@customElement('remote-circlepad')
export class RemoteCirclepad extends BaseRemoteElement {
	@property() config!: ICirclepadConfig;
	key2Button: Record<string, string> = {
		ArrowUp: 'up',
		ArrowDown: 'down',
		ArrowLeft: 'left',
		ArrowRight: 'right',
		Enter: 'center',
		' ': 'center',
	};

	previousAngle: number | undefined = undefined;

	isInsideCenter() {
		// Assumes center button is a circle
		const x = this.currentX || 0;
		const y = this.currentY || 0;

		const rect = (
			this.shadowRoot?.querySelector('#center') as HTMLElement
		).getBoundingClientRect();
		const x0 = rect.left + rect.width / 2;
		const y0 = rect.top + rect.height / 2;
		const r = rect.top + rect.height / 2 - rect.top;

		if (Math.sqrt(Math.pow(x - x0, 2) + Math.pow(y - y0, 2)) <= r) {
			this.endAction();
			return true;
		}
		return false;
	}

	getCurrentAngle() {
		const x = this.currentX || 0;
		const y = this.currentY || 0;

		const rect = (
			this.shadowRoot?.querySelector('.circlepad') as HTMLElement
		).getBoundingClientRect();
		const x0 = rect.left + rect.width / 2;
		const y0 = rect.top + rect.height / 2;

		return Math.round((Math.atan2(y - y0, x - x0) * 180) / Math.PI);
	}

	onPointerDown(e: PointerEvent) {
		super.onPointerDown(e);
		if (this.isInsideCenter()) {
			return;
		}
		this.previousAngle = this.getCurrentAngle();
	}

	onPointerUp(e: PointerEvent) {
		super.onPointerUp(e);
		this.endAction();
	}

	onPointerMove(e: PointerEvent) {
		super.onPointerMove(e);
		if (this.pressed && e.isPrimary) {
			if (this.isInsideCenter()) {
				return;
			}

			if (this.previousAngle === undefined) {
				this.previousAngle = this.getCurrentAngle();
				return;
			}

			const angle = this.getCurrentAngle();

			let diff = angle - this.previousAngle;
			if (diff > 180) {
				diff -= 360;
			} else if (diff < -180) {
				diff += 360;
			}

			if (Math.abs(diff) >= 20) {
				this.fireHapticEvent('selection');
				const direction = diff > 0 ? 'clockwise' : 'counterclockwise';

				// TODO: only fire if drag action is defined, fire drag action, make direction available in templates
				console.log(this.previousAngle, angle, diff, direction);
				this.previousAngle = angle;
			}
		}
	}

	endAction() {
		super.endAction();
		this.previousAngle = undefined;
	}

	render() {
		return html`
			<div
				class="circlepad"
				part="circlepad"
				@pointerdown=${this.onPointerDown}
				@pointerup=${this.onPointerUp}
				@pointermove=${this.onPointerMove}
				@pointercancel=${this.onPointerCancel}
				@pointerleave=${this.onPointerLeave}
			>
				<remote-button
					class="direction"
					id="up"
					title="Up"
					part="up"
					tabindex="-1"
					.hass=${this.hass}
					.config=${{
						entity_id: this.config.entity_id,
						autofill_default_fields: this.config.autofill_entity_id,
						haptics: this.config.haptics,
						...this.config.up,
					}}
					.icons=${this.icons}
				></remote-button>
				<div class="center-row">
					<remote-button
						class="direction"
						id="left"
						title="Left"
						part="left"
						tabindex="-1"
						.hass=${this.hass}
						.config=${{
							entity_id: this.config.entity_id,
							autofill_default_fields:
								this.config.autofill_entity_id,
							haptics: this.config.haptics,
							...this.config.left,
						}}
						.icons=${this.icons}
					></remote-button>
					<remote-button
						id="center"
						title="Center"
						part="center"
						tabindex="-1"
						.hass=${this.hass}
						.config=${this.config ?? {}}
						.icons=${this.icons}
					></remote-button>
					<remote-button
						class="direction"
						id="right"
						title="Right"
						part="right"
						tabindex="-1"
						.hass=${this.hass}
						.config=${{
							entity_id: this.config.entity_id,
							autofill_default_fields:
								this.config.autofill_entity_id,
							haptics: this.config.haptics,
							...this.config.right,
						}}
						.icons=${this.icons}
					></remote-button>
				</div>
				<remote-button
					class="direction"
					id="down"
					title="Down"
					part="down"
					tabindex="-1"
					.hass=${this.hass}
					.config=${{
						entity_id: this.config.entity_id,
						autofill_default_fields: this.config.autofill_entity_id,
						haptics: this.config.haptics,
						...this.config.down,
					}}
					.icons=${this.icons}
				></remote-button>
			</div>
			${this.buildStyles(this.config.styles)}
		`;
	}

	async onKey(e: KeyboardEvent) {
		const id = this.key2Button[e.key];
		if (id) {
			e.preventDefault();
			e.stopImmediatePropagation();
			const button = this.shadowRoot?.getElementById(id) as RemoteButton;
			if (button) {
				const direction = e.type == 'keydown' ? 'Down' : 'Up';
				await button[`onPointer${direction}`](
					new window.PointerEvent(
						`pointer${direction.toLowerCase()}`,
						{
							...e,
							isPrimary: true,
							clientX: 1,
							clientY: 1,
						},
					),
				);
			}
		}
	}

	firstUpdated() {
		super.firstUpdated();
		const buttons = (this.shadowRoot?.querySelectorAll('remote-button') ??
			[]) as RemoteButton[];
		for (const button of buttons) {
			button.removeAttribute('tabindex');
			button.onKey = async () => {};
		}
	}

	static get styles(): CSSResult | CSSResult[] {
		return [
			super.styles as CSSResult,
			css`
				:host {
					aspect-ratio: 1 / 1;
					height: 100%;
					width: 340px;
					max-width: 100%;
					overflow: visible;

					--size: min(64px, 16vw);
					--center-button-relative-size: 40%;
					--icon-color: var(--dark-grey-color);
				}

				.circlepad {
					all: inherit;
					border-radius: 999px;
					display: flex;
					flex-direction: column;
					overflow: hidden;
					background: var(
						--lovelace-background,
						var(--primary-background-color)
					);
					outline: 3px solid var(--black-color);
					pointer-events: all;
				}
				:host(:focus-visible) .circlepad {
					box-shadow: 0 0 0 2px
						var(--icon-color, var(--primary-text-color));
				}

				.center-row {
					height: var(--center-button-relative-size, 48%);
					width: 100%;
					aspect-ratio: 3 / 1;
					display: flex;
					flex-direction: row;
					justify-content: space-evenly;
					align-items: center;
				}
				#center {
					height: 100%;
					width: var(--center-button-relative-size, 48%);
				}
				#center::part(button) {
					aspect-ratio: 1 / 1;
					border-radius: 999px;
					background: var(--icon-color);
					outline: 3px solid var(--black-color);
					z-index: 1;
				}

				.direction {
					width: 25%;
					aspect-ratio: 1 / 1;
				}

				.direction::part(button) {
					position: absolute;
					height: 200%;
					width: 200%;
					border-radius: 0;
					rotate: -45deg;
				}
				.direction::part(icon),
				.direction::part(label) {
					rotate: 45deg;
				}

				:host([dir='rtl']) .center-row {
					flex-direction: row-reverse;
				}

				/* TODO only apply this style if drag action is enabled */
				.circlepad {
					touch-action: none;
				}
			`,
		];
	}
}
