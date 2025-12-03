import { IElementConfig } from '../../interfaces';

/**
 * https://www.home-assistant.io/integrations/webostv/#action-webostvbutton
 */
export const webosDefaultSources: IElementConfig[] = [
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
			action: 'key',
			key: 'NETFLIX',
		},
		icon: 'mdi:netflix',
	},
	{
		name: 'primevideo',
		tap_action: {
			action: 'key',
			key: 'AMAZON',
		},
		icon: 'primevideo',
	},
	{
		name: 'rakutentv',
		tap_action: {
			action: 'source',
			source: 'Rakuten TV',
		},
		icon: 'rakutentv',
	},
	{
		name: 'twitch',
		tap_action: { action: 'source', source: 'Twitch' },
		icon: 'mdi:twitch',
	},
	{
		name: 'waiputv',
		tap_action: {
			action: 'source',
			source: 'waipu.tv',
		},
		icon: 'waiputv',
	},
	{
		name: 'wow',
		tap_action: {
			action: 'source',
			source: 'WOW',
		},
		icon: 'wow',
	},
	{
		name: 'youtube',
		tap_action: {
			action: 'source',
			source: 'YouTube',
		},
		icon: 'mdi:youtube',
	},
];
