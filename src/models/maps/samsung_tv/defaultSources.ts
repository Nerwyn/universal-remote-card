import { IElementConfig } from '../../interfaces';

/**
 * https://github.com/ollo69/ha-samsungtv-smart
 */
export const samsungTVDefaultSources: IElementConfig[] = [
	{
		name: 'appletv',
		tap_action: {
			action: 'source',
			source: 'Apple TV',
		},
		icon: 'appletv',
	},
	{
		name: 'dazn',
		tap_action: {
			action: 'source',
			source: 'DAZN',
		},
		icon: 'dazn',
	},
	{
		name: 'disney',
		tap_action: {
			action: 'source',
			source: 'Disney+',
		},
		icon: 'disney',
	},
	{
		name: 'dropout',
		tap_action: {
			action: 'source',
			source: 'Dropout', // UNTESTED
		},
		icon: 'dropout',
	},
	{
		name: 'hulu',
		tap_action: {
			action: 'source',
			source: 'Hulu',
		},
		icon: 'mdi:hulu',
	},
	{
		name: 'nebula',
		tap_action: {
			action: 'source',
			source: 'Nebula', // UNTESTED
		},
		icon: 'nebula',
	},
	{
		name: 'netflix',
		tap_action: {
			action: 'source',
			source: 'Netflix',
		},
		icon: 'mdi:netflix',
	},
	{
		name: 'max',
		tap_action: {
			action: 'source',
			source: 'Max',
		},
		icon: 'hbomax',
	},
	{
		name: 'paramount',
		tap_action: {
			action: 'source',
			source: 'Paramount+',
		},
		icon: 'paramount',
	},
	{
		name: 'peacock',
		tap_action: {
			action: 'source',
			source: 'Peacock TV',
		},
		icon: 'peacock',
	},
	{
		name: 'primevideo',
		tap_action: {
			action: 'source',
			source: 'Prime Video',
		},
		icon: 'primevideo',
	},
	{
		name: 'twitch',
		tap_action: { action: 'source', source: 'Twitch' },
		icon: 'mdi:twitch',
	},
	{
		name: 'youtube',
		tap_action: {
			action: 'source',
			source: 'YouTube',
		},
		icon: 'mdi:youtube',
	},
	{
		name: 'youtubetv',
		tap_action: {
			action: 'source',
			source: 'YouTube TV',
		},
		icon: 'mdi:youtube-tv',
	},
];
