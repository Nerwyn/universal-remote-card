import { IElementConfig } from '../../interfaces';

/**
 * This is a list of common streaming apps, their icons, and the deep links to open them in Android TV, mostly collected from the following Home Assistant Community Forum guide.
 * Not all have been tested, if any do not work please let me know!
 * https://community.home-assistant.io/t/android-tv-remote-app-links-deep-linking-guide/567921
 */
export const kodiDefaultSources: IElementConfig[] = [
	{
		type: 'button',
		name: 'crunchyroll',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Addons.ExecuteAddon',
				addonid: 'plugin.video.crunchyroll',
			},
		icon: 'crunchyroll',
	},
	{
		type: 'button',
		name: 'discoveryplus',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Addons.ExecuteAddon',
				addonid: 'plugin.video.discoveryplus',
			},
		icon: 'discovery',
	},
	{
		type: 'button',
		name: 'disney',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Addons.ExecuteAddon',
				addonid: 'slyguy.disney.plus',
			},
		icon: 'disney',
	},
	{
		type: 'button',
		name: 'espn',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Addons.ExecuteAddon',
				addonid: 'slyguy.espn',

			},
		icon: 'espn',
	},
	{
		type: 'button',
		name: 'hulu',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Addons.ExecuteAddon',
				addonid: 'slyguy.hulu',

			},
		icon: 'mdi:hulu',
	},
	{
		type: 'button',
		name: 'max',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Addons.ExecuteAddon',
				addonid: 'slyguy.max',

			},
		icon: 'max',
	},
	{
		type: 'button',
		name: 'netflix',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Addons.ExecuteAddon',
				addonid: 'plugin.video.netflix',

			},
		icon: 'mdi:netflix',
	},
	{
		type: 'button',
		name: 'paramount',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Addons.ExecuteAddon',
				addonid: 'slyguy.paramount.plus',

			},
		icon: 'paramount',
	},
	{
		type: 'button',
		name: 'peacock',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Addons.ExecuteAddon',
				addonid: 'plugin.video.skyott',
			},
		icon: 'peacock',
	},
	{
		type: 'button',
		name: 'primevideo',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Addons.ExecuteAddon',
				addonid: 'plugin.video.amazon-test',
			},
		icon: 'primevideo',
	},
	{
		type: 'button',
		name: 'twitch',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Addons.ExecuteAddon',
				addonid: 'plugin.video.twitch',
			},
		icon: 'mdi:twitch',
	},
	{
		type: 'button',
		name: 'youtube',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Addons.ExecuteAddon',
				addonid: 'plugin.video.youtube',
			},
		icon: 'mdi:youtube',
	},
	
];
