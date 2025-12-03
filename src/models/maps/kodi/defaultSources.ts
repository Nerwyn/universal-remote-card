import { IElementConfig } from '../../interfaces';

/**
 * https://www.home-assistant.io/integrations/kodi/#action-kodicall_method
 * https://kodi.wiki/view/JSON-RPC_API/v13
 */
export const kodiDefaultSources: IElementConfig[] = [
	{
		name: 'crunchyroll',
		tap_action: {
			action: 'source',
			source: 'plugin.video.crunchyroll',
		},
		icon: 'crunchyroll',
	},
	{
		name: 'discoveryplus',
		tap_action: {
			action: 'source',
			source: 'plugin.video.discoveryplus',
		},
		icon: 'discovery',
	},
	{
		name: 'disney',
		tap_action: {
			action: 'source',
			source: 'slyguy.disney.plus',
		},
		icon: 'disney',
	},
	{
		name: 'espn',
		tap_action: {
			action: 'source',
			source: 'slyguy.espn',
		},
		icon: 'espn',
	},
	{
		name: 'hulu',
		tap_action: {
			action: 'source',
			source: 'slyguy.hulu',
		},
		icon: 'mdi:hulu',
	},
	{
		name: 'max',
		tap_action: {
			action: 'source',
			source: 'slyguy.max',
		},
		icon: 'hbomax',
	},
	{
		name: 'netflix',
		tap_action: {
			action: 'source',
			source: 'plugin.video.netflix',
		},
		icon: 'mdi:netflix',
	},
	{
		name: 'paramount',
		tap_action: {
			action: 'source',
			source: 'slyguy.paramount.plus',
		},
		icon: 'paramount',
	},
	{
		name: 'peacock',
		tap_action: {
			action: 'source',
			source: 'plugin.video.skyott',
		},
		icon: 'peacock',
	},
	{
		name: 'primevideo',
		tap_action: {
			action: 'source',
			source: 'plugin.video.amazon-test',
		},
		icon: 'primevideo',
	},
	{
		name: 'twitch',
		tap_action: {
			action: 'source',
			source: 'plugin.video.twitch',
		},
		icon: 'mdi:twitch',
	},
	{
		name: 'youtube',
		tap_action: {
			action: 'source',
			source: 'plugin.video.youtube',
		},
		icon: 'mdi:youtube',
	},
];
