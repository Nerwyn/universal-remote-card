import { customElement } from 'lit/decorators.js';
import { BaseKeyboard } from './base-keyboard';

@customElement('samsung-tv-keyboard')
export class SamsungTVKeyboard extends BaseKeyboard {
	replaceOnSend = true;

	sendText() {
		this.hass.callService('media_player', 'play_media', {
			entity_id: this.action.media_player_id,
			media_content_type: 'send_text',
			media_content_id: this.textarea?.value ?? '',
		});
	}

	sendKey(key: string) {
		if (key == 'Enter') {
			this.hass.callService('media_player', 'play_media', {
				entity_id: this.action.media_player_id,
				media_content_type: 'send_key',
				media_content_id: 'KEY_ENTER',
			});
		} else {
			this.sendText();
		}
	}
}
