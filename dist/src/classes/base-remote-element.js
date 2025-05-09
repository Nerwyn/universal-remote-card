var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { renderTemplate } from 'ha-nunjucks';
import { load } from 'js-yaml';
import { UPDATE_AFTER_ACTION_DELAY } from '../models/constants';
import { defaultIcons } from '../models/maps';
import { deepGet, deepSet, getDeepKeys } from '../utils';
import { buildStyles } from '../utils/styles';
export class BaseRemoteElement extends LitElement {
    constructor() {
        super(...arguments);
        this.icons = [];
        this.value = 0;
        this.getValueFromHass = true;
        this.unitOfMeasurement = '';
        this.swiping = false;
        this.pointers = 0;
        this.fireMouseEvent = true;
        this.tabIndex = 0;
    }
    fireHapticEvent(haptic) {
        if (this.renderTemplate(this.config.haptics) ??
            true) {
            const event = new Event('haptic', {
                bubbles: true,
                composed: true,
            });
            event.detail = haptic;
            window.dispatchEvent(event);
        }
    }
    endAction() {
        this.momentaryStart = undefined;
        this.momentaryEnd = undefined;
        this.swiping = false;
        this.pointers = 0;
        this.initialX = undefined;
        this.initialY = undefined;
        this.currentX = undefined;
        this.currentY = undefined;
        this.deltaX = undefined;
        this.deltaY = undefined;
    }
    async sendAction(actionType, config = this.config) {
        let action;
        switch (actionType) {
            case 'drag_action':
                action = config.drag_action;
                break;
            case 'multi_drag_action':
                action = config.multi_drag_action ?? config.drag_action;
                break;
            case 'momentary_start_action':
                action = config.momentary_start_action;
                break;
            case 'momentary_end_action':
                action = config.momentary_end_action;
                break;
            case 'multi_hold_action':
                action =
                    config.multi_hold_action ??
                        config.hold_action ??
                        config.multi_tap_action ??
                        config.tap_action;
                break;
            case 'multi_double_tap_action':
                action =
                    config.multi_double_tap_action ??
                        config.double_tap_action ??
                        config.multi_tap_action ??
                        config.tap_action;
                break;
            case 'multi_tap_action':
                action = config.multi_tap_action ?? config.tap_action;
                break;
            case 'hold_action':
                action = config.hold_action ?? config.tap_action;
                break;
            case 'double_tap_action':
                action = config.double_tap_action ?? config.tap_action;
                break;
            case 'tap_action':
            default:
                action = config.tap_action;
                break;
        }
        action &&= this.deepRenderTemplate(action);
        if (!action || !(await this.handleConfirmation(action))) {
            this.dispatchEvent(new Event('confirmation-failed'));
            return;
        }
        try {
            switch (action?.action) {
                case 'navigate':
                    this.navigate(action);
                    break;
                case 'url':
                    this.url(action);
                    break;
                case 'assist':
                    this.assist(action);
                    break;
                case 'more-info':
                    this.moreInfo(action);
                    break;
                case 'toggle':
                    this.toggle(action);
                    break;
                case 'call-service':
                case 'perform-action':
                    this.callService(action);
                    break;
                case 'source':
                    this.source(action);
                    break;
                case 'key':
                    this.key(action, actionType);
                    break;
                case 'eval':
                    this.eval(action);
                    break;
                case 'textbox':
                case 'search':
                case 'keyboard':
                    this.keyboard(action);
                    break;
                case 'repeat':
                case 'none':
                    break;
            }
        }
        catch (e) {
            this.endAction();
            throw e;
        }
    }
    hassAction(action) {
        let entity = action.target?.entity_id ?? this.config.entity_id;
        if (Array.isArray(entity)) {
            entity = entity[0];
        }
        action.confirmation = false;
        const event = new Event('hass-action', {
            bubbles: true,
            composed: true,
        });
        event.detail = {
            action: 'tap',
            config: {
                entity,
                tap_action: action,
            },
        };
        this.dispatchEvent(event);
    }
    key(action, actionType) {
        switch (action.platform) {
            case 'Unified Remote':
                break;
            case 'Kodi':
                this.hass.callService('kodi', 'call_method', {
                    entity_id: action.media_player_id,
                    method: action.key,
                });
                break;
            case 'LG webOS':
                this.hass.callService('webostv', 'button', {
                    entity_id: action.media_player_id,
                    button: action.key,
                });
                break;
            case 'Android TV':
            case 'Apple TV':
            case 'Fire TV':
            case 'Sony BRAVIA':
            case 'Roku':
            case 'Samsung TV':
            case 'Philips TV':
            case 'Jellyfin':
            default: {
                const data = {
                    entity_id: action.remote_id ?? '',
                    command: action.key ?? '',
                };
                if (actionType.includes('hold_action') &&
                    (!this.config.hold_action ||
                        this.config.hold_action.action == 'none')) {
                    data.hold_secs = 1;
                }
                this.hass.callService('remote', 'send_command', data);
                break;
            }
        }
    }
    source(action) {
        switch (action.platform) {
            case 'Unified Remote':
                break;
            case 'Fire TV':
            case 'Roku':
            case 'Kodi':
            case 'Apple TV':
            case 'Samsung TV':
            case 'Philips TV':
            case 'LG webOS':
                this.hass.callService('media_player', 'select_source', {
                    entity_id: action.media_player_id,
                    source: action.source,
                });
                break;
            case 'Sony BRAVIA':
                this.hass.callService('media_player', 'play_media', {
                    entity_id: action.media_player_id,
                    media_content_id: action.source,
                    media_content_type: 'app',
                });
                break;
            case 'Android TV':
            case 'Jellyfin':
            default:
                this.hass.callService('remote', 'turn_on', {
                    entity_id: action.remote_id,
                    activity: action.source,
                });
                break;
        }
    }
    callService(action) {
        const performAction = action.perform_action ??
            action['service'];
        if (!performAction) {
            this.showFailureToast(action.action);
            return;
        }
        const [domain, service] = performAction.split('.');
        this.hass.callService(domain, service, action.data, action.target);
    }
    navigate(action) {
        const path = action.navigation_path;
        if (!path) {
            this.showFailureToast(action.action);
            return;
        }
        if (path.includes('//')) {
            console.error('Protocol detected in navigation path. To navigate to another website use the action "url" with the key "url_path" instead.');
            return;
        }
        const replace = action.navigation_replace ?? false;
        if (replace == true) {
            window.history.replaceState(window.history.state?.root ? { root: true } : null, '', path);
        }
        else {
            window.history.pushState(null, '', path);
        }
        const event = new Event('location-changed', {
            bubbles: false,
            cancelable: true,
            composed: false,
        });
        event.detail = { replace: replace == true };
        window.dispatchEvent(event);
    }
    url(action) {
        let url = action.url_path ?? '';
        if (!url) {
            this.showFailureToast(action.action);
            return;
        }
        if (!url.includes('//')) {
            url = `https://${url}`;
        }
        window.open(url);
    }
    assist(action) {
        this.hassAction(action);
    }
    moreInfo(action) {
        const entityId = action.target?.entity_id ?? this.config.entity_id;
        if (!entityId) {
            this.showFailureToast(action.action);
            return;
        }
        const event = new Event('hass-more-info', {
            bubbles: true,
            cancelable: true,
            composed: true,
        });
        event.detail = { entityId };
        this.dispatchEvent(event);
    }
    toggle(action) {
        const target = {
            ...action.data,
            ...action.target,
        };
        if (!Object.keys(target).length) {
            this.showFailureToast(action.action);
            return;
        }
        if (Array.isArray(target.entity_id)) {
            for (const entityId of target.entity_id) {
                this.toggleSingle(entityId);
            }
        }
        else if (target.entity_id) {
            this.toggleSingle(target.entity_id);
        }
        else {
            this.hass.callService('homeassistant', 'toggle', target);
        }
    }
    toggleSingle(entityId) {
        const turnOn = ['closed', 'locked', 'off'].includes(this.hass.states[entityId].state);
        let domain = entityId.split('.')[0];
        let service;
        switch (domain) {
            case 'lock':
                service = turnOn ? 'unlock' : 'lock';
                break;
            case 'cover':
                service = turnOn ? 'open_cover' : 'close_cover';
                break;
            case 'button':
                service = 'press';
                break;
            case 'input_button':
                service = 'press';
                break;
            case 'scene':
                service = 'turn_on';
                break;
            case 'valve':
                service = turnOn ? 'open_valve' : 'close_valve';
                break;
            default:
                domain = 'homeassistant';
                service = turnOn ? 'turn_on' : 'turn_off';
                break;
        }
        this.hass.callService(domain, service, { entity_id: entityId });
    }
    fireDomEvent(action) {
        const event = new Event(action.event_type ?? 'll-custom', {
            composed: true,
            bubbles: true,
        });
        event.detail = action;
        this.dispatchEvent(event);
    }
    eval(action) {
        eval(action.eval ?? '');
    }
    keyboard(action) {
        const event = new Event('dialog-show', {
            composed: true,
            bubbles: true,
        });
        event.detail = action;
        this.dispatchEvent(event);
    }
    async handleConfirmation(action) {
        if (action.confirmation &&
            (!action.confirmation.exemptions ||
                !action.confirmation.exemptions?.some((e) => e.user == this.hass.user?.id))) {
            let text = action.confirmation.text;
            if (!text) {
                let serviceName;
                const [domain, service] = (action.perform_action ??
                    action['service'] ??
                    '').split('.');
                if (this.hass.services[domain]?.[service]) {
                    const localize = await this.hass.loadBackendTranslation('title');
                    serviceName = `${localize(`component.${domain}.title`) || domain}: ${localize(`component.${domain}.services.${service}.name`) ||
                        this.hass.services[domain][service].name ||
                        service}`;
                }
                text = this.hass.localize('ui.panel.lovelace.cards.actions.action_confirmation', {
                    action: serviceName ??
                        this.hass.localize(`ui.panel.lovelace.editor.action-editor.actions.${action.action}`) ??
                        action.action,
                });
            }
            const event = new Event('hass-action', {
                bubbles: true,
                composed: true,
            });
            event.detail = {
                action: 'tap',
                config: {
                    tap_action: {
                        action: 'fire-dom-event',
                        confirmation: {
                            text,
                        },
                        confirmed: true,
                    },
                },
            };
            this.dispatchEvent(event);
            return new Promise((resolve) => {
                let cancelTimeout;
                const cleanup = () => {
                    clearTimeout(cancelTimeout);
                    window.removeEventListener('ll-custom', confirmTrue);
                    window.removeEventListener('dialog-closed', confirmFalse);
                };
                const confirmTrue = (e) => {
                    if (e.detail.confirmed) {
                        cleanup();
                        resolve(true);
                    }
                };
                window.addEventListener('ll-custom', confirmTrue);
                const confirmFalse = () => {
                    cancelTimeout = setTimeout(() => {
                        cleanup();
                        resolve(false);
                    }, 100);
                };
                window.addEventListener('dialog-closed', confirmFalse);
            });
        }
        return true;
    }
    showFailureToast(action) {
        let suffix = '';
        switch (action) {
            case 'more-info':
                suffix = 'no_entity_more_info';
                break;
            case 'navigate':
                suffix = 'no_navigation_path';
                break;
            case 'url':
                suffix = 'no_url';
                break;
            case 'toggle':
                suffix = 'no_entity_toggle';
                break;
            case 'perform-action':
            case 'call-service':
            default:
                suffix = 'no_action';
                break;
        }
        const event = new Event('hass-notification', {
            bubbles: true,
            composed: true,
        });
        event.detail = {
            message: this.hass.localize(`ui.panel.lovelace.cards.actions.${suffix}`),
        };
        this.dispatchEvent(event);
        this.fireHapticEvent('failure');
    }
    setValue() {
        this.entityId = this.renderTemplate(this.config.entity_id);
        this.unitOfMeasurement =
            this.renderTemplate(this.config.unit_of_measurement) ?? '';
        if (this.getValueFromHass && this.entityId) {
            clearInterval(this.valueUpdateInterval);
            this.valueUpdateInterval = undefined;
            this.valueAttribute = this.renderTemplate(this.config.value_attribute ?? 'state').toLowerCase();
            if (!this.hass.states[this.entityId]) {
                this.value = undefined;
            }
            else if (this.valueAttribute == 'state') {
                this.value = this.hass.states[this.entityId].state;
            }
            else {
                let value;
                const indexMatch = this.valueAttribute.match(/\[\d+\]$/);
                if (indexMatch) {
                    const index = parseInt(indexMatch[0].replace(/\[|\]/g, ''));
                    this.valueAttribute = this.valueAttribute.replace(indexMatch[0], '');
                    value =
                        this.hass.states[this.entityId]?.attributes?.[this.valueAttribute];
                    if (value && Array.isArray(value) && value.length) {
                        value = value[index];
                    }
                    else {
                        value = undefined;
                    }
                }
                else {
                    value =
                        this.hass.states[this.entityId]?.attributes?.[this.valueAttribute];
                }
                if (value != undefined || this.valueAttribute == 'elapsed') {
                    switch (this.valueAttribute) {
                        case 'brightness':
                            this.value = Math.round((100 * parseInt(value ?? 0)) / 255);
                            break;
                        case 'media_position':
                            try {
                                const setIntervalValue = () => {
                                    if (this.hass.states[this.entityId].state == 'playing') {
                                        this.value = Math.min(Math.floor(Math.floor(value) +
                                            (Date.now() -
                                                Date.parse(this.hass.states[this
                                                    .entityId].attributes
                                                    ?.media_position_updated_at)) /
                                                1000), Math.floor(this.hass.states[this.entityId].attributes?.media_duration));
                                    }
                                    else {
                                        this.value = value;
                                    }
                                };
                                setIntervalValue();
                                this.valueUpdateInterval = setInterval(setIntervalValue, 500);
                            }
                            catch (e) {
                                console.error(e);
                                this.value = value;
                            }
                            break;
                        case 'elapsed':
                            if (this.entityId.startsWith('timer.')) {
                                if (this.hass.states[this.entityId]
                                    .state == 'idle') {
                                    this.value = 0;
                                }
                                else {
                                    const durationHMS = this.hass.states[this.entityId].attributes?.duration.split(':');
                                    const durationSeconds = parseInt(durationHMS[0]) * 3600 +
                                        parseInt(durationHMS[1]) * 60 +
                                        parseInt(durationHMS[2]);
                                    const endSeconds = Date.parse(this.hass.states[this.entityId].attributes?.finishes_at);
                                    try {
                                        const setIntervalValue = () => {
                                            if (this.hass.states[this.entityId].state == 'active') {
                                                const remainingSeconds = (endSeconds - Date.now()) /
                                                    1000;
                                                const value = Math.floor(durationSeconds -
                                                    remainingSeconds);
                                                this.value = Math.min(value, durationSeconds);
                                            }
                                            else {
                                                const remainingHMS = this.hass.states[this.entityId].attributes?.remaining.split(':');
                                                const remainingSeconds = parseInt(remainingHMS[0]) *
                                                    3600 +
                                                    parseInt(remainingHMS[1]) *
                                                        60 +
                                                    parseInt(remainingHMS[2]);
                                                this.value = Math.floor(durationSeconds -
                                                    remainingSeconds);
                                            }
                                        };
                                        setIntervalValue();
                                        this.valueUpdateInterval = setInterval(setIntervalValue, 500);
                                    }
                                    catch (e) {
                                        console.error(e);
                                        this.value = 0;
                                    }
                                }
                                break;
                            }
                        default:
                            this.value = value;
                            break;
                    }
                }
                else {
                    this.value = value;
                }
            }
        }
    }
    renderTemplate(str, context) {
        let holdSecs = 0;
        if (this.momentaryStart && this.momentaryEnd) {
            holdSecs = (this.momentaryEnd - this.momentaryStart) / 1000;
        }
        context = {
            value: this.value,
            hold_secs: holdSecs ?? 0,
            unit: this.unitOfMeasurement,
            initialX: this.initialX,
            initialY: this.initialY,
            currentX: this.currentX,
            currentY: this.currentY,
            deltaX: this.deltaX,
            deltaY: this.deltaY,
            config: {
                ...this.config,
                entity: this.entityId,
                attribute: this.valueAttribute,
            },
            ...context,
        };
        context = {
            render: (str2) => this.renderTemplate(str2, context),
            ...context,
        };
        let value = context['value'];
        if (value != undefined &&
            typeof value == 'number' &&
            this.precision != undefined) {
            value = Number(value).toFixed(this.precision);
            context = {
                ...context,
                value: value,
            };
        }
        try {
            return renderTemplate(this.hass, str, context);
        }
        catch (e) {
            console.error(e);
            return '';
        }
    }
    deepRenderTemplate(obj, context) {
        const res = structuredClone(obj);
        const keys = getDeepKeys(res);
        for (const key of keys) {
            const prerendered = deepGet(res, key);
            let rendered = this.renderTemplate(prerendered, context);
            if (typeof prerendered === 'string' &&
                (key.endsWith('data') || key.endsWith('target'))) {
                rendered = load(rendered);
            }
            deepSet(res, key, rendered);
        }
        return res;
    }
    resetGetValueFromHass() {
        const valueFromHassDelay = this.renderTemplate(this.config.value_from_hass_delay ?? UPDATE_AFTER_ACTION_DELAY);
        this.getValueFromHassTimer = setTimeout(() => {
            this.getValueFromHass = true;
            this.requestUpdate();
        }, valueFromHassDelay);
    }
    buildIcon(icon, context) {
        icon = this.renderTemplate(icon ?? '', context);
        let iconElement = html ``;
        if (icon) {
            if (icon.includes(':')) {
                iconElement = html ` <ha-icon .icon="${icon}"></ha-icon> `;
            }
            else {
                const iconConfig = (this.icons ?? []).filter((customIcon) => customIcon.name == icon)[0] ??
                    defaultIcons.filter((defaultIcon) => defaultIcon.name == icon)[0];
                iconElement = html `
					<ha-svg-icon
						.path=${iconConfig?.path ?? icon}
					></ha-svg-icon>
				`;
            }
        }
        return html `<div class="icon">${iconElement}</div>`;
    }
    buildLabel(label, context) {
        const rendered = this.renderTemplate(label, context);
        return rendered ? html `<pre class="label">${rendered}</pre>` : '';
    }
    buildRipple() {
        return html `<md-ripple></md-ripple>`;
    }
    buildStyles(styles, context) {
        const rendered = this.renderTemplate(styles, context);
        return buildStyles(rendered);
    }
    onPointerDown(e) {
        this.pointers++;
        if (!this.initialX && !this.initialY) {
            this.initialX = e.clientX;
            this.initialY = e.clientY;
            this.currentX = e.clientX;
            this.currentY = e.clientY;
            this.deltaX = 0;
            this.deltaY = 0;
        }
    }
    onPointerUp(_e) { }
    onPointerMove(e) {
        if (this.currentX && this.currentY && e.isPrimary) {
            this.deltaX = e.clientX - this.currentX;
            this.deltaY = e.clientY - this.currentY;
            this.currentX = e.clientX;
            this.currentY = e.clientY;
        }
    }
    onPointerCancel(_e) {
        this.endAction();
        this.resetGetValueFromHass();
        this.swiping = true;
    }
    onPointerLeave(e) {
        if (e.pointerType == 'mouse' && this.initialX && this.initialY) {
            this.onPointerCancel(e);
        }
    }
    onContextMenu(e) {
        if (e.pointerType != 'mouse') {
            e.preventDefault();
            e.stopPropagation();
        }
    }
    onTouchStart(e) {
        clearTimeout(this.rippleEndTimer);
        const ripple = this.shadowRoot?.querySelector('md-ripple');
        ripple?.endPressAnimation?.();
        ripple?.startPressAnimation?.(e);
    }
    onTouchEnd(e) {
        e.preventDefault();
        clearTimeout(this.rippleEndTimer);
        const ripple = this.shadowRoot?.querySelector('md-ripple');
        this.rippleEndTimer = setTimeout(() => ripple?.endPressAnimation?.(), 15);
    }
    async onKeyDown(e) {
        if (['Enter', ' '].includes(e.key)) {
            e.preventDefault();
            if (!e.repeat) {
                this.onPointerDown(new window.PointerEvent('pointerdown', {
                    ...e,
                    isPrimary: true,
                    clientX: 1,
                    clientY: 1,
                }));
            }
        }
    }
    async onKeyUp(e) {
        if (['Enter', ' '].includes(e.key)) {
            e.preventDefault();
            if (!e.repeat) {
                this.onPointerUp(new window.PointerEvent('pointerup', {
                    ...e,
                    isPrimary: true,
                    clientX: 1,
                    clientY: 1,
                }));
            }
        }
    }
    firstUpdated() {
        this.addEventListener('touchstart', this.onTouchStart);
        this.addEventListener('touchend', this.onTouchEnd);
        this.addEventListener('keydown', this.onKeyDown);
        this.addEventListener('keyup', this.onKeyUp);
    }
    static get styles() {
        return css `
			:host {
				display: flex;
				flex-flow: column;
				place-content: center space-evenly;
				align-items: center;
				position: relative;
				border: none;
				border-radius: 10px;
				padding: 0px;
				box-sizing: border-box;
				outline: 0px;
				overflow: visible;
				font-size: inherit;
				color: inherit;
				-webkit-tap-highlight-color: transparent;
				-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
			}
			:host(:focus-visible) {
				outline: none;
			}

			md-ripple {
				height: var(--ha-ripple-height, 100%);
				width: var(--ha-ripple-width, 100%);
				top: var(--ha-ripple-top, 0);
				left: var(--ha-ripple-left, 0);

				--md-ripple-hover-opacity: var(--ha-ripple-hover-opacity, 0.08);
				--md-ripple-pressed-opacity: var(
					--ha-ripple-pressed-opacity,
					0.12
				);
				--md-ripple-hover-color: var(
					--ha-ripple-hover-color,
					var(--ha-ripple-color, var(--secondary-text-color))
				);
				--md-ripple-pressed-color: var(
					--ha-ripple-pressed-color,
					var(--ha-ripple-color, var(--secondary-text-color))
				);
			}

			.icon {
				pointer-events: none;
				position: relative;
				flex-flow: column;
				place-content: center;
				display: var(--icon-display, inline-flex);
				transform: var(--icon-transform);
				color: var(--icon-color, var(--primary-text-color));
				filter: var(--icon-filter, none);
				height: var(--size, 48px);
				width: var(--size, 48px);

				--mdc-icon-size: var(--size, 48px);
			}
			ha-icon,
			svg {
				display: inline-flex;
				flex-direction: column;
				justify-content: center;
				text-align: center;
				align-items: center;
				vertical-align: middle;
				height: var(--size, 48px);
				width: var(--size, 48px);
				pointer-events: none;
			}

			.label {
				position: relative;
				pointer-events: none;
				justify-content: center;
				align-items: center;
				height: 15px;
				line-height: 15px;
				width: inherit;
				margin: 0;
				font-family: inherit;
				font-size: 12px;
				font-weight: bold;
				display: var(--label-display, inline-flex);
				transform: var(--label-transform);
				color: var(--label-color, inherit);
				filter: var(--label-filter, none);
			}
		`;
    }
}
__decorate([
    property()
], BaseRemoteElement.prototype, "hass", void 0);
__decorate([
    property()
], BaseRemoteElement.prototype, "config", void 0);
__decorate([
    property()
], BaseRemoteElement.prototype, "icons", void 0);
__decorate([
    state()
], BaseRemoteElement.prototype, "value", void 0);
