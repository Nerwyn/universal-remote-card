import packageInfo from '../package.json';

import { LitElement, PropertyValues, TemplateResult, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { hasTemplate, renderTemplate } from 'ha-nunjucks';
import { load } from 'js-yaml';
import { HomeAssistant, Row } from './models/interfaces';

import {
	ActionTypes,
	DirectionActions,
	IAction,
	IConfig,
	IElementConfig,
	ITarget,
	Platform,
} from './models/interfaces';

import { UniversalRemoteCardEditor } from './universal-remote-card-editor';
import { getDefaultActions } from './utils';

import { BaseRemoteElement } from './classes/base-remote-element';
import './classes/remote-button';
import { RemoteButton } from './classes/remote-button';
import './classes/remote-circlepad';
import './classes/remote-dialog';
import { RemoteDialog } from './classes/remote-dialog';
import './classes/remote-slider';
import './classes/remote-touchpad';
import {
	AUTOFILL,
	DOUBLE_TAP_WINDOW,
	HOLD_TIME,
	NAVIGATION_KEYS,
	REPEAT_DELAY,
} from './models/constants';
import { buildStyles, capitalizeWords } from './utils/styles';

console.info(
	`%c UNIVERSAL-REMOTE-CARD v${packageInfo.version}`,
	'color: white; font-weight: bold; background: green',
);

class UniversalRemoteCard extends LitElement {
	@property() hass!: HomeAssistant;
	@property() config!: IConfig;

	DEFAULT_KEYS: IElementConfig[] = [];
	DEFAULT_SOURCES: IElementConfig[] = [];

	platform?: Platform;
	layout: Row[] = [];
	styles: string = '';

	nRows: number = 0;
	nColumns: number = 0;
	nPads: number = 0;
	editMode: boolean = false;
	rtl: boolean = false;

	customActionsFile: string = '';
	customActionsFromFile?: IElementConfig[];

	static getConfigElement() {
		return document.createElement('universal-remote-card-editor');
	}

	static getStubConfig() {
		return {
			type: 'custom:universal-remote-card',
			rows: [
				['back', 'power', 'home', 'menu'],
				['touchpad', ['volume_buttons']],
				['rewind', 'previous', 'play_pause', 'next', 'fast_forward'],
			],
		};
	}

	getCardSize() {
		let numRows = this.config.rows?.length ?? 0;
		if (this.config.title) {
			numRows += 1;
		}
		return numRows;
	}

	setConfig(config: IConfig) {
		if (!config) {
			throw Error('Invalid configuration');
		}
		this.config = config;
	}

	updateElementConfig(element: IElementConfig) {
		if (!Object.keys(element).length) {
			return element;
		}

		const updatedElement = structuredClone(element);
		const context = {
			config: {
				...this.config,
				entity: this.renderTemplate(
					updatedElement.entity_id ??
						this.config.remote_id ??
						this.config.media_player_id ??
						this.config.keyboard_id ??
						'',
				),
				attribute: this.renderTemplate(
					updatedElement.value_attribute ?? 'state',
				),
			},
		};
		for (const actionType of ActionTypes) {
			if (updatedElement[actionType]) {
				const action = updatedElement[actionType] ?? ({} as IAction);

				switch (this.renderTemplate(action.action, context)) {
					case 'keyboard':
					case 'textbox':
					case 'search':
						action.keyboard_id =
							action.keyboard_id ??
							this.config.keyboard_id ??
							this.config.remote_id ??
							this.config.media_player_id;
					// falls through
					case 'key':
					case 'source':
						action.remote_id =
							action.remote_id ?? this.config.remote_id;
						action.media_player_id =
							action.media_player_id ??
							this.config.media_player_id;
						action.device = action.device ?? this.config.device;
						action.platform =
							action.platform ?? this.config.platform;
						break;
					case 'perform-action': {
						const [domain, _service] = (
							this.renderTemplate(
								action.perform_action ?? '',
								context,
							) as string
						).split('.');
						const target = action.target ?? ({} as ITarget);
						if (
							!target.entity_id &&
							!target.device_id &&
							!target.area_id &&
							!target.label_id
						) {
							const entity = this.renderTemplate(
								updatedElement.entity_id ?? '',
								context,
							) as string;
							switch (domain) {
								case 'remote':
									target.entity_id = entity.startsWith(
										'remote',
									)
										? updatedElement.entity_id
										: this.config.remote_id;
									break;
								case 'media_player':
								case 'androidtv':
								case 'kodi':
								case 'denonavr':
								case 'webostv':
									target.entity_id = entity.startsWith(
										'media_player',
									)
										? updatedElement.entity_id
										: this.config.media_player_id;
									break;
								case 'unified_remote':
									action.data = action.data ?? {};
									action.data.target =
										action.data.target ??
										this.config.device ??
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

		// Set haptics if defined globally
		updatedElement.haptics =
			updatedElement.haptics ?? this.config.haptics ?? true;

		// Set double tap window if defined globally
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

		// Set hold time if defined globally
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

		// Set repeat delay if defined globally
		if (this.config.repeat_delay) {
			if (updatedElement.hold_action?.action == 'repeat') {
				updatedElement.hold_action.repeat_delay =
					updatedElement.hold_action.repeat_delay ??
					this.config.repeat_delay ??
					REPEAT_DELAY;
			}
			if (
				updatedElement.multi_hold_action &&
				updatedElement.multi_hold_action?.action == 'repeat'
			) {
				updatedElement.multi_hold_action.repeat_delay =
					updatedElement.multi_hold_action.repeat_delay ??
					this.config.repeat_delay ??
					REPEAT_DELAY;
			}
		}

		// Set element entity
		const elementType = this.renderTemplate(updatedElement.type, context);
		if (
			elementType == 'slider' &&
			this.renderTemplate(updatedElement.name, context) == 'slider'
		) {
			updatedElement.entity_id =
				updatedElement.entity_id ?? this.config.media_player_id;
		} else {
			updatedElement.entity_id =
				updatedElement.entity_id ??
				(Array.isArray(updatedElement.tap_action?.target?.entity_id)
					? updatedElement.tap_action?.target?.entity_id?.[0]
					: (updatedElement.tap_action?.target
							?.entity_id as string)) ??
				this.config.remote_id ??
				this.config.media_player_id ??
				this.config.keyboard_id;
		}

		// Update circlepad and touchpad directions
		if (['circlepad', 'touchpad'].includes(elementType as string)) {
			for (const direction of DirectionActions) {
				const directionElement = (updatedElement[direction] ??
					{}) as IElementConfig;
				directionElement.entity_id = updatedElement.entity_id;
				directionElement.value_attribute =
					updatedElement.value_attribute;
				updatedElement[direction] =
					this.updateElementConfig(directionElement);
			}
		}

		// Add parent card config to element config for templating
		updatedElement.card = this.config;

		return updatedElement;
	}

	getElementConfig(name: string): IElementConfig {
		const customActionsList = [
			...(this.config.custom_actions ?? []),
			...(this.customActionsFromFile ?? []),
		];
		const customActions = customActionsList.find(
			(customActions) => customActions.name == name,
		);
		if (customActions) {
			if (
				customActions.autofill_entity_id ??
				this.config.autofill_entity_id ??
				AUTOFILL
			) {
				return this.updateElementConfig(customActions);
			}
			return customActions;
		}

		const defaultActions = this.updateElementConfig(
			this.DEFAULT_KEYS.find((defaultKeys) => defaultKeys.name == name) ??
				this.DEFAULT_SOURCES.find(
					(defaultSources) => defaultSources.name == name,
				) ??
				({} as IElementConfig),
		);
		return structuredClone(defaultActions);
	}

	renderTemplate(
		str: string | number | boolean,
		context?: object,
	): string | number | boolean {
		if (!hasTemplate(str)) {
			return str;
		}

		context = {
			config: this.config,
			...context,
		};

		context = {
			render: (str2: string) => this.renderTemplate(str2, context),
			...context,
		};

		try {
			return renderTemplate(this.hass, str as string, context, false);
		} catch (e) {
			console.error(e);
			return '';
		}
	}

	buildRow(content: TemplateResult[]): TemplateResult {
		this.nRows++;
		const id = `row-${this.nRows}`;
		return html`
			<div
				class="row"
				id="${id}"
				title="${this.editMode ? `#${id}` : ''}"
			>
				${content}
			</div>
		`;
	}

	buildColumn(content: TemplateResult[]): TemplateResult {
		this.nColumns++;
		const id = `column-${this.nColumns}`;
		return html`
			<div
				class="column"
				id="${id}"
				title="${this.editMode ? `#${id}` : ''}"
			>
				${content}
			</div>
		`;
	}

	buildPad(buttons: string[]): TemplateResult {
		this.nPads++;
		const id = `pad-${this.nPads}`;
		// prettier-ignore
		return html`
			<div
				class="button-pad"
				id="${id}"
				title="${this.editMode ? `#${id}` : ''}"
			>
				${buttons.map((b) => this.buildButton(b, this.getElementConfig(b)))}
			</div>
		`;
	}

	buildButton(elementName: string, actions: IElementConfig): TemplateResult {
		if (!Object.keys(actions).length) {
			return html`<div class="empty-button"></div>`;
		}
		return html`<remote-button
			id="${elementName}"
			title="${capitalizeWords(elementName)}"
			.hass=${this.hass}
			.config=${actions}
			.icons=${this.config.custom_icons}
		></remote-button>`;
	}

	buildSlider(elementName: string, actions: IElementConfig): TemplateResult {
		return html`<remote-slider
			id="${elementName}"
			title="${capitalizeWords(elementName)}"
			.hass=${this.hass}
			.config=${actions}
			.icons=${this.config.custom_icons}
		></remote-slider>`;
	}

	buildTouchpad(
		elementName: string,
		actions: IElementConfig,
	): TemplateResult {
		return html`<remote-touchpad
			id="${elementName}"
			title="${capitalizeWords(elementName)}"
			.hass=${this.hass}
			.config=${actions}
			.icons=${this.config.custom_icons}
		></remote-touchpad>`;
	}

	buildCirclepad(
		elementName: string,
		actions: IElementConfig,
	): TemplateResult {
		return html`<remote-circlepad
			id="${elementName}"
			title="${capitalizeWords(elementName)}"
			.hass=${this.hass}
			.config=${actions}
			.icons=${this.config.custom_icons}
		></remote-touchpad>`;
	}

	buildVolumeButtons(): TemplateResult[] {
		return [
			this.buildButton(
				'volume_down',
				this.getElementConfig('volume_down'),
			),
			this.buildButton(
				'volume_mute',
				this.getElementConfig('volume_mute'),
			),
			this.buildButton('volume_up', this.getElementConfig('volume_up')),
		];
	}

	buildNavButtons(): TemplateResult {
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

	buildLayout(row: Row, context: object = {}): Row {
		const layout: Row = [];
		if (typeof row == 'string') {
			row = [row];
		}
		for (let elementName of row) {
			elementName = this.renderTemplate(
				elementName as string,
				context,
			) as string;

			if (typeof elementName == 'string' && elementName.includes('- ')) {
				elementName = [load(elementName) as string];
			}
			if (typeof elementName == 'object' && elementName != null) {
				layout.push(this.buildLayout(elementName, context));
			} else {
				layout.push(elementName);
			}
		}
		return layout;
	}

	buildElements(row: Row, isColumn: boolean = false, context: object = {}) {
		if (typeof row == 'string') {
			row = [row];
		}
		const rowContent: TemplateResult[] = [];
		for (let elementName of row) {
			if (typeof elementName == 'object' && elementName != null) {
				rowContent.push(
					this.buildElements(elementName, !isColumn, context),
				);
			} else {
				// Special shortcuts
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
						rowContent.push(
							this.buildPad([
								'',
								'up',
								'',
								'left',
								'center',
								'right',
								'',
								'down',
								'',
							]),
						);
						break;
					case 'numpad':
						rowContent.push(
							this.buildPad([
								'n7',
								'n8',
								'n9',
								'n4',
								'n5',
								'n6',
								'n1',
								'n2',
								'n3',
							]),
						);
						break;
					case 'xpad':
						rowContent.push(
							this.buildPad([
								'',
								'y',
								'',
								'x',
								'',
								'b',
								'',
								'a',
								'',
							]),
						);
						break;
					case 'npad':
						rowContent.push(
							this.buildPad([
								'',
								'x',
								'',
								'y',
								'',
								'a',
								'',
								'b',
								'',
							]),
						);
						break;
					default: {
						const actions = this.getElementConfig(elementName);
						switch (actions.type) {
							case 'slider':
								rowContent.push(
									this.buildSlider(elementName, actions),
								);
								break;
							case 'touchpad':
								rowContent.push(
									this.buildTouchpad(elementName, actions),
								);
								break;
							case 'circlepad':
								rowContent.push(
									this.buildCirclepad(elementName, actions),
								);
								break;
							case 'button':
							default:
								rowContent.push(
									this.buildButton(elementName, actions),
								);
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
		return html`<remote-dialog .hass=${this.hass}></remote-dialog>`;
	}

	fetchCustomActionsFromFile(filename?: string) {
		if (filename) {
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
						} else {
							throw TypeError(json);
						}
					});
			} catch (e) {
				console.error(
					`File ${filename} is not a valid JSON or YAML array\n${e}`,
				);
				this.customActionsFromFile = [];
			}
		} else {
			this.customActionsFromFile = [];
		}
	}

	getContext() {
		return {
			config: {
				...this.config,
				entity: this.renderTemplate(
					this.config.remote_id ??
						this.config.media_player_id ??
						this.config.keyboard_id ??
						'',
				),
				attribute: 'state',
			},
		};
	}

	render() {
		if (!this.config || !this.hass) {
			return html``;
		}

		const context = this.getContext();
		const content: TemplateResult[] = [];
		for (const row of this.layout ?? []) {
			const rowContent = this.buildElements(
				row as string[],
				false,
				context,
			);
			content.push(rowContent);
		}

		return html`<ha-card
			class="${this.editMode ? ' edit-mode' : ''}"
			tabindex="0"
			@keydown=${this.onKey}
			@keyup=${this.onKey}
			.header="${this.renderTemplate(
				this.config.title as string,
				context,
			)}"
		>
			${content}${this.buildDialog()}${buildStyles(this.styles)}
		</ha-card>`;
	}

	showDialog(e: Event) {
		const dialog = this.shadowRoot?.querySelector(
			'remote-dialog',
		) as RemoteDialog;
		dialog.showDialog(e.detail);
	}

	willUpdate() {
		this.editMode = Boolean(
			document
				.querySelector('home-assistant')
				?.shadowRoot?.querySelector('hui-dialog-edit-card')
				?.shadowRoot?.querySelector('ha-dialog'),
		);

		this.rtl = getComputedStyle(this).direction == 'rtl';
		if (this.rtl) {
			this.setAttribute('dir', 'rtl');
		}

		this.nRows = 0;
		this.nColumns = 0;
		this.nPads = 0;
	}

	shouldUpdate(changedProperties: PropertyValues) {
		if (changedProperties.has('hass')) {
			const context = this.getContext();

			const platform = this.renderTemplate(
				this.config.platform ?? 'Android TV',
				context,
			) as Platform;

			const layout = this.buildLayout(
				(this.config.rows as Row) ?? [],
				context,
			);

			const styles = this.renderTemplate(
				this.config.styles as string,
				context,
			);

			const customActionsFile = this.renderTemplate(
				this.config.custom_actions_file ?? '',
				context,
			) as string;

			if (
				this.platform != platform ||
				this.styles != styles ||
				this.customActionsFile != customActionsFile ||
				JSON.stringify(this.layout) != JSON.stringify(layout)
			) {
				if (this.platform != platform) {
					this.platform = platform;
					[this.DEFAULT_KEYS, this.DEFAULT_SOURCES] =
						getDefaultActions(platform);
				}

				if (this.customActionsFile != customActionsFile) {
					this.customActionsFile = customActionsFile;
					this.fetchCustomActionsFromFile(customActionsFile);
				}

				this.layout = layout as Row[];
				this.styles = styles as string;
				return true;
			}
		}

		if (changedProperties.has('config')) {
			if (
				JSON.stringify(this.config) !=
				JSON.stringify(changedProperties.get('config'))
			) {
				return true;
			}
		}

		// Explicitly requested update
		if (changedProperties.size == 0) {
			return true;
		}

		// Update child hass objects if not updating
		const children = (this.shadowRoot?.querySelectorAll(
			'remote-button, remote-slider, remote-circlepad, remote-touchpad, remote-dialog',
		) ?? []) as BaseRemoteElement[];
		for (const child of children) {
			child.hass = this.hass;
		}

		return false;
	}

	firstUpdated() {
		this.addEventListener('dialog-show', this.showDialog);
	}

	async onKey(e: KeyboardEvent) {
		if (this.shadowRoot?.querySelector('remote-dialog[open]')) {
			return;
		}

		const button = this.shadowRoot?.querySelector(
			`[key="${e.key}"]`,
		) as RemoteButton;
		const direction = e.type == 'keydown' ? 'Down' : 'Up';
		if (button) {
			e.preventDefault();
			e.stopImmediatePropagation();
			if (!e.repeat) {
				e.preventDefault();
				await button[`onPointer${direction}`](
					new window.PointerEvent(
						`pointer${direction.toLowerCase()}`,
						{
							...e,
							isPrimary: true,
							clientX: 1,
							clientY: 1,
						},
					),
				);
			}
			return;
		}

		if (NAVIGATION_KEYS.includes(e.key)) {
			e.preventDefault();
			e.stopImmediatePropagation();
			if (!e.repeat) {
				for (const type of ['circlepad', 'touchpad']) {
					const element = this.shadowRoot?.querySelector(
						`remote-${type}`,
					) as BaseRemoteElement;
					if (element) {
						await element.onKey(
							new window.KeyboardEvent(e.type, {
								...e,
								key: e.key,
								shiftKey: e.shiftKey,
							}),
						);
						return;
					}
				}
			}
		}
	}

	static get styles() {
		return css`
			ha-card {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 12px;

				-webkit-tap-highlight-color: transparent;
				-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
			}

			.row,
			.column {
				display: flex;
				flex-wrap: nowrap;
				width: -moz-available;
				width: -webkit-fill-available;
				width: fill-available;
				flex: 1;
				padding: 4px;
				gap: 8px;
				justify-content: space-evenly;
				align-items: center;
			}
			.row {
				flex-direction: row;
			}
			.column {
				flex-direction: column;
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

			.edit-mode {
				outline: none;
			}
			@media (hover: hover) {
				.edit-mode :hover:not(:has(div:hover)) {
					outline: 1px dashed var(--red-color);
				}
			}
		`;
	}
}

customElements.define(
	'universal-remote-card-editor',
	UniversalRemoteCardEditor,
);
customElements.define('universal-remote-card', UniversalRemoteCard);
customElements.define(
	'android-tv-card',
	class AndroidTVCard extends UniversalRemoteCard {},
); // Keep old name to not break old configs

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
	window.performance = window.Date as unknown as Performance;
}
