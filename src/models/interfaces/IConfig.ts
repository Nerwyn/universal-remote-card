import { IElementConfig, Platform } from '.';

export type Row = string | Row[];

export interface IIconConfig {
	name: string;
	path: string;
}

export interface IConfig {
	type?: string;
	title?: string;

	platform?: Platform;
	keyboard_id?: string;
	remote_id?: string;
	media_player_id?: string;
	device?: string;
	autofill_entity_id?: boolean;

	custom_actions?: IElementConfig[];
	custom_actions_file?: string;
	custom_icons?: IIconConfig[];

	styles?: string;
	haptics?: boolean;

	hold_time?: number;
	repeat_delay?: number;
	double_tap_window?: number;

	rows?: Row[];
}
