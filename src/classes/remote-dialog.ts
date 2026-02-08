import { LitElement, PropertyValues, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, IAction } from '../models/interfaces';

import './dialogs/keyboards/adb-keyboard';
import './dialogs/keyboards/android-tv-keyboard';
import './dialogs/keyboards/kodi-keyboard';
import './dialogs/keyboards/roku-keyboard';
import './dialogs/keyboards/samsung-tv-keyboard';
import './dialogs/keyboards/unified-remote-keyboard';
import './dialogs/keyboards/webos-keyboard';

@customElement('remote-dialog')
export class RemoteDialog extends LitElement {
	@property() hass!: HomeAssistant;
	@state() config!: IAction;
	@state() open: boolean = false;
	@state() fadedIn: boolean = false;
	fadedInTimer?: ReturnType<typeof setTimeout> = undefined;
	tabIndex = -1;

	showDialog(config: IAction) {
		this.config = config;
		this.open = true;
		this.fadedInTimer = setTimeout(() => {
			this.fadedIn = true;
		}, 250);

		const dialog = this.shadowRoot?.querySelector('dialog');
		if (dialog) {
			try {
				dialog.showModal();
			} catch {
				dialog.close();
				dialog.showModal();
			}
			window.addEventListener('popstate', () => this.closeDialog());
		}
	}

	closeDialog(e?: Event) {
		e?.preventDefault();
		clearTimeout(this.fadedInTimer);
		this.fadedIn = false;
		this.open = false;

		const dialog = this.shadowRoot?.querySelector('dialog');
		if (dialog) {
			setTimeout(() => {
				try {
					dialog.close();
				} catch {
					dialog.showModal();
					dialog.close();
				}
				window.removeEventListener('popstate', () => this.closeDialog());
			}, 140);
		}
	}

	render() {
		let content = html``;
		const open = this.open && this.fadedIn;
		if (this.config) {
			switch (this.config?.platform) {
				case 'Unified Remote':
					content = html`<unified-remote-keyboard
						.hass=${this.hass}
						.action=${this.config ?? {}}
						.open=${open}
					></unified-remote-keyboard>`;
					break;
				case 'Kodi':
					content = html`<kodi-keyboard
						.hass=${this.hass}
						.action=${this.config ?? {}}
						.open=${open}
					></kodi-keyboard>`;
					break;
				case 'Samsung TV':
					content = html`<samsung-tv-keyboard
						.hass=${this.hass}
						.action=${this.config ?? {}}
						.open=${open}
					></samsung-tv-keyboard>`;
					break;
				case 'LG webOS':
					content = html`<webos-keyboard
						.hass=${this.hass}
						.action=${this.config ?? {}}
						.open=${open}
					></webos-keyboard>`;
					break;
				case 'Roku':
					content = html`<roku-keyboard
						.hass=${this.hass}
						.action=${this.config ?? {}}
						.open=${open}
					></roku-keyboard>`;
					break;
				case 'Fire TV':
				case 'Sony BRAVIA':
					content = html`<adb-keyboard
						.hass=${this.hass}
						.action=${this.config ?? {}}
						.open=${open}
					></adb-keyboard>`;
					break;
				case 'Android TV':
				default:
					content = html`<android-tv-keyboard
						.hass=${this.hass}
						.action=${this.config ?? {}}
						.open=${open}
					></android-tv-keyboard>`;
					break;
			}
		}

		return html`<dialog
			class="${this.fadedIn ? 'faded-in' : 'faded-out'}"
			part="dialog"
			@dialog-close=${this.closeDialog}
			@cancel=${this.closeDialog}
		>
			${content}
		</dialog>`;
	}

	shouldUpdate(changedProperties: PropertyValues): boolean {
		return (
			changedProperties.has('config') ||
			changedProperties.has('open') ||
			changedProperties.has('fadedIn')
		);
	}

	updated() {
		if (this.open) {
			this.setAttribute('open', '');
			this.removeAttribute('closed');
		} else {
			this.setAttribute('closed', '');
			this.removeAttribute('open');
		}
	}

	static get styles() {
		return css`
			:host {
				-webkit-tap-highlight-color: transparent;
				-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
			}

			dialog {
				width: 85%;
				padding: 24px;
				pointer-events: none;
				display: inline-flex;
				flex-direction: column;
				position: fixed;
				border: none;
				outline: none;
				color: var(--primary-text-color);
				background: var(
					--ha-dialog-surface-background,
					var(--ha-card-background, var(--card-background-color, #fff))
				);
				border-radius: var(
					--ha-dialog-border-radius,
					var(--md-sys-shape-corner-extra-large, 28px)
				);
			}
			dialog[open] {
				pointer-events: all;
				translate: 0 0;
				scale: 1 1;
				opacity: 1;
				transition:
					translate 0.5s cubic-bezier(0.3, 0, 0, 1),
					scale 0.5s cubic-bezier(0.2, 0, 0, 1),
					opacity 0.05s linear;
			}
			dialog:not([open]) {
				translate: 0 -100px;
				scale: 1 0;
				opacity: 0;
				transition:
					translate 0.15s cubic-bezier(0.3, 0, 0, 1),
					scale 0.15s cubic-bezier(0.3, 0, 0.8, 0.15),
					opacity 0.05s linear 0.025s;
			}

			dialog::backdrop {
				background-color: var(
					--md-sys-color-scrim-mode,
					var(--md-sys-color-scrim, var(--mdc-dialog-scrim-color, #000))
				);
				--md-sys-color-scrim-mode: light-dark(
					var(--md-sys-color-scrim-light),
					var(--md-sys-color-scrim-dark)
				);
			}
			dialog.faded-in::backdrop {
				opacity: 0.32;
				transition: opacity 0.15s linear;
			}
			dialog.faded-out::backdrop {
				opacity: 0;
				transition: opacity 0.075s linear;
			}
		`;
	}
}
