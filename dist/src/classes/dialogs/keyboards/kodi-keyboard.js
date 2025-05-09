var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement } from 'lit/decorators.js';
import { BaseKeyboard } from './base-keyboard';
let KodiKeyboard = class KodiKeyboard extends BaseKeyboard {
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
        this.hass.callService('kodi', 'call_method', {
            entity_id: this.action.keyboard_id,
            method: 'Input.SendText',
            text: this.textarea?.value ?? '',
            done: false,
        });
    }
    sendKey(key) {
        this.hass.callService('kodi', 'call_method', {
            entity_id: this.action.keyboard_id,
            method: 'Input.SendText',
            text: this.textarea?.value ?? '',
            done: key == 'Enter',
        });
    }
    sendSearch(text) {
        this.hass.callService('kodi', 'call_method', {
            entity_id: this.action.keyboard_id,
            method: 'Input.SendText',
            text: text,
            done: true,
        });
    }
    updated(changedProperties) {
        if (changedProperties.has('open') &&
            !changedProperties.get('open') &&
            this.action.action == 'search') {
            this.hass.callService('kodi', 'call_method', {
                entity_id: this.action.keyboard_id,
                method: 'Addons.ExecuteAddon',
                addonid: 'script.globalsearch',
            });
        }
        super.updated(changedProperties);
    }
};
KodiKeyboard = __decorate([
    customElement('kodi-keyboard')
], KodiKeyboard);
export { KodiKeyboard };
