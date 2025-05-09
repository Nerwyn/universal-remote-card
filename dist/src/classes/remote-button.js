var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DOUBLE_TAP_WINDOW, HOLD_TIME, REPEAT_DELAY, } from '../models/constants';
import { BaseRemoteElement } from './base-remote-element';
let RemoteButton = class RemoteButton extends BaseRemoteElement {
    constructor() {
        super(...arguments);
        this.clickCount = 0;
        this.hold = false;
    }
    async onClick(e) {
        e.stopImmediatePropagation();
        this.clickCount++;
        if (this.renderTemplate(this.config.double_tap_action?.action ?? 'none') != 'none') {
            if (this.clickCount > 1) {
                this.fireHapticEvent('success');
                await this.sendAction('double_tap_action');
                this.endAction();
            }
            else {
                if (!this.clickTimer) {
                    const doubleTapWindow = this.renderTemplate(this.config.double_tap_action
                        ?.double_tap_window) ?? DOUBLE_TAP_WINDOW;
                    this.clickTimer = setTimeout(async () => {
                        this.fireHapticEvent('light');
                        await this.sendAction('tap_action');
                        this.endAction();
                    }, doubleTapWindow);
                }
            }
        }
        else {
            this.fireHapticEvent('light');
            await this.sendAction('tap_action');
            this.endAction();
        }
    }
    async onPointerDown(e) {
        super.onPointerDown(e);
        this.swiping = false;
        if (!this.swiping) {
            if (this.renderTemplate(this.config.momentary_start_action?.action ?? 'none') != 'none') {
                this.fireHapticEvent('light');
                this.momentaryStart = performance.now();
                await this.sendAction('momentary_start_action');
            }
            else if (this.renderTemplate(this.config.momentary_end_action?.action ?? 'none') != 'none') {
                this.fireHapticEvent('light');
                this.momentaryStart = performance.now();
            }
            else if (!this.holdTimer) {
                const holdTime = this.renderTemplate(this.config.hold_action?.hold_time ?? HOLD_TIME);
                this.holdTimer = setTimeout(async () => {
                    if (!this.swiping) {
                        this.hold = true;
                        if (this.renderTemplate(this.config.hold_action?.action) == 'repeat') {
                            const repeat_delay = this.renderTemplate(this.config.hold_action?.repeat_delay ??
                                REPEAT_DELAY);
                            if (!this.holdInterval) {
                                this.holdInterval = setInterval(async () => {
                                    this.fireHapticEvent('selection');
                                    await this.sendAction('tap_action');
                                }, repeat_delay);
                            }
                        }
                        else {
                            this.fireHapticEvent('medium');
                            await this.sendAction('hold_action');
                        }
                    }
                }, holdTime);
            }
        }
    }
    async onPointerUp(e) {
        if (!this.swiping && this.pointers) {
            if (this.renderTemplate(this.config.momentary_end_action?.action ?? 'none') != 'none') {
                this.fireHapticEvent('selection');
                this.momentaryEnd = performance.now();
                await this.sendAction('momentary_end_action');
                this.endAction();
            }
            else if (this.renderTemplate(this.config.momentary_start_action?.action ?? 'none') != 'none') {
                this.endAction();
            }
            else if (this.hold) {
                e.stopImmediatePropagation();
                e.preventDefault();
                this.endAction();
            }
            else {
                await this.onClick(e);
            }
        }
    }
    onPointerMove(e) {
        super.onPointerMove(e);
        const sensitivity = 24;
        const totalDeltaX = (this.currentX ?? 0) - (this.initialX ?? 0);
        const totalDeltaY = (this.currentY ?? 0) - (this.initialY ?? 0);
        if (Math.abs(Math.abs(totalDeltaX) - Math.abs(totalDeltaY)) >
            sensitivity) {
            this.endAction();
            this.swiping = true;
        }
    }
    async onPointerCancel(e) {
        if (this.renderTemplate(this.config.momentary_start_action?.action ?? 'none') != 'none' &&
            this.renderTemplate(this.config.momentary_end_action?.action ?? 'none') != 'none') {
            this.momentaryEnd = performance.now();
            await this.sendAction('momentary_end_action');
        }
        super.onPointerCancel(e);
    }
    endAction() {
        clearTimeout(this.clickTimer);
        this.clickTimer = undefined;
        this.clickCount = 0;
        clearTimeout(this.holdTimer);
        clearInterval(this.holdInterval);
        this.holdTimer = undefined;
        this.holdInterval = undefined;
        this.hold = false;
        super.endAction();
    }
    render() {
        this.setValue();
        return html `
			<button
				tabindex="-1"
				@pointerdown=${this.onPointerDown}
				@pointerup=${this.onPointerUp}
				@pointermove=${this.onPointerMove}
				@pointercancel=${this.onPointerCancel}
				@pointerleave=${this.onPointerLeave}
				@contextmenu=${this.onContextMenu}
			>
				${this.buildIcon(this.config.icon)}
				${this.buildLabel(this.config.label)}${this.buildRipple()}
			</button>
			${this.buildStyles(this.config.styles)}
		`;
    }
    static get styles() {
        return [
            super.styles,
            css `
				:host {
					align-content: center;
					text-align: center;
				}

				button {
					display: flex;
					height: 100%;
					width: 100%;
					border-radius: var(--size, 48px);
					overflow: visible;
					cursor: pointer;
					pointer-events: all;
					position: relative;
					opacity: 1;
					padding: 0;
					background: rgb(0, 0, 0, 0);
					border: none;
					flex-direction: column;
					align-content: center;
					text-align: center;
					justify-content: center;
					align-items: center;
					-webkit-tap-highlight-color: transparent;
					-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
				}
				button:focus-visible {
					outline: none;
				}
				button::after {
					content: '';
					position: absolute;
					height: var(--ha-ripple-height, 100%);
					width: var(--ha-ripple-width, 100%);
					top: var(--ha-ripple-top, 0);
					left: var(--ha-ripple-left, 0);
					border-radius: var(--size, 48px);
					background: var(
						--ha-ripple-pressed-color,
						var(--ha-ripple-color, var(--secondary-text-color))
					);
					opacity: 0;
					transition: opacity 180ms ease-in-out;
				}
				:host(:focus-visible) button::after {
					opacity: var(--ha-ripple-pressed-opacity, 0.12);
				}
			`,
        ];
    }
};
__decorate([
    property()
], RemoteButton.prototype, "config", void 0);
RemoteButton = __decorate([
    customElement('remote-button')
], RemoteButton);
export { RemoteButton };
