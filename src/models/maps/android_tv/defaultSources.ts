import { IElementConfig } from '../../interfaces';

/**
 * This is a list of common streaming apps, their icons, and the deep links to open them in Android TV, mostly collected from the following Home Assistant Community Forum guide.
 * Not all have been tested, if any do not work please let me know!
 * https://community.home-assistant.io/t/android-tv-remote-app-links-deep-linking-guide/567921
 */
export const androidTVDefaultSources: IElementConfig[] = [
	{
		type: 'button',
		name: 'abciview',
		tap_action: { action: 'source', source: 'iview://' },
		icon: 'abciview',
	},
	{
		type: 'button',
		name: 'appletv',
		tap_action: { action: 'source', source: 'https://tv.apple.com' }, // UNTESTED
		icon: 'appletv',
	},
	{
		type: 'button',
		name: 'crunchyroll',
		tap_action: { action: 'source', source: 'crunchyroll://' }, // UNTESTED
		icon: 'crunchyroll',
	},
	{
		type: 'button',
		name: 'dazn',
		tap_action: { action: 'source', source: 'https://open.dazn.com/' }, // UNTESTED
		icon: 'dazn',
	},
	{
		type: 'button',
		name: 'discoveryplus',
		tap_action: { action: 'source', source: 'discoveryplus://' }, // UNTESTED
		icon: 'discovery',
	},
	{
		type: 'button',
		name: 'disney',
		tap_action: { action: 'source', source: 'https://www.disneyplus.com' },
		icon: 'disney',
	},
	{
		type: 'button',
		name: 'dropout',
		tap_action: { action: 'source', source: 'vhxdropout://' }, // UNTESTED
		icon: 'dropout',
	},
	{
		type: 'button',
		name: 'emby',
		tap_action: {
			action: 'source',
			source: 'embyatv://tv.emby.embyatv/startapp',
		}, // UNTESTED
		icon: 'mdi:emby',
	},
	{
		type: 'button',
		name: 'f1tv',
		tap_action: {
			action: 'source',
			source: 'com.formulaone.production',
		}, // UNTESTED
		icon: 'f1tv',
	},
	{
		type: 'button',
		name: 'filmplus',
		tap_action: {
			action: 'source',
			source: 'com.guideplus.co',
		},
		icon: 'filmplus',
	},
	{
		type: 'button',
		name: 'foxsports',
		tap_action: { action: 'source', source: 'foxsports://live' }, // UNTESTED
		icon: 'foxsports',
	},
	{
		type: 'button',
		name: 'globoplay',
		tap_action: { action: 'source', source: 'com.globo.globotv' },
		icon: 'globoplay',
	},
	{
		type: 'button',
		name: 'hulu',
		tap_action: { action: 'source', source: 'hulu://' }, // BROKEN
		icon: 'mdi:hulu',
	},
	{
		type: 'button',
		name: 'jellyfin',
		tap_action: { action: 'source', source: 'org.jellyfin.androidtv' },
		icon: 'jellyfin',
	},
	{
		type: 'button',
		name: 'kijk',
		tap_action: {
			action: 'source',
			source: 'com.talpa.kijk',
		},
		icon: 'kijk',
	},
	{
		type: 'button',
		name: 'kodi',
		tap_action: {
			action: 'source',
			source: 'org.xbmc.kodi',
		},
		icon: 'mdi:kodi',
	},
	{
		type: 'button',
		name: 'max',
		tap_action: {
			action: 'source',
			source: 'https://play.max.com',
		},
		icon: 'max',
	},
	{
		type: 'button',
		name: 'mlbtv',
		tap_action: { action: 'source', source: 'mlbatbat://' }, // UNTESTED
		icon: 'mlbtv',
	},
	{
		type: 'button',
		name: 'nba',
		tap_action: { action: 'source', source: 'gametime://' }, // UNTESTED
		icon: 'nba',
	},
	{
		type: 'button',
		name: 'nebula',
		tap_action: { action: 'source', source: 'https://nebula.tv' }, // UNTESTED
		icon: 'nebula',
	},
	{
		type: 'button',
		name: 'netflix',
		tap_action: { action: 'source', source: 'netflix://' },
		icon: 'mdi:netflix',
	},
	{
		type: 'button',
		name: 'ninenow',
		tap_action: { action: 'source', source: 'ninenow://' },
		icon: 'ninenow',
	},
	{
		type: 'button',
		name: 'nlziet',
		tap_action: {
			action: 'source',
			source: 'nlziet://',
		},
		icon: 'nlziet',
	},
	{
		type: 'button',
		name: 'npostart',
		tap_action: {
			action: 'source',
			source: 'nl.uitzendinggemist',
		},
		icon: 'npo',
	},
	{
		type: 'button',
		name: 'nrktv',
		tap_action: {
			// UNTESTED
			action: 'source',
			source: 'nrktv://',
		},
		icon: 'nrktv',
	},
	{
		type: 'button',
		name: 'pandora',
		tap_action: { action: 'source', source: 'com.pandora.android.atv' },
		icon: 'mdi:pandora',
	},
	{
		type: 'button',
		name: 'paramount',
		tap_action: { action: 'source', source: 'com.cbs.ott' },
		icon: 'paramount',
	},
	{
		type: 'button',
		name: 'peacock',
		tap_action: {
			action: 'source',
			source: 'com.peacocktv.peacockandroid',
		},
		icon: 'peacock',
	},
	{
		type: 'button',
		name: 'pia',
		tap_action: { action: 'source', source: 'piavpn://' }, // UNTESTED
		icon: 'pia',
	},
	{
		type: 'button',
		name: 'plex',
		tap_action: { action: 'source', source: 'plex://' },
		icon: 'mdi:plex',
	},
	{
		type: 'button',
		name: 'primevideo',
		tap_action: { action: 'source', source: 'https://app.primevideo.com' },
		icon: 'primevideo',
	},
	{
		type: 'button',
		name: 'rakutentv',
		tap_action: { action: 'source', source: 'https://rakutentv.page.link' },
		icon: 'rakutentv',
	},
	{
		type: 'button',
		name: 'rakutenviki',
		tap_action: { action: 'source', source: 'viki://home' }, // UNTESTED
		icon: 'rakutenviki',
	},
	{
		type: 'button',
		name: 'reshet13',
		tap_action: { action: 'source', source: 'com.applicaster.iReshet' },
		icon: 'reshet13',
	},
	{
		type: 'button',
		name: 'sbsondemand',
		tap_action: { action: 'source', source: 'com.sbs.ondemand.tv' },
		icon: 'sbsondemand',
	},
	{
		type: 'button',
		name: 'sevenplus',
		tap_action: { action: 'source', source: 'seven://' },
		icon: 'sevenplus',
	},
	{
		type: 'button',
		name: 'skyshowtime',
		tap_action: {
			action: 'source',
			source: 'https://www.skyshowtime.com/deeplink',
		},
		icon: 'showtime',
	},
	{
		type: 'button',
		name: 'spotify',
		tap_action: { action: 'source', source: 'spotify://' },
		icon: 'mdi:spotify',
	},
	{
		type: 'button',
		name: 'starplus',
		tap_action: { action: 'source', source: 'https://www.starplus.com' },
		icon: 'starplus',
	},
	{
		type: 'button',
		name: 'steam',
		tap_action: { action: 'source', source: 'com.valvesoftware.steamlink' },
		icon: 'mdi:steam',
	},
	{
		type: 'button',
		name: 'stremio',
		tap_action: { action: 'source', source: 'stremio://' },
		icon: 'stremio',
	},
	{
		type: 'button',
		name: 'surfshark',
		tap_action: {
			action: 'source',
			source: 'https://surfshark.com/locations-ul',
		}, // UNTESTED
		icon: 'surfshark',
	},
	{
		type: 'button',
		name: 'tenplay',
		tap_action: { action: 'source', source: 'tenplay://' },
		icon: 'tenplay',
	},
	{
		type: 'button',
		name: 'tubi',
		tap_action: { action: 'source', source: 'tubitv://open' },
		icon: 'tubi',
	},
	{
		type: 'button',
		name: 'tv2play',
		tap_action: {
			action: 'source',
			source: 'dk.tv2.tv2playtv://*.tv2.dk/android/dk.tv2.tv2playtv/callback',
		}, // UNTESTED
		icon: 'tv2play',
	},
	{
		type: 'button',
		name: 'viaplay',
		tap_action: { action: 'source', source: 'viaplay://deeplink/film' }, // UNTESTED
		icon: 'viaplay',
	},
	{
		type: 'button',
		name: 'videoland',
		tap_action: { action: 'source', source: 'videoland-v2://' },
		icon: 'videoland',
	},
	{
		type: 'button',
		name: 'vlc',
		tap_action: { action: 'source', source: 'org.videolan.vlc' },
		icon: 'mdi:vlc',
	},
	{
		type: 'button',
		name: 'vudu',
		tap_action: { action: 'source', source: 'vuduapp://' },
		icon: 'vudu',
	},
	{
		type: 'button',
		name: 'waiputv',
		tap_action: { action: 'source', source: 'de.exaring.waipu' },
		icon: 'waiputv',
	},
	{
		type: 'button',
		name: 'wow',
		tap_action: { action: 'source', source: 'de.sky.online' },
		icon: 'wow',
	},
	{
		type: 'button',
		name: 'youtube',
		tap_action: { action: 'source', source: 'vnd.youtube://' },
		icon: 'mdi:youtube',
	},
	{
		type: 'button',
		name: 'youtubetv',
		tap_action: { action: 'source', source: 'https://tv.youtube.com' }, // UNTESTED
		icon: 'mdi:youtube-tv',
	},
];
