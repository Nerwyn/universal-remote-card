import { PropertyValues } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseKeyboard } from './base-keyboard';

@customElement('kodi-keyboard')
export class KodiKeyboard extends BaseKeyboard {
	replaceOnSend = true;

	sendText(_text: string) {
		this.hass.callService('kodi', 'call_method', {
			entity_id: this.action.media_player_id,
			method: 'Input.SendText',
			text: this.textarea?.value ?? '',
			done: false,
		});
	}

	sendKey(key: string) {
		this.hass.callService('kodi', 'call_method', {
			entity_id: this.action.media_player_id,
			method: 'Input.SendText',
			text: this.textarea?.value ?? '',
			done: key == 'Enter',
		});
	}

	sendSearch(text: string) {
		if (!this.searchReady) {
			setTimeout(() => {
				this.sendSearch(text);
			}, 100);
			return;
		}

		this.hass.callService('kodi', 'call_method', {
			entity_id: this.action.media_player_id,
			method: 'Input.SendText',
			text: text,
			done: true,
		});
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);
		if (
			changedProperties.has('open') &&
			!changedProperties.get('open') &&
			this.open &&
			this.action.action == 'search'
		) {
			this.searchReady = false;
			this.hass
				.callService('kodi', 'call_method', {
					entity_id: this.action.media_player_id,
					method: 'Addons.ExecuteAddon',
					addonid: 'script.globalsearch',
				})
				.then(() => (this.searchReady = true));
		}
	}
}
