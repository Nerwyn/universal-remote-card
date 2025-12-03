import { IElementConfig } from '../../interfaces';

/**
 * https://www.home-assistant.io/integrations/denonavr/#action-denonavrget_command
 */
export const denonAVRDefaultKeys: IElementConfig[] = [
	{
		name: 'power',
		tap_action: { action: 'key', key: 'PWON' },
		hold_action: { action: 'key', key: 'PWSTANDBY' },
		icon: 'mdi:power',
	},
	{
		name: 'power_on',
		tap_action: { action: 'key', key: 'PWON' },
		icon: 'mdi:power-on',
	},
	{
		name: 'power_off',
		tap_action: { action: 'key', key: 'PWSTANDBY' },
		icon: 'mdi:power-off',
	},
	{
		name: 'back',
		tap_action: { action: 'key', key: 'MNRTN' },
		icon: 'mdi:keyboard-backspace',
	},
	{
		name: 'menu',
		tap_action: { action: 'key', key: 'MNMEN ON' },
		hold_action: { action: 'key', key: 'MNMEN OFF' },
		icon: 'mdi:menu',
	},
	{
		name: 'menu_on',
		tap_action: { action: 'key', key: 'MNMEN ON' },
		icon: 'mdi:menu-open',
	},
	{
		name: 'menu_off',
		tap_action: { action: 'key', key: 'MNMEN OFF' },
		icon: 'mdi:menu-close',
	},
	{
		name: 'option',
		tap_action: { action: 'key', key: 'MNOPT' },
		icon: 'mdi:dots-vertical',
	},
	{
		name: 'volume_up',
		tap_action: { action: 'key', key: 'MVUP' },
		icon: 'mdi:volume-high',
	},
	{
		name: 'volume_down',
		tap_action: { action: 'key', key: 'MVDOWN' },
		icon: 'mdi:volume-medium',
	},
	{
		name: 'volume_mute',
		tap_action: { action: 'key', key: 'MUON' },
		hold_action: { action: 'key', key: 'MUOFF' },
		icon: 'mdi:volume-mute',
	},
	{
		type: 'slider',
		name: 'slider',
		range: [0, 1],
		step: 0.01,
		value_attribute: 'volume_level',
		tap_action: {
			action: 'perform-action',
			perform_action: 'media_player.volume_set',
			data: {
				volume_level: '{{ value | float }}',
			},
		},
	},
	{
		name: 'up',
		tap_action: { action: 'key', key: 'MNCUP' },
		icon: 'mdi:chevron-up',
	},
	{
		name: 'down',
		tap_action: { action: 'key', key: 'MNCDN' },
		icon: 'mdi:chevron-down',
	},
	{
		name: 'left',
		tap_action: { action: 'key', key: 'MNCLT' },
		icon: 'mdi:chevron-left',
	},
	{
		name: 'right',
		tap_action: { action: 'key', key: 'MNCRT' },
		icon: 'mdi:chevron-right',
	},
	{
		name: 'center',
		tap_action: { action: 'key', key: 'MNENT' },
		icon: 'mdi:circle',
	},
	{
		name: 'navigation_buttons',
		icon: 'mdi:gamepad',
	},
	{
		name: 'dpad',
		icon: 'mdi:gamepad',
	},
	{
		type: 'circlepad',
		name: 'circlepad',
		tap_action: {
			action: 'key',
			key: 'MNENT',
		},
		up: {
			icon: 'mdi:chevron-up',
			tap_action: { action: 'key', key: 'MNCUP' },
			hold_action: { action: 'repeat' },
		},
		down: {
			icon: 'mdi:chevron-down',
			tap_action: { action: 'key', key: 'MNCDN' },
			hold_action: { action: 'repeat' },
		},
		left: {
			icon: 'mdi:chevron-left',
			tap_action: { action: 'key', key: 'MNCLT' },
			hold_action: { action: 'repeat' },
		},
		right: {
			icon: 'mdi:chevron-right',
			tap_action: { action: 'key', key: 'MNCRT' },
			hold_action: { action: 'repeat' },
		},
	},
	{
		type: 'circlepad',
		name: 'clickwheel',
		styles: '.circlepad {\n  outline: none;\n\n  --label-color: var(--icon-color);\n  --size: min(32px, 12vw);\n  --icon-offset: min(20px, 4vw);\n}\n#center::part(button) {\n  outline: none;\n}',
		up: {
			styles: '.label {\n  font-size: min(18px, 6vw);\n  translate: var(--icon-offset) calc(-1 * var(--icon-offset));\n}',
			label: 'MENU',
			tap_action: { action: 'key', key: 'MNMEN ON' },
			hold_action: { action: 'key', key: 'MNMEN OFF' },
		},
		down: {
			styles: '.icon {\n  translate: calc(-1 * var(--icon-offset)) var(--icon-offset);\n\n}',
			icon: 'mdi:play-pause',
			tap_action: {
				action: 'perform-action',
				perform_action: 'media_player.media_play_pause',
			},
		},
		left: {
			icon: 'mdi:skip-backward',
			styles: '.icon {\n  translate: calc(-1 * var(--icon-offset)) calc(-1 * var(--icon-offset));\n}',
			tap_action: {
				action: 'perform-action',
				perform_action: 'media_player.media_previous_track',
			},
		},
		right: {
			icon: 'mdi:skip-forward',
			styles: '.icon {\n  translate: var(--icon-offset) var(--icon-offset);\n}',
			tap_action: {
				action: 'perform-action',
				key: 'media_player.media_next_track',
			},
		},
		drag_action: {
			action: 'key',
			key: 'MV{{"UP" if clockwise else "DOWN"}}',
		},
		tap_action: {
			action: 'key',
			key: 'MNENT',
		},
	},
	{
		type: 'touchpad',
		name: 'touchpad',
		tap_action: {
			action: 'key',
			key: 'MNENT',
		},
		up: {
			tap_action: { action: 'key', key: 'MNCUP' },
			hold_action: { action: 'repeat' },
		},
		down: {
			tap_action: { action: 'key', key: 'MNCDN' },
			hold_action: { action: 'repeat' },
		},
		left: {
			tap_action: { action: 'key', key: 'MNCLT' },
			hold_action: { action: 'repeat' },
		},
		right: {
			tap_action: { action: 'key', key: 'MNCRT' },
			hold_action: { action: 'repeat' },
		},
	},
	{
		type: 'touchpad',
		name: 'dragpad',
		tap_action: {
			action: 'key',
			key: 'MNENT',
		},
		drag_action: {
			action: 'key',
			key: 'MNC{{ ("RT" if deltaX > 0 else "LT") if (deltaX | abs) > (deltaY | abs) else ("DN" if deltaY > 0 else "UP") }}',
			repeat_delay: 100,
		},
		multi_drag_action: {
			action: 'key',
			key: 'MNC{{ ("RT" if deltaX > 0 else "LT") if (deltaX | abs) > (deltaY | abs) else ("DN" if deltaY > 0 else "UP") }}',
			repeat_delay: 50,
		},
		up: {},
		down: {},
		left: {},
		right: {},
		icon: 'mdi:drag-variant',
	},
	{
		name: 'play_pause',
		tap_action: {
			action: 'perform-action',
			perform_action: 'media_player.media_play_pause',
		},
		icon: 'mdi:play-pause',
	},
	{
		name: 'play',
		tap_action: {
			action: 'perform-action',
			perform_action: 'media_player.media_play',
		},
		icon: 'mdi:play',
	},
	{
		name: 'pause',
		tap_action: {
			action: 'perform-action',
			perform_action: 'media_player.media_pause',
		},
		icon: 'mdi:pause',
	},
	{
		name: 'previous',
		tap_action: {
			action: 'perform-action',
			perform_action: 'media_player.media_previous_track',
		},
		icon: 'mdi:skip-previous',
	},
	{
		name: 'next',
		tap_action: {
			action: 'perform-action',
			perform_action: 'media_player.media_next_track',
		},
		icon: 'mdi:skip-next',
	},
	{
		name: 'info',
		tap_action: { action: 'key', key: 'MNINF' },
		icon: 'mdi:information',
	},
	{
		name: 'cd',
		tap_action: { action: 'key', key: 'SICD' },
		icon: 'mdi:disc',
	},
	{
		name: 'tuner',
		tap_action: { action: 'key', key: 'SITUNER' },
		icon: 'mdi:radio',
	},
	{
		name: 'dvd',
		tap_action: { action: 'key', key: 'SIDVD' },
		icon: 'mdi:disc',
	},
	{
		name: 'blu_ray',
		tap_action: { action: 'key', key: 'SIBD' },
		icon: 'mdi:disc-player',
	},
	{
		name: 'tv',
		tap_action: { action: 'key', key: 'SITV' },
		icon: 'mdi:television-box',
	},
	{
		name: 'sat_cbl',
		tap_action: { action: 'key', key: 'SISAT/CBL' },
		icon: 'mdi:satellite',
	},
	{
		name: 'media_player',
		tap_action: { action: 'key', key: 'SIMPLAY' },
		icon: 'mdi:multimedia',
	},
	{
		name: 'game',
		tap_action: { action: 'key', key: 'SIGAME' },
		icon: 'mdi:controller',
	},
	{
		name: 'hd_radio',
		tap_action: { action: 'key', key: 'SIHDRADIO' },
		icon: 'mdi:antenna',
	},
	{
		name: 'net',
		tap_action: { action: 'key', key: 'SINET' },
		icon: 'mdi:web',
	},
	{
		name: 'pandora',
		tap_action: { action: 'key', key: 'SIPANDORA' },
		icon: 'mdi:pandora',
	},
	{
		name: 'spotify',
		tap_action: { action: 'key', key: 'SISPOTIFY' },
		icon: 'mdi:spotify',
	},
	{
		name: 'last_fm',
		tap_action: { action: 'key', key: 'SILASTFM' },
		icon: 'mdi:radio-fm',
	},
	{
		name: 'flickr',
		tap_action: { action: 'key', key: 'SIFLICKR' },
		icon: 'mdi:circle-small',
	},
	{
		name: 'iradio',
		tap_action: { action: 'key', key: 'SIIRADIO' },
		icon: 'mdi:information',
	},
	{
		name: 'server',
		tap_action: { action: 'key', key: 'SISERVER' },
		icon: 'mdi:server',
	},
	{
		name: 'favorites',
		tap_action: { action: 'key', key: 'SIFAVORITES' },
		icon: 'mdi:star-box-multiple',
	},
	{
		name: 'aux_1',
		tap_action: { action: 'key', key: 'SIAUX1' },
		icon: 'mdi:audio-input-stereo-minijack',
	},
	{
		name: 'aux_2',
		tap_action: { action: 'key', key: 'SIAUX2' },
		icon: 'mdi:audio-input-stereo-minijack',
	},
	{
		name: 'aux_3',
		tap_action: { action: 'key', key: 'SIAUX3' },
		icon: 'mdi:audio-input-stereo-minijack',
	},
	{
		name: 'aux_4',
		tap_action: { action: 'key', key: 'SIAUX4' },
		icon: 'mdi:audio-input-stereo-minijack',
	},
	{
		name: 'aux_5',
		tap_action: { action: 'key', key: 'SIAUX5' },
		icon: 'mdi:audio-input-stereo-minijack',
	},
	{
		name: 'aux_6',
		tap_action: { action: 'key', key: 'SIAUX6' },
		icon: 'mdi:audio-input-stereo-minijack',
	},
	{
		name: 'aux_7',
		tap_action: { action: 'key', key: 'SIAUX7' },
		icon: 'mdi:audio-input-stereo-minijack',
	},
	{
		name: 'bluetooth',
		tap_action: { action: 'key', key: 'SIBT' },
		icon: 'mdi:bluetooth',
	},
	{
		name: 'ipod',
		tap_action: { action: 'key', key: 'SIUSB/IPOD' },
		icon: 'mdi:ipod',
	},
	{
		name: 'usb',
		tap_action: { action: 'key', key: 'SIUSB' },
		icon: 'mdi:usb',
	},
	{
		name: 'surround_mode_movie',
		tap_action: { action: 'key', key: 'MSMOVIE' },
		icon: 'mdi:movie',
	},
	{
		name: 'surround_mode_music',
		tap_action: { action: 'key', key: 'MSMUSIC' },
		icon: 'mdi:music',
	},
	{
		name: 'surround_mode_game',
		tap_action: { action: 'key', key: 'MSGAME' },
		icon: 'mdi:controller',
	},
	{
		name: 'surround_mode_direct',
		tap_action: { action: 'key', key: 'MSDIRECT' },
		icon: 'mdi:surround-sound-5-1',
	},
	{
		name: 'surround_mode_pure_direct',
		tap_action: { action: 'key', key: 'MSPURE DIRECT' },
		icon: 'mdi:surround-sound-5-1-2',
	},
	{
		name: 'surround_mode_stereo',
		tap_action: { action: 'key', key: 'MSSTEREO' },
		icon: 'mdi:surround-sound-2-0',
	},
	{
		name: 'surround_mode_auto',
		tap_action: { action: 'key', key: 'MSAUTO' },
		icon: 'mdi:refresh-auto',
	},
	{
		name: 'surround_mode_dolby',
		tap_action: { action: 'key', key: 'MSDOLBY DIGITAL' },
		icon: 'mdi:dolby',
	},
	{
		name: 'surround_mode_dts',
		tap_action: { action: 'key', key: 'MSDTS SURROUND' },
		icon: 'mdi:surround-sound',
	},
	{
		name: 'surround_mode_auro_3d',
		tap_action: { action: 'key', key: 'MSAURO3D' },
		icon: 'mdi:video-3d',
	},
	{
		name: 'surround_mode_auro_2d',
		tap_action: { action: 'key', key: 'MSAURO2DSURR' },
		icon: 'mdi:video-2d',
	},
	{
		name: 'surround_mode_multi_channel_stereo',
		tap_action: { action: 'key', key: 'MSMCH STEREO' },
		icon: 'mdi:surround-sound-2-1',
	},
	{
		name: 'surround_mode_wide_screen',
		tap_action: { action: 'key', key: 'MSWIDE SCREEN' },
		icon: 'mdi:theater',
	},
	{
		name: 'surround_mode_super_stadium',
		tap_action: { action: 'key', key: 'MSSUPER STADIUM' },
		icon: 'mdi:stadium',
	},
	{
		name: 'surround_mode_rock_arena',
		tap_action: { action: 'key', key: 'MSROCK ARENA' },
		icon: 'mdi:guitar-electric',
	},
	{
		name: 'surround_mode_jazz_club',
		tap_action: { action: 'key', key: 'MSJAZZ CLUB' },
		icon: 'mdi:saxophone',
	},
	{
		name: 'surround_mode_classic_concert',
		tap_action: { action: 'key', key: 'MSCLASSIC CONCERT' },
		icon: 'mdi:violin',
	},
	{
		name: 'surround_mode_mono_movie',
		tap_action: { action: 'key', key: 'MSMONO MOVIE' },
		icon: 'mdi:speaker',
	},
	{
		name: 'surround_mode_matrix',
		tap_action: { action: 'key', key: 'MSMATRIX' },
		icon: 'mdi:matrix',
	},
	{
		name: 'surround_mode_video_game',
		tap_action: { action: 'key', key: 'MSVIDEO GAME' },
		icon: 'mdi:controller',
	},
	{
		name: 'surround_mode_virtual',
		tap_action: { action: 'key', key: 'MSVIRTUAL' },
		icon: 'mdi:virtual-reality',
	},
	{
		name: 'aspect_ratio_4_3',
		tap_action: { action: 'key', key: 'VSASPNRM' },
		icon: 'mdi:image',
	},
	{
		name: 'aspect_ratio_16_9',
		tap_action: { action: 'key', key: 'VSASPFUL' },
		icon: 'mdi:image-area',
	},
];
