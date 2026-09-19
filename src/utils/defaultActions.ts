import {
	ActionTypes,
	IElementConfig,
	Platform,
	Platforms,
} from '../models/interfaces';
import {
	androidTVDefaultKeys,
	androidTVDefaultSources,
	appleTVDefaultKeys,
	appleTVDefaultSources,
	braviaTVDefaultKeys,
	braviaTVDefaultSources,
	denonAVRDefaultKeys,
	fireTVDefaultKeys,
	fireTVDefaultSources,
	genericRemoteDefaultKeys,
	jellyfinTVDefaultKeys,
	kodiDefaultKeys,
	kodiDefaultSources,
	philipsTVDefaultKeys,
	rokuDefaultKeys,
	rokuDefaultSources,
	samsungTVDefaultKeys,
	samsungTVDefaultSources,
	unfoldedCircleDefaultKeys,
	unifiedRemoteDefaultKeys,
	webosDefaultKeys,
	webosDefaultSources,
	yamahaYNCADefaultKeys,
	yamahaYNCADefaultSources,
} from '../models/maps';

export function getDefaultActions(platform: Platform) {
	let defaultKeys: IElementConfig[];
	let defaultSources: IElementConfig[];
	switch (platform) {
		case 'Generic Remote': {
			const names = new Set();
			defaultKeys = [...genericRemoteDefaultKeys];
			defaultSources = [];
			for (const p of Platforms.filter((p) => p != 'Generic Remote')) {
				const [keys, sources] = getDefaultActions(p);
				for (const key of keys) {
					if ((key.type || 'button') == 'button' && !names.has(key.name)) {
						names.add(key.name);
						const action: IElementConfig = {
							name: key.name,
							icon: key.icon,
							tap_action: { action: 'key', key: key.name },
						};
						if (key.hold_action) {
							action.hold_action = key.hold_action;
						}
						defaultKeys.push(action);
					}
				}
				for (const source of sources) {
					if (!names.has(source.name)) {
						names.add(source.name);
						const action: IElementConfig = {
							name: source.name,
							icon: source.icon,
							tap_action: { action: 'key', key: source.name },
						};
						if (source.hold_action) {
							action.hold_action = source.hold_action;
						}
						defaultSources.push(action);
					}
				}
			}
			break;
		}
		case 'Yamaha YNCA':
			defaultKeys = yamahaYNCADefaultKeys;
			defaultSources = yamahaYNCADefaultSources;
			break;
		case 'Unfolded Circle':
			defaultKeys = unfoldedCircleDefaultKeys;
			defaultSources = [];
			break;
		case 'Unified Remote':
			defaultKeys = unifiedRemoteDefaultKeys;
			defaultSources = [];
			break;
		case 'Denon AVR':
			defaultKeys = denonAVRDefaultKeys;
			defaultSources = [];
			break;
		case 'LG webOS':
			defaultKeys = webosDefaultKeys;
			defaultSources = webosDefaultSources;
			break;
		case 'Samsung TV':
			defaultKeys = samsungTVDefaultKeys;
			defaultSources = samsungTVDefaultSources;
			break;
		case 'Philips TV':
			defaultKeys = philipsTVDefaultKeys;
			defaultSources = [];
			break;
		case 'Jellyfin':
			defaultKeys = jellyfinTVDefaultKeys;
			defaultSources = [];
			break;
		case 'Kodi':
			defaultKeys = kodiDefaultKeys;
			defaultSources = kodiDefaultSources;
			break;
		case 'Roku':
			defaultKeys = rokuDefaultKeys;
			defaultSources = rokuDefaultSources;
			break;
		case 'Apple TV':
			defaultKeys = appleTVDefaultKeys;
			defaultSources = appleTVDefaultSources;
			break;
		case 'Fire TV':
			defaultKeys = fireTVDefaultKeys;
			defaultSources = fireTVDefaultSources;
			break;
		case 'Sony BRAVIA':
			defaultKeys = braviaTVDefaultKeys;
			defaultSources = braviaTVDefaultSources;
			break;
		case 'Android TV':
		default:
			defaultKeys = androidTVDefaultKeys;
			defaultSources = androidTVDefaultSources;
			break;
	}
	return [defaultKeys, defaultSources];
}

export function autofillActionTargets(config: IElementConfig) {
	for (const actionType of ActionTypes) {
		if (config[actionType]) {
			const action = config[actionType];
			if (action.action == 'perform-action') {
				const [domain, _service] = (action.perform_action ?? '').split('.');
				const target = action.target ?? {};
				switch (domain) {
					case 'remote':
						target.entity_id = '{{ config.card.remote_id }}';
						break;
					case 'media_player':
					case 'androidtv':
					case 'kodi':
					case 'denonavr':
					case 'webostv':
						target.entity_id = '{{ config.card.media_player_id }}';
						break;
					case 'unified_remote':
						action.data ??= {};
						action.data.target ??= '{{ config.card.device }}';
						break;
					case 'apple_tv':
						action.data ??= {};
						action.data.config_entry_id ??= '{{ config.card.config_entry_id }}';
						break;
					case 'wake_on_lan':
						action.data ??= {};
						action.data.mac ??= '{{ config.card.mac }}';
						break;
					default:
						target.entity_id = '{{ config.entity }}';
						break;
				}
				action.target = target;
				break;
			}
			config[actionType] = action;
		}
	}
	return config;
}
