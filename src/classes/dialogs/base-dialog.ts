import { css, CSSResult, html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { HomeAssistant } from '../../models/interfaces';

export class BaseDialog extends LitElement {
	@property() hass!: HomeAssistant;
	@property() open: boolean = false;

	buildDialogButton(text: string, handler: (e: MouseEvent) => void) {
		return html`<div class="button">
			<button @click=${this.open ? handler : undefined}></button>
			<span>${text}</span>
		</div>`;
	}

	shouldUpdate(changedProperties: PropertyValues) {
		return changedProperties.has('open');
	}

	static get styles(): CSSResult | CSSResult[] {
		return css`
			:host {
				-webkit-tap-highlight-color: transparent;
				-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
				--background: var(
					--mdc-ripple-color,
					var(--mdc-theme-primary, #6200ee)
				);
			}

			.buttons {
				height: var(--button-height, 36px);
				width: fill-available;
				width: -webkit-fill-available;
				width: -moz-available;
				display: inline-flex;
				flex-direction: row;
				justify-content: space-between;
				gap: 8px;
			}
			.button {
				height: 100%;
				width: min-content;
				min-width: 64px;
				align-content: center;
				cursor: pointer;
				border-radius: var(--button-height, 4px);
				overflow: hidden;
				display: flex;
				align-items: center;
				position: relative;
			}
			button {
				min-height: 100%;
				min-width: 100%;
				background: 0px 0px;
				opacity: 1;
				border: none;
				overflow: hidden;
				cursor: pointer;
				padding: 0;
				position: absolute;
				background: var(
					--mdc-theme-primary,
					var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))
				);
				pointer-events: all;
				opacity: 0;
				transition: opacity 100ms ease-in-out;
			}
			@media (hover: hover) {
				button:hover {
					opacity: var(
						--ha-ripple-hover-opacity,
						var(--md-ripple-hover-opacity, 0.08)
					);
				}
			}
			button:focus-visible {
				outline: none;
				opacity: var(
					--ha-ripple-pressed-opacity,
					var(--md-ripple-pressed-opacity, 0.12)
				);
			}
			button:active {
				opacity: calc(
					2 *
						var(
							--ha-ripple-pressed-opacity,
							var(--md-ripple-pressed-opacity, 0.12)
						)
				);
			}

			.button span {
				font-family: var(
					--mdc-typography-button-font-family,
					var(--mdc-typography-font-family, Roboto, sans-serif)
				);
				font-size: var(--mdc-typography-button-font-size, 0.875rem);
				font-weight: var(--mdc-typography-button-font-weight, 500);
				letter-spacing: var(
					--mdc-typography-button-letter-spacing,
					0.0892857143em
				);
				text-transform: var(
					--mdc-typography-button-text-transform,
					uppercase
				);
				color: var(--mdc-theme-primary, #6200ee);
				user-select: none;
				-webkit-user-select: none;
				-moz-user-select: none;
				padding: 0 8px;
				pointer-events: none;
				display: block;
				width: -webkit-fill-available;
				width: -moz-available;
				width: fill-available;
				text-align: center;
				flex-shrink: 0;
			}
		`;
	}
}
