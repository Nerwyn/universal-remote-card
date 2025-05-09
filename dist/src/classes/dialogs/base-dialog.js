var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
export class BaseDialog extends LitElement {
    buildDialogButton(text, handler) {
        return html `<div class="button">
			<button @click=${this.open ? handler : undefined}></button>
			<span>${text}</span>
		</div>`;
    }
    static get styles() {
        return css `
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
__decorate([
    property()
], BaseDialog.prototype, "hass", void 0);
__decorate([
    property()
], BaseDialog.prototype, "open", void 0);
