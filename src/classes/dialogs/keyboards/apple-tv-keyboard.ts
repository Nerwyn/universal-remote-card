import { customElement } from 'lit/decorators.js';
import { BaseKeyboard } from './base-keyboard';

@customElement('apple-tv-keyboard')
export class AppleTVKeyboard extends BaseKeyboard {
	replaceOnSend = true;

	sendText() {
		this.hass.callService('apple_tv', 'set_keyboard_text', {
			entity_id: this.action.remote_id,
			text: this.textarea?.value ?? '',
		});
	}

	sendKey(key: string) {
		if (key == 'Enter') {
			this.hass.callService('remote', 'send_command', {
				entity_id: this.action.remote_id,
				command: 'select',
			});
		} else {
			this.sendText();
		}
	}
}
