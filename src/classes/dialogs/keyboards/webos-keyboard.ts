import { customElement } from 'lit/decorators.js';
import { BaseKeyboard } from './base-keyboard';

@customElement('webos-keyboard')
export class WebOSKeyboard extends BaseKeyboard {
	replaceOnSend = true;

	sendText(_text?: string) {
		this.hass.callService('webostv', 'command', {
			entity_id: this.action.media_player_id,
			command: 'com.webos.service.ime/insertText',
			payload: {
				text: this.textarea?.value ?? '',
				replace: true,
			},
		});
	}

	sendKey(key: string) {
		if (key == 'Enter') {
			this.hass.callService('webostv', 'command', {
				entity_id: this.action.media_player_id,
				command: 'com.webos.service.ime/sendEnterKey',
			});
		} else {
			this.sendText();
		}
	}
}
