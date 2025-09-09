import { IElementConfig } from '../../interfaces';

/**
 * https://www.home-assistant.io/integrations/kodi/#action-kodicall_method
 * https://kodi.wiki/view/JSON-RPC_API/v13
 */
export const kodiDefaultSources: IElementConfig[] = [
	{
		type: 'button',
		name: 'crunchyroll',
		tap_action: {
			action: 'source',
			source: 'plugin.video.crunchyroll',
		},
		icon: 'crunchyroll',
	},
	{
		type: 'button',
		name: 'discoveryplus',
		tap_action: {
			action: 'source',
			source: 'plugin.video.discoveryplus',
		},
		icon: 'discovery',
	},
	{
		type: 'button',
		name: 'disney',
		tap_action: {
			action: 'source',
			source: 'slyguy.disney.plus',
		},
		icon: 'disney',
	},
	{
		type: 'button',
		name: 'espn',
		tap_action: {
			action: 'source',
			source: 'slyguy.espn',
		},
		icon: 'espn',
	},
	{
		type: 'button',
		name: 'hulu',
		tap_action: {
			action: 'source',
			source: 'slyguy.hulu',
		},
		icon: 'mdi:hulu',
	},
	{
		type: 'button',
		name: 'max',
		tap_action: {
			action: 'source',
			source: 'slyguy.max',
		},
		icon: 'max',
	},
	{
		type: 'button',
		name: 'netflix',
		tap_action: {
			action: 'source',
			source: 'plugin.video.netflix',
		},
		icon: 'mdi:netflix',
	},
	{
		type: 'button',
		name: 'paramount',
		tap_action: {
			action: 'source',
			source: 'slyguy.paramount.plus',
		},
		icon: 'paramount',
	},
	{
		type: 'button',
		name: 'peacock',
		tap_action: {
			action: 'source',
			source: 'plugin.video.skyott',
		},
		icon: 'peacock',
	},
	{
		type: 'button',
		name: 'primevideo',
		tap_action: {
			action: 'source',
			source: 'plugin.video.amazon-test',
		},
		icon: 'primevideo',
	},
	{
		type: 'button',
		name: 'twitch',
		tap_action: {
			action: 'source',
			source: 'plugin.video.twitch',
		},
		icon: 'mdi:twitch',
	},
	{
		type: 'button',
		name: 'youtube',
		tap_action: {
			action: 'source',
			source: 'plugin.video.youtube',
		},
		icon: 'mdi:youtube',
	},
];
