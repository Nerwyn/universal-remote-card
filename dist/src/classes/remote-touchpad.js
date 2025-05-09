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
let RemoteTouchpad = class RemoteTouchpad extends BaseRemoteElement {
    constructor() {
        super(...arguments);
        this.clickCount = 0;
        this.hold = false;
        this.holdStart = false;
        this.holdMove = false;
        this.fireDragAction = true;
    }
    async onClick(e) {
        e.stopImmediatePropagation();
        this.clickCount++;
        const multiPrefix = this.getMultiPrefix();
        if (this.renderTemplate(this.config.double_tap_action?.action ?? 'none') != 'none' ||
            this.renderTemplate(this.config.multi_double_tap_action?.action ?? 'none') != 'none') {
            const doubleTapAction = `${this.pointers > 2 ? 'multi_' : ''}double_tap_action`;
            if (this.clickCount > 1) {
                this.fireHapticEvent('success');
                await this.sendAction(doubleTapAction);
                this.endAction();
            }
            else {
                if (!this.clickTimer) {
                    const doubleTapWindow = this.renderTemplate(this.config[doubleTapAction]?.double_tap_window ??
                        this.config.double_tap_action
                            ?.double_tap_window) ?? DOUBLE_TAP_WINDOW;
                    this.clickTimer = setTimeout(async () => {
                        this.fireHapticEvent('light');
                        await this.sendAction(`${multiPrefix}tap_action`);
                        this.endAction();
                    }, doubleTapWindow);
                }
            }
        }
        else {
            this.fireHapticEvent('light');
            await this.sendAction(`${multiPrefix}tap_action`);
            this.endAction();
        }
    }
    async onPointerDown(e) {
        super.onPointerDown(e);
        this.holdStart = true;
        this.swiping = false;
        if (!this.direction &&
            this.renderTemplate(this.config.momentary_start_action?.action ?? 'none') != 'none') {
            this.fireHapticEvent('light');
            this.momentaryStart = performance.now();
            await this.sendAction('momentary_start_action');
        }
        else if (!this.direction &&
            this.renderTemplate(this.config.momentary_end_action?.action ?? 'none') != 'none') {
            this.fireHapticEvent('light');
            this.momentaryStart = performance.now();
        }
        else if (!this.holdTimer) {
            this.setHoldTimer();
        }
    }
    async onPointerUp(e) {
        if (!this.direction &&
            this.renderTemplate(this.config.momentary_end_action?.action ?? 'none') != 'none') {
            this.momentaryEnd = performance.now();
            this.fireHapticEvent('selection');
            await this.sendAction('momentary_end_action');
            this.endAction();
        }
        else if (!this.direction &&
            this.renderTemplate(this.config.momentary_start_action?.action ?? 'none') != 'none') {
            this.endAction();
        }
        else if (this.hold || this.holdMove) {
            e.stopImmediatePropagation();
            if (e.cancelable) {
                e.preventDefault();
            }
            let holdMove = false;
            if (this.pointers > 1) {
                holdMove = true;
            }
            this.endAction();
            if (holdMove) {
                this.holdMove = true;
            }
        }
        else if (!this.holdMove && (!('isPrimary' in e) || e.isPrimary)) {
            await this.onClick(e);
        }
    }
    async onPointerMove(e) {
        if (!this.initialX || !this.initialY || !this.holdStart) {
            return;
        }
        super.onPointerMove(e);
        const multiPrefix = this.getMultiPrefix();
        const totalDeltaX = (this.currentX ?? 0) - this.initialX;
        const totalDeltaY = (this.currentY ?? 0) - this.initialY;
        if (this.renderTemplate(this.config[`${multiPrefix}drag_action`]?.action ?? 'none') != 'none') {
            const sensitivity = 0.5;
            if (this.holdMove ||
                Math.abs(Math.abs(totalDeltaX) - Math.abs(totalDeltaY)) >
                    sensitivity) {
                if (this.fireDragAction) {
                    clearTimeout(this.holdTimer);
                    this.holdTimer = undefined;
                    this.holdMove = true;
                    const repeatDelay = this.renderTemplate(this.config[`${multiPrefix}drag_action`]
                        ?.repeat_delay ?? 0);
                    if (repeatDelay) {
                        this.fireDragAction = false;
                        setTimeout(() => {
                            this.fireDragAction = true;
                        }, repeatDelay);
                    }
                    await this.sendAction(`${multiPrefix}drag_action`);
                }
            }
        }
        else {
            const sensitivity = 16;
            if (Math.abs(Math.abs(totalDeltaX) - Math.abs(totalDeltaY)) >
                sensitivity) {
                if (Math.abs(totalDeltaX) > Math.abs(totalDeltaY)) {
                    this.direction = totalDeltaX < 0 ? 'left' : 'right';
                }
                else {
                    this.direction = totalDeltaY < 0 ? 'up' : 'down';
                }
                if (!this.holdMove) {
                    this.fireHapticEvent('light');
                    await this.sendAction(`${multiPrefix}tap_action`, this.getActions());
                    this.holdMove = true;
                    if (this.holdTimer) {
                        clearTimeout(this.holdTimer);
                        this.holdTimer = undefined;
                        this.setHoldTimer();
                    }
                }
            }
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
        this.holdStart = false;
        this.holdMove = false;
        this.direction = undefined;
        super.endAction();
    }
    getActions() {
        return (this.direction ? this.config[this.direction] : this.config);
    }
    getMultiPrefix() {
        return this.pointers > 1 ? 'multi_' : '';
    }
    setHoldTimer() {
        const holdAction = `${this.getMultiPrefix()}hold_action`;
        const actions = this.getActions();
        const holdTime = this.renderTemplate(actions[holdAction]?.hold_time ?? HOLD_TIME);
        this.holdTimer = setTimeout(async () => {
            this.hold = true;
            const actions = this.getActions();
            const multiPrefix = this.getMultiPrefix();
            let repeat = this.renderTemplate(actions.hold_action?.action) ==
                'repeat';
            let repeatDelay = this.renderTemplate(actions.hold_action?.repeat_delay ?? REPEAT_DELAY);
            if (multiPrefix == 'multi_' && actions.multi_hold_action) {
                repeat =
                    this.renderTemplate(actions.multi_hold_action?.action) == 'repeat';
                repeatDelay = this.renderTemplate(actions.multi_hold_action?.repeat_delay ?? REPEAT_DELAY);
            }
            if (repeat) {
                if (!this.holdInterval) {
                    this.holdInterval = setInterval(async () => {
                        this.fireHapticEvent('selection');
                        await this.sendAction(`${this.getMultiPrefix()}tap_action`, this.getActions());
                    }, repeatDelay);
                }
            }
            else {
                this.fireHapticEvent('medium');
                await this.sendAction(`${multiPrefix}hold_action`, actions);
            }
        }, holdTime);
    }
    render() {
        this.setValue();
        return html `
			<toucharea
				tabindex="0"
				@pointerdown=${this.onPointerDown}
				@pointerup=${this.onPointerUp}
				@pointermove=${this.onPointerMove}
				@pointercancel=${this.onPointerCancel}
				@pointerleave=${this.onPointerLeave}
				@contextmenu=${this.onContextMenu}
			>
				<div class="toucharea-row">
					<remote-icon-label
						id="up"
						.hass=${this.hass}
						.config=${this.config.up ?? {}}
						.icons=${this.icons}
					></remote-icon-label>
				</div>
				<div class="toucharea-row">
					<remote-icon-label
						id="left"
						.hass=${this.hass}
						.config=${this.config.left ?? {}}
						.icons=${this.icons}
					></remote-icon-label>
					<remote-icon-label
						id="center"
						.hass=${this.hass}
						.config=${this.config}
						.icons=${this.icons}
					></remote-icon-label>
					<remote-icon-label
						id="right"
						.hass=${this.hass}
						.config=${this.config.right ?? {}}
						.icons=${this.icons}
					></remote-icon-label>
				</div>
				<div class="toucharea-row">
					<remote-icon-label
						id="down"
						.hass=${this.hass}
						.config=${this.config.down ?? {}}
						.icons=${this.icons}
					></remote-icon-label>
				</div>
				${this.buildRipple()}
			</toucharea>
			${this.buildStyles(this.config.styles)}
		`;
    }
    async onKeyDown(e) {
        if ([
            'Enter',
            ' ',
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight',
        ].includes(e.key)) {
            e.preventDefault();
            if (!e.repeat) {
                if (e.shiftKey) {
                    this.pointers++;
                }
                this.onPointerDown(new window.PointerEvent('pointerdown', {
                    ...e,
                    isPrimary: true,
                    clientX: 64,
                    clientY: 64,
                }));
                if ([
                    'ArrowUp',
                    'ArrowDown',
                    'ArrowLeft',
                    'ArrowRight',
                ].includes(e.key)) {
                    e.preventDefault();
                    if (!e.repeat) {
                        this.onPointerMove(new window.PointerEvent('pointermove', {
                            ...e,
                            isPrimary: true,
                            clientX: 64 +
                                (e.key == 'ArrowRight'
                                    ? 32
                                    : e.key == 'ArrowLeft'
                                        ? -32
                                        : 0),
                            clientY: 64 +
                                (e.key == 'ArrowUp'
                                    ? -32
                                    : e.key == 'ArrowDown'
                                        ? 32
                                        : 0),
                        }));
                    }
                }
            }
        }
    }
    async onKeyUp(e) {
        if ([
            'Enter',
            ' ',
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight',
        ].includes(e.key)) {
            e.preventDefault();
            if (!e.repeat) {
                if (e.shiftKey) {
                    this.pointers++;
                }
                this.onPointerUp(new window.PointerEvent('pointerup', {
                    ...e,
                    isPrimary: true,
                    clientX: 64,
                    clientY: 64,
                }));
            }
        }
    }
    firstUpdated() {
        super.firstUpdated();
        this.removeAttribute('tabindex');
        const children = this.shadowRoot?.querySelectorAll('remote-icon-label') ?? [];
        for (const child of children) {
            child.removeAttribute('tabindex');
        }
    }
    static get styles() {
        return [
            super.styles,
            css `
				:host {
					display: contents;

					--mdc-ripple-press-opacity: 0.04;
				}

				toucharea {
					border-radius: 32px;
					flex-grow: 1;
					height: 250px;
					width: -moz-available;
					width: -webkit-fill-available;
					width: fill-available;
					background: var(
						--lovelace-background,
						var(--primary-background-color, rgb(111, 118, 125))
					);
					touch-action: none;
					text-align: center;
					position: relative;
					overflow: hidden;
					display: flex;
					flex-direction: column;
					flex-wrap: nowrap;
					justify-content: space-between;
					transition: box-shadow 180ms ease-in-out;
				}
				toucharea:focus-visible {
					box-shadow: 0 0 0 2px
						var(--icon-color, var(--primary-text-color));
				}

				.toucharea-row {
					min-height: var(--size, 48px);
					display: flex;
					flex-direction: row;
					flex-wrap: nowrap;
					width: -moz-available;
					width: -webkit-fill-available;
					width: fill-available;
					justify-content: space-around;
					align-items: center;
				}
			`,
        ];
    }
};
__decorate([
    property()
], RemoteTouchpad.prototype, "config", void 0);
RemoteTouchpad = __decorate([
    customElement('remote-touchpad')
], RemoteTouchpad);
export { RemoteTouchpad };
let IconLabelContainer = class IconLabelContainer extends BaseRemoteElement {
    render() {
        this.setValue();
        return html `
			${this.buildIcon(this.config.icon)}${this.buildLabel(this.config.label)}${this.buildStyles(this.config.styles)}
		`;
    }
};
IconLabelContainer = __decorate([
    customElement('remote-icon-label')
], IconLabelContainer);
export { IconLabelContainer };
