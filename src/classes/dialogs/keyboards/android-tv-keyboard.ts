import { PropertyValues } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseKeyboard } from './base-keyboard';

@customElement('android-tv-keyboard')
export class AndroidTVKeyboard extends BaseKeyboard {
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

	sendSearch(text: string) {
		if (!this.searchReady) {
			setTimeout(() => {
				this.sendSearch(text);
			}, 100);
			return;
		}

		this.hass.callService('remote', 'send_command', {
			entity_id: this.action.remote_id,
			command: [`text:${text}`, 'ENTER'],
			delay_secs: 0.4,
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
				.callService('remote', 'send_command', {
					entity_id: this.action.remote_id,
					command: 'SEARCH',
				})
				.then(() => {
					setTimeout(
						() =>
							this.hass
								.callService('remote', 'send_command', {
									entity_id: this.action.remote_id,
									command: [
										'DPAD_LEFT',
										'DPAD_LEFT',
										'DPAD_CENTER',
									],
									delay_secs: 0.4,
								})
								.then(() => (this.searchReady = true)),
						1500,
					);
				});
		}
	}
}
