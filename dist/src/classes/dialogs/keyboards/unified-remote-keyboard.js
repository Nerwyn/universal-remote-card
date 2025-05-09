var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement } from 'lit/decorators.js';
import { BaseKeyboard } from './base-keyboard';
let UnifiedRemoteKeyboard = class UnifiedRemoteKeyboard extends BaseKeyboard {
    constructor() {
        super(...arguments);
        this.keyMap = {
            Backspace: 'back',
            Enter: 'enter',
        };
        this.inputMap = {
            deleteContentBackward: 'back',
            insertLineBreak: 'enter',
        };
        this.closeOnEnter = false;
    }
    sendText(text) {
        this.hass.callService('unified_remote', 'call', {
            target: this.action.keyboard_id,
            remote_id: 'Core.Input',
            action: 'Text',
            extras: {
                Values: [
                    {
                        Value: text,
                    },
                ],
            },
        });
    }
    sendKey(key) {
        this.hass.callService('unified_remote', 'call', {
            target: this.action.keyboard_id,
            remote_id: 'Core.Input',
            action: 'Press',
            extras: {
                Values: [
                    {
                        Value: key,
                    },
                ],
            },
        });
    }
};
UnifiedRemoteKeyboard = __decorate([
    customElement('unified-remote-keyboard')
], UnifiedRemoteKeyboard);
export { UnifiedRemoteKeyboard };
