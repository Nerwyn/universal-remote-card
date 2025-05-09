var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement } from 'lit/decorators.js';
import { BaseKeyboard } from './base-keyboard';
let RokuKeyboard = class RokuKeyboard extends BaseKeyboard {
    constructor() {
        super(...arguments);
        this.keyMap = {
            Backspace: 'backspace',
            Enter: 'enter',
        };
        this.inputMap = {
            deleteContentBackward: 'backspace',
            insertLineBreak: 'enter',
        };
    }
    getRokuId(domain) {
        if ((this.action.keyboard_id ?? '').split('.')[0] != domain) {
            switch (domain) {
                case 'media_player':
                    return this.action.media_player_id;
                case 'remote':
                default:
                    return this.action.remote_id;
            }
        }
        return this.action.keyboard_id;
    }
    sendText(text) {
        this.hass.callService('remote', 'send_command', {
            entity_id: this.getRokuId('remote'),
            command: `Lit_${text}`,
        });
    }
    sendKey(key) {
        this.hass.callService('remote', 'send_command', {
            entity_id: this.getRokuId('remote'),
            command: key,
        });
    }
    sendSearch(text) {
        this.hass.callService('roku', 'search', {
            entity_id: this.getRokuId('media_player'),
            keyword: text,
        });
    }
};
RokuKeyboard = __decorate([
    customElement('roku-keyboard')
], RokuKeyboard);
export { RokuKeyboard };
