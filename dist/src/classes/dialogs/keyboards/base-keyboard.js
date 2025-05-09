var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { querySelectorAsync } from '../../../utils';
import { BaseDialog } from '../base-dialog';
export class BaseKeyboard extends BaseDialog {
    constructor() {
        super(...arguments);
        this.enabled = false;
        this.enabledTimer = undefined;
        this.onKeyDownFired = false;
        this.keyMap = {};
        this.inputMap = {};
        this.closeOnEnter = true;
        this.replaceOnSend = false;
    }
    sendText(_text) { }
    sendKey(_text) { }
    sendSearch(_text) { }
    forceCursorToEnd(e) {
        if (!this.replaceOnSend) {
            e?.preventDefault();
            this.textarea.selectionStart = this.textarea.value.length;
            this.textarea.selectionEnd = this.textarea.value.length;
        }
    }
    onInput(e) {
        e.stopImmediatePropagation();
        this.forceCursorToEnd();
        const inputType = e.inputType ?? '';
        const text = e.data ?? '';
        if (text && inputType == 'insertText') {
            this.sendText(text);
        }
        else if (!this.onKeyDownFired) {
            const key = this.inputMap[inputType ?? ''];
            if (key) {
                this.sendKey(key);
            }
            if (this.closeOnEnter && inputType == 'insertLineBreak') {
                this.closeDialog();
            }
        }
        this.onKeyDownFired = false;
    }
    onKeyDown(e) {
        e.stopImmediatePropagation();
        this.forceCursorToEnd();
        const inKey = e.key;
        const outKey = this.keyMap[inKey ?? ''];
        if (outKey) {
            this.onKeyDownFired = true;
            if (this.replaceOnSend) {
                setTimeout(() => this.sendKey(outKey), 100);
            }
            else {
                this.sendKey(outKey);
            }
        }
        if (this.closeOnEnter && inKey == 'Enter') {
            if (this.replaceOnSend) {
                setTimeout(() => this.closeDialog(), 100);
            }
            else {
                this.closeDialog();
            }
        }
    }
    onPaste(e) {
        e.stopImmediatePropagation();
        const text = e.clipboardData?.getData('Text');
        if (text) {
            if (this.replaceOnSend) {
                setTimeout(() => this.sendText(text), 100);
            }
            else {
                this.sendText(text);
            }
        }
    }
    textBox(_e) {
        const text = this.textarea?.value;
        if (text) {
            this.sendText(text);
        }
        this.closeDialog();
    }
    search(_e) {
        const text = this.textarea?.value;
        if (text) {
            this.sendSearch(text);
        }
        this.closeDialog();
    }
    enterDialog() {
        this.sendKey(this.keyMap['Enter']);
        this.closeDialog();
    }
    closeDialog(e) {
        e?.preventDefault();
        if (this.textarea) {
            this.textarea.value = '';
            this.textarea.blur();
        }
        this.textarea = undefined;
        clearTimeout(this.enabledTimer);
        this.enabledTimer = undefined;
        this.enabled = false;
        this.dispatchEvent(new Event('dialog-close', {
            composed: true,
            bubbles: true,
        }));
    }
    render() {
        let buttons = html ``;
        let placeholder;
        let inputHandler;
        let keyDownHandler;
        let pasteHandler;
        let forceCursorToEndHandler;
        switch (this.action.action) {
            case 'search':
                placeholder = 'Search for something...';
                buttons = html `${this.buildDialogButton('Close', this.closeDialog)}${this.buildDialogButton('Search', this.search)}`;
                break;
            case 'textbox':
                placeholder = 'Send something...';
                buttons = html `${this.buildDialogButton('Close', this.closeDialog)}${this.buildDialogButton('Send', this.textBox)}`;
                break;
            case 'keyboard':
            default:
                placeholder = 'Type something...';
                buttons = html `${this.buildDialogButton('Close', this.closeDialog)}${this.buildDialogButton('Enter', this.enterDialog)}`;
                keyDownHandler = this.onKeyDown;
                inputHandler = this.onInput;
                pasteHandler = this.onPaste;
                forceCursorToEndHandler = this.forceCursorToEnd;
                break;
        }
        placeholder = this.action.keyboard_prompt ?? placeholder;
        const textarea = html `<textarea
			?disabled=${!this.enabled}
			spellcheck="false"
			autocorrect="off"
			autocomplete="off"
			autocapitalize="off"
			autofocus="false"
			placeholder="${placeholder}"
			@input=${inputHandler}
			@keydown=${keyDownHandler}
			@paste=${pasteHandler}
			@keyup=${forceCursorToEndHandler}
			@click=${forceCursorToEndHandler}
			@select=${forceCursorToEndHandler}
			@cancel=${this.closeDialog}
		></textarea>`;
        return html `${textarea}
			<div class="buttons">${buttons}</div>`;
    }
    updated(changedProperties) {
        if (changedProperties.has('open') && !changedProperties.get('open')) {
            querySelectorAsync(this.shadowRoot, 'textarea').then((textarea) => {
                this.textarea = textarea;
                this.enabledTimer = setTimeout(() => (this.enabled = true), 100);
            });
        }
        if (changedProperties.has('enabled') &&
            !changedProperties.get('enabled')) {
            this.textarea?.focus();
        }
    }
    static get styles() {
        return [
            super.styles,
            css `
				textarea {
					position: relative;
					width: fill-available;
					width: -webkit-fill-available;
					width: -moz-available;
					height: 180px;
					padding: 8px;
					outline: none;
					background: none;
					border: none;
					resize: none;
					font-family: inherit;
					font-weight: 500;
					font-size: 30px;
				}
			`,
        ];
    }
}
__decorate([
    property()
], BaseKeyboard.prototype, "action", void 0);
__decorate([
    state()
], BaseKeyboard.prototype, "enabled", void 0);
