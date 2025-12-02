import { IElementConfig } from '../../interfaces';

/**
 * https://www.home-assistant.io/integrations/webostv/#action-webostvbutton
 */
export const webosDefaultSources: IElementConfig[] = [
	{
		type: 'button',
		name: 'disney',
		tap_action: {
			action: 'source',
			source: 'Disney+',
		},
		icon: 'disney',
	},
	{
		type: 'button',
		name: 'dropout',
		tap_action: {
			action: 'source',
			source: 'Dropout', // UNTESTED
		},
		icon: 'dropout',
	},
	{
		type: 'button',
		name: 'nebula',
		tap_action: {
			action: 'source',
			source: 'Nebula', // UNTESTED
		},
		icon: 'nebula',
	},
	{
		type: 'button',
		name: 'netflix',
		tap_action: {
			action: 'key',
			key: 'NETFLIX',
		},
		icon: 'mdi:netflix',
	},
	{
		type: 'button',
		name: 'primevideo',
		tap_action: {
			action: 'key',
			key: 'AMAZON',
		},
		icon: 'primevideo',
	},
	{
		type: 'button',
		name: 'rakutentv',
		tap_action: {
			action: 'source',
			source: 'Rakuten TV',
		},
		icon: 'rakutentv',
	},
	{
		type: 'button',
		name: 'twitch',
		tap_action: { action: 'source', source: 'Twitch' },
		icon: 'mdi:twitch',
	},
	{
		type: 'button',
		name: 'waiputv',
		tap_action: {
			action: 'source',
			source: 'waipu.tv',
		},
		icon: 'waiputv',
	},
	{
		type: 'button',
		name: 'wow',
		tap_action: {
			action: 'source',
			source: 'WOW',
		},
		icon: 'wow',
	},
	{
		type: 'button',
		name: 'youtube',
		tap_action: {
			action: 'source',
			source: 'YouTube',
		},
		icon: 'mdi:youtube',
	},
];
