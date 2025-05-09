export const KeyboardPlatforms = [
	'Android TV',
	'Sony BRAVIA',
	'Fire TV',
	'Roku',
	'LG webOS',
	'Kodi',
	'Unified Remote',
] as const;
export type KeyboardPlatform = (typeof KeyboardPlatforms)[number];
export const Platforms = [
	...KeyboardPlatforms,
	'Apple TV',
	'Samsung TV',
	'Jellyfin',
	'Philips TV',

] as const;
export type Platform = (typeof Platforms)[number];

export const Actions = [
	'more-info',
	'toggle',
	'navigate',
	'url',
	'perform-action',
	'assist',
	'key',
	'source',
	'keyboard',
	'textbox',
	'search',
	'fire-dom-event',
	'eval',
	'repeat',
	'none',
] as const;
export type Action = (typeof Actions)[number];

export const ActionTypes = [
	'tap_action',
	'hold_action',
	'double_tap_action',
	'multi_tap_action',
	'multi_hold_action',
	'multi_double_tap_action',
	'momentary_start_action',
	'momentary_end_action',
	'drag_action',
	'multi_drag_action',
] as const;
export type ActionType = (typeof ActionTypes)[number];

export interface IData {
	// eslint-disable-next-line
	[key: string]: any;
}

export interface ITarget {
	entity_id?: string | string[];
	device_id?: string | string[];
	area_id?: string | string[];
	label_id?: string | string[];
}

export interface IConfirmation {
	text?: string;
	exemptions?: [{ user: string }];
}

export interface IBrowserMod {
	perform_action?: string;
	data?: IData;
	target?: ITarget;
}

export interface IAction {
	action: Action;

	platform?: Platform;
	key?: string;
	source?: string;
	remote_id?: string;
	media_player_id?: string;
	keyboard_id?: string;
	keyboard_prompt?: string;

	perform_action?: string;
	data?: IData;
	target?: ITarget;

	navigation_path?: string;
	navigation_replace?: boolean;
	url_path?: string;

	confirmation?: boolean | IConfirmation;

	pipeline_id?: string;
	start_listening?: boolean;

	event_type?: string;
	browser_mod?: IBrowserMod;

	eval?: string;

	double_tap_window?: number;
	hold_time?: number;
	repeat_delay?: number;
}

export interface IActions
	extends IBasicActions,
		IMomentaryActions,
		IMultiActions,
		IDragActions {}

export interface IBasicActions {
	tap_action?: IAction;
	double_tap_action?: IAction;
	hold_action?: IAction;
}

export interface IMultiActions {
	multi_tap_action?: IAction;
	multi_double_tap_action?: IAction;
	multi_hold_action?: IAction;
}

export interface IMomentaryActions {
	momentary_start_action?: IAction;
	momentary_end_action?: IAction;
}

export interface IDragActions {
	drag_action?: IAction;
	multi_drag_action?: IAction;
}
