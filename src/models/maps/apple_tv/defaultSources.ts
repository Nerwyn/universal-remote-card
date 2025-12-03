import { IElementConfig } from '../../interfaces';

/**
 * https://www.home-assistant.io/integrations/apple_tv/#launching-apps
 */
export const appleTVDefaultSources: IElementConfig[] = [
	{
		name: 'allente',
		tap_action: {
			action: 'source',
			source: 'Allente',
		},
		icon: 'allente',
	},
	{
		name: 'appletv',
		tap_action: {
			action: 'source',
			source: 'TV',
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
			source: 'Dropout',
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
		name: 'f1tv',
		tap_action: {
			action: 'source',
			source: 'F1 TV',
		},
		icon: 'f1tv',
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
		name: 'hulu',
		tap_action: {
			action: 'source',
			source: 'Hulu',
		},
		icon: 'mdi:hulu',
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
			source: 'Nebula',
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
		name: 'npostart',
		tap_action: {
			action: 'source',
			source: 'NPO',
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
		name: 'pandora',
		tap_action: {
			action: 'source',
			source: 'Pandora',
		},
		icon: 'mdi:pandora',
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
			source: 'PIA VPN',
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
			source: 'Prime Video',
		},
		icon: 'primevideo',
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
		name: 'steam',
		tap_action: {
			action: 'source',
			source: 'Steam Link',
		},
		icon: 'mdi:steam',
	},
	{
		name: 'tv2play',
		tap_action: {
			action: 'source',
			source: 'TV 2 Play',
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
			source: 'Videoland',
		},
		icon: 'videoland',
	},
	{
		name: 'vlc',
		tap_action: {
			action: 'source',
			source: 'VLC',
		},
		icon: 'mdi:vlc',
	},
	{
		name: 'vudu',
		tap_action: {
			action: 'source',
			source: 'Fandango at Home',
		},
		icon: 'vudu',
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
	{
		name: 'youtubetv',
		tap_action: {
			action: 'source',
			source: 'YouTube TV',
		},
		icon: 'mdi:youtube-tv',
	},
];
