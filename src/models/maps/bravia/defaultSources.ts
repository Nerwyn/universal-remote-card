import { IElementConfig } from '../../interfaces';

/**
 * This list contains a subset of supported sources.
 * Supported sources can be added by their explicit App Name
 *
 * https://www.home-assistant.io/integrations/braviatv/#play-media-action
 */
export const braviaTVDefaultSources: IElementConfig[] = [
	{
		name: 'appletv',
		tap_action: {
			action: 'source',
			source: 'Apple TV',
		},
		icon: 'appletv',
	},
	{
		name: 'crunchyroll',
		tap_action: {
			action: 'source',
			source: 'Crunchyroll',
		},
		icon: 'crunchyroll',
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
		name: 'discoveryplus',
		tap_action: {
			action: 'source',
			source: 'discovery+',
		},
		icon: 'discovery',
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
		name: 'emby',

		tap_action: {
			action: 'source',
			source: 'Emby',
		},
		icon: 'mdi:emby',
	},
	{
		name: 'filmplus',
		tap_action: {
			action: 'source',
			source: 'Filmplus',
		},
		icon: 'filmplus',
	},
	{
		name: 'foxsports',
		tap_action: {
			action: 'source',
			source: 'FOX Sports',
		},
		icon: 'foxsports',
	},
	{
		name: 'globoplay',
		tap_action: {
			action: 'source',
			source: 'Globoplay',
		},
		icon: 'globoplay',
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
		name: 'jellyfin',
		tap_action: {
			action: 'source',
			source: 'Jellyfin',
		},
		icon: 'jellyfin',
	},
	{
		name: 'kijk',
		tap_action: {
			action: 'source',
			source: 'KIJK',
		},
		icon: 'kijk',
	},
	{
		name: 'max',
		tap_action: {
			action: 'source',
			source: 'Max', // Substring matching might fail us here...
		},
		icon: 'hbomax',
	},
	{
		name: 'mlbtv',
		tap_action: {
			action: 'source',
			source: 'MLB',
		},
		icon: 'mlbtv',
	},
	{
		name: 'nba',
		tap_action: {
			action: 'source',
			source: 'NBA',
		},
		icon: 'nba',
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
		tap_action: { action: 'key', key: 'Netflix' },
		icon: 'mdi:netflix',
	},
	{
		name: 'npostart',
		tap_action: {
			action: 'source',
			source: 'NPO Start',
		},
		icon: 'npo',
	},
	{
		name: 'nrktv',
		tap_action: {
			action: 'source',
			source: 'NRK TV',
		},
		icon: 'nrktv',
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
			source: 'Peacock',
		},
		icon: 'peacock',
	},
	{
		name: 'pia',
		tap_action: {
			action: 'source',
			source: 'Private Internet Access VPN',
		},
		icon: 'pia',
	},
	{
		name: 'plex',
		tap_action: {
			action: 'source',
			source: 'Plex',
		},
		icon: 'mdi:plex',
	},
	{
		name: 'primevideo',
		tap_action: {
			action: 'source',
			source: 'Amazon Prime Video',
		},
		icon: 'primevideo',
	},
	{
		name: 'rakutentv',
		tap_action: {
			action: 'source',
			source: 'Rakuten',
		},
		icon: 'rakutentv',
	},
	{
		name: 'rakutenviki',
		tap_action: {
			action: 'source',
			source: 'Viki',
		},
		icon: 'rakutenviki',
	},
	{
		name: 'skyshowtime',
		tap_action: {
			action: 'source',
			source: 'SkyShowtime',
		},
		icon: 'showtime',
	},
	{
		name: 'spotify',
		tap_action: {
			action: 'source',
			source: 'Spotify',
		},
		icon: 'mdi:spotify',
	},
	{
		name: 'starplus',
		tap_action: {
			action: 'source',
			source: 'Star+',
		},
		icon: 'starplus',
	},
	{
		name: 'stremio',
		tap_action: {
			action: 'source',
			source: 'Stremio',
		},
		icon: 'stremio',
	},
	{
		name: 'surfshark',
		tap_action: {
			action: 'source',
			source: 'Surfshark',
		},
		icon: 'surfshark',
	},
	{
		name: 'tv2play',
		tap_action: {
			action: 'source',
			source: 'TV2 Play', // or "TV 2 Play" ?
		},
		icon: 'tv2play',
	},
	{
		name: 'twitch',
		tap_action: { action: 'source', source: 'Twitch' },
		icon: 'mdi:twitch',
	},
	{
		name: 'viaplay',
		tap_action: {
			action: 'source',
			source: 'Viaplay',
		},
		icon: 'viaplay',
	},
	{
		name: 'videoland',
		tap_action: {
			action: 'source',
			source: 'Videoplay',
		},
		icon: 'videoland',
	},
	{
		name: 'vudu',
		tap_action: {
			action: 'source',
			source: 'Vudu',
		},
		icon: 'vudu',
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
