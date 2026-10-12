import { PropertyValues } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ADBKeyboard } from './adb-keyboard';

@customElement('android-tv-keyboard')
export class AndroidTVKeyboard extends ADBKeyboard {
	keyMap = {
		Backspace: 'DEL',
		Enter: 'ENTER',
	};
	inputMap = {
		deleteContentBackward: 'DEL',
		insertLineBreak: 'ENTER',
	};

	sendText(text: string) {
		this.hass.callService('remote', 'send_command', {
			entity_id: this.action.remote_id,
			command: `text:${text}`,
		});
	}

	sendKey(key: string) {
		this.hass.callService('remote', 'send_command', {
			entity_id: this.action.remote_id,
			command: key,
		});
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);
	}
}
