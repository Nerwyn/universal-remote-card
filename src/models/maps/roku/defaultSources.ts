import { IElementConfig } from '../../interfaces';

/**
 * https://www.home-assistant.io/integrations/roku/#source-automation
 */
export const rokuDefaultSources: IElementConfig[] = [
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
			source: 'DAZN Live Sports Streaming',
		},
		icon: 'dazn',
	},
	{
		name: 'discoveryplus',
		tap_action: {
			action: 'source',
			source: 'discovery+ | Stream TV Shows',
		},
		icon: 'discovery',
	},
	{
		name: 'disney',
		tap_action: {
			action: 'source',
			source: 'Disney Plus',
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
		name: 'jellyfin',
		tap_action: {
			action: 'source',
			source: 'Jellyfin',
		},
		icon: 'jellyfin',
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
			source: 'Paramount Plus',
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
		name: 'plex',
		tap_action: {
			action: 'source',
			source: 'Plex - Free Movies & TV',
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
		name: 'spotify',
		tap_action: {
			action: 'source',
			source: 'Spotify',
		},
		icon: 'mdi:spotify',
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
