import { IElementConfig } from '../../interfaces';

/**
 * This is a list of common streaming apps, their icons, and the deep links to open them in Android TV, mostly collected from the following Home Assistant Community Forum guide.
 * Not all have been tested, if any do not work please let me know!
 * https://community.home-assistant.io/t/android-tv-remote-app-links-deep-linking-guide/567921
 */
export const androidTVDefaultSources: IElementConfig[] = [
	{
		name: 'abciview',
		tap_action: { action: 'source', source: 'iview://' },
		icon: 'abciview',
	},
	{
		name: 'acorntv',
		tap_action: { action: 'source', source: 'com.acorn.tv' },
		icon: 'acorntv',
	},
	{
		name: 'appletv',
		tap_action: { action: 'source', source: 'https://tv.apple.com' },
		icon: 'appletv',
	},
	{
		name: 'britbox',
		tap_action: { action: 'source', source: 'com.britbox.tv' },
		icon: 'britbox',
	},
	{
		name: 'crunchyroll',
		tap_action: { action: 'source', source: 'crunchyroll://' },
		icon: 'crunchyroll',
	},
	{
		name: 'dazn',
		tap_action: { action: 'source', source: 'https://open.dazn.com/' },
		icon: 'dazn',
	},
	{
		name: 'discoveryplus',
		tap_action: { action: 'source', source: 'discoveryplus://' },
		icon: 'discovery',
	},
	{
		name: 'disney',
		tap_action: { action: 'source', source: 'https://www.disneyplus.com' },
		icon: 'disney',
	},
	{
		name: 'dropout',
		tap_action: { action: 'source', source: 'vhxdropout://' },
		icon: 'dropout',
	},
	{
		name: 'emby',
		tap_action: {
			action: 'source',
			source: 'embyatv://tv.emby.embyatv/startapp',
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
		name: 'filmplus',
		tap_action: {
			action: 'source',
			source: 'com.guideplus.co',
		},
		icon: 'filmplus',
	},
	{
		name: 'foxsports',
		tap_action: { action: 'source', source: 'foxsports://live' },
		icon: 'foxsports',
	},
	{
		name: 'globoplay',
		tap_action: {
			action: 'source',
			source: 'https://globoplay.globo.com/',
		},
		icon: 'globoplay',
	},
	{
		name: 'hulu',
		tap_action: { action: 'source', source: 'com.hulu.livingroomplus' },
		icon: 'mdi:hulu',
	},
	{
		name: 'jellyfin',
		tap_action: { action: 'source', source: 'org.jellyfin.androidtv' },
		icon: 'jellyfin',
	},
	{
		name: 'kijk',
		tap_action: {
			action: 'source',
			source: 'com.talpa.kijk',
		},
		icon: 'kijk',
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
			source: 'https://play.max.com',
		},
		icon: 'hbomax',
	},
	{
		name: 'mlbtv',
		tap_action: { action: 'source', source: 'mlbatbat://' },
		icon: 'mlbtv',
	},
	{
		name: 'nba',
		tap_action: { action: 'source', source: 'gametime://' },
		icon: 'nba',
	},
	{
		name: 'nebula',
		tap_action: { action: 'source', source: 'https://nebula.tv' },
		icon: 'nebula',
	},
	{
		name: 'netflix',
		tap_action: { action: 'source', source: 'netflix://' },
		icon: 'mdi:netflix',
	},
	{
		name: 'ninenow',
		tap_action: { action: 'source', source: 'ninenow://' },
		icon: 'ninenow',
	},
	{
		name: 'nlziet',
		tap_action: {
			action: 'source',
			source: 'nlziet://',
		},
		icon: 'nlziet',
	},
	{
		name: 'npostart',
		tap_action: {
			action: 'source',
			source: 'nl.uitzendinggemist',
		},
		icon: 'npo',
	},
	{
		name: 'nrktv',
		tap_action: {
			action: 'source',
			source: 'nrktv://',
		},
		icon: 'nrktv',
	},
	{
		name: 'nuvio',
		tap_action: {
			action: 'source',
			source: 'com.nuvio.tv',
		},
		icon: 'nuvio',
	},
	{
		name: 'pandora',
		tap_action: { action: 'source', source: 'com.pandora.android.atv' },
		icon: 'mdi:pandora',
	},
	{
		name: 'paramount',
		tap_action: { action: 'source', source: 'com.cbs.ca' },
		icon: 'paramount',
	},
	{
		name: 'pbs',
		tap_action: { action: 'source', source: 'com.pbs.video' },
		icon: 'pbs',
	},
	{
		name: 'peacock',
		tap_action: {
			action: 'source',
			source: 'com.peacocktv.peacockandroid',
		},
		icon: 'peacock',
	},
	{
		name: 'pia',
		tap_action: { action: 'source', source: 'piavpn://' },
		icon: 'pia',
	},
	{
		name: 'plex',
		tap_action: { action: 'source', source: 'plex://' },
		icon: 'mdi:plex',
	},
	{
		name: 'primevideo',
		tap_action: { action: 'source', source: 'https://app.primevideo.com' },
		icon: 'primevideo',
	},
	{
		name: 'rakutentv',
		tap_action: { action: 'source', source: 'https://rakutentv.page.link' },
		icon: 'rakutentv',
	},
	{
		name: 'rakutenviki',
		tap_action: { action: 'source', source: 'viki://home' },
		icon: 'rakutenviki',
	},
	{
		name: 'reshet13',
		tap_action: { action: 'source', source: 'com.applicaster.iReshet' },
		icon: 'reshet13',
	},
	{
		name: 'rtlplus',
		tap_action: { action: 'source', source: 'https://plus.rtl.de' },
		icon: 'rtlplus',
	},
	{
		name: 's0undtv',
		tap_action: { action: 'source', source: 'com.s0und.s0undtv' },
		icon: 'mdi:twitch',
	},
	{
		name: 'sbsondemand',
		tap_action: { action: 'source', source: 'com.sbs.ondemand.tv' },
		icon: 'sbsondemand',
	},
	{
		name: 'sevenplus',
		tap_action: { action: 'source', source: 'seven://' },
		icon: 'sevenplus',
	},
	{
		name: 'skyshowtime',
		tap_action: {
			action: 'source',
			source: 'https://www.skyshowtime.com/deeplink',
		},
		icon: 'showtime',
	},
	{
		name: 'spotify',
		tap_action: { action: 'source', source: 'spotify://' },
		icon: 'mdi:spotify',
	},
	{
		name: 'starplus',
		tap_action: { action: 'source', source: 'https://www.starplus.com' },
		icon: 'starplus',
	},
	{
		name: 'steam',
		tap_action: { action: 'source', source: 'com.valvesoftware.steamlink' },
		icon: 'mdi:steam',
	},
	{
		name: 'stremio',
		tap_action: { action: 'source', source: 'stremio://' },
		icon: 'stremio',
	},
	{
		name: 'surfshark',
		tap_action: {
			action: 'source',
			source: 'https://surfshark.com/locations-ul',
		},
		icon: 'surfshark',
	},
	{
		name: 'tenplay',
		tap_action: { action: 'source', source: 'tenplay://' },
		icon: 'tenplay',
	},
	{
		name: 'tubi',
		tap_action: { action: 'source', source: 'tubitv://open' },
		icon: 'tubi',
	},
	{
		name: 'tv2play',
		tap_action: {
			action: 'source',
			source: 'dk.tv2.tv2playtv://*.tv2.dk/android/dk.tv2.tv2playtv/callback',
		},
		icon: 'tv2play',
	},
	{
		name: 'twitch',
		tap_action: { action: 'source', source: 'tv.twitch.android.app' },
		icon: 'mdi:twitch',
	},
	{
		name: 'viaplay',
		tap_action: { action: 'source', source: 'viaplay://deeplink/film' },
		icon: 'viaplay',
	},
	{
		name: 'videoland',
		tap_action: { action: 'source', source: 'videoland-v2://' },
		icon: 'videoland',
	},
	{
		name: 'vlc',
		tap_action: { action: 'source', source: 'org.videolan.vlc' },
		icon: 'mdi:vlc',
	},
	{
		name: 'vudu',
		tap_action: { action: 'source', source: 'vuduapp://' },
		icon: 'vudu',
	},
	{
		name: 'waiputv',
		tap_action: { action: 'source', source: 'de.exaring.waipu' },
		icon: 'waiputv',
	},
	{
		name: 'wow',
		tap_action: { action: 'source', source: 'de.sky.online' },
		icon: 'wow',
	},
	{
		name: 'wuplay',
		tap_action: { action: 'source', source: 'app.wuplay.androidtv' },
		icon: 'wuplay',
	},
	{
		name: 'youtube',
		tap_action: { action: 'source', source: 'vnd.youtube://' },
		icon: 'mdi:youtube',
	},
	{
		name: 'youtubetv',
		tap_action: { action: 'source', source: 'https://tv.youtube.com' },
		icon: 'mdi:youtube-tv',
	},
];
