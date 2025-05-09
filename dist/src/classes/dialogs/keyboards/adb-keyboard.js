var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement } from 'lit/decorators.js';
import { BaseKeyboard } from './base-keyboard';
let ADBKeyboard = class ADBKeyboard extends BaseKeyboard {
    constructor() {
        super(...arguments);
        this.keyMap = {
            Backspace: '67',
            Enter: '66',
        };
        this.inputMap = {
            deleteContentBackward: '67',
            insertLineBreak: '66',
        };
    }
    sendText(text) {
        this.hass.callService(this.domain ?? 'remote', this.service ?? 'send_command', {
            entity_id: this.action.keyboard_id,
            command: `input text "${text}"`,
        });
    }
    sendKey(key) {
        this.hass.callService(this.domain ?? 'remote', this.service ?? 'send_command', {
            entity_id: this.action.keyboard_id,
            command: `input keyevent ${key}`,
        });
    }
    sendSearch(text) {
        this.hass.callService(this.domain ?? 'remote', this.service ?? 'send_command', {
            entity_id: this.action.keyboard_id,
            command: `am start -a "android.search.action.GLOBAL_SEARCH" --es query "${text}"`,
        });
    }
    closeDialog(e) {
        this.domain = undefined;
        this.service = undefined;
        super.closeDialog(e);
    }
    updated(changedProperties) {
        if (changedProperties.has('open') && !changedProperties.get('open')) {
            switch ((this.action.keyboard_id ?? '').split('.')[0]) {
                case 'media_player':
                    this.domain = 'androidtv';
                    this.service = 'adb_command';
                    break;
                case 'remote':
                default:
                    this.domain = 'remote';
                    this.service = 'send_command';
                    break;
            }
        }
        super.updated(changedProperties);
    }
};
ADBKeyboard = __decorate([
    customElement('adb-keyboard')
], ADBKeyboard);
export { ADBKeyboard };
