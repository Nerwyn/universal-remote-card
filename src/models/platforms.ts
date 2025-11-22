import { IPlatformFeatures, Platform } from './interfaces';

export const PlatformConfig: Record<Platform, IPlatformFeatures> = {
	'Android TV': {
		remote_id: true,
		media_player_id: true,
		keyboard: true,
		search: true,
	},
	'Sony BRAVIA': {
		remote_id: true,
		media_player_id: true,
		keyboard: true,
		search: true,
		adb: true,
	},
	'Fire TV': {
		remote_id: true,
		media_player_id: true,
		keyboard: true,
		search: true,
		// adb: true, // Fire TV uses ADB for everything and does not need to configured here
	},
	Roku: {
		remote_id: true,
		media_player_id: true,
		keyboard: true,
		search: true,
	},
	'LG webOS': {
		media_player_id: true,
		keyboard: true,
	},
	'Samsung TV': {
		remote_id: true,
		media_player_id: true,
		keyboard: true,
	},
	Kodi: {
		media_player_id: true,
		keyboard: true,
		search: true,
	},
	'Unified Remote': {
		device: true,
		keyboard: true,
	},
	'Apple TV': {
		remote_id: true,
		media_player_id: true,
	},
	'Philips TV': {
		remote_id: true,
		media_player_id: true,
	},
	'Denon AVR': {
		media_player_id: true,
	},
	'Yamaha YNCA': {
		remote_id: true,
		media_player_id: true,
	},
	Jellyfin: {
		remote_id: true,
		media_player_id: true,
	},
	'Unfolded Circle': {
		remote_id: true,
	},
	'Generic Remote': {
		remote_id: true,
		device: true,
	},
};
