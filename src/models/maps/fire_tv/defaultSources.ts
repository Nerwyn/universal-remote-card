import { IElementConfig } from '../../interfaces';

/**
 * https://www.home-assistant.io/integrations/androidtv#media_playerselect_source
 */
export const fireTVDefaultSources: IElementConfig[] = [
	{
		name: 'appletv',
		tap_action: {
			action: 'source',
			source: 'com.apple.atve.amazon.appletv',
		},
		icon: 'appletv',
	},
	{
		name: 'crunchyroll',
		tap_action: {
			action: 'source',
			source: 'com.crunchyroll.crunchyroid',
		},
		icon: 'crunchyroll',
	},
	{
		name: 'dazn',
		tap_action: {
			action: 'source',
			source: 'com.dazn',
		},
		icon: 'dazn',
	},
	{
		name: 'discoveryplus',
		tap_action: {
			action: 'source',
			source: 'com.discovery.discoveryplus.firetv',
		},
		icon: 'discovery',
	},
	{
		name: 'disney',
		tap_action: {
			action: 'source',
			source: 'com.disney.disneyplus',
		},
		icon: 'disney',
	},
	{
		name: 'dropout',
		tap_action: { action: 'source', source: 'vhxdropout://' }, // UNTESTED
		icon: 'dropout',
	},
	{
		name: 'emby',
		tap_action: {
			action: 'source',
			source: 'tv.emby.embyatv',
		},
		icon: 'mdi:emby',
	},
	{
		name: 'f1tv',
		tap_action: {
			action: 'source',
			source: 'com.formulaone.production',
		},
		icon: 'f1tv',
	},
	{
		name: 'foxsports',
		tap_action: {
			action: 'source',
			source: 'com.foxsports.videogo',
		},
		icon: 'foxsports',
	},
	{
		name: 'hulu',
		tap_action: {
			action: 'source',
			source: 'com.hulu.plus',
		},
		icon: 'mdi:hulu',
	},
	{
		name: 'jellyfin',
		tap_action: {
			action: 'source',
			source: 'org.jellyfin.androidtv',
		},
		icon: 'jellyfin',
	},
	{
		name: 'kodi',
		tap_action: {
			action: 'source',
			source: 'org.xbmc.kodi',
		},
		icon: 'mdi:kodi',
	},
	{
		name: 'max',
		tap_action: {
			action: 'source',
			source: 'com.hbo.hbonow',
		},
		icon: 'hbomax',
	},
	{
		name: 'mlbtv',
		tap_action: {
			action: 'source',
			source: 'com.bamnetworks.mobile.android.gameday.atbat',
		},
		icon: 'mlbtv',
	},
	{
		name: 'nebula',
		tap_action: { action: 'source', source: 'https://nebula.tv' }, // UNTESTED
		icon: 'nebula',
	},
	{
		name: 'netflix',
		tap_action: {
			action: 'source',
			source: 'com.netflix.ninja',
		},
		icon: 'mdi:netflix',
	},

	{
		name: 'nrktv',
		tap_action: {
			action: 'source',
			source: 'no.nrk.tv',
		},
		icon: 'nrktv',
	},
	{
		name: 'pandora',
		tap_action: {
			action: 'source',
			source: 'com.pandora.android.gtv',
		},
		icon: 'mdi:pandora',
	},
	{
		name: 'paramount',
		tap_action: {
			action: 'source',
			source: 'com.cbs.ott',
		},
		icon: 'paramount',
	},
	{
		name: 'peacock',
		tap_action: {
			action: 'source',
			source: 'com.peacocktv.peacockfiretv',
		},
		icon: 'peacock',
	},
	{
		name: 'pia',
		tap_action: {
			action: 'source',
			source: 'com.privateinternetaccess.android',
		},
		icon: 'pia',
	},
	{
		name: 'plex',
		tap_action: {
			action: 'source',
			source: 'com.plexapp.android',
		},
		icon: 'mdi:plex',
	},
	{
		name: 'primevideo',
		tap_action: {
			action: 'source',
			source: 'com.amazon.firebat',
		},
		icon: 'primevideo',
	},
	{
		name: 's0undtv',
		tap_action: { action: 'source', source: 'com.s0und.s0undtv' },
		icon: 'mdi:twitch',
	},
	{
		name: 'skyshowtime',
		tap_action: {
			action: 'source',
			source: 'com.skyshowtime.skyshowtime.google',
		},
		icon: 'showtime',
	},
	{
		name: 'spotify',
		tap_action: {
			action: 'source',
			source: 'com.spotify.tv.android',
		},
		icon: 'mdi:spotify',
	},
	{
		name: 'steam',
		tap_action: {
			action: 'source',
			source: 'com.valvesoftware.steamlink',
		},
		icon: 'mdi:steam',
	},
	{
		name: 'stremio',
		tap_action: {
			action: 'source',
			source: 'com.stremio.tv',
		},
		icon: 'stremio',
	},
	{
		name: 'surfshark',
		tap_action: {
			action: 'source',
			source: 'com.surfshark.vpnclient.android',
		},
		icon: 'surfshark',
	},
	{
		name: 'twitch',
		tap_action: { action: 'source', source: 'tv.twitch.android.app' },
		icon: 'mdi:twitch',
	},
	{
		name: 'viaplay',
		tap_action: {
			action: 'source',
			source: 'com.viaplay.android',
		},
		icon: 'viaplay',
	},
	{
		name: 'videoland',
		tap_action: {
			action: 'source',
			source: 'nl.rtl.videoland.v2.firetv',
		},
		icon: 'videoland',
	},
	{
		name: 'vlc',
		tap_action: {
			action: 'source',
			source: 'org.videolan.vlc',
		},
		icon: 'mdi:vlc',
	},
	{
		name: 'vudu',
		tap_action: {
			action: 'source',
			source: 'com.fandango.vudu.firetv',
		},
		icon: 'vudu',
	},
	{
		name: 'waiputv',
		tap_action: {
			action: 'source',
			source: 'de.exaring.waipu.firetv.live',
		},
		icon: 'waiputv',
	},
	{
		name: 'wow',
		tap_action: {
			action: 'source',
			source: 'de.sky.online',
		},
		icon: 'wow',
	},
	{
		name: 'youtube',
		tap_action: {
			action: 'source',
			source: 'com.amazon.firetv.youtube',
		},
		icon: 'mdi:youtube',
	},
	{
		name: 'youtubetv',
		tap_action: {
			action: 'source',
			source: 'com.amazon.firetv.tv',
		},
		icon: 'mdi:youtube-tv',
	},
];
