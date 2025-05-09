var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement } from 'lit/decorators.js';
import { BaseKeyboard } from './base-keyboard';
let WebOSKeyboard = class WebOSKeyboard extends BaseKeyboard {
    constructor() {
        super(...arguments);
        this.keyMap = {
            Backspace: 'Backspace',
            Enter: 'Enter',
        };
        this.inputMap = {
            deleteContentBackward: 'Backspace',
            insertLineBreak: 'Enter',
        };
        this.replaceOnSend = true;
    }
    sendText(_text) {
        this.hass.callService('webostv', 'command', {
            entity_id: this.action.keyboard_id,
            command: 'com.webos.service.ime/insertText',
            payload: {
                text: this.textarea?.value ?? '',
                replace: true,
            },
        });
    }
    sendKey(key) {
        if (key == 'Enter') {
            this.hass.callService('webostv', 'command', {
                entity_id: this.action.keyboard_id,
                command: 'com.webos.service.ime/sendEnterKey',
            });
        }
        else {
            this.sendText();
        }
    }
};
WebOSKeyboard = __decorate([
    customElement('webos-keyboard')
], WebOSKeyboard);
export { WebOSKeyboard };
