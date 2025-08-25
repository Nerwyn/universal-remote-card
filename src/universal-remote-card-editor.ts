import { hasTemplate, renderTemplate } from 'ha-nunjucks';
import { LitElement, TemplateResult, css, html } from 'lit';
import { property, state } from 'lit/decorators.js';

import { dump, load } from 'js-yaml';
import {
	ADBKeyboardPlatforms,
	Action,
	DevicePlatforms,
	HomeAssistant,
	MediaPlayerPlatforms,
	RemotePlatforms,
	SearchPlatforms,
} from './models/interfaces';

import {
	AUTOFILL,
	DOUBLE_TAP_WINDOW,
	HAPTICS,
	HOLD_TIME,
	RANGE_MAX,
	RANGE_MIN,
	REPEAT_DELAY,
	STEP,
	STEP_COUNT,
	UPDATE_AFTER_ACTION_DELAY,
} from './models/constants';
import {
	ActionType,
	ActionTypes,
	Actions,
	DirectionAction,
	DirectionActions,
	IAction,
	IBasicActions,
	IConfig,
	IData,
	IElementConfig,
	IIconConfig,
	ITarget,
	KeyboardPlatform,
	KeyboardPlatforms,
	Platform,
	Platforms,
	RemoteElementType,
	RemoteElementTypes,
	Row,
} from './models/interfaces';
import { defaultIcons } from './models/maps';
import { deepGet, deepSet, getDefaultActions, mergeDeep } from './utils';
import { capitalizeWords } from './utils/styles';

export class UniversalRemoteCardEditor extends LitElement {
	@property() hass!: HomeAssistant;
	@property() config!: IConfig;

	@state() baseTabIndex: number = 0;
	@state() entryIndex: number = -1;
	@state() actionsTabIndex: number = 0;
	@state() directionTabIndex: number = 2;

	@state() guiMode: boolean = true;
	@state() errors?: string[];

	yamlString?: string;
	yamlStringsCache: Record<string, string> = {};
	people: Record<string, string>[] = [];

	BASE_TABS = ['general', 'layout', 'elements', 'icons'];
	DIRECTION_TABS = ['up', 'down', 'center', 'left', 'right'];
	ACTION_TABS = ['default', 'momentary'];

	PLATFORM?: Platform;
	DEFAULT_KEYS: IElementConfig[] = [];
	DEFAULT_SOURCES: IElementConfig[] = [];

	customActionsFromFile?: IElementConfig[];

	static get properties() {
		return { hass: {}, config: {} };
	}

	setConfig(config: IConfig) {
		this.config = config;
	}

	configChanged(config: IConfig) {
		config = this.autofillDefaultFields(config);
		const event = new Event('config-changed', {
			bubbles: true,
			composed: true,
		});
		event.detail = {
			config: config,
		};
		this.dispatchEvent(event);
		this.requestUpdate();
	}

	entriesChanged(entries: IElementConfig[] | IIconConfig[]) {
		let key;
		switch (this.baseTabIndex) {
			case 3:
				key = 'custom_icons';
				break;
			case 2:
			default:
				key = 'custom_actions';
				break;
		}

		this.configChanged({
			...this.config,
			[key]: entries,
		} as IConfig);
	}

	entryChanged(entry: IElementConfig) {
		let entries: IElementConfig[] | IIconConfig[];
		let oldEntry: IElementConfig | IIconConfig;
		let updatedEntry: IElementConfig | IIconConfig;
		switch (this.baseTabIndex) {
			case 3:
				entries = structuredClone(this.config.custom_icons ?? []);
				updatedEntry = entry;
				break;
			case 2:
			default:
				entries = structuredClone(this.config.custom_actions ?? []);
				oldEntry = entries[this.entryIndex] as IElementConfig;
				switch (
					this.renderTemplate(
						oldEntry?.type,
						this.getEntryContext(oldEntry),
					)
				) {
					case 'touchpad':
					case 'circlepad':
						if (this.directionTabIndex != 2) {
							updatedEntry = {
								...oldEntry,
								[this.DIRECTION_TABS[this.directionTabIndex]]:
									entry,
							};
							break;
						}
					// falls through
					case 'slider':
					case 'button':
					default:
						updatedEntry = entry;
				}
				break;
		}

		entries[this.entryIndex] = updatedEntry;
		this.entriesChanged(entries);
	}

	toggleGuiMode(_e: Event) {
		this.yamlString = undefined;
		this.configChanged(this.config);
		this.guiMode = !this.guiMode;
	}

	get activeEntry(): IElementConfig | IIconConfig | undefined {
		if (this.entryIndex < 0) {
			return undefined;
		}
		let entry: IElementConfig | IIconConfig;
		switch (this.baseTabIndex) {
			case 3:
				return (this.config.custom_icons ?? [])[this.entryIndex];
			case 2:
			default:
				entry = (this.config.custom_actions ?? [])[this.entryIndex];
				switch (
					this.renderTemplate(
						entry?.type,
						this.getEntryContext(entry),
					)
				) {
					case 'touchpad':
					case 'circlepad':
						if (this.directionTabIndex != 2) {
							return (
								(entry[
									this.DIRECTION_TABS[
										this.directionTabIndex
									] as DirectionAction
								] as IElementConfig) ?? {}
							);
						}
					// falls through
					case 'slider':
					case 'button':
					default:
						return entry;
				}
		}
	}

	get yaml(): string {
		if (this.yamlString == undefined) {
			let yaml = '';
			switch (this.baseTabIndex) {
				case 3:
				case 2:
					yaml = dump(this.activeEntry);
					break;
				case 1:
					yaml = dump(this.config.rows);
					break;
				default:
					break;
			}
			this.yamlString = ['{}', '[]'].includes(yaml.trim()) ? '' : yaml;
		}
		return this.yamlString ?? '';
	}

	set yaml(yaml: string | undefined) {
		this.yamlString = yaml;
		try {
			const yamlObj = load(this.yaml);
			switch (this.baseTabIndex) {
				case 3: {
					const entries = structuredClone(
						this.config.custom_icons ?? [],
					);
					entries[this.entryIndex] = yamlObj as IIconConfig;
					this.entriesChanged(entries);
					break;
				}
				case 2: {
					const entries = structuredClone(
						this.config.custom_actions ?? [],
					);
					switch (
						this.renderTemplate(
							entries[this.entryIndex].type,
							this.getEntryContext(yamlObj as IElementConfig),
						)
					) {
						case 'touchpad':
						case 'circlepad':
							if (this.directionTabIndex != 2) {
								entries[this.entryIndex] = {
									...entries[this.entryIndex],
									[this.DIRECTION_TABS[
										this.directionTabIndex
									] as DirectionAction]: yamlObj,
								};
								break;
							}
						// falls through
						case 'slider':
						case 'button':
						default:
							entries[this.entryIndex] =
								yamlObj as IElementConfig;
					}
					this.entriesChanged(entries);
					break;
				}
				case 1:
					this.configChanged({
						...this.config,
						rows: yamlObj as Row[],
					});
					break;
				default:
					break;
			}
			this.errors = undefined;
		} catch (e) {
			this.errors = [(e as Error).message];
		}
	}

	handleYamlCodeChanged(e: Event) {
		e.stopPropagation();
		const yaml = e.detail.value;
		if (yaml != this.yaml) {
			this.yaml = yaml;
		}
	}

	handleStyleCodeChanged(e: Event) {
		e.stopPropagation();
		const css = e.detail.value;
		if (this.entryIndex > -1 && this.activeEntry) {
			if (css != (this.activeEntry as IElementConfig)?.styles) {
				this.entryChanged({
					...this.activeEntry,
					styles: css,
				} as IElementConfig);
			}
		} else {
			if (css != this.config.styles) {
				this.configChanged({
					...this.config,
					styles: css,
				});
			}
		}
	}

	handleActionCodeChanged(e: Event) {
		e.stopPropagation();
		const actionType = (e.target as HTMLElement).id as ActionType;
		const actionYaml = e.detail.value;
		this.yamlStringsCache[actionType] = actionYaml;
		if (this.activeEntry) {
			try {
				const actionObj = load(actionYaml) as IData;
				if (JSON.stringify(actionObj ?? {}).includes('null')) {
					return;
				}
				this.entryChanged({
					...this.activeEntry,
					[actionType]: actionObj,
				} as unknown as IElementConfig);
				this.errors = undefined;
			} catch (e) {
				this.errors = [(e as Error).message];
			}
		}
	}

	handleEvalCodeChanged(e: Event) {
		e.stopPropagation();
		const actionType = (e.target as HTMLElement).id as ActionType;
		const evalString = e.detail.value;
		if (this.activeEntry) {
			this.entryChanged({
				...this.activeEntry,
				[actionType]: {
					...(this.activeEntry as IElementConfig)[actionType],
					eval: evalString,
				},
			} as IElementConfig);
		}
	}

	handleBaseTabSelected(e: Event) {
		this.yamlStringsCache = {};
		this.yamlString = undefined;
		this.entryIndex = -1;
		this.guiMode = true;
		const i = this.BASE_TABS.indexOf(e.detail.name);
		if (this.baseTabIndex == i) {
			return;
		}
		this.baseTabIndex = i;
	}

	handleActionsTabSelected(e: Event) {
		this.yamlStringsCache = {};
		const i = this.ACTION_TABS.indexOf(e.detail.name);
		if (this.actionsTabIndex == i) {
			return;
		}
		this.actionsTabIndex = i;
	}

	handleDirectionTabSelected(e: Event) {
		this.yamlString = undefined;
		this.yamlStringsCache = {};
		const i = this.DIRECTION_TABS.indexOf(e.detail.name);
		if (this.directionTabIndex == i) {
			return;
		}
		this.directionTabIndex = i;
		this.setActionsTab(this.entryIndex);
	}

	handleSelectorChange(e: Event) {
		this.yamlStringsCache = {};
		const key = (e.target as HTMLElement).id;
		let value = e.detail.value;
		if (key.endsWith('.confirmation.exemptions')) {
			value = ((value as string[]) ?? []).map((v) => {
				return {
					user: v,
				};
			});
		}
		switch (this.baseTabIndex) {
			case 3:
			case 2:
				this.entryChanged(
					deepSet(
						structuredClone(this.activeEntry) as object,
						key,
						value,
					) as IElementConfig,
				);
				break;
			default:
				this.configChanged({
					...this.config,
					[key]: value,
				});
				break;
		}
		if (value == undefined) {
			// Fixes autofill issue where default value does not overwrite selector default undefined
			setTimeout(() => {
				this.configChanged(this.config);
			}, 100);
		}
	}

	handleLayoutActionListItemDragStart(e: DragEvent) {
		e.stopPropagation();
		if (e.isTrusted && e.dataTransfer) {
			e.dataTransfer.setData(
				'text/plain',
				'- ' + (e.currentTarget as HTMLElement).innerText,
			);
		}
	}

	addEntry(e: Event) {
		const i = e.detail.index as number;
		let entries: IElementConfig[] | IIconConfig[];
		switch (this.baseTabIndex) {
			case 3:
				entries = structuredClone(this.config.custom_icons) ?? [];
				entries.push({
					name: '',
					path: '',
				});
				break;
			case 2:
			default: {
				entries = structuredClone(this.config.custom_actions) ?? [];
				entries.push({
					type: RemoteElementTypes[i],
					name: '',
				});
				break;
			}
		}
		this.entriesChanged(entries);
		const entriesList = this.shadowRoot?.querySelector('.features');
		if (entriesList) {
			setTimeout(
				() => (entriesList.scrollTop = entriesList.scrollHeight),
				100,
			);
		}
	}

	removeEntry(e: Event) {
		const i = (
			e.currentTarget as unknown as Event & Record<'index', number>
		).index;
		let entries: IElementConfig[] | IIconConfig[];
		switch (this.baseTabIndex) {
			case 3:
				entries = this.config.custom_icons ?? [];
				break;
			case 2:
			default:
				entries = this.config.custom_actions ?? [];
				break;
		}
		entries = structuredClone(entries);
		entries.splice(i, 1);
		this.entriesChanged(entries);
	}

	moveEntry(e: Event) {
		e.stopPropagation();
		let entries: IElementConfig[] | IIconConfig[];
		switch (this.baseTabIndex) {
			case 3:
				entries = this.config.custom_icons ?? [];
				break;
			case 2:
			default:
				entries = this.config.custom_actions ?? [];
				break;
		}
		entries = structuredClone(entries);
		const { oldIndex, newIndex } = e.detail;
		(entries as IElementConfig[]).splice(
			newIndex,
			0,
			(entries as IElementConfig[]).splice(oldIndex, 1)[0],
		);
		this.entriesChanged(entries);
	}

	copyEntry(e: Event) {
		let entries: IElementConfig[] | IIconConfig[];
		switch (this.baseTabIndex) {
			case 3:
				entries = this.config.custom_icons ?? [];
				break;
			case 2:
			default:
				entries = this.config.custom_actions ?? [];
				break;
		}
		entries = structuredClone(entries);
		const i = (
			e.currentTarget as unknown as Event & Record<'index', number>
		).index;
		const entry = structuredClone(entries[i]);
		entry.name = `${entry['name' as keyof object]}_copy`;
		(entries as IElementConfig[]).splice(
			i,
			1,
			(entries as IElementConfig[])[i],
			entry as IElementConfig,
		);
		this.entriesChanged(entries);
	}

	editEntry(e: Event) {
		this.yamlStringsCache = {};
		this.yamlString = undefined;
		const i = (
			e.currentTarget as unknown as Event & Record<'index', number>
		).index;
		switch (this.baseTabIndex) {
			case 3:
				break;
			case 2:
			default:
				this.setActionsTab(i);
				this.directionTabIndex = 2;
				break;
		}
		this.entryIndex = i;
	}

	exitEditEntry(_e: Event) {
		this.yamlStringsCache = {};
		this.yamlString = undefined;
		this.entryIndex = -1;
	}

	setActionsTab(i: number) {
		let entry = this.config.custom_actions?.[i] ?? {
			type: 'button',
			name: '',
		};
		let context;
		const entryType = entry.type;
		switch (entryType) {
			case 'touchpad':
				if (this.directionTabIndex != 2) {
					entry =
						(entry[
							this.DIRECTION_TABS[
								this.directionTabIndex
							] as DirectionAction
						] as IElementConfig) ?? {};
				}
				context = this.getEntryContext(entry);
				if (
					this.renderTemplate(
						entry?.drag_action?.action ?? 'none',
						context,
					) != 'none' ||
					this.renderTemplate(
						entry?.multi_drag_action?.action ?? 'none',
						context,
					) != 'none'
				) {
					if (this.directionTabIndex == 2) {
						this.actionsTabIndex = 2;
					} else {
						this.actionsTabIndex = 0;
					}
					break;
				}

				if (
					this.renderTemplate(
						entry?.multi_tap_action?.action ?? 'none',
						context,
					) != 'none' ||
					this.renderTemplate(
						entry?.multi_double_tap_action?.action ?? 'none',
						context,
					) != 'none' ||
					this.renderTemplate(
						entry?.multi_hold_action?.action ?? 'none',
						context,
					) != 'none'
				) {
					this.actionsTabIndex = 1;
				} else {
					this.actionsTabIndex = 0;
				}
				break;
			case 'slider':
				this.actionsTabIndex = 0;
				break;
			case 'circlepad':
				if (this.directionTabIndex != 2) {
					entry =
						(entry[
							this.DIRECTION_TABS[
								this.directionTabIndex
							] as DirectionAction
						] as IElementConfig) ?? {};
				}
			// falls through
			case 'button':
				context = this.getEntryContext(entry);
				if (
					this.renderTemplate(
						entry?.momentary_start_action?.action ?? 'none',
						context,
					) != 'none' ||
					this.renderTemplate(
						entry?.momentary_end_action?.action ?? 'none',
						context,
					) != 'none'
				) {
					this.actionsTabIndex = 1;
				}
				break;
		}
	}

	buildIconElement(entry: IElementConfig | IIconConfig, context: object) {
		let iconElement = html``;
		let icon = this.renderTemplate(
			(entry as IElementConfig).icon ?? (entry as IIconConfig).path ?? '',
			context,
		) as string;
		if (!icon.includes(':')) {
			const iconConfig =
				(this.config.custom_icons ?? []).find(
					(customIcon: IIconConfig) => customIcon.name == icon,
				) ??
				defaultIcons.find(
					(defaultIcon: IIconConfig) => defaultIcon.name == icon,
				);
			icon = iconConfig?.path ?? icon;
		}

		if (!icon.length) {
			switch (
				this.renderTemplate((entry as IElementConfig)?.type, context)
			) {
				case 'touchpad':
					icon = 'mdi:gesture-tap-button';
					break;
				case 'circlepad':
					icon = 'mdi:gamepad-circle';
					break;
				case 'slider':
					if (
						this.renderTemplate(
							(entry as IElementConfig)?.vertical ?? false,
							context,
						)
					) {
						icon = 'mdi:tune-vertical-variant';
					} else {
						icon = 'mdi:tune-variant';
					}
					break;
				case 'button':
				default:
					icon = 'mdi:circle';
					break;
			}
		}

		iconElement = icon.includes(':')
			? html`<ha-icon class="text-icon" .icon="${icon}"></ha-icon>`
			: html`<ha-svg-icon class="text-icon" .path=${icon}></ha-svg-icon>`;
		return iconElement;
	}

	buildEntryList() {
		let entries;
		let header: string;
		switch (this.baseTabIndex) {
			case 3:
				entries = this.config.custom_icons ?? [];
				header = 'Custom Icons';
				break;
			case 2:
			default:
				entries = this.config.custom_actions ?? [];
				header = 'Custom Elements';
				break;
		}
		return html`
			<div class="content">
				<div class="title-header">${header}</div>
				<ha-sortable
					handle-selector=".handle"
					@item-moved=${this.moveEntry}
				>
					<div class="features">
						${entries.map((entry, i) => {
							const context = this.getEntryContext(
								entry as IElementConfig,
							);
							const iconElement = this.buildIconElement(
								entry,
								context,
							);
							const label = this.renderTemplate(
								(entry as IElementConfig).label as string,
								context,
							);
							const entryType = this.renderTemplate(
								(entry as IElementConfig).type as string,
								context,
							);
							const name = this.renderTemplate(
								entry.name as string,
								context,
							);
							return html`
								<div class="feature-list-item">
									<div class="handle">
										<ha-icon
											.icon="${'mdi:drag'}"
										></ha-icon>
									</div>
									<div class="feature-list-item-content">
										${iconElement}
										<div class="feature-list-item-label">
											<span class="primary"
												>${entryType} ⸱ ${name}
												${label
													? ` ⸱ ${label}`
													: ''}</span
											>
											${context.config.entity
												? html`<span class="secondary"
														>${context.config
															.entity}${context
															.config.attribute
															? ` ⸱ ${context.config.attribute}`
															: ''}</span
												  >`
												: ''}
										</div>
									</div>
									<ha-icon-button
										class="copy-icon"
										.index=${i}
										@click=${this.copyEntry}
									>
										<ha-icon
											.icon="${'mdi:content-copy'}"
										></ha-icon>
									</ha-icon-button>
									<ha-icon-button
										class="edit-icon"
										.index=${i}
										@click=${this.editEntry}
									>
										<ha-icon
											.icon="${'mdi:pencil'}"
										></ha-icon>
									</ha-icon-button>
									<ha-icon-button
										class="remove-icon"
										.index=${i}
										@click=${this.removeEntry}
									>
										<ha-icon
											.icon="${'mdi:delete'}"
										></ha-icon>
									</ha-icon-button>
								</div>
							`;
						})}
					</div>
				</ha-sortable>
			</div>
		`;
	}

	buildAddEntryButton() {
		switch (this.baseTabIndex) {
			case 3:
				return html`
					<ha-button @click=${this.addEntry} class="add-list-item">
						<ha-icon .icon=${'mdi:plus'} slot="start"></ha-icon>Add
						svg icon</ha-button
					>
				`;
			case 2:
			default:
				return html`
					<ha-button-menu
						fixed
						class="add-list-item"
						@action=${this.addEntry}
						@closed=${(e: Event) => e.stopPropagation()}
					>
						<ha-button slot="trigger">
							<ha-icon .icon=${'mdi:plus'} slot="start"></ha-icon
							>Add remote element</ha-button
						>
						${RemoteElementTypes.map(
							(entryType) => html`
								<ha-list-item .value=${entryType}>
									${entryType}
								</ha-list-item>
							`,
						)}
					</ha-button-menu>
				`;
		}
	}

	buildEntryHeader() {
		let entryType: string;
		switch (this.baseTabIndex) {
			case 3:
				entryType = 'SVG Icon';
				break;
			case 2:
			default:
				entryType = this.renderTemplate(
					this.config.custom_actions?.[this.entryIndex]?.type ??
						'button',
					this.getEntryContext(
						(this.activeEntry as IElementConfig) ?? {
							type: 'button',
							name: '',
						},
					),
				) as string;
				break;
		}

		return html`
			<div class="header">
				<div class="back-title">
					<ha-icon-button-prev
						.label=${this.hass.localize('ui.common.back')}
						@click=${this.exitEditEntry}
					></ha-icon-button-prev>
					<span class="primary" slot="title">${entryType}</span>
				</div>
				<ha-icon-button
					class="gui-mode-button"
					@click=${this.toggleGuiMode}
					.label=${this.hass.localize(
						this.guiMode
							? 'ui.panel.lovelace.editor.edit_card.show_code_editor'
							: 'ui.panel.lovelace.editor.edit_card.show_visual_editor',
					)}
				>
					<ha-icon
						class="text-icon"
						.icon="${this.guiMode
							? 'mdi:code-braces'
							: 'mdi:list-box-outline'}"
					></ha-icon>
				</ha-icon-button>
			</div>
		`;
	}

	buildSelector(
		label: string,
		key: string,
		selector: object,
		placeholder?: string | number | boolean | object,
	) {
		// https://github.com/home-assistant/frontend/tree/dev/src/components/ha-selector
		// https://github.com/home-assistant/frontend/blob/dev/src/data/selector.ts
		const hass: HomeAssistant = {
			...this.hass,
			localize: (key, values) => {
				const value = {
					'ui.panel.lovelace.editor.action-editor.actions.repeat':
						'Repeat',
					'ui.panel.lovelace.editor.action-editor.actions.fire-dom-event':
						'Fire DOM event',
					'ui.panel.lovelace.editor.action-editor.actions.eval':
						'Evaluate JS',
					'ui.panel.lovelace.editor.action-editor.actions.key': 'Key',
					'ui.panel.lovelace.editor.action-editor.actions.source':
						'Source',
					'ui.panel.lovelace.editor.action-editor.actions.keyboard':
						'Keyboard',
					'ui.panel.lovelace.editor.action-editor.actions.textbox':
						'Textbox',
					'ui.panel.lovelace.editor.action-editor.actions.search':
						'Search',
				}[key];
				return value ?? this.hass.localize(key, values);
			},
		};

		let value;
		switch (this.baseTabIndex) {
			case 3:
			case 2:
				value = deepGet(this.activeEntry as object, key);
				break;
			case 1:
				break;
			case 0:
			default:
				value = this.config[key as keyof IConfig];
				break;
		}
		if (key.endsWith('.confirmation.exemptions')) {
			value = ((value as Record<string, { user: string }>[]) ?? []).map(
				(v) => v.user,
			);
		}

		return html`<ha-selector
			.hass=${hass}
			.name="${label}"
			.selector=${selector}
			.value=${value ?? placeholder}
			.label="${label}"
			.placeholder=${placeholder}
			.required=${false}
			id="${key}"
			@value-changed=${this.handleSelectorChange}
		></ha-selector>`;
	}

	buildMainFeatureOptions(additionalOptions: TemplateResult<1> = html``) {
		const autofill = this.renderTemplate(
			(this.activeEntry as IElementConfig).autofill_entity_id ??
				this.config.autofill_entity_id ??
				AUTOFILL,
			this.getEntryContext(this.activeEntry as IElementConfig),
		) as boolean;

		const placeholderEntityId =
			(Array.isArray(
				(this.activeEntry as IElementConfig)?.tap_action?.target
					?.entity_id,
			)
				? (this.activeEntry as IElementConfig)?.tap_action?.target
						?.entity_id?.[0]
				: ((this.activeEntry as IElementConfig)?.tap_action?.target
						?.entity_id as string)) ??
			this.config.remote_id ??
			this.config.media_player_id ??
			this.config.keyboard_id;

		return html`
			${this.buildSelector('Name', 'name', {
				select: {
					custom_value: true,
					mode: 'dropdown',
					options: [
						...this.DEFAULT_KEYS.filter(
							(action) =>
								action.type ==
								((this.activeEntry as IElementConfig).type ??
									'button'),
						).map((action) => action.name),
						...(((this.activeEntry as IElementConfig).type ??
							'button') == 'button'
							? this.DEFAULT_SOURCES.map((action) => action.name)
							: []),
					],
				},
			})}
			${this.buildSelector(
				'Entity',
				'entity_id',
				{
					entity: {},
				},
				autofill ? placeholderEntityId : undefined,
			)}
			${
				this.hass.states[
					(this.activeEntry as IElementConfig)?.entity_id ??
						(autofill ? placeholderEntityId : '') ??
						''
				]
					? this.buildSelector(
							'Attribute',
							'value_attribute',
							{
								attribute: {
									entity_id:
										(this.activeEntry as IElementConfig)
											?.entity_id ?? placeholderEntityId,
								},
							},
							autofill ? 'state' : undefined,
					  )
					: ''
			}
			<div class="actions-form">
				${additionalOptions}
				${this.buildSelector(
					'Autofill',
					'autofill_entity_id',
					{
						boolean: {},
					},
					this.config.autofill_entity_id ?? AUTOFILL,
				)}
				${this.buildSelector(
					'Haptics',
					'haptics',
					{
						boolean: {},
					},
					autofill ? this.config.haptics ?? HAPTICS : HAPTICS,
				)}
			</div>
		</div> `;
	}

	buildAppearancePanel(appearanceOptions: TemplateResult<1> = html``) {
		return html`
			<ha-expansion-panel .header=${'Appearance'}>
				<div
					class="panel-header"
					slot="header"
					role="heading"
					aria-level="3"
				>
					<ha-icon .icon=${'mdi:palette'}></ha-icon>
					Appearance
				</div>
				<div class="content">
					${this.buildAlertBox(
						"Change the feature appearance based on its value using a template like '{{ value | float }}'.",
					)}
					${appearanceOptions}${this.buildCodeEditor('css')}
				</div>
			</ha-expansion-panel>
		`;
	}

	buildCommonAppearanceOptions() {
		const context = this.getEntryContext(
			(this.activeEntry as IElementConfig) ?? {
				type: 'button',
				name: '',
			},
		);
		let icon = this.renderTemplate(
			(this.activeEntry as IElementConfig)?.icon ?? '',
			context,
		) as string;
		let customIcon;
		if (icon && !icon.includes(':')) {
			const iconConfig =
				(this.config.custom_icons ?? []).find(
					(customIcon: IIconConfig) => customIcon.name == icon,
				) ??
				defaultIcons.find(
					(defaultIcon: IIconConfig) => defaultIcon.name == icon,
				);
			icon = iconConfig?.path ?? icon;
			customIcon = html`<ha-svg-icon
				.path=${icon}
				class="custom-icon-picked"
			></ha-svg-icon>`;
		}
		return html`${this.buildSelector('Label', 'label', {
				text: { multiline: true },
			})}
			<div class="actions-form">
				${this.buildSelector('Icon', 'icon', {
					icon: {},
				})}${customIcon ?? ''}${this.buildSelector(
					'Units',
					'unit_of_measurement',
					{
						text: {},
					},
				)}
			</div>`;
	}

	buildInteractionsPanel(actionSelectors: TemplateResult<1>) {
		return html`
			<ha-expansion-panel .header=${'Interactions'}>
				<div
					class="panel-header"
					slot="header"
					role="heading"
					aria-level="3"
				>
					<ha-icon .icon=${'mdi:gesture-tap'}></ha-icon>
					Interactions
				</div>
				<div class="content">${actionSelectors}</div>
			</ha-expansion-panel>
		`;
	}

	buildActionOption(
		label: string,
		actionType: ActionType,
		selector: object,
		buildCodeEditor: boolean = false,
	) {
		const context = this.getEntryContext(
			(this.activeEntry as IElementConfig) ?? ({} as IElementConfig),
		);
		const autofill = this.renderTemplate(
			(this.activeEntry as IElementConfig).autofill_entity_id ??
				this.config.autofill_entity_id ??
				AUTOFILL,
			context,
		) as boolean;
		const action = this.renderTemplate(
			(this.activeEntry as IElementConfig)?.[actionType]?.action ??
				'none',
			context,
		) as Action;
		const platform = this.renderTemplate(
			(this.activeEntry as IElementConfig)?.[actionType]?.platform ??
				this.PLATFORM ??
				'Android TV',
			context,
		) as Platform;
		const keyboardPlatform = KeyboardPlatforms.includes(
			platform as KeyboardPlatform,
		)
			? platform
			: 'Android TV';

		return html`<div class="action-options">
			${this.buildSelector(label, actionType, selector)}
			${action != 'none' && actionType.includes('double_tap_action')
				? this.buildSelector(
						'Double tap window',
						`${actionType}.double_tap_window`,
						{
							number: {
								min: 0,
								step: 0,
								mode: 'box',
								unit_of_measurement: 'ms',
							},
						},
						(autofill
							? this.config.double_tap_window
							: undefined) ?? DOUBLE_TAP_WINDOW,
				  )
				: actionType.includes('hold_action') &&
				  (this.activeEntry as IElementConfig)[actionType]
				? html`<div class="actions-form">
						${this.buildSelector(
							'Hold time',
							`${actionType}.hold_time`,
							{
								number: {
									min: 0,
									step: 0,
									mode: 'box',
									unit_of_measurement: 'ms',
								},
							},
							(autofill ? this.config.hold_time : undefined) ??
								HOLD_TIME,
						)}
						${this.renderTemplate(
							(this.activeEntry as IElementConfig)?.[actionType]
								?.action as string,
							context,
						) == 'repeat'
							? this.buildSelector(
									'Repeat delay',
									`${actionType}.repeat_delay`,
									{
										number: {
											min: 0,
											step: 0,
											mode: 'box',
											unit_of_measurement: 'ms',
										},
									},
									(autofill
										? this.config.repeat_delay
										: undefined) ?? REPEAT_DELAY,
							  )
							: ''}
				  </div>`
				: action != 'none' && actionType.includes('drag_action')
				? this.buildSelector(
						'Sampling delay',
						`${actionType}.repeat_delay`,
						{
							number: {
								min: 0,
								step: 0,
								mode: 'box',
								unit_of_measurement: 'ms',
							},
						},
						0,
				  )
				: ''}
			${action == 'key'
				? html`<div class="actions-form">
							${this.buildSelector(
								'Platform',
								`${actionType}.platform`,
								{
									select: {
										mode: 'dropdown',
										options: Platforms,
										reorder: false,
									},
								},
								autofill
									? this.PLATFORM ?? 'Android TV'
									: 'Android TV',
							)}
							${['Kodi', 'LG webOS'].includes(platform)
								? this.buildSelector(
										'Media Player ID',
										`${actionType}.media_player_id`,
										{
											entity: {
												filter: {
													domain: 'media_player',
												},
											},
										},
										autofill
											? this.config.media_player_id
											: undefined,
								  )
								: this.buildSelector(
										'Remote ID',
										`${actionType}.remote_id`,
										{
											entity: {
												filter: {
													domain: 'remote',
												},
											},
										},
										autofill
											? this.config.remote_id
											: undefined,
								  )}
						</div>
						${this.buildSelector('Key', `${actionType}.key`, {
							text: {},
						})}`
				: ''}
			${action == 'source'
				? html`<div class="actions-form">
							${this.buildSelector(
								'Platform',
								`${actionType}.platform`,
								{
									select: {
										mode: 'dropdown',
										options: Platforms,
										reorder: false,
									},
								},
								autofill
									? this.PLATFORM ?? 'Android TV'
									: 'Android TV',
							)}
							${['Android TV'].includes(platform)
								? this.buildSelector(
										'Remote ID',
										`${actionType}.remote_id`,
										{
											entity: {
												filter: {
													domain: 'remote',
												},
											},
										},
										autofill
											? this.config.remote_id
											: undefined,
								  )
								: this.buildSelector(
										'Media Player ID',
										`${actionType}.media_player_id`,
										{
											entity: {
												filter: {
													domain: 'media_player',
												},
											},
										},
										autofill
											? this.config.media_player_id
											: undefined,
								  )}
						</div>
						${this.buildSelector('Source', `${actionType}.source`, {
							text: {},
						})}`
				: ''}
			${['keyboard', 'textbox', 'search'].includes(action)
				? html`<div class="actions-form">
							${this.buildSelector(
								'Platform',
								`${actionType}.platform`,
								{
									select: {
										mode: 'dropdown',
										options:
											action == 'search'
												? SearchPlatforms
												: KeyboardPlatforms,
										reorder: false,
									},
								},
								autofill
									? KeyboardPlatforms.includes(
											this.config
												.platform as KeyboardPlatform,
									  )
										? this.PLATFORM
										: 'Android TV'
									: 'Android TV',
							)}
							${(() => {
								let options = html``;
								switch (keyboardPlatform) {
									case 'Android TV':
										options = this.buildSelector(
											'Remote ID',
											`${actionType}.remote_id`,
											{
												entity: {
													filter: {
														domain: 'remote',
													},
												},
											},
											autofill
												? this.config.remote_id
												: undefined,
										);
										break;
									case 'Sony BRAVIA':
									case 'Fire TV':
										options = this.buildSelector(
											'Keyboard ID',
											`${actionType}.keyboard_id`,
											{
												entity: {
													filter: {
														domain: [
															'remote',
															'media_player',
														],
													},
												},
											},
											autofill
												? this.config.keyboard_id
												: undefined,
										);
										break;
									case 'Roku':
										const domain =
											action == 'search'
												? 'media_player'
												: 'remote';
										options = this.buildSelector(
											`${capitalizeWords(domain)} ID`,
											`${actionType}.${domain}_id`,
											{
												entity: {
													filter: {
														domain,
													},
												},
											},
											autofill
												? this.config[`${domain}_id`]
												: undefined,
										);
										break;
									case 'LG webOS':
										if (action == 'search') {
											break;
										}
									// falls through
									case 'Kodi':
										options = this.buildSelector(
											'Media Player ID',
											`${actionType}.media_player_id`,
											{
												entity: {
													filter: {
														domain: 'media_player',
													},
												},
											},
											autofill
												? this.config.media_player_id
												: undefined,
										);
										break;
									case 'Unified Remote':
										if (action == 'search') {
											break;
										}
										options = this.buildSelector(
											'Remote/Device Name',
											'device',
											{
												text: {},
											},
											autofill
												? this.config.device
												: undefined,
										);
										break;
									default:
										break;
								}
								return options;
							})()}
						</div>
						${this.buildSelector(
							'Prompt',
							`${actionType}.keyboard_prompt`,
							{
								text: {},
							},
						)}`
				: ''}
			${action == 'more-info'
				? this.buildSelector(
						'Entity',
						`${actionType}.target.entity_id`,
						{
							entity: {},
						},
						autofill
							? (this.activeEntry as IElementConfig)?.entity_id ??
									this.config.remote_id ??
									this.config.media_player_id ??
									this.config.keyboard_id
							: undefined,
				  )
				: ''}
			${action == 'toggle'
				? this.buildSelector('Target', `${actionType}.target`, {
						target: {},
				  })
				: ''}
			${buildCodeEditor || action == 'fire-dom-event'
				? this.buildCodeEditor('action', actionType)
				: ''}
			${action == 'eval'
				? html`
						${this.buildAlertBox(
							"It's easy to crash your browser or server if you use this to send too many commands in a loop. Make sure you know what you're doing!",
							'warning',
						)}
						${this.buildCodeEditor('eval', actionType)}
				  `
				: ''}
			${action != 'none'
				? html`${this.buildSelector(
						'Confirmation',
						`${actionType}.confirmation`,
						{
							boolean: {},
						},
						false,
				  )}
				  ${(this.activeEntry as IElementConfig)?.[actionType]
						?.confirmation
						? html`${this.buildSelector(
								'Text',
								`${actionType}.confirmation.text`,
								{
									text: {},
								},
						  )}
						  ${this.buildSelector(
								'Exemptions',
								`${actionType}.confirmation.exemptions`,
								{
									select: {
										multiple: true,
										mode: 'list',
										options: this.people,
										reorder: false,
									},
								},
						  )}`
						: ''}`
				: ''}
		</div>`;
	}

	buildTabBar(index: number, handler: (e: Event) => void, tabs: string[]) {
		return html`
			<sl-tab-group @sl-tab-show=${handler}>
				${tabs.map(
					(tab, i) =>
						html`<sl-tab
							slot="nav"
							panel=${tab}
							.active=${i == index}
							>${tab}</sl-tab
						>`,
				)}
			</sl-tab-group>
		`;
	}

	buildButtonGuiEditor(isChild: boolean = false, keypress: boolean = true) {
		this.ACTION_TABS = ['default', 'momentary'];
		const actionsTabBar = this.buildTabBar(
			this.actionsTabIndex,
			this.handleActionsTabSelected,
			this.ACTION_TABS,
		);
		let actionSelectors: TemplateResult<1>;
		const actionsNoRepeat = Actions.concat();
		actionsNoRepeat.splice(Actions.indexOf('repeat'), 1);
		const defaultUiActions = {
			ui_action: {
				actions: actionsNoRepeat,
			},
		};
		switch (this.actionsTabIndex) {
			case 1:
				actionSelectors = html`
					${actionsTabBar}
					${this.buildAlertBox(
						'Enabling momentary actions disables tap, double tap, and hold actions.',
						'warning',
					)}
					${this.buildActionOption(
						'Start behavior (optional)',
						'momentary_start_action',
						defaultUiActions,
					)}
					${this.buildAlertBox(
						"Set the action below, and then use the code editor to set a data field to the seconds the feature was held down using a template like '{{ hold_secs | float }}'.",
					)}
					${this.buildActionOption(
						'End behavior (optional)',
						'momentary_end_action',
						defaultUiActions,
						true,
					)}
				`;
				break;
			case 0:
			default:
				actionSelectors = html`
					${actionsTabBar}
					${this.buildActionOption(
						'Tap behavior (optional)',
						'tap_action',
						defaultUiActions,
					)}
					${this.buildActionOption(
						'Double tap behavior (optional)',
						'double_tap_action',
						defaultUiActions,
					)}
					${this.buildActionOption(
						'Hold behavior (optional)',
						'hold_action',
						{
							ui_action: {
								actions: Actions,
							},
						},
					)}
				`;
				break;
		}

		return html`
			${isChild ? '' : this.buildMainFeatureOptions(undefined)}
			${this.buildAppearancePanel(this.buildCommonAppearanceOptions())}
			${this.buildInteractionsPanel(html`
				${actionSelectors}
				${keypress
					? this.buildSelector('Keyboard Key', 'keypress', {
							text: {},
					  })
					: ''}
			`)}
		`;
	}

	buildSliderGuiEditor() {
		const actionsNoRepeat = Actions.concat();
		actionsNoRepeat.splice(Actions.indexOf('repeat'), 1);

		const context = this.getEntryContext(
			(this.activeEntry as IElementConfig) ?? ({} as IElementConfig),
		);
		const rangeMin = Number(
			this.renderTemplate(
				(this.activeEntry as IElementConfig)?.range?.[0] as number,
				context,
			),
		);
		const rangeMax = Number(
			this.renderTemplate(
				(this.activeEntry as IElementConfig)?.range?.[0] as number,
				context,
			),
		);
		const step = Number(
			this.renderTemplate(
				(this.activeEntry as IElementConfig)?.step as number,
				context,
			),
		);
		const unit = this.renderTemplate(
			(this.activeEntry as IElementConfig)?.unit_of_measurement as string,
			context,
		);

		return html`
			${this.buildMainFeatureOptions(html`
				${this.buildSelector('Min', 'range.0', {
					number: {
						max: rangeMax ?? undefined,
						step: step,
						mode: 'box',
						unit_of_measurement: unit,
					},
					RANGE_MIN,
				})}
				${this.buildSelector('Max', 'range.1', {
					number: {
						min: rangeMin ?? undefined,
						step: step,
						mode: 'box',
						unit_of_measurement: unit,
					},
					RANGE_MAX,
				})}
				${this.buildSelector('Step', 'step', {
					number: {
						min: 0,
						step:
							step ??
							Math.min(
								1,
								((rangeMax ?? RANGE_MAX) -
									(rangeMin ?? RANGE_MIN)) /
									STEP_COUNT,
							),
						mode: 'box',
						unit_of_measurement: unit,
					},
					STEP,
				})}
				${this.buildSelector(
					'Update after action delay',
					'value_from_hass_delay',
					{
						number: {
							min: 0,
							step: 0,
							mode: 'box',
							unit_of_measurement: 'ms',
						},
					},
					UPDATE_AFTER_ACTION_DELAY,
				)}
			`)}
			${this.buildAppearancePanel(
				html`${this.buildCommonAppearanceOptions()}${this.buildSelector(
					'Vertical',
					'vertical',
					{
						boolean: {},
					},
					false,
				)}`,
			)}
			${this.buildInteractionsPanel(html`
				${this.buildAlertBox()}
				${this.buildActionOption(
					'Behavior',
					'tap_action',
					{
						ui_action: {
							actions: actionsNoRepeat,
						},
					},
					true,
				)}
			`)}
		`;
	}

	buildTouchpadGuiEditor() {
		this.ACTION_TABS = ['default', 'multi-touch'];
		if (this.directionTabIndex == 2) {
			this.ACTION_TABS.push('drag');
		}
		const actionsTabBar = this.buildTabBar(
			this.actionsTabIndex,
			this.handleActionsTabSelected,
			this.ACTION_TABS,
		);
		let actionSelectors: TemplateResult<1>;
		const actionsNoRepeat = Actions.concat();
		actionsNoRepeat.splice(Actions.indexOf('repeat'), 1);
		const defaultUiActions = {
			ui_action: {
				actions: actionsNoRepeat,
			},
		};
		switch (this.actionsTabIndex) {
			case 2:
				actionSelectors = html`
					${actionsTabBar}
					${this.buildAlertBox(
						'Enabling drag actions disables directional swipe actions.',
						'warning',
					)}
					${this.buildActionOption(
						'Drag behavior (optional)',
						'drag_action',
						defaultUiActions,
					)}
					${this.buildActionOption(
						'Multi-touch drag behavior (optional)',
						'multi_drag_action',
						defaultUiActions,
					)}
				`;
				break;
			case 1:
				actionSelectors = html`
					${actionsTabBar}
					${this.buildActionOption(
						`Multi-touch ${
							this.directionTabIndex == 2 ? 'tap' : 'swipe'
						} behavior (optional)`,
						'multi_tap_action',
						defaultUiActions,
					)}
					${this.directionTabIndex == 2
						? this.buildActionOption(
								'Multi-touch double tap behavior (optional)',
								'multi_double_tap_action',
								defaultUiActions,
						  )
						: ''}
					${this.buildActionOption(
						'Multi-touch hold behavior (optional)',
						'multi_hold_action',
						{
							ui_action: {
								actions: Actions,
							},
						},
					)}
				`;
				break;
			case 0:
			default:
				actionSelectors = html`
					${actionsTabBar}
					${this.buildActionOption(
						`${
							this.directionTabIndex == 2 ? 'Tap' : 'Swipe'
						} behavior (optional)`,
						'tap_action',
						defaultUiActions,
					)}
					${this.directionTabIndex == 2
						? this.buildActionOption(
								'Double tap behavior (optional)',
								'double_tap_action',
								defaultUiActions,
						  )
						: ''}
					${this.buildActionOption(
						'Hold behavior (optional)',
						'hold_action',
						{
							ui_action: {
								actions: Actions,
							},
						},
					)}
				`;
				break;
		}

		const directionTabBar = this.buildTabBar(
			this.directionTabIndex,
			this.handleDirectionTabSelected,
			this.DIRECTION_TABS,
		);

		return html`
			${directionTabBar}
			${this.directionTabIndex == 2 ? this.buildMainFeatureOptions() : ''}
			${this.buildAppearancePanel(this.buildCommonAppearanceOptions())}
			${this.buildInteractionsPanel(actionSelectors)}
		`;
	}

	buildCirclepadGuiEditor() {
		const directionTabBar = this.buildTabBar(
			this.directionTabIndex,
			this.handleDirectionTabSelected,
			this.DIRECTION_TABS,
		);

		return html`
			${directionTabBar}
			${this.buildButtonGuiEditor(this.directionTabIndex != 2, false)}
		`;
	}

	buildIconGuiEditor() {
		return html`<div class="content">
			${this.buildAlertBox(
				html`Icons must be resized to 24x24px to display correctly. Use
					a tool like
					<a
						target="_blank"
						href="https://yqnn.github.io/svg-path-editor/"
						>this SVG path editor</a
					>
					to edit your icons. If correctly sized the icon will
					perfectly fit in the preview ouline below.`,
				'info',
			)}
			${this.buildSelector('Name', 'name', {
				text: {},
			})}
			${this.buildSelector('SVG Path', 'path', {
				text: { multiline: true },
			})}
			<ha-svg-icon
				.path=${(this.activeEntry as IIconConfig).path}
				class="custom-icon-preview"
			></ha-svg-icon>
		</div>`;
	}

	buildEntryGuiEditor() {
		let entryGuiEditor: TemplateResult<1>;
		switch (this.baseTabIndex) {
			case 3:
				entryGuiEditor = this.buildIconGuiEditor();
				break;
			case 2:
			default:
				switch (this.config.custom_actions?.[this.entryIndex]?.type) {
					case 'slider':
						entryGuiEditor = this.buildSliderGuiEditor();
						break;
					case 'touchpad':
						entryGuiEditor = this.buildTouchpadGuiEditor();
						break;
					case 'circlepad':
						entryGuiEditor = this.buildCirclepadGuiEditor();
						break;
					case 'button':
					default:
						entryGuiEditor = this.buildButtonGuiEditor();
						break;
				}
				break;
		}

		return html`<div class="gui-editor">${entryGuiEditor}</div>`;
	}

	buildCodeEditor(
		mode: 'css' | 'action' | 'layout' | 'eval' | 'yaml',
		id?: string,
	) {
		let title: string | undefined;
		let value: string;
		let handler: (e: Event) => void;
		let autocompleteEntities: boolean;
		let autocompleteIcons: boolean;
		let codeEditorMode: 'yaml' | 'jinja2';
		switch (mode) {
			case 'css':
				codeEditorMode = 'jinja2';
				value =
					(this.entryIndex > -1
						? (this.activeEntry as IElementConfig)?.styles
						: this.config.styles) ?? '';
				handler = this.handleStyleCodeChanged;
				title = 'CSS Styles';
				autocompleteEntities = true;
				autocompleteIcons = false;
				break;
			case 'action':
				codeEditorMode = 'yaml';
				handler = this.handleActionCodeChanged;
				id = id ?? 'tap_action';
				value =
					this.yamlStringsCache[id] ??
					dump(
						((this.activeEntry as IElementConfig)?.[
							id as ActionType
						] as IAction) ?? {},
					);
				value = value.trim() == '{}' ? '' : value;
				autocompleteEntities = true;
				autocompleteIcons = false;
				break;
			case 'layout':
				codeEditorMode = 'yaml';
				value = this.yaml;
				handler = this.handleYamlCodeChanged;
				value = value.trim() == '[]' ? '' : value;
				autocompleteEntities = false;
				autocompleteIcons = false;
				break;
			case 'eval':
				codeEditorMode = 'jinja2';
				value =
					this.yamlStringsCache[`${id}.eval`] ??
					(
						(this.activeEntry as IElementConfig)?.[
							id as ActionType
						] as IAction
					).eval ??
					'';
				handler = this.handleEvalCodeChanged;
				autocompleteEntities = false;
				autocompleteIcons = false;
				break;
			case 'yaml':
			default:
				codeEditorMode = 'yaml';
				value = this.yaml;
				handler = this.handleYamlCodeChanged;
				autocompleteEntities = true;
				autocompleteIcons = true;
				break;
		}
		return html`
			<div class="yaml-editor">
				${title ? html`<div class="style-header">${title}</div>` : ''}
				<ha-code-editor
					mode="${codeEditorMode}"
					id="${id}"
					dir="ltr"
					?autocomplete-entities="${autocompleteEntities}"
					?autocomplete-icons="${autocompleteIcons}"
					.hass=${this.hass}
					.value=${value}
					.error=${Boolean(this.errors)}
					@value-changed=${handler}
					@keydown=${(e: KeyboardEvent) => e.stopPropagation()}
				></ha-code-editor>
			</div>
		`;
	}

	buildEntryEditor() {
		let editor: TemplateResult<1>;
		if (this.guiMode) {
			editor = this.buildEntryGuiEditor();
		} else {
			editor = this.buildCodeEditor('yaml');
		}

		return html`${this.buildEntryHeader()}
			<div class="wrapper">${editor}</div> `;
	}

	buildLayoutEditor() {
		const customActionNames = Array.from(
			new Set([
				...(this.config.custom_actions?.map((entry) => entry.name) ??
					[]),
				...(this.customActionsFromFile?.map((entry) => entry.name) ??
					[]),
			]),
		);
		const customActions = customActionNames.map(
			(name) =>
				this.config.custom_actions?.find(
					(entry) => entry.name == name,
				) ??
				this.customActionsFromFile?.find(
					(entry) => entry.name == name,
				) ??
				({ type: 'button', name: '' } as IElementConfig),
		);

		const defaultKeysList = this.DEFAULT_KEYS.map((entry) => {
			if (customActionNames.includes(entry.name)) {
				return '';
			}

			const context = this.getEntryContext(entry as IElementConfig);
			const iconElement = this.buildIconElement(entry, context);
			return html`<li
				class="action-list-item"
				draggable="true"
				@dragstart=${this.handleLayoutActionListItemDragStart}
			>
				${iconElement} ${entry.name}
			</li>`;
		});

		const defaultSourcesList = this.DEFAULT_SOURCES.length
			? this.DEFAULT_SOURCES.sort((a, b) =>
					a.name < b.name ? -1 : 1,
			  ).map((entry) => {
					if (customActionNames.includes(entry.name)) {
						return '';
					}

					const context = this.getEntryContext(
						entry as IElementConfig,
					);
					const iconElement = this.buildIconElement(entry, context);
					return html`<li
						class="action-list-item"
						draggable="true"
						@dragstart=${this.handleLayoutActionListItemDragStart}
					>
						${iconElement} ${entry.name}
					</li>`;
			  })
			: '';

		return html`<div class="content">
			<div class="layout-editor">
				${this.buildCodeEditor('layout')}
				<div class="actions-list-container">
					${customActions?.length
						? html`<div
									class="action-list-container custom-action-list-container"
								>
									<div class="title-header">
										Custom Elements
									</div>
									<ul
										class="action-list two-column-action-list"
									>
										${customActions.map((entry) => {
											const context =
												this.getEntryContext(
													entry as IElementConfig,
												);
											const iconElement =
												this.buildIconElement(
													entry,
													context,
												);
											return html`<li
												class="action-list-item"
												draggable="true"
												@dragstart=${this
													.handleLayoutActionListItemDragStart}
											>
												${iconElement} ${entry.name}
											</li>`;
										})}
									</ul>
								</div>
								<div><hr /></div>`
						: ''}
					<div class="default-action-lists-container">
						${this.DEFAULT_KEYS.length
							? html`<div class="wrapper">
									<div class="title-header">Default Keys</div>
									<div class="action-list-container">
										<ul
											class="action-list ${defaultSourcesList.length
												? ''
												: 'two-column-action-list'}"
										>
											${defaultKeysList}
										</ul>
									</div>
							  </div>`
							: ''}
						${defaultSourcesList.length
							? html`<div class="wrapper">
									<div class="title-header">
										Default Sources
									</div>
									<div class="action-list-container">
										<ul class="action-list">
											${defaultSourcesList}
										</ul>
									</div>
							  </div>`
							: ''}
					</div>
				</div>
			</div>
		</div> `;
	}

	buildGeneralEditor(platform: Platform) {
		return html`
			<div class="content">
				<div class="gui-editor">
					<div class="wrapper">
						<div class="title-header">
							Media Platform and Entity IDs
						</div>
						${this.buildSelector(
							'Platform',
							'platform',
							{
								select: {
									mode: 'dropdown',
									options: Platforms,
									reorder: false,
								},
							},
							'Android TV',
						)}
						<div class="form">
							${RemotePlatforms.includes(platform)
								? this.buildSelector('Remote ID', 'remote_id', {
										entity: {
											filter: {
												domain: 'remote',
											},
										},
								  })
								: ''}
							${MediaPlayerPlatforms.includes(platform)
								? this.buildSelector(
										'Media Player ID',
										'media_player_id',
										{
											entity: {
												filter: {
													domain: 'media_player',
												},
											},
										},
								  )
								: ''}
							${ADBKeyboardPlatforms.includes(
								platform as KeyboardPlatform,
							)
								? this.buildSelector(
										'Keyboard ID',
										'keyboard_id',
										{
											entity: {
												filter: {
													domain: [
														'remote',
														'media_player',
													],
												},
											},
										},
								  )
								: ''}
							${DevicePlatforms.includes(platform)
								? this.buildSelector(
										'Remote/Device Name',
										'device',
										{
											text: {},
										},
								  )
								: ''}
						</div>
					</div>
					<div class="wrapper">
						<div class="title-header">Action Timings</div>
						<div class="form">
							${this.buildSelector(
								'Hold time',
								'hold_time',
								{
									number: {
										min: 0,
										step: 0,
										mode: 'box',
										unit_of_measurement: 'ms',
									},
								},
								HOLD_TIME,
							)}
							${this.buildSelector(
								'Repeat delay',
								'repeat_delay',
								{
									number: {
										min: 0,
										step: 0,
										mode: 'box',
										unit_of_measurement: 'ms',
									},
								},
								REPEAT_DELAY,
							)}
							${this.buildSelector(
								'Double tap window',
								'double_tap_window',
								{
									number: {
										min: 0,
										step: 0,
										mode: 'box',
										unit_of_measurement: 'ms',
									},
								},
								DOUBLE_TAP_WINDOW,
							)}
						</div>
					</div>
					<div class="wrapper">
						<div class="title-header">Miscellaneous</div>
						${this.buildCodeEditor('css')}
						<div class="form">
							${this.buildSelector(
								'Autofill',
								'autofill_entity_id',
								{
									boolean: {},
								},
								AUTOFILL,
							)}
							${this.buildSelector(
								'Haptics',
								'haptics',
								{
									boolean: {},
								},
								HAPTICS,
							)}
						</div>
						<div class="selector-margin">
							${this.buildSelector('Title', 'title', {
								text: {},
							})}
						</div>
						<div class="selector-margin">
							${this.buildSelector(
								'Custom Elements File',
								'custom_actions_file',
								{ text: {} },
							)}
						</div>
					</div>
					<ha-button @click=${this.handleUpdateDeprecatedConfig}>
						<ha-icon .icon=${'mdi:cog'} slot="start"></ha-icon
						>Update old config</ha-button
					>
				</div>
			</div>
		`;
	}

	buildErrorPanel() {
		return html`
			${this.errors && this.errors.length > 0
				? html`<div class="error">
						${this.hass.localize(
							'ui.errors.config.error_detected',
						)}:
						<br />
						<ul>
							${this.errors!.map(
								(error) => html`<li>${error}</li>`,
							)}
						</ul>
				  </div>`
				: ''}
		`;
	}

	buildAlertBox(
		title:
			| string
			| TemplateResult = "Set the action below, and then use the code editor to set a data field to the feature's new value using a template like '{{ value | float }}'.",
		type: 'info' | 'warning' | 'error' | 'success' = 'info',
	) {
		return html`<ha-alert
			.title="${title}"
			.alertType="${type}"
		></ha-alert>`;
	}

	buildPeopleList() {
		if (!this.people.length) {
			const peopleEntities = Object.keys(this.hass.states).filter(
				(entity) => entity.startsWith('person.'),
			);
			for (const person of peopleEntities) {
				this.people.push({
					value: this.hass.states[person].attributes.user_id,
					label:
						this.hass.states[person].attributes.friendly_name ??
						this.hass.states[person].attributes.id ??
						person,
				});
			}
		}
	}

	fetchCustomActionsFromFile(filename?: string) {
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
		}
	}

	render() {
		if (!this.hass || !this.config) {
			return html``;
		}

		const context = {
			config: {
				...this.config,
				entity: this.renderTemplate(
					this.config.remote_id ??
						this.config.media_player_id ??
						this.config.keyboard_id ??
						'',
					{},
				),
				attribute: 'state',
			},
		};

		this.buildPeopleList();
		this.fetchCustomActionsFromFile(
			this.renderTemplate(
				this.config.custom_actions_file ?? '',
				{},
			) as string,
		);

		const platform = this.renderTemplate(
			this.config.platform ?? 'Android TV',
			context,
		) as Platform;
		if (this.PLATFORM != platform) {
			this.PLATFORM = platform;
			[this.DEFAULT_KEYS, this.DEFAULT_SOURCES] =
				getDefaultActions(platform);
		}

		const baseTabBar = this.buildTabBar(
			this.baseTabIndex,
			this.handleBaseTabSelected,
			this.BASE_TABS,
		);

		let editor: TemplateResult<1>;
		switch (this.baseTabIndex) {
			case 3:
			case 2:
				if (this.entryIndex > -1 && this.activeEntry) {
					editor = html`${this.buildEntryEditor()}`;
				} else {
					editor = html`
						${this.buildEntryList()}${this.buildAddEntryButton()}
					`;
				}
				break;
			case 1:
				editor = this.buildLayoutEditor();
				break;
			case 0:
			default:
				editor = this.buildGeneralEditor(platform);
				break;
		}

		return html`${baseTabBar}${editor}${this.buildErrorPanel()}`;
	}

	renderTemplate(str: string | number | boolean, context: object) {
		if (!hasTemplate(str)) {
			return str;
		}

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

	getEntryContext(entry?: IElementConfig) {
		const context = {
			value: 0,
			hold_secs: 0,
			unit: '',
			config: {
				...entry,
				entity: '',
				attribute: '',
			},
		};
		context.config.attribute = this.renderTemplate(
			entry?.value_attribute ?? 'state',
			context,
		) as string;
		context.config.entity = this.renderTemplate(
			entry?.entity_id ??
				(Array.isArray(entry?.tap_action?.target?.entity_id)
					? entry?.tap_action?.target?.entity_id?.[0]
					: (entry?.tap_action?.target?.entity_id as string)) ??
				this.config.remote_id ??
				this.config.media_player_id ??
				this.config.keyboard_id,
			context,
		) as string;
		const unit = this.renderTemplate(
			entry?.unit_of_measurement as string,
			context,
		) as string;
		context.unit = unit;
		const value = this.getFeatureValue(
			context.config.entity,
			context.config.attribute,
		);
		context.value = value;
		return context;
	}

	getFeatureValue(entityId: string, valueAttribute: string) {
		if (!this.hass.states[entityId]) {
			return '';
		} else if (valueAttribute == 'state' || !valueAttribute) {
			return this.hass.states[entityId].state;
		} else {
			let value;
			const indexMatch = valueAttribute.match(/\[\d+\]$/);
			if (indexMatch) {
				const index = parseInt(indexMatch[0].replace(/\[|\]/g, ''));
				valueAttribute = valueAttribute.replace(indexMatch[0], '');
				value = this.hass.states[entityId].attributes[valueAttribute];
				if (value && Array.isArray(value) && value.length) {
					return value[index];
				} else {
					return undefined;
				}
			} else {
				value = this.hass.states[entityId].attributes[valueAttribute];
			}
			if (value != undefined || valueAttribute == 'elapsed') {
				switch (valueAttribute) {
					case 'brightness':
						return Math.round(
							(100 * parseInt((value as string) ?? 0)) / 255,
						);
					case 'elapsed':
						if (entityId.startsWith('timer.')) {
							const durationHMS =
								this.hass.states[
									entityId
								].attributes.duration.split(':');
							const durationSeconds =
								parseInt(durationHMS[0]) * 3600 +
								parseInt(durationHMS[1]) * 60 +
								parseInt(durationHMS[2]);
							if (this.hass.states[entityId].state == 'idle') {
								return 0;
							} else if (
								this.hass.states[entityId].state == 'active'
							) {
								const endSeconds = Date.parse(
									this.hass.states[entityId].attributes
										.finishes_at,
								);
								const remainingSeconds =
									(endSeconds - Date.now()) / 1000;
								const value = Math.floor(
									durationSeconds - remainingSeconds,
								);
								return Math.min(value, durationSeconds);
							} else {
								const remainingHMS =
									this.hass.states[
										entityId
									].attributes.remaining.split(':');
								const remainingSeconds =
									parseInt(remainingHMS[0]) * 3600 +
									parseInt(remainingHMS[1]) * 60 +
									parseInt(remainingHMS[2]);
								return Math.floor(
									durationSeconds - remainingSeconds,
								);
							}
						}
					// falls through
					default:
						return value;
				}
			}
			return value;
		}
	}

	autofillDefaultFields(config: IConfig) {
		const updatedConfig = structuredClone(config);
		const updatedEntries: IElementConfig[] = [];

		for (const entry of updatedConfig.custom_actions ?? []) {
			updatedEntries.push(
				this.autofillDefaultEntryFields(updatedConfig, entry),
			);
		}
		updatedConfig.custom_actions = updatedEntries;
		return updatedConfig;
	}

	autofillDefaultEntryFields(
		config: IConfig,
		entry: IElementConfig,
		parentName?: string,
		childName?: string,
	) {
		const context = this.getEntryContext(entry);
		if (
			this.renderTemplate(
				(entry.autofill_entity_id ??
					config.autofill_entity_id ??
					AUTOFILL) as unknown as string,
				context,
			)
		) {
			// Copy custom action onto default action
			if (parentName && childName) {
				const parentActions =
					structuredClone(
						[
							...(this.customActionsFromFile ?? []),
							...this.DEFAULT_KEYS,
							...this.DEFAULT_SOURCES,
						].find(
							(defaultActions) =>
								defaultActions.name == parentName,
						),
					) ?? ({} as IElementConfig);
				const defaultActions =
					parentActions[childName as DirectionAction];
				entry = {
					...defaultActions,
					...entry,
				};
			} else {
				const actions =
					structuredClone(
						[
							...(this.customActionsFromFile ?? []),
							...this.DEFAULT_KEYS,
							...this.DEFAULT_SOURCES,
						].find(
							(defaultActions) =>
								defaultActions.name ==
								this.renderTemplate(entry.name, context),
						),
					) ?? ({} as IElementConfig);
				entry = {
					...actions,
					...entry,
					value_attribute:
						entry.value_attribute ?? actions.value_attribute,
				};
			}

			for (const actionType of ActionTypes) {
				if (entry[actionType]) {
					const action = entry[actionType] ?? ({} as IAction);

					switch (this.renderTemplate(action.action, context)) {
						case 'keyboard':
						case 'textbox':
						case 'search':
						case 'key':
						case 'source':
							// Do nothing
							break;
						case 'toggle':
						case 'more-info':
						case 'service' as 'perform-action':
						case 'perform-action':
							// Move target IDs from data to target
							for (const targetId of [
								'entity_id',
								'device_id',
								'area_id',
								'label_id',
							]) {
								if (action.data?.[targetId]) {
									action.target = action.target ?? {};
									action.target[targetId as keyof ITarget] =
										action.data?.[targetId] as
											| string
											| string[];
									delete action.data?.[targetId];
								}
							}
						// falls through
						default:
							// Remove keyboard/key/source fields
							delete action.keyboard_id;
							delete action.keyboard_prompt;
							delete action.remote_id;
							delete action.media_player_id;
							delete action.platform;
							break;
					}

					entry[actionType] = action;
				}
			}

			for (const direction of DirectionActions) {
				if (entry[direction]) {
					entry[direction] = this.autofillDefaultEntryFields(
						config,
						(entry[direction] ?? {}) as IElementConfig,
						this.renderTemplate(entry.name, context) as string,
						direction,
					);
				}
			}
		}
		return entry;
	}

	handleUpdateDeprecatedConfig() {
		const config = this.updateDeprecatedFields(this.config);
		this.configChanged(config);
	}

	updateDeprecatedFields(config: IConfig = this.config): IConfig {
		const updatedConfig = structuredClone(config);

		// Update card type
		updatedConfig.type = 'custom:universal-remote-card';

		// Convert old root level key names to new
		if ('adb_id' in updatedConfig) {
			updatedConfig.keyboard_id = (
				updatedConfig as Record<string, string>
			).adb_id;
			delete (updatedConfig as Record<string, string>).adb_id;
		}
		if ('keyboard_mode' in updatedConfig) {
			updatedConfig.platform = (updatedConfig as Record<string, string>)
				.keyboard_mode as Platform;
			delete (updatedConfig as Record<string, string>).keyboard_mode;
		}
		updatedConfig.platform = Platforms.includes(
			updatedConfig.platform as Platform,
		)
			? updatedConfig.platform
			: 'Android TV';

		// Old haptic feedback toggle names
		if ('enable_button_feedback' in updatedConfig) {
			updatedConfig.haptics = (
				updatedConfig as Record<string, boolean>
			).enable_button_feedback;
		}
		if ('button_haptics' in updatedConfig) {
			updatedConfig.haptics = (
				updatedConfig as Record<string, boolean>
			).button_haptics;
		}

		// Convert old _row keys into rows array
		if (!updatedConfig.rows) {
			const rows: string[][] = [];
			const rowNames = Object.keys(updatedConfig).filter((row) =>
				row.includes('_row'),
			);
			for (const name of rowNames) {
				let row = (config as Record<string, string[]>)[name];
				if (typeof row == 'string') {
					row = [row];
				}
				if (name == 'volume_row') {
					row = ['volume_' + row[0]];
				} else if (name == 'navigation_row') {
					row = ['navigation_' + row[0]];
				}
				rows.push(row);
				delete (updatedConfig as Record<string, string[]>)[name];
			}
			updatedConfig.rows = rows;
		}

		// Convert deprecated special case names to single new one
		const rowsString = JSON.stringify(updatedConfig.rows ?? [])
			.replace(/vol_buttons/g, 'volume_buttons')
			.replace(/nav_buttons/g, 'navigation_buttons')
			.replace(/d_pad/g, 'dpad')
			.replace(/direction_pad/g, 'dpad')
			.replace(/num_pad/g, 'numpad')
			.replace(/number_pad/g, 'numpad')
			.replace(/x_pad/g, 'xpad')
			.replace(/gamepad/g, 'xpad')
			.replace(/xgamepad/g, 'xpad')
			.replace(/x_gamepad/g, 'xpad')
			.replace(/n_pad/g, 'npad')
			.replace(/ngamepad/g, 'npad')
			.replace(/n_gamepad/g, 'npad')
			.replace(/volume_slider/g, 'slider')
			.replace(/nav_touchpad/g, 'touchpad')
			.replace(/navigation_touchpad/g, 'touchpad');
		updatedConfig.rows = JSON.parse(rowsString) as Row[];

		// Convert old custom icons object into an array
		if (
			!Array.isArray(updatedConfig.custom_icons) &&
			typeof updatedConfig.custom_icons == 'object' &&
			updatedConfig.custom_icons != null
		) {
			const customIcons: IIconConfig[] = [];
			for (const name of Object.keys(
				updatedConfig.custom_icons as unknown as Record<string, string>,
			)) {
				customIcons.push({
					name: name,
					path: updatedConfig?.custom_icons?.[name],
				});
			}
			updatedConfig.custom_icons = customIcons;
		}

		// Convert old custom actions object into an array
		let customActions: IElementConfig[] = [];
		if (
			!Array.isArray(updatedConfig.custom_actions) &&
			typeof updatedConfig.custom_actions == 'object' &&
			updatedConfig.custom_actions != null
		) {
			for (const name of Object.keys(
				updatedConfig.custom_actions as unknown as Record<
					string,
					IElementConfig
				>,
			)) {
				customActions.push({
					...(updatedConfig.custom_actions?.[
						name
					] as unknown as IElementConfig),
					name: name,
				});
			}
		} else {
			customActions = updatedConfig.custom_actions ?? [];
		}

		// Combine custom actions, custom keys, and custom sources fields
		for (const customKeys of ['custom_keys', 'custom_sources']) {
			if (customKeys in updatedConfig) {
				for (const name of Object.keys(
					updatedConfig[
						customKeys as keyof IConfig
					] as unknown as Record<string, IElementConfig>,
				)) {
					customActions.push({
						...((
							updatedConfig[
								customKeys as keyof IConfig
							] as unknown as Record<string, IElementConfig>
						)?.[name] as unknown as IElementConfig),
						name: name,
					});
				}
				delete updatedConfig[customKeys as keyof IConfig];
			}
		}

		// Copy slider fields
		const sliderIndex = customActions.findIndex(
			(customAction) => customAction.name == 'slider',
		);
		const slider = customActions[sliderIndex] ?? {
			type: 'slider',
			name: 'slider',
		};
		let updateSlider = false;
		if ('slider_style' in updatedConfig) {
			let styles = slider.styles ?? '';
			styles += '\n:host {';
			const style = updatedConfig[
				'slider_style' as keyof IConfig
			] as unknown as Record<string, string>;
			for (const field in style) {
				styles += `\n  ${field}: ${style[field]};`;
			}
			styles += `\n}`;
			slider.styles = styles.trim();
			delete updatedConfig['slider_style' as keyof IConfig];
			updateSlider = true;
		}
		if ('tooltip' in slider) {
			let styles = slider.styles ?? '';
			styles += `\n.tooltip {\n  display: {{ "initial" if render(${slider.tooltip}) else "none" }};\n}`;
			slider.styles = styles.trim();
			updateSlider = true;
		}
		if ('slider_range' in updatedConfig) {
			slider.range = updatedConfig.slider_range as [number, number];
			delete updatedConfig.slider_range;
			updateSlider = true;
		}
		if ('slider_step' in updatedConfig) {
			slider.step = updatedConfig.slider_step as number;
			delete updatedConfig.slider_step;
			updateSlider = true;
		}
		if ('slider_attribute' in updatedConfig) {
			slider.value_attribute = updatedConfig.slider_attribute as string;
			delete updatedConfig.slider_attribute;
			updateSlider = true;
		}
		if ('enable_slider_feedback' in updatedConfig) {
			slider.haptics = updatedConfig.enable_slider_feedback as boolean;
			delete updatedConfig.enable_slider_feedback;
			updateSlider = true;
		}
		if ('slider_haptics' in updatedConfig) {
			slider.haptics = updatedConfig.slider_haptics as boolean;
			delete updatedConfig.slider_haptics;
			updateSlider = true;
		}
		if ('slider_id' in updatedConfig) {
			if (!updatedConfig.media_player_id) {
				updatedConfig.media_player_id =
					updatedConfig.slider_id as string;
			}
			slider.entity_id =
				slider.entity_id ??
				(updatedConfig.slider_id as string) ??
				config.media_player_id ??
				'';
			const tapAction =
				slider.tap_action ??
				structuredClone(
					this.DEFAULT_KEYS.find(
						(defaultKey) => defaultKey.name == 'slider',
					)?.tap_action,
				);
			if (tapAction) {
				const data = tapAction.data ?? {};
				const target = tapAction.target ?? {};
				if (!('entity_id' in target)) {
					target.entity_id =
						(data.entity_id as string) ??
						(updatedConfig.slider_id as string);
					delete data.entity_id;
				}
				tapAction.data = data;
				tapAction.target = target;
			}
			slider.tap_action = tapAction;
			delete updatedConfig.slider_id;
			updateSlider = true;
		}
		if (updateSlider) {
			const defaultSlider = structuredClone(
				this.DEFAULT_KEYS.find(
					(defaultKey) => defaultKey.name == 'slider',
				),
			);
			if (sliderIndex > -1) {
				customActions[sliderIndex] = {
					...defaultSlider,
					...slider,
				};
			} else {
				customActions.push({
					...defaultSlider,
					...slider,
				});
			}
		}

		const touchpadIndex = customActions.findIndex(
			(customAction) => customAction.name == 'touchpad',
		);
		const touchpad = customActions[touchpadIndex] ?? {
			type: 'touchpad',
			name: 'touchpad',
		};
		let updateTouchpad = false;
		if ('touchpad_style' in updatedConfig) {
			let styles = touchpad.styles ?? '';
			styles += '\ntoucharea {';
			const style = updatedConfig[
				'touchpad_style' as keyof IConfig
			] as unknown as Record<string, string>;
			for (const field in style) {
				styles += `\n  ${field}: ${style[field]};`;
			}
			styles += `\n}`;
			touchpad.styles = styles.trim();
			delete updatedConfig['touchpad_style' as keyof IConfig];
			updateTouchpad = true;
		}
		if ('touchpad_height' in updatedConfig) {
			let styles = touchpad.styles ?? '';
			styles += `\ntoucharea {\n  height: ${
				(updatedConfig as Record<string, string>)['touchpad_height']
			};\n}`;
			touchpad.styles = styles.trim();
			delete (updatedConfig as Record<string, string>)['touchpad_height'];
			updateTouchpad = true;
		}
		if ('enable_touchpad_feedback' in updatedConfig) {
			touchpad.haptics = (
				updatedConfig as Record<string, boolean>
			).enable_touchpad_feedback;
			delete (updatedConfig as Record<string, boolean>)
				.enable_touchpad_feedback;
			updateTouchpad = true;
		}
		if ('touchpad_haptics' in updatedConfig) {
			touchpad.haptics = (
				updatedConfig as Record<string, boolean>
			).touchpad_haptics;
			delete (updatedConfig as Record<string, boolean>).touchpad_haptics;
			updateTouchpad = true;
		}
		if ('enable_double_click' in updatedConfig) {
			touchpad.double_tap_action = {
				action: 'key',
				key: (updatedConfig['double_click_keycode' as keyof IConfig] ??
					'BACK') as string,
			};
			delete updatedConfig.enable_double_click;
			delete updatedConfig['double_click_keycode' as keyof IConfig];
			updateTouchpad = true;
		}
		if ('long_click_keycode' in updatedConfig) {
			touchpad.hold_action = {
				action: 'key',
				key: (updatedConfig.long_click_keycode ??
					'DPAD_CENTER') as string,
			};
			updateTouchpad = true;
		}
		const defaultTouchpad = structuredClone(
			this.DEFAULT_KEYS.find(
				(defaultKey) => defaultKey.name == 'touchpad',
			),
		) as IElementConfig;
		if (updatedConfig.rows.toString().includes('touchpad')) {
			const centerCustomAction = customActions.find(
				(customAction) => customAction.name == 'center',
			);
			if (centerCustomAction) {
				for (const actionType of ActionTypes) {
					if (centerCustomAction[actionType]) {
						touchpad[actionType] = centerCustomAction[actionType];
					} else if (
						defaultTouchpad[actionType] &&
						!touchpad[actionType]
					) {
						touchpad[actionType] = defaultTouchpad[actionType];
					}
				}
				updateTouchpad = true;
			}
			for (const direction of DirectionActions) {
				const customAction = customActions.find(
					(customAction) => customAction.name == direction,
				);
				if (
					!touchpad[direction] &&
					customAction &&
					updatedConfig.rows.toString().includes('touchpad')
				) {
					touchpad[direction] = customAction;
					delete touchpad[direction]?.icon;
					updateTouchpad = true;
				}
			}
		}
		if (updateTouchpad) {
			for (const direction of DirectionActions) {
				if (!touchpad[direction]) {
					touchpad[direction] = defaultTouchpad[direction] ?? {};
					delete touchpad[direction]?.['type' as keyof IBasicActions];
					delete touchpad[direction]?.icon;
				}
			}
			if (touchpadIndex > -1) {
				customActions[touchpadIndex] = {
					...defaultTouchpad,
					...touchpad,
				};
			} else {
				customActions.push({
					...defaultTouchpad,
					...touchpad,
				});
			}
		}

		for (const [i, entry] of customActions.entries()) {
			const updatedEntry = this.updateDeprecatedActionFields(
				entry,
				customActions,
			);
			for (const direction of DirectionActions) {
				if (updatedEntry[direction]) {
					updatedEntry[direction] = this.updateDeprecatedActionFields(
						updatedEntry[direction] as IElementConfig,
						customActions,
					);
				}
			}
			customActions[i] = updatedEntry;
		}

		// Convert style object to styles string
		if (updatedConfig['style' as keyof IConfig]) {
			let styles = updatedConfig.styles ?? '';
			styles += '\n:host {';
			const style = updatedConfig[
				'style' as keyof IConfig
			] as unknown as Record<string, string>;
			for (const field in style) {
				styles += `\n  ${field}: ${style[field]};`;
			}
			styles += `\n}`;
			updatedConfig.styles = styles.trim();
			delete updatedConfig['style' as keyof IConfig];
		}

		// Convert button style object to styles string
		if (updatedConfig['button_style' as keyof IConfig]) {
			let styles = updatedConfig.styles ?? '';
			styles += '\nremote-button {';
			const style = updatedConfig[
				'button_style' as keyof IConfig
			] as unknown as Record<string, string>;
			for (const field in style) {
				styles += `\n  ${field}: ${style[field]};`;
			}
			styles += `\n}`;
			updatedConfig.styles = styles.trim();
			delete updatedConfig['button_style' as keyof IConfig];
		}

		// Convert row styles object to styles string
		if (updatedConfig['row_styles' as keyof IConfig]) {
			let styles = updatedConfig.styles ?? '';
			const rowStyles = updatedConfig[
				'row_styles' as keyof IConfig
			] as unknown as Record<string, Record<string, string>>;
			for (const style in rowStyles) {
				if (style.includes('-')) {
					styles += `\n#${style} {`;
				} else if (style == 'rows') {
					styles += '\n.row {';
				} else if (style == 'columns') {
					styles += '\n.column {';
				} else {
					continue;
				}
				for (const field in rowStyles[style]) {
					styles += `\n  ${field}: ${rowStyles[style][field]};`;
				}
				styles += '\n}';
			}
			updatedConfig.styles = styles.trim();
			delete updatedConfig['row_styles' as keyof IConfig];
		}

		updatedConfig.custom_actions = customActions;
		return updatedConfig;
	}

	updateDeprecatedActionFields(
		entry: IElementConfig,
		customActions: IElementConfig[],
	) {
		let customAction = structuredClone(entry);

		// Copy svg_path to icon
		if ('svg_path' in customAction) {
			customAction.icon = customAction.svg_path as string;
		}

		// Copy action fields to tap_action
		const actionKeys = [
			'key',
			'source',
			'service',
			'service_data',
			'data',
			'target',
			'navigation_path',
			'navigation_replace',
			'url_path',
			'confirmation',
			'pipeline_id',
			'start_listening',
		];
		const tapAction = customAction.tap_action ?? ({} as IAction);
		let updateTapAction = false;
		for (const actionKey of actionKeys) {
			if (actionKey in customAction) {
				updateTapAction = true;
				(tapAction as unknown as Record<string, string>)[actionKey] =
					customAction[actionKey as keyof IElementConfig] as string;
				delete (customAction as unknown as Record<string, string>)[
					actionKey
				];
			}
		}
		if (updateTapAction) {
			customAction.tap_action = tapAction as IAction;
		}

		// For each type of action
		for (const actionType of ActionTypes) {
			if (actionType in customAction) {
				const action = customAction[
					actionType as ActionType
				] as IAction;
				if (action) {
					// Populate action field
					if (!action.action) {
						if (action.key) {
							action.action = 'key';
						} else if (action.source) {
							action.action = 'source';
						} else if (action.perform_action) {
							action.action = 'perform-action';
						} else if (action['service' as 'perform_action']) {
							// Deprecated in 2024.8
							action.action = 'perform-action';
							action.perform_action =
								action['service' as 'perform_action'];
							delete action['service' as 'perform_action'];
						} else if (action.navigation_path) {
							action.action = 'navigate';
						} else if (action.url_path) {
							action.action = 'url';
						} else if (action.browser_mod) {
							action.action = 'fire-dom-event';
						} else if (
							action.pipeline_id ||
							action.start_listening
						) {
							action.action = 'assist';
						} else {
							action.action = 'none';
						}
					} else if (
						action.action == ('call-service' as 'perform-action')
					) {
						action.action = 'perform-action';
						action.perform_action =
							action['service' as 'perform_action'] ?? '';
						delete action['service' as 'perform_action'];
					}

					// Rename service_data to data
					if (action['service_data' as 'data']) {
						action.data = {
							...action['service_data' as 'data'],
							...action.data,
						};
						delete action['service_data' as 'data'];
					}

					customAction[actionType] = action;
				}
			}
		}

		// Set entry type to button if not present
		customAction.type = (
			customAction.type ?? 'button'
		).toLowerCase() as RemoteElementType;

		// Convert style object to styles string
		if (customAction['style' as keyof IElementConfig]) {
			let styles = customAction.styles ?? '';
			styles += '\n:host {';
			const style = customAction[
				'style' as keyof IElementConfig
			] as Record<string, string>;
			for (const field in style) {
				styles += `\n  ${field}: ${style[field]};`;
			}
			styles += '\n}';
			customAction.styles = styles.trim();
			delete customAction['style' as keyof IElementConfig];
		}

		// Obsolete template field
		if ('template' in entry) {
			const templateActions =
				customActions?.find(
					(customActions) =>
						entry['template' as keyof IElementConfig] ==
						customActions.name,
				) ??
				this.DEFAULT_KEYS.find(
					(defaultKeys) =>
						entry['template' as keyof IElementConfig] ==
						defaultKeys.name,
				) ??
				this.DEFAULT_SOURCES.find(
					(defaultSources) =>
						entry['template' as keyof IElementConfig] ==
						defaultSources.name,
				) ??
				{};
			customAction = mergeDeep(
				structuredClone(templateActions),
				entry,
			) as IElementConfig;
			delete customAction['template' as keyof IElementConfig];
		}

		return customAction;
	}

	static get styles() {
		return css`
			:host {
				display: flex;
				flex-direction: column;
				-webkit-tap-highlight-color: transparent;
				-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
			}
			.content {
				padding: 12px;
				display: inline-flex;
				flex-direction: column;
				gap: 24px;
				box-sizing: border-box;
				width: 100%;
			}
			.action-options {
				display: inline-flex;
				flex-direction: column;
				gap: 8px;
				box-sizing: border-box;
				width: 100%;
			}
			sl-tab-group {
				text-transform: capitalize;
			}
			sl-tab {
				flex: 1;
			}
			sl-tab::part(base) {
				width: 100%;
				justify-content: center;
			}

			ha-expansion-panel {
				display: block;
				border-radius: 6px;
				border: solid 1px var(--outline-color);
				--ha-card-border-radius: 6px;
				--expansion-panel-content-padding: 0;
			}
			ha-icon {
				display: flex;
				color: var(--secondary-text-color);
			}
			.add-list-item {
				margin: 0 18px 12px;
			}
			ha-button {
				width: fit-content;
				--mdc-icon-size: 24px;
			}
			ha-button::part(label) {
				text-transform: capitalize;
			}
			ha-list-item {
				text-transform: capitalize;
			}

			.features {
				max-height: 480px;
				overflow: auto;
				overflow-y: scroll;
			}
			.feature-list-item {
				display: flex;
				align-items: center;
				pointer-events: none;
			}
			.handle {
				display: flex;
				align-items: center;
				cursor: move;
				cursor: grab;
				padding-right: 8px;
				padding-inline-end: 8px;
				padding-inline-start: initial;
				direction: var(--direction);
				pointer-events: all;
			}
			.feature-list-item-content {
				height: 60px;
				font-size: 16px;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				flex-grow: 1;
				gap: 8px;
				overflow: hidden;
			}
			.primary:first-letter {
				text-transform: capitalize;
			}
			.feature-list-item-label {
				display: flex;
				flex-direction: column;
			}
			.secondary {
				font-size: 12px;
				color: var(--secondary-text-color);
			}

			.copy-icon,
			.edit-icon,
			.remove-icon {
				color: var(--secondary-text-color);
				pointer-events: all;
				--mdc-icon-button-size: 36px;
			}

			.header {
				display: inline-flex;
				justify-content: space-between;
				align-items: center;
				padding-top: 4px;
			}
			.text-icon {
				color: var(--mdc-dialog-content-ink-color, rgba(0, 0, 0, 0.6));
			}
			.back-title {
				display: flex;
				align-items: center;
				font-size: 18px;
			}

			.wrapper {
				width: 100%;
			}
			.gui-editor {
				display: inline-flex;
				flex-direction: column;
				gap: 24px;
				padding: 8px 0px;
				width: 100%;
			}
			.yaml-editor {
				display: inline-flex;
				flex-direction: column;
				padding: 8px 0px;
				width: 100%;
			}
			ha-code-editor {
				--code-mirror-max-height: calc(100vh - 245px);
			}
			.layout-editor {
				display: flex;
				flex-direction: column;
				font-weight: 500;
			}
			.actions-list-container {
				background: var(
					--code-editor-background-color,
					var(--mdc-text-field-fill-color, whitesmoke)
				);
				padding: 4px;
				border-radius: 4px;
			}
			.default-action-lists-container {
				display: flex;
				flex-direction: row;
			}
			.action-list-container {
				max-height: 285px;
				overflow: scroll;
				scrollbar-width: thin;
				overflow-x: hidden;
			}
			.custom-action-list-container {
				max-height: 190px;
			}
			.action-list {
				columns: 1;
				-webkit-columns: 1;
				-moz-columns: 1;
				margin-top: 4px;
				padding-left: 4px;
			}
			.two-column-action-list {
				columns: 2;
				-webkit-columns: 2;
				-moz-columns: 2;
			}
			.action-list-item::marker {
				content: '';
			}
			.action-list-item {
				display: flex;
				flex-direction: row;
				align-items: center;
				gap: 4px;
				padding: 2px 0;
			}
			.action-list-item-label {
				width: 100%;
				background: none;
				border: none;
				outline: none;
				font-family: monospace;
				font-size: 14px;
			}
			.error,
			.info {
				word-break: break-word;
				margin-top: 8px;
			}
			.error {
				color: var(--error-color);
			}
			.error ul {
				margin: 4px 0;
			}
			.warning li,
			.error li {
				white-space: pre-wrap;
			}

			.title-header {
				font-size: 20px;
				font-weight: 500;
				padding: 12px 4px;
			}
			.panel-header {
				display: inline-flex;
				gap: 4px;
			}
			.style-header {
				font-size: var(--mdc-typography-body1-font-size, 1rem);
				font-weight: 500;
				padding: 8px;
			}

			.form {
				display: grid;
				grid-template-columns: repeat(
					var(--form-grid-column-count, auto-fit),
					minmax(var(--form-grid-min-width, 200px), 1fr)
				);
				gap: 24px 8px;
				align-items: end;
				padding: 8px 0;
			}
			.actions-form {
				display: grid;
				grid-template-columns: repeat(
					var(--form-grid-column-count, auto-fit),
					minmax(var(--form-grid-min-width, 200px), 1fr)
				);
				gap: 12px;
				align-items: end;
			}
			.selector-margin {
				margin: 8px 0;
			}
			.custom-icon-picked {
				position: absolute;
				padding: 16px;
				pointer-events: none;
			}
			.custom-icon-preview {
				align-self: center;
				outline: 1px dashed var(--primary-color);
				--mdc-icon-size: 50%;
			}
			mwc-tab-bar {
				--mdc-tab-horizontal-padding: 16px;
			}
		`;
	}
}
