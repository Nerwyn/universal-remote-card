var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import packageInfo from '../package.json';
import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { renderTemplate } from 'ha-nunjucks';
import { load } from 'js-yaml';
import { ActionTypes, DirectionActions, } from './models/interfaces';
import { UniversalRemoteCardEditor } from './universal-remote-card-editor';
import { getDefaultActions } from './utils';
import './classes/remote-button';
import './classes/remote-dialog';
import './classes/remote-slider';
import './classes/remote-touchpad';
import { AUTOFILL, DOUBLE_TAP_WINDOW, HOLD_TIME, REPEAT_DELAY, } from './models/constants';
import { buildStyles } from './utils/styles';
console.info(`%c UNIVERSAL-REMOTE-CARD v${packageInfo.version}`, 'color: white; font-weight: bold; background: green');
class UniversalRemoteCard extends LitElement {
    constructor() {
        super(...arguments);
        this.DEFAULT_ACTIONS = [];
        this.nRows = 0;
        this.nColumns = 0;
        this.nPads = 0;
        this.editMode = false;
        this.rtl = false;
    }
    static get properties() {
        return {
            hass: {},
            config: {},
        };
    }
    static getConfigElement() {
        return document.createElement('universal-remote-card-editor');
    }
    static getStubConfig() {
        return {
            type: 'custom:universal-remote-card',
            rows: [],
        };
    }
    getCardSize() {
        let numRows = this.config.rows?.length ?? 0;
        if (this.config.title) {
            numRows += 1;
        }
        return numRows;
    }
    async setConfig(config) {
        if (!config) {
            throw new Error('Invalid configuration');
        }
        this.config = config;
    }
    updateElementConfig(element) {
        if (!Object.keys(element).length) {
            return element;
        }
        const updatedElement = structuredClone(element);
        const context = {
            config: {
                ...this.config,
                entity: this.renderTemplate(updatedElement.entity_id ??
                    this.config.remote_id ??
                    this.config.media_player_id ??
                    this.config.keyboard_id ??
                    ''),
                attribute: this.renderTemplate(updatedElement.value_attribute ?? 'state'),
            },
        };
        for (const actionType of ActionTypes) {
            if (updatedElement[actionType]) {
                const action = updatedElement[actionType] ?? {};
                switch (this.renderTemplate(action.action, context)) {
                    case 'keyboard':
                    case 'textbox':
                    case 'search':
                        action.keyboard_id =
                            action.keyboard_id ?? this.config.keyboard_id;
                    case 'key':
                    case 'source':
                        action.remote_id =
                            action.remote_id ?? this.config.remote_id;
                        action.media_player_id =
                            action.media_player_id ??
                                this.config.media_player_id;
                        action.platform =
                            action.platform ?? this.config.platform;
                        break;
                    case 'perform-action': {
                        const [domain, _service] = this.renderTemplate(action.perform_action ?? '', context).split('.');
                        const target = action.target ?? {};
                        if (!target.entity_id &&
                            !target.device_id &&
                            !target.area_id &&
                            !target.label_id) {
                            const entity = this.renderTemplate(updatedElement.entity_id ?? '', context);
                            switch (domain) {
                                case 'remote':
                                    target.entity_id = entity.startsWith('remote')
                                        ? updatedElement.entity_id
                                        : this.config.remote_id;
                                    break;
                                case 'media_player':
                                case 'androidtv':
                                case 'kodi':
                                case 'denonavr':
                                case 'webostv':
                                    target.entity_id = entity.startsWith('media_player')
                                        ? updatedElement.entity_id
                                        : this.config.media_player_id;
                                    break;
                                case 'unified_remote':
                                    action.data = action.data ?? {};
                                    action.data.target =
                                        action.data.target ??
                                            updatedElement.entity_id ??
                                            this.config.remote_id ??
                                            this.config.media_player_id ??
                                            this.config.keyboard_id;
                                    break;
                                default:
                                    target.entity_id = updatedElement.entity_id;
                                    break;
                            }
                        }
                        action.target = target;
                        break;
                    }
                    default:
                        break;
                }
                updatedElement[actionType] = action;
            }
        }
        updatedElement.haptics =
            updatedElement.haptics ?? this.config.haptics ?? true;
        if (this.config.double_tap_window) {
            if (updatedElement.double_tap_action) {
                updatedElement.double_tap_action.double_tap_window =
                    updatedElement.double_tap_action?.double_tap_window ??
                        this.config.double_tap_window ??
                        DOUBLE_TAP_WINDOW;
            }
            if (updatedElement.multi_double_tap_action) {
                updatedElement.multi_double_tap_action.double_tap_window =
                    updatedElement.multi_double_tap_action.double_tap_window ??
                        this.config.double_tap_window ??
                        DOUBLE_TAP_WINDOW;
            }
        }
        if (this.config.hold_time) {
            if (updatedElement.hold_action) {
                updatedElement.hold_action.hold_time =
                    updatedElement.hold_action?.hold_time ??
                        this.config.hold_time ??
                        HOLD_TIME;
            }
            if (updatedElement.multi_hold_action) {
                updatedElement.multi_hold_action.hold_time =
                    updatedElement.multi_hold_action?.hold_time ??
                        this.config.hold_time ??
                        HOLD_TIME;
            }
        }
        if (this.config.repeat_delay) {
            if (updatedElement.hold_action?.action == 'repeat') {
                updatedElement.hold_action.repeat_delay =
                    updatedElement.hold_action.repeat_delay ??
                        this.config.repeat_delay ??
                        REPEAT_DELAY;
            }
            if (updatedElement.multi_hold_action &&
                updatedElement.multi_hold_action?.action == 'repeat') {
                updatedElement.multi_hold_action.repeat_delay =
                    updatedElement.multi_hold_action.repeat_delay ??
                        this.config.repeat_delay ??
                        REPEAT_DELAY;
            }
        }
        const elementType = this.renderTemplate(updatedElement.type, context);
        if (elementType == 'slider' &&
            this.renderTemplate(updatedElement.name, context) == 'slider') {
            updatedElement.entity_id =
                updatedElement.entity_id ?? this.config.media_player_id;
        }
        else {
            updatedElement.entity_id =
                updatedElement.entity_id ??
                    (Array.isArray(updatedElement.tap_action?.target?.entity_id)
                        ? updatedElement.tap_action?.target?.entity_id?.[0]
                        : updatedElement.tap_action?.target
                            ?.entity_id) ??
                    this.config.remote_id ??
                    this.config.media_player_id ??
                    this.config.keyboard_id;
        }
        if (elementType == 'touchpad') {
            for (const direction of DirectionActions) {
                const directionElement = (updatedElement[direction] ??
                    {});
                directionElement.entity_id = updatedElement.entity_id;
                directionElement.value_attribute =
                    updatedElement.value_attribute;
                updatedElement[direction] =
                    this.updateElementConfig(directionElement);
            }
        }
        updatedElement.card = this.config;
        return updatedElement;
    }
    getElementConfig(name) {
        const customActionsList = [
            ...(this.config.custom_actions ?? []),
            ...(this.customActionsFromFile ?? []),
        ];
        const customActions = customActionsList.filter((customActions) => customActions.name == name)[0];
        if (customActions) {
            if (customActions.autofill_entity_id ??
                this.config.autofill_entity_id ??
                AUTOFILL) {
                return this.updateElementConfig(customActions);
            }
            return customActions;
        }
        const defaultActions = this.updateElementConfig(this.DEFAULT_ACTIONS.filter((defaultActions) => defaultActions.name == name)[0] ?? {});
        return defaultActions;
    }
    renderTemplate(str, context) {
        context = {
            render: (str2) => this.renderTemplate(str2, context),
            ...context,
        };
        try {
            const res = renderTemplate(this.hass, str, context);
            if (res != str) {
                return res;
            }
        }
        catch (e) {
            console.error(e);
            return '';
        }
        return str;
    }
    buildRow(content) {
        this.nRows++;
        const id = `row-${this.nRows}`;
        return html `
			<div
				class="row"
				id="${id}"
				title="${this.editMode ? `#${id}` : ''}"
			>
				${content}
			</div>
		`;
    }
    buildColumn(content) {
        this.nColumns++;
        const id = `column-${this.nColumns}`;
        return html `
			<div
				class="column"
				id="${id}"
				title="${this.editMode ? `#${id}` : ''}"
			>
				${content}
			</div>
		`;
    }
    buildPad(buttons) {
        this.nPads++;
        const id = `pad-${this.nPads}`;
        return html `
			<div
				class="button-pad"
				id="${id}"
				title="${this.editMode ? `#${id}` : ''}"
			>
				${buttons.map((b) => this.buildButton(b, this.getElementConfig(b)))}
			</div>
		`;
    }
    buildButton(elementName, actions) {
        if (!Object.keys(actions).length) {
            return html `<div class="empty-button"></div>`;
        }
        return html `<remote-button
			title="${elementName}"
			.hass=${this.hass}
			.config=${actions}
			.icons=${this.config.custom_icons}
		></remote-button>`;
    }
    buildSlider(elementName, actions) {
        return html `<remote-slider
			title="${elementName}"
			.hass=${this.hass}
			.config=${actions}
			.icons=${this.config.custom_icons}
		></remote-slider>`;
    }
    buildTouchpad(elementName, actions) {
        return html `<remote-touchpad
			title="${elementName}"
			.hass=${this.hass}
			.config=${actions}
			.icons=${this.config.custom_icons}
		></remote-touchpad>`;
    }
    buildVolumeButtons() {
        return [
            this.buildButton('volume_down', this.getElementConfig('volume_down')),
            this.buildButton('volume_mute', this.getElementConfig('volume_mute')),
            this.buildButton('volume_up', this.getElementConfig('volume_up')),
        ];
    }
    buildNavButtons() {
        const centerRow = [
            this.buildButton('left', this.getElementConfig('left')),
            this.buildButton('center', this.getElementConfig('center')),
            this.buildButton('right', this.getElementConfig('right')),
        ];
        if (this.rtl) {
            centerRow.reverse();
        }
        return this.buildColumn([
            this.buildRow([
                this.buildButton('up', this.getElementConfig('up')),
            ]),
            this.buildRow(centerRow),
            this.buildRow([
                this.buildButton('down', this.getElementConfig('down')),
            ]),
        ]);
    }
    buildElements(row, isColumn = false, context = {}) {
        if (typeof row == 'string') {
            row = [row];
        }
        const rowContent = [];
        for (let elementName of row) {
            elementName = this.renderTemplate(elementName, context);
            if (typeof elementName == 'string' && elementName.includes('- ')) {
                elementName = load(elementName);
            }
            if (typeof elementName == 'object' && elementName != null) {
                rowContent.push(this.buildElements(elementName, !isColumn, context));
            }
            else {
                switch (elementName) {
                    case 'volume_buttons': {
                        const volumeButtons = this.buildVolumeButtons();
                        if (isColumn) {
                            volumeButtons.reverse();
                        }
                        rowContent.push(...volumeButtons);
                        break;
                    }
                    case 'navigation_buttons':
                        rowContent.push(this.buildNavButtons());
                        break;
                    case 'dpad':
                        rowContent.push(this.buildPad([
                            '',
                            'up',
                            '',
                            'left',
                            'center',
                            'right',
                            '',
                            'down',
                            '',
                        ]));
                        break;
                    case 'numpad':
                        rowContent.push(this.buildPad([
                            'n7',
                            'n8',
                            'n9',
                            'n4',
                            'n5',
                            'n6',
                            'n1',
                            'n2',
                            'n3',
                        ]));
                        break;
                    case 'xpad':
                        rowContent.push(this.buildPad([
                            '',
                            'y',
                            '',
                            'x',
                            '',
                            'b',
                            '',
                            'a',
                            '',
                        ]));
                        break;
                    case 'npad':
                        rowContent.push(this.buildPad([
                            '',
                            'x',
                            '',
                            'y',
                            '',
                            'a',
                            '',
                            'b',
                            '',
                        ]));
                        break;
                    default: {
                        const actions = this.getElementConfig(elementName);
                        switch (actions.type) {
                            case 'slider':
                                rowContent.push(this.buildSlider(elementName, actions));
                                break;
                            case 'touchpad':
                                rowContent.push(this.buildTouchpad(elementName, actions));
                                break;
                            case 'button':
                            default:
                                rowContent.push(this.buildButton(elementName, actions));
                                break;
                        }
                        break;
                    }
                }
            }
        }
        return isColumn
            ? this.buildColumn(rowContent)
            : this.buildRow(rowContent);
    }
    buildDialog() {
        return html `<remote-dialog .hass=${this.hass}></remote-dialog>`;
    }
    buildStyles(styles, context) {
        const rendered = this.renderTemplate(styles, context);
        return buildStyles(rendered);
    }
    fetchCustomActionsFromFile(filename) {
        if (!this.customActionsFromFile && filename) {
            filename = `${filename.startsWith('/') ? '' : '/'}${filename}`;
            try {
                const extension = filename.split('.').pop()?.toLowerCase();
                this.hass
                    .fetchWithAuth(filename)
                    .then((r1) => (extension == 'json' ? r1.json() : r1.text()))
                    .then((r2) => {
                    const json = extension == 'json' ? r2 : load(r2);
                    if (Array.isArray(json)) {
                        this.customActionsFromFile = json;
                        this.requestUpdate();
                    }
                    else {
                        throw TypeError(json);
                    }
                });
            }
            catch (e) {
                console.error(`File ${filename} is not a valid JSON or YAML array\n${e}`);
                this.customActionsFromFile = [];
            }
        }
    }
    render() {
        if (!this.config || !this.hass) {
            return html ``;
        }
        const context = {
            config: {
                ...this.config,
                entity: this.renderTemplate(this.config.remote_id ??
                    this.config.media_player_id ??
                    this.config.keyboard_id ??
                    ''),
                attribute: 'state',
            },
        };
        this.fetchCustomActionsFromFile(this.renderTemplate(this.config.custom_actions_file ?? ''));
        this.editMode = Boolean(document
            .querySelector('home-assistant')
            ?.shadowRoot?.querySelector('hui-dialog-edit-card')
            ?.shadowRoot?.querySelector('ha-dialog'));
        this.rtl = getComputedStyle(this).direction == 'rtl';
        const platform = this.renderTemplate(this.config.platform ?? 'Android TV', context);
        const [defaultKeys, defaultSources] = getDefaultActions(platform);
        this.DEFAULT_ACTIONS = [...defaultKeys, ...defaultSources];
        const content = [];
        this.nRows = 0;
        this.nColumns = 0;
        this.nPads = 0;
        for (const row of this.config.rows ?? []) {
            const rowContent = this.buildElements(row, false, context);
            content.push(rowContent);
        }
        return html `<ha-card
			class="${this.editMode ? ' edit-mode' : ''}"
			.header="${this.renderTemplate(this.config.title, context)}"
			>${content}${this.buildDialog()}${this.buildStyles(this.config.styles, context)}</ha-card
		>`;
    }
    showDialog(e) {
        const dialog = this.shadowRoot?.querySelector('remote-dialog');
        dialog.showDialog(e.detail);
    }
    firstUpdated() {
        this.addEventListener('dialog-show', this.showDialog);
    }
    static get styles() {
        return css `
			ha-card {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 12px;

				-webkit-tap-highlight-color: transparent;
				-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
			}

			.row {
				display: flex;
				flex-wrap: nowrap;
				flex-direction: row;
				width: -moz-available;
				width: -webkit-fill-available;
				width: fill-available;
				flex: 1;
				padding: 4px;
				gap: 8px;
				justify-content: space-evenly;
				align-items: center;
			}
			.column {
				display: flex;
				flex-wrap: nowrap;
				flex-direction: column;
				width: -moz-available;
				width: -webkit-fill-available;
				width: fill-available;
				flex: 1;
				padding: 4px;
				justify-content: space-evenly;
				align-items: center;
			}
			.edit-mode {
				outline: none;
			}
			@media (hover: hover) {
				.edit-mode :hover:not(:has(div:hover)) {
					outline: 1px dashed var(--red-color);
				}
			}

			.empty-button {
				width: var(--size, 48px);
				height: var(--size, 48px);
				position: relative;
			}
			.button-pad {
				display: grid;
				direction: ltr;
				grid-template-rows: repeat(3, var(--size, 48px));
				grid-template-columns: repeat(3, var(--size, 48px));
				grid-gap: 8px 16px;
			}
		`;
    }
}
__decorate([
    property()
], UniversalRemoteCard.prototype, "hass", void 0);
__decorate([
    property()
], UniversalRemoteCard.prototype, "config", void 0);
customElements.define('universal-remote-card-editor', UniversalRemoteCardEditor);
customElements.define('universal-remote-card', UniversalRemoteCard);
customElements.define('android-tv-card', class AndroidTVCard extends UniversalRemoteCard {
});
window.customCards = window.customCards || [];
window.customCards.push({
    type: 'universal-remote-card',
    name: 'Universal Remote Card',
    description: 'Super customizable universal remote card',
});
if (!window.structuredClone) {
    window.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}
if (!window.performance) {
    window.performance = window.Date;
}
