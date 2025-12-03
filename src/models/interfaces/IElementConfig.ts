import {
	IAction,
	IActions,
	IBasicActions,
	IConfig,
	IMomentaryActions,
	IMultiActions,
} from '.';

export const RemoteElementTypes = [
	'button',
	'slider',
	'touchpad',
	'circlepad',
] as const;
export type RemoteElementType = (typeof RemoteElementTypes)[number];

export interface IElementConfig
	extends IBaseElementConfig,
		IButtonConfig,
		ISliderConfig,
		ITouchpadConfig,
		IActions {}

interface IBaseElementConfig extends IDisplayConfig {
	type?: RemoteElementType;
	name: string;
	haptics?: boolean;
	card?: IConfig;

	entity_id?: string;
	autofill_entity_id?: boolean;
	value_attribute?: string;
	keypress?: string;
}

interface IDisplayConfig {
	icon?: string;
	label?: string;
	unit_of_measurement?: string;
	styles?: string;
}

export interface IButtonConfig
	extends IBaseElementConfig,
		IBasicActions,
		IMomentaryActions {}

export interface ISliderConfig extends IBaseElementConfig {
	value_from_hass_delay?: boolean;
	range?: [number, number];
	step?: number;
	vertical?: boolean;
	tap_action?: IAction;
}

export const DirectionActions = ['up', 'down', 'left', 'right'] as const;
export type DirectionAction = (typeof DirectionActions)[number];

export interface ITouchpadConfig extends IBaseElementConfig, IActions {
	up?: IBasicActions & IMultiActions & IDisplayConfig;
	down?: IBasicActions & IMultiActions & IDisplayConfig;
	left?: IBasicActions & IMultiActions & IDisplayConfig;
	right?: IBasicActions & IMultiActions & IDisplayConfig;
}

export interface ICirclepadConfig extends IBaseElementConfig, IActions {
	up?: IBasicActions & IMultiActions & IMomentaryActions & IDisplayConfig;
	down?: IBasicActions & IMultiActions & IMomentaryActions & IDisplayConfig;
	left?: IBasicActions & IMultiActions & IMomentaryActions & IDisplayConfig;
	right?: IBasicActions & IMultiActions & IMomentaryActions & IDisplayConfig;
}
