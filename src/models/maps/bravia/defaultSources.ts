import { IElementConfig } from '../../interfaces';

/**
 * This list contains a subset of supported sources.
 * Supported sources can be added by their explicit App Name
 *
 * https://www.home-assistant.io/integrations/braviatv/#play-media-action
 */
export const braviaTVDefaultSources: IElementConfig[] = [
	{
		type: 'button',
		name: 'appletv',
		tap_action: {
			action: 'source',
			source: 'Apple TV',
		},
		icon: 'appletv',
	},
	{
		type: 'button',
		name: 'crunchyroll',
		tap_action: {
			action: 'source',
			source: 'Crunchyroll',
		},
		icon: 'crunchyroll',
	},
	{
		type: 'button',
		name: 'dazn',
		tap_action: {
			action: 'source',
			source: 'DAZN',
		},
		icon: 'dazn',
	},
	{
		type: 'button',
		name: 'discoveryplus',
		tap_action: {
			action: 'source',
			source: 'discovery+',
		},
		icon: 'discovery',
	},
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
		name: 'emby',

		tap_action: {
			action: 'source',
			source: 'Emby',
		},
		icon: 'mdi:emby',
	},
	{
		type: 'button',
		name: 'filmplus',
		tap_action: {
			action: 'source',
			source: 'Filmplus',
		},
		icon: 'filmplus',
	},
	{
		type: 'button',
		name: 'foxsports',
		tap_action: {
			action: 'source',
			source: 'FOX Sports',
		},
		icon: 'foxsports',
	},
	{
		type: 'button',
		name: 'globoplay',
		tap_action: {
			action: 'source',
			source: 'Globoplay',
		},
		icon: 'globoplay',
	},
	{
		type: 'button',
		name: 'hulu',
		tap_action: {
			action: 'source',
			source: 'Hulu',
		},
		icon: 'mdi:hulu',
	},
	{
		type: 'button',
		name: 'jellyfin',
		tap_action: {
			action: 'source',
			source: 'Jellyfin',
		},
		icon: 'jellyfin',
	},
	{
		type: 'button',
		name: 'kijk',
		tap_action: {
			action: 'source',
			source: 'KIJK',
		},
		icon: 'kijk',
	},
	{
		type: 'button',
		name: 'max',
		tap_action: {
			action: 'source',
			source: 'Max', // Substring matching might fail us here...
		},
		icon: 'hbomax',
	},
	{
		type: 'button',
		name: 'mlbtv',
		tap_action: {
			action: 'source',
			source: 'MLB',
		},
		icon: 'mlbtv',
	},
	{
		type: 'button',
		name: 'nba',
		tap_action: {
			action: 'source',
			source: 'NBA',
		},
		icon: 'nba',
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
		tap_action: { action: 'key', key: 'Netflix' },
		icon: 'mdi:netflix',
	},
	{
		type: 'button',
		name: 'npostart',
		tap_action: {
			action: 'source',
			source: 'NPO Start',
		},
		icon: 'npo',
	},
	{
		type: 'button',
		name: 'nrktv',
		tap_action: {
			action: 'source',
			source: 'NRK TV',
		},
		icon: 'nrktv',
	},
	{
		type: 'button',
		name: 'paramount',
		tap_action: {
			action: 'source',
			source: 'Paramount+',
		},
		icon: 'paramount',
	},
	{
		type: 'button',
		name: 'peacock',
		tap_action: {
			action: 'source',
			source: 'Peacock',
		},
		icon: 'peacock',
	},
	{
		type: 'button',
		name: 'pia',
		tap_action: {
			action: 'source',
			source: 'Private Internet Access VPN',
		},
		icon: 'pia',
	},
	{
		type: 'button',
		name: 'plex',
		tap_action: {
			action: 'source',
			source: 'Plex',
		},
		icon: 'mdi:plex',
	},
	{
		type: 'button',
		name: 'primevideo',
		tap_action: {
			action: 'source',
			source: 'Amazon Prime Video',
		},
		icon: 'primevideo',
	},
	{
		type: 'button',
		name: 'rakutentv',
		tap_action: {
			action: 'source',
			source: 'Rakuten',
		},
		icon: 'rakutentv',
	},
	{
		type: 'button',
		name: 'rakutenviki',
		tap_action: {
			action: 'source',
			source: 'Viki',
		},
		icon: 'rakutenviki',
	},
	{
		type: 'button',
		name: 'skyshowtime',
		tap_action: {
			action: 'source',
			source: 'SkyShowtime',
		},
		icon: 'showtime',
	},
	{
		type: 'button',
		name: 'spotify',
		tap_action: {
			action: 'source',
			source: 'Spotify',
		},
		icon: 'mdi:spotify',
	},
	{
		type: 'button',
		name: 'starplus',
		tap_action: {
			action: 'source',
			source: 'Star+',
		},
		icon: 'starplus',
	},
	{
		type: 'button',
		name: 'stremio',
		tap_action: {
			action: 'source',
			source: 'Stremio',
		},
		icon: 'stremio',
	},
	{
		type: 'button',
		name: 'surfshark',
		tap_action: {
			action: 'source',
			source: 'Surfshark',
		},
		icon: 'surfshark',
	},
	{
		type: 'button',
		name: 'tv2play',
		tap_action: {
			action: 'source',
			source: 'TV2 Play', // or "TV 2 Play" ?
		},
		icon: 'tv2play',
	},
	{
		type: 'button',
		name: 'twitch',
		tap_action: { action: 'source', source: 'Twitch' },
		icon: 'mdi:twitch',
	},
	{
		type: 'button',
		name: 'viaplay',
		tap_action: {
			action: 'source',
			source: 'Viaplay',
		},
		icon: 'viaplay',
	},
	{
		type: 'button',
		name: 'videoland',
		tap_action: {
			action: 'source',
			source: 'Videoplay',
		},
		icon: 'videoland',
	},
	{
		type: 'button',
		name: 'vudu',
		tap_action: {
			action: 'source',
			source: 'Vudu',
		},
		icon: 'vudu',
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
	{
		type: 'button',
		name: 'youtubetv',
		tap_action: {
			action: 'source',
			source: 'YouTube TV',
		},
		icon: 'mdi:youtube-tv',
	},
];
