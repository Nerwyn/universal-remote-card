import { CSSResult, LitElement, PropertyValues, css, html } from 'lit';
import { property, state } from 'lit/decorators.js';

import { hasTemplate, renderTemplate } from 'ha-nunjucks';
import {
	Action,
	HapticType,
	HomeAssistant,
	IConfirmation,
} from '../models/interfaces';

import { load } from 'js-yaml';
import { UPDATE_AFTER_ACTION_DELAY } from '../models/constants';
import {
	ActionType,
	IAction,
	IActions,
	IData,
	IElementConfig,
	IIconConfig,
} from '../models/interfaces';
import { MdRipple } from '../models/interfaces/MdRipple';
import { defaultIcons } from '../models/maps';
import { deepGet, deepSet, getDeepKeys } from '../utils';

export class BaseRemoteElement extends LitElement {
	@property() hass!: HomeAssistant;
	@property() config!: IElementConfig;
	@property() icons: IIconConfig[] = [];

	rippleEndTimer?: ReturnType<typeof setTimeout>;

	@state() value?: string | number | boolean = 0;
	entityId?: string;
	valueAttribute?: string;
	getValueFromHass: boolean = true;
	getValueFromHassTimer?: ReturnType<typeof setTimeout>;
	valueUpdateInterval?: ReturnType<typeof setInterval>;

	icon: string = '';
	label: string = '';
	styles: string = '';

	unitOfMeasurement: string = '';
	precision?: number;

	momentaryStart?: number;
	momentaryEnd?: number;

	swiping?: boolean = false;

	@state() pressed: boolean = false;
	pointers: number = 0;
	fireMouseEvent: boolean = true;
	initialX?: number;
	initialY?: number;
	currentX?: number;
	currentY?: number;
	deltaX?: number;
	deltaY?: number;

	tabIndex: number = 0;
	firefox: boolean = /firefox|fxios/i.test(navigator.userAgent);
	rtl: boolean = false;

	fireHapticEvent(haptic: HapticType) {
		if (
			this.renderTemplate(this.config.haptics as unknown as string) ??
			true
		) {
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

		this.pressed = false;
		this.initialX = undefined;
		this.initialY = undefined;
		this.currentX = undefined;
		this.currentY = undefined;
		this.deltaX = undefined;
		this.deltaY = undefined;
	}

	async sendAction(actionType: ActionType, config: IActions = this.config) {
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
				case 'call-service' as 'perform-action': // deprecated in 2024.8
				case 'perform-action':
					this.callService(action);
					break;
				case 'source':
					this.source(action);
					break;
				case 'key':
					this.key(action, actionType);
					break;
				case 'fire-dom-event':
					this.fireDomEvent(action);
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
		} catch (e) {
			this.endAction();
			throw e;
		}
	}

	hassAction(action: IAction) {
		// This normally cannot be used directly, because it fires a haptic event
		// Ignoring the haptic settings of the individual element
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

	key(action: IAction, actionType: ActionType) {
		switch (action.platform) {
			case 'Unified Remote':
				break;
			case 'Unfolded Circle':
				this.hass.callService('unfoldedcircle', 'send_button_command', {
					entity_id: action.remote_id,
					button: action.key,
				});
				break;
			case 'Kodi':
				this.hass.callService('kodi', 'call_method', {
					entity_id: action.media_player_id,
					method: action.key,
				});
				break;
			case 'Denon AVR':
				this.hass.callService('denonavr', 'get_command', {
					entity_id: action.media_player_id,
					command: `/goform/formiPhoneAppDirect.xml?${action.key}`,
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
			case 'Generic Remote':
			default: {
				const data: IData = {
					entity_id: action.remote_id ?? '',
					command: action.key ?? '',
				};
				if (
					actionType.includes('hold_action') &&
					(!this.config.hold_action ||
						this.config.hold_action.action == 'none')
				) {
					data.hold_secs = 1;
				}
				if (action.device) {
					data.device = action.device;
				}
				this.hass.callService('remote', 'send_command', data);
				break;
			}
		}
	}

	source(action: IAction) {
		switch (action.platform) {
			case 'Unified Remote':
			case 'Unfolded Circle':
			case 'Generic Remote':
			case 'Jellyfin':
			case 'Philips TV':
			case 'Denon AVR':
				break;
			case 'Kodi':
				this.hass.callService('kodi', 'call_method', {
					method: 'Addons.ExecuteAddon',
					addonid: action.source,
				});
				break;
			case 'Fire TV':
			case 'Roku':
			case 'Apple TV':
			case 'Samsung TV':
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
			default:
				this.hass.callService('remote', 'turn_on', {
					entity_id: action.remote_id,
					activity: action.source,
				});
				break;
		}
	}

	callService(action: IAction) {
		const performAction =
			action.perform_action ??
			(action['service' as 'perform_action'] as string);

		if (!performAction) {
			this.showFailureToast(action.action);
			return;
		}

		const [domain, service] = performAction.split('.');
		this.hass.callService(domain, service, action.data, action.target);
	}

	navigate(action: IAction) {
		const path = action.navigation_path as string;

		if (!path) {
			this.showFailureToast(action.action);
			return;
		}

		if (path.includes('//')) {
			console.error(
				'Protocol detected in navigation path. To navigate to another website use the action "url" with the key "url_path" instead.',
			);
			return;
		}

		const replace = action.navigation_replace ?? false;
		if (replace == true) {
			window.history.replaceState(
				window.history.state?.root ? { root: true } : null,
				'',
				path,
			);
		} else {
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

	url(action: IAction) {
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

	assist(action: IAction) {
		this.hassAction(action);
	}

	moreInfo(action: IAction) {
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

	toggle(action: IAction) {
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
		} else if (target.entity_id) {
			this.toggleSingle(target.entity_id);
		} else {
			this.hass.callService('homeassistant', 'toggle', target);
		}
	}

	toggleSingle(entityId: string) {
		const turnOn = ['closed', 'closing', 'locked', 'off'].includes(
			this.hass.states[entityId].state,
		);
		let domain = entityId.split('.')[0];
		let service: string;
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

	fireDomEvent(action: IAction) {
		const event = new Event(action.event_type ?? 'll-custom', {
			composed: true,
			bubbles: true,
		});
		event.detail = action;
		this.dispatchEvent(event);
	}

	eval(action: IAction) {
		eval(action.eval ?? '');
	}

	keyboard(action: IAction) {
		const event = new Event('dialog-show', {
			composed: true,
			bubbles: true,
		});
		event.detail = action;
		this.dispatchEvent(event);
	}

	async handleConfirmation(action: IAction): Promise<boolean> {
		if (
			action.confirmation &&
			(!(action.confirmation as IConfirmation).exemptions ||
				!(action.confirmation as IConfirmation).exemptions?.some(
					(e) => e.user == this.hass.user?.id,
				))
		) {
			// Retrieve original confirmation text or get translation
			let text = (action.confirmation as IConfirmation).text;
			if (!text) {
				let serviceName;
				const [domain, service] = (
					action.perform_action ??
					action['service' as 'perform_action'] ??
					''
				).split('.');
				if (this.hass.services[domain]?.[service]) {
					const localize =
						await this.hass.loadBackendTranslation('title');
					serviceName = `${
						localize(`component.${domain}.title`) || domain
					}: ${
						localize(
							`component.${domain}.services.${service}.name`,
						) ||
						this.hass.services[domain][service].name ||
						service
					}`;
				}

				text = this.hass.localize(
					'ui.panel.lovelace.cards.actions.action_confirmation',
					{
						action:
							serviceName ??
							this.hass.localize(
								`ui.panel.lovelace.editor.action-editor.actions.${action.action}`,
							) ??
							action.action,
					},
				);
			}

			// Use hass-action to fire a dom event with a confirmation
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
				// Cleanup timeout and event listeners
				let cancelTimeout: ReturnType<typeof setTimeout>;
				const cleanup = () => {
					clearTimeout(cancelTimeout);
					window.removeEventListener('ll-custom', confirmTrue);
					window.removeEventListener('dialog-closed', confirmFalse);
				};

				// ll-custom event is fired when the user accepts the confirmation
				const confirmTrue = (e: Event) => {
					if (e.detail.confirmed) {
						cleanup();
						resolve(true);
					}
				};
				window.addEventListener('ll-custom', confirmTrue);

				// dialog-closed event is always fired
				// The timeout allows the ll-custom listener to resolve true before this one resolves false
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

	showFailureToast(action: Action) {
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
			case 'call-service' as 'perform-action':
			default:
				suffix = 'no_action';
				break;
		}
		const event = new Event('hass-notification', {
			bubbles: true,
			composed: true,
		});
		event.detail = {
			message: this.hass.localize(
				`ui.panel.lovelace.cards.actions.${suffix}`,
			),
		};
		this.dispatchEvent(event);
		this.fireHapticEvent('failure');
	}

	setValue() {
		this.entityId = this.renderTemplate(
			this.config.entity_id as string,
		) as string;

		if (this.getValueFromHass && this.entityId) {
			clearInterval(this.valueUpdateInterval);
			this.valueUpdateInterval = undefined;

			this.valueAttribute = (
				this.renderTemplate(
					(this.config.value_attribute as string) ?? 'state',
				) as string
			).toLowerCase();
			if (!this.hass.states[this.entityId]) {
				this.value = undefined;
			} else if (this.valueAttribute == 'state') {
				this.value = this.hass.states[this.entityId].state;
			} else {
				let value:
					| string
					| number
					| boolean
					| string[]
					| number[]
					| undefined;
				const indexMatch = this.valueAttribute.match(/\[\d+\]$/);
				if (indexMatch) {
					const index = parseInt(indexMatch[0].replace(/\[|\]/g, ''));
					this.valueAttribute = this.valueAttribute.replace(
						indexMatch[0],
						'',
					);
					value =
						this.hass.states[this.entityId]?.attributes?.[
							this.valueAttribute
						];
					if (value && Array.isArray(value) && value.length) {
						value = value[index];
					} else {
						value = undefined;
					}
				} else {
					value =
						this.hass.states[this.entityId]?.attributes?.[
							this.valueAttribute
						];
				}

				if (value != undefined || this.valueAttribute == 'elapsed') {
					switch (this.valueAttribute) {
						case 'brightness':
							this.value = Math.round(
								(100 * parseInt((value as string) ?? 0)) / 255,
							);
							break;
						case 'media_position':
							try {
								const setIntervalValue = () => {
									if (
										this.hass.states[
											this.entityId as string
										].state == 'playing'
									) {
										this.value = Math.min(
											Math.floor(
												Math.floor(value as number) +
													(Date.now() -
														Date.parse(
															this.hass.states[
																this
																	.entityId as string
															].attributes
																?.media_position_updated_at,
														)) /
														1000,
											),
											Math.floor(
												this.hass.states[
													this.entityId as string
												].attributes?.media_duration,
											),
										);
									} else {
										this.value = value as number;
									}
								};

								setIntervalValue();
								this.valueUpdateInterval = setInterval(
									setIntervalValue,
									500,
								);
							} catch (e) {
								console.error(e);
								this.value = value as string | number | boolean;
							}
							break;
						case 'elapsed':
							if (this.entityId.startsWith('timer.')) {
								if (
									this.hass.states[this.entityId as string]
										.state == 'idle'
								) {
									this.value = 0;
								} else {
									const durationHMS =
										this.hass.states[
											this.entityId as string
										].attributes?.duration.split(':');
									const durationSeconds =
										parseInt(durationHMS[0]) * 3600 +
										parseInt(durationHMS[1]) * 60 +
										parseInt(durationHMS[2]);
									const endSeconds = Date.parse(
										this.hass.states[
											this.entityId as string
										].attributes?.finishes_at,
									);
									try {
										const setIntervalValue = () => {
											if (
												this.hass.states[
													this.entityId as string
												].state == 'active'
											) {
												const remainingSeconds =
													(endSeconds - Date.now()) /
													1000;
												const value = Math.floor(
													durationSeconds -
														remainingSeconds,
												);
												this.value = Math.min(
													value,
													durationSeconds,
												);
											} else {
												const remainingHMS =
													this.hass.states[
														this.entityId as string
													].attributes?.remaining.split(
														':',
													);
												const remainingSeconds =
													parseInt(remainingHMS[0]) *
														3600 +
													parseInt(remainingHMS[1]) *
														60 +
													parseInt(remainingHMS[2]);
												this.value = Math.floor(
													durationSeconds -
														remainingSeconds,
												);
											}
										};

										setIntervalValue();
										this.valueUpdateInterval = setInterval(
											setIntervalValue,
											500,
										);
									} catch (e) {
										console.error(e);
										this.value = 0;
									}
								}
								break;
							}
						// falls through
						default:
							this.value = value as string | number | boolean;
							break;
					}
				} else {
					this.value = value;
				}
			}
		}
	}

	renderTemplate(
		str: string | number | boolean,
		context?: object,
	): string | number | boolean {
		if (!hasTemplate(str)) {
			return str;
		}

		let holdSecs: number = 0;
		if (this.momentaryStart && this.momentaryEnd) {
			holdSecs = (this.momentaryEnd - this.momentaryStart) / 1000;
		}

		context = {
			value: this.value as string,
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
			render: (str2: string) => this.renderTemplate(str2, context),
			...context,
		};

		let value: string | number = context['value' as keyof typeof context];
		if (
			value != undefined &&
			typeof value == 'number' &&
			this.precision != undefined
		) {
			value = Number(value).toFixed(this.precision);
			context = {
				...context,
				value: value,
			};
		}

		try {
			return renderTemplate(this.hass, str as string, context, false);
		} catch (e) {
			console.error(e);
			return '';
		}
	}

	deepRenderTemplate<T extends object>(obj: T, context?: object): T {
		const res = structuredClone(obj);
		const keys = getDeepKeys(res);
		for (const key of keys) {
			const prerendered = deepGet(res, key);
			let rendered = this.renderTemplate(
				prerendered as unknown as string,
				context,
			);
			if (
				typeof prerendered === 'string' &&
				(key.endsWith('data') || key.endsWith('target'))
			) {
				rendered = load(rendered as string) as string;
			}
			deepSet(res, key, rendered);
		}
		return res;
	}

	resetGetValueFromHass() {
		const valueFromHassDelay = this.renderTemplate(
			this.config.value_from_hass_delay ?? UPDATE_AFTER_ACTION_DELAY,
		) as number;
		this.getValueFromHassTimer = setTimeout(() => {
			this.getValueFromHass = true;
			this.requestUpdate();
		}, valueFromHassDelay);
	}

	buildIcon(icon?: string) {
		let iconElement = html``;
		if (icon) {
			if (icon.includes(':')) {
				iconElement = html` <ha-icon .icon="${icon}"></ha-icon> `;
			} else {
				const iconConfig =
					(this.icons ?? []).find(
						(customIcon: IIconConfig) => customIcon.name == icon,
					) ??
					defaultIcons.find(
						(defaultIcon: IIconConfig) => defaultIcon.name == icon,
					);
				iconElement = html`
					<ha-svg-icon
						.path=${iconConfig?.path ?? icon}
					></ha-svg-icon>
				`;
			}
		}
		return html`<div class="icon" part="icon">${iconElement}</div>`;
	}

	buildLabel(label?: string) {
		return label
			? html`<pre class="label" part="label">${label}</pre>`
			: '';
	}

	buildRipple() {
		return html`<md-ripple part="ripple"></md-ripple>`;
	}

	onPointerDown(e: PointerEvent) {
		this.pointers++;
		if (!this.pressed) {
			this.pressed = true;
			this.initialX = e.clientX;
			this.initialY = e.clientY;
			this.currentX = e.clientX;
			this.currentY = e.clientY;
			this.deltaX = 0;
			this.deltaY = 0;
		}
	}

	onPointerUp(e: PointerEvent) {
		this.pressed = false;
		this.dispatchEvent(new PointerEvent('pointerup', e));
	}

	onPointerMove(e: PointerEvent) {
		if (this.pressed && e.isPrimary) {
			this.deltaX = e.clientX - (this.currentX ?? 0);
			this.deltaY = e.clientY - (this.currentY ?? 0);
			this.currentX = e.clientX;
			this.currentY = e.clientY;
		}
	}

	onPointerCancel(_e: PointerEvent) {
		this.endAction();
		this.resetGetValueFromHass();
		this.swiping = true;
	}

	onPointerLeave(e: PointerEvent) {
		if (e.pointerType == 'mouse' && this.initialX && this.initialY) {
			this.onPointerCancel(e);
		}
		this.endRipple();
	}

	onContextMenu(e: PointerEvent) {
		if (e.pointerType != 'mouse') {
			e.preventDefault();
			e.stopPropagation();
		}
	}

	onTouchStart(e: TouchEvent) {
		// Stuck ripple fix
		clearTimeout(this.rippleEndTimer);
		const ripple = this.shadowRoot?.querySelector('md-ripple') as MdRipple;
		ripple?.endPressAnimation?.();
		ripple?.startPressAnimation?.(e);
	}

	onTouchEnd(e: TouchEvent) {
		// Premature dialog close fix
		e.preventDefault();

		// Stuck ripple fix
		this.endRipple();
	}

	endRipple() {
		clearTimeout(this.rippleEndTimer);
		const ripple = this.shadowRoot?.querySelector('md-ripple') as MdRipple;
		this.rippleEndTimer = setTimeout(
			() => ripple?.endPressAnimation?.(),
			15,
		);
	}

	async onKey(e: KeyboardEvent) {
		if (['Enter', ' '].includes(e.key)) {
			e.preventDefault();
			e.stopImmediatePropagation();
			if (!e.repeat) {
				const direction = e.type == 'keydown' ? 'Down' : 'Up';
				await this[`onPointer${direction}`](
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
		}
	}

	shouldUpdate(changedProperties: PropertyValues) {
		if (changedProperties.has('hass') || changedProperties.has('value')) {
			const value = changedProperties.get('value') || this.value;
			this.setValue();

			const unitOfMeasurement =
				(this.renderTemplate(
					this.config.unit_of_measurement as string,
				) as string) ?? '';

			const icon = this.renderTemplate(
				this.config.icon as string,
			) as string;

			const label = this.renderTemplate(
				this.config.label as string,
			) as string;

			const styles = this.renderTemplate(
				this.config.styles as string,
			) as string;

			if (
				value != this.value ||
				unitOfMeasurement != this.unitOfMeasurement ||
				icon != this.icon ||
				label != this.label ||
				styles != this.styles
			) {
				this.unitOfMeasurement = unitOfMeasurement;
				this.icon = icon;
				this.label = label;
				this.styles = styles;
				return true;
			}
		}

		if (changedProperties.has('config')) {
			return (
				JSON.stringify(this.config) !=
				JSON.stringify(changedProperties.get('config'))
			);
		}

		return (
			changedProperties.size == 0 || // Explicitly request update
			changedProperties.has('value') ||
			changedProperties.has('pressed')
		);
	}

	firstUpdated() {
		this.rtl = getComputedStyle(this).direction == 'rtl';
		if (this.rtl) {
			this.setAttribute('dir', 'rtl');
		}
		this.addEventListener('touchstart', this.onTouchStart, {
			passive: true,
		});
		this.addEventListener('touchend', this.onTouchEnd);
		this.addEventListener('keydown', this.onKey);
		this.addEventListener('keyup', this.onKey);
	}

	updated() {
		this.setAttribute('value', String(this.value ?? ''));

		if (this.pressed) {
			this.setAttribute('pressed', '');
		} else {
			this.removeAttribute('pressed');
		}
	}

	static get styles(): CSSResult | CSSResult[] {
		return css`
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
				pointer-events: none;
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
				aspect-ratio: 1 / 1;
				justify-content: center;
				align-items: center;
				display: var(--icon-display, inline-flex);
				transform: var(--icon-transform);
				color: var(--icon-color, var(--primary-text-color));
				filter: var(--icon-filter, none);

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
