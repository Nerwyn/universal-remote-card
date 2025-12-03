import { IElementConfig } from '../../interfaces';

/**
 * https://www.home-assistant.io/integrations/samsungtv/#remote
 */
export const samsungTVDefaultKeys: IElementConfig[] = [
	{
		name: 'power',
		tap_action: { action: 'key', key: 'KEY_POWER' },
		icon: 'mdi:power',
	},
	{
		name: 'power_on',
		tap_action: { action: 'key', key: 'KEY_POWERON' },
		icon: 'mdi:power-on',
	},
	{
		name: 'power_off',
		tap_action: { action: 'key', key: 'KEY_POWEROFF' },
		icon: 'mdi:power-off',
	},
	{
		name: 'home',
		tap_action: { action: 'key', key: 'KEY_HOME' },
		icon: 'mdi:home',
	},
	{
		name: 'back',
		tap_action: { action: 'key', key: 'KEY_RETURN' },
		icon: 'mdi:keyboard-backspace',
	},
	{
		name: 'menu',
		tap_action: { action: 'key', key: 'KEY_MENU' },
		icon: 'mdi:menu',
	},
	{
		name: 'top_menu',
		tap_action: { action: 'key', key: 'KEY_TOPMENU' },
		icon: 'mdi:backburger',
	},
	{
		name: 'volume_up',
		tap_action: { action: 'key', key: 'KEY_VOLUP' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:volume-high',
	},
	{
		name: 'volume_down',
		tap_action: { action: 'key', key: 'KEY_VOLDOWN' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:volume-medium',
	},
	{
		name: 'volume_mute',
		tap_action: { action: 'key', key: 'KEY_MUTE' },
		icon: 'mdi:volume-low',
	},
	{
		name: 'volume_buttons',
		icon: 'mdi:volume-plus',
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
		tap_action: { action: 'key', key: 'KEY_UP' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-up',
	},
	{
		name: 'down',
		tap_action: { action: 'key', key: 'KEY_DOWN' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-down',
	},
	{
		name: 'left',
		tap_action: { action: 'key', key: 'KEY_LEFT' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-left',
	},
	{
		name: 'right',
		tap_action: { action: 'key', key: 'KEY_RIGHT' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-right',
	},
	{
		name: 'center',
		tap_action: { action: 'key', key: 'KEY_ENTER' },
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
			key: 'KEY_ENTER',
		},
		up: {
			icon: 'mdi:chevron-up',
			tap_action: { action: 'key', key: 'KEY_UP' },
			hold_action: { action: 'repeat' },
		},
		down: {
			icon: 'mdi:chevron-down',
			tap_action: { action: 'key', key: 'KEY_DOWN' },
			hold_action: { action: 'repeat' },
		},
		left: {
			icon: 'mdi:chevron-left',
			tap_action: { action: 'key', key: 'KEY_LEFT' },
			hold_action: { action: 'repeat' },
		},
		right: {
			icon: 'mdi:chevron-right',
			tap_action: { action: 'key', key: 'KEY_RIGHT' },
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
			tap_action: {
				action: 'key',
				key: 'KEY_MENU',
			},
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
				action: 'key',
				key: 'KEY_REWIND',
			},
		},
		right: {
			icon: 'mdi:skip-forward',
			styles: '.icon {\n  translate: var(--icon-offset) var(--icon-offset);\n}',
			tap_action: {
				action: 'key',
				key: 'KEY_FF',
			},
		},
		drag_action: {
			action: 'key',
			key: 'KEY_VOL{{"UP" if clockwise else "DOWN"}}',
		},
		tap_action: {
			action: 'key',
			key: 'KEY_ENTER',
		},
	},
	{
		type: 'touchpad',
		name: 'touchpad',
		tap_action: {
			action: 'key',
			key: 'KEY_ENTER',
		},
		up: {
			tap_action: { action: 'key', key: 'KEY_UP' },
			hold_action: { action: 'repeat' },
		},
		down: {
			tap_action: { action: 'key', key: 'KEY_DOWN' },
			hold_action: { action: 'repeat' },
		},
		left: {
			tap_action: { action: 'key', key: 'KEY_LEFT' },
			hold_action: { action: 'repeat' },
		},
		right: {
			tap_action: { action: 'key', key: 'KEY_RIGHT' },
			hold_action: { action: 'repeat' },
		},
	},
	{
		type: 'touchpad',
		name: 'dragpad',
		tap_action: {
			action: 'key',
			key: 'KEY_ENTER',
		},
		drag_action: {
			action: 'key',
			key: 'KEY_{{ ("RIGHT" if deltaX > 0 else "LEFT") if (deltaX | abs) > (deltaY | abs) else ("DOWN" if deltaY > 0 else "UP") }}',
			repeat_delay: 100,
		},
		multi_drag_action: {
			action: 'key',
			key: 'KEY_{{ ("RIGHT" if deltaX > 0 else "LEFT") if (deltaX | abs) > (deltaY | abs) else ("DOWN" if deltaY > 0 else "UP") }}',
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
		tap_action: { action: 'key', key: 'KEY_PLAY' },
		icon: 'mdi:play',
	},
	{
		name: 'pause',
		tap_action: { action: 'key', key: 'KEY_PAUSE' },
		icon: 'mdi:pause',
	},
	{
		name: 'rewind',
		tap_action: { action: 'key', key: 'KEY_REWIND' },
		icon: 'mdi:rewind',
	},
	{
		name: 'fast_forward',
		tap_action: { action: 'key', key: 'KEY_FF' },
		icon: 'mdi:fast-forward',
	},
	{
		name: 'stop',
		tap_action: { action: 'key', key: 'KEY_STOP' },
		icon: 'mdi:stop',
	},
	{
		name: 'record',
		tap_action: { action: 'key', key: 'KEY_REC' },
		icon: 'mdi:record',
	},
	{
		name: 'keyboard',
		tap_action: { action: 'keyboard' },
		icon: 'mdi:keyboard',
	},
	{
		name: 'textbox',
		tap_action: { action: 'textbox' },
		icon: 'mdi:text-box',
	},
	{
		name: 'channel_up',
		tap_action: { action: 'key', key: 'KEY_CHUP' },
		icon: 'mdi:arrow-up-circle',
	},
	{
		name: 'channel_down',
		tap_action: { action: 'key', key: 'KEY_CHDOWN' },
		icon: 'mdi:arrow-down-circle',
	},
	{
		name: 'channel_previous',
		tap_action: { action: 'key', key: 'KEY_PRECH' },
		icon: 'mdi:arrow-left-circle',
	},
	{
		name: 'channel_favorites',
		tap_action: { action: 'key', key: 'KEY_FAVCH' },
		icon: 'mdi:star-circle',
	},
	{
		name: 'channel_list',
		tap_action: { action: 'key', key: 'KEY_CH_LIST' },
		icon: 'mdi:list-box',
	},
	{
		name: 'red',
		tap_action: { action: 'key', key: 'KEY_RED' },
		icon: 'mdi:alpha-r-box',
	},
	{
		name: 'green',
		tap_action: { action: 'key', key: 'KEY_GREEN' },
		icon: 'mdi:alpha-g-box',
	},
	{
		name: 'yellow',
		tap_action: { action: 'key', key: 'KEY_YELLOW' },
		icon: 'mdi:alpha-y-box',
	},
	{
		name: 'blue',
		tap_action: { action: 'key', key: 'KEY_CYAN' },
		icon: 'mdi:alpha-b-box',
	},
	{
		name: 'n0',
		tap_action: { action: 'key', key: 'KEY_0' },
		icon: 'mdi:numeric-0',
	},
	{
		name: 'n1',
		tap_action: { action: 'key', key: 'KEY_1' },
		icon: 'mdi:numeric-1',
	},
	{
		name: 'n2',
		tap_action: { action: 'key', key: 'KEY_2' },
		icon: 'mdi:numeric-2',
	},
	{
		name: 'n3',
		tap_action: { action: 'key', key: 'KEY_3' },
		icon: 'mdi:numeric-3',
	},
	{
		name: 'n4',
		tap_action: { action: 'key', key: 'KEY_4' },
		icon: 'mdi:numeric-4',
	},
	{
		name: 'n5',
		tap_action: { action: 'key', key: 'KEY_5' },
		icon: 'mdi:numeric-5',
	},
	{
		name: 'n6',
		tap_action: { action: 'key', key: 'KEY_6' },
		icon: 'mdi:numeric-6',
	},
	{
		name: 'n7',
		tap_action: { action: 'key', key: 'KEY_7' },
		icon: 'mdi:numeric-7',
	},
	{
		name: 'n8',
		tap_action: { action: 'key', key: 'KEY_8' },
		icon: 'mdi:numeric-8',
	},
	{
		name: 'n9',
		tap_action: { action: 'key', key: 'KEY_9' },
		icon: 'mdi:numeric-9',
	},
	{
		name: 'numpad',
		icon: 'mdi:dialpad',
	},
	{
		name: 'info',
		tap_action: { action: 'key', key: 'KEY_INFO' },
		icon: 'mdi:information',
	},
	{
		name: 'guide',
		tap_action: { action: 'key', key: 'KEY_GUIDE' },
		icon: 'mdi:television-box',
	},
	{
		name: 'captions',
		tap_action: { action: 'key', key: 'KEY_CAPTION' },
		icon: 'mdi:closed-caption',
	},
	{
		name: 'tools',
		tap_action: { action: 'key', key: 'KEY_TOOLS' },
		icon: 'mdi:hammer-screwdriver',
	},
	{
		name: 'contents',
		tap_action: { action: 'key', key: 'KEY_CONTENTS' },
		icon: 'mdi:table-of-contents',
	},
	{
		name: 'disc_menu',
		tap_action: { action: 'key', key: 'KEY_DISC_MENU' },
		icon: 'mdi:dots-horizontal-circle',
	},
	{
		name: 'dvr_menu',
		tap_action: { action: 'key', key: 'KEY_DVR_MENU' },
		icon: 'mdi:dots-vertical-circle',
	},
	{
		name: 'help',
		tap_action: { action: 'key', key: 'KEY_HELP' },
		icon: 'mdi:help',
	},
	{
		name: 'live',
		tap_action: { action: 'key', key: 'KEY_LIVE' },
		icon: 'mdi:debug-step-over',
	},
	{
		name: 'quick_replay',
		tap_action: { action: 'key', key: 'KEY_QUICK_REPLAY' },
		icon: 'mdi:replay',
	},
	{
		name: 'still_picture',
		tap_action: { action: 'key', key: 'KEY_STILL_PICTURE' },
		icon: 'mdi:image',
	},
	{
		name: 'instant_replay',
		tap_action: { action: 'key', key: 'KEY_INSTANT_REPLAY' },
		icon: 'mdi:replay',
	},
	{
		name: 'source',
		tap_action: { action: 'key', key: 'KEY_SOURCE' },
		icon: 'mdi:import',
	},
	{
		name: 'auto_program',
		tap_action: { action: 'key', key: 'KEY_AUTO_PROGRAM' },
		icon: 'mdi:refresh-auto',
	},
	{
		name: 'channel_magic',
		tap_action: { action: 'key', key: 'KEY_MAGIC_CHANNEL' },
		icon: 'mdi:auto-fix',
	},
	{
		name: 'component_1',
		tap_action: { action: 'key', key: 'KEY_COMPONENT1' },
		icon: 'mdi:video-input-component',
	},
	{
		name: 'component_2',
		tap_action: { action: 'key', key: 'KEY_COMPONENT2' },
		icon: 'mdi:video-input-component',
	},
	{
		name: 'av_1',
		tap_action: { action: 'key', key: 'KEY_AV1' },
		icon: 'mdi:video-input-component',
	},
	{
		name: 'av_2',
		tap_action: { action: 'key', key: 'KEY_AV2' },
		icon: 'mdi:video-input-component',
	},
	{
		name: 'av_3',
		tap_action: { action: 'key', key: 'KEY_AV3' },
		icon: 'mdi:video-input-component',
	},
	{
		name: 'svideo_1',
		tap_action: { action: 'key', key: 'KEY_SVIDEO1' },
		icon: 'mdi:video-input-svideo',
	},
	{
		name: 'svideo_2',
		tap_action: { action: 'key', key: 'KEY_SVIDEO2' },
		icon: 'mdi:video-input-svideo',
	},
	{
		name: 'svideo_3',
		tap_action: { action: 'key', key: 'KEY_SVIDEO3' },
		icon: 'mdi:video-input-svideo',
	},
	{
		name: 'hdmi',
		tap_action: { action: 'key', key: 'KEY_HDMI' },
		icon: 'mdi:video-input-hdmi',
	},
	{
		name: 'fm_radio',
		tap_action: { action: 'key', key: 'KEY_FM_RADIO' },
		icon: 'mdi:radio-fm',
	},
	{
		name: 'dvi',
		tap_action: { action: 'key', key: 'KEY_DVI' },
		icon: 'mdi:serial-port',
	},
	{
		name: 'dvr',
		tap_action: { action: 'key', key: 'KEY_DVR' },
		icon: 'mdi:record-rec',
	},
	{
		name: 'tv',
		tap_action: { action: 'key', key: 'KEY_TV' },
		icon: 'mdi:television',
	},
	{
		name: 'antenna',
		tap_action: { action: 'key', key: 'KEY_ANTENA' },
		icon: 'mdi:video-input-antenna',
	},
	{
		name: 'dtv',
		tap_action: { action: 'key', key: 'KEY_DTV' },
		icon: 'mdi:alpha-d-box',
	},
	{
		name: 'ambient',
		tap_action: { action: 'key', key: 'KEY_AMBIENT' },
		icon: 'mdi:television-ambient-light',
	},
	{
		name: '3d',
		tap_action: { action: 'key', key: 'KEY_PANNEL_CHDOWN' },
		icon: 'mdi:video-3d',
	},
	{
		name: 'anynet',
		tap_action: { action: 'key', key: 'KEY_ANYNET' },
		icon: 'mdi:hdmi-port',
	},
	{
		name: 'energy_saving',
		tap_action: { action: 'key', key: 'KEY_ESAVING' },
		icon: 'mdi:leaf',
	},
	{
		name: 'sleep_timer',
		tap_action: { action: 'key', key: 'KEY_SLEEP' },
		icon: 'mdi:power-sleep',
	},
	{
		name: 'dtv_signal',
		tap_action: { action: 'key', key: 'KEY_DTV_SIGNAL' },
		icon: 'mdi:alpha-d-circle',
	},
	{
		name: 'pip_toggle',
		tap_action: { action: 'key', key: 'KEY_PIP_ONOFF' },
		icon: 'mdi:picture-in-picture-top-right',
	},
	{
		name: 'pip_swap',
		tap_action: { action: 'key', key: 'KEY_PIP_SWAP' },
		icon: 'mdi:picture-in-picture-bottom-right-outline',
	},
	{
		name: 'pip_size',
		tap_action: { action: 'key', key: 'KEY_PIP_SIZE' },
		icon: 'mdi:picture-in-picture-top-right-outline',
	},
	{
		name: 'pip_channel_up',
		tap_action: { action: 'key', key: 'KEY_PIP_CHUP' },
		icon: 'mdi:arrow-up-circle-outline',
	},
	{
		name: 'pip_channel_down',
		tap_action: { action: 'key', key: 'KEY_PIP_CHDOWN' },
		icon: 'mdi:arrow-down-circle-outline',
	},
	{
		name: 'pip_small',
		tap_action: { action: 'key', key: 'KEY_AUTO_ARC_PIP_SMALL' },
		icon: 'mdi:image',
	},
	{
		name: 'pip_wide',
		tap_action: { action: 'key', key: 'KEY_AUTO_ARC_PIP_WIDE' },
		icon: 'mdi:panorama',
	},
	{
		name: 'pip_bottom_right',
		tap_action: { action: 'key', key: 'KEY_AUTO_ARC_PIP_RIGHT_BOTTOM' },
		icon: 'mdi:picture-in-picture-bottom-right',
	},
	{
		name: 'pip_scan',
		tap_action: { action: 'key', key: 'KEY_PIP_SCAN' },
		icon: 'mdi:picture-in-picture-bottom-right-outline',
	},
	{
		name: 'vcr',
		tap_action: { action: 'key', key: 'KEY_VCR_MODE' },
		icon: 'mdi:vhs',
	},
	{
		name: 'catv',
		tap_action: { action: 'key', key: 'KEY_CATV_MODE' },
		icon: 'mdi:video-input-antenna',
	},
	{
		name: 'dss',
		tap_action: { action: 'key', key: 'KEY_DSS_MODE' },
		icon: 'mdi:alpha-d-box',
	},
	{
		name: 'tv',
		tap_action: { action: 'key', key: 'KEY_TV_MODE' },
		icon: 'mdi:television',
	},
	{
		name: 'dvd',
		tap_action: { action: 'key', key: 'KEY_DVD_MODE' },
		icon: 'mdi:disc',
	},
	{
		name: 'stb',
		tap_action: { action: 'key', key: 'KEY_STB_MODE' },
		icon: 'mdi:audio-video',
	},
	{
		name: 'pc',
		tap_action: { action: 'key', key: 'KEY_PCMODE' },
		icon: 'mdi:desktop-tower',
	},
	{
		name: 'teletext_mix',
		tap_action: { action: 'key', key: 'KEY_TTX_MIX' },
		icon: 'mdi:text',
	},
	{
		name: 'teletext_subface',
		tap_action: { action: 'key', key: 'KEY_' },
		icon: 'mdi:text-box-outline',
	},
	{
		name: 'aspect_ratio',
		tap_action: { action: 'key', key: 'KEY_ASPECT' },
		icon: 'mdi:aspect-ratio',
	},
	{
		name: 'picture_size',
		tap_action: { action: 'key', key: 'KEY_PICTURE_SIZE' },
		icon: 'mdi:image-size-select-large',
	},
	{
		name: 'aspect_ratio_4_3',
		tap_action: { action: 'key', key: 'KEY_4_3' },
		icon: 'mdi:image',
	},
	{
		name: 'aspect_ratio_16_9',
		tap_action: { action: 'key', key: 'KEY_16_9' },
		icon: 'mdi:image-area',
	},
	{
		name: 'picture_mode',
		tap_action: { action: 'key', key: 'KEY_PMODE' },
		icon: 'mdi:image-text',
	},
	{
		name: 'picture_mode_panorama',
		tap_action: { action: 'key', key: 'KEY_PANORAMA' },
		icon: 'mdi:panorama-variant',
	},
	{
		name: 'picture_mode_dynamic',
		tap_action: { action: 'key', key: 'KEY_DYNAMIC' },
		icon: 'mdi:image-auto-adjust',
	},
	{
		name: 'picture_mode_standard',
		tap_action: { action: 'key', key: 'KEY_STANDARD' },
		icon: 'mdi:image',
	},
	{
		name: 'picture_mode_movie',
		tap_action: { action: 'key', key: 'KEY_MOVIE1' },
		icon: 'mdi:movie',
	},
	{
		name: 'picture_mode_game',
		tap_action: { action: 'key', key: 'KEY_GAME' },
		icon: 'mdi:controller',
	},
	{
		name: 'picture_mode_custom',
		tap_action: { action: 'key', key: 'KEY_CUSTOM' },
		icon: 'mdi:image-plus',
	},
	{
		name: 'clock',
		tap_action: { action: 'key', key: 'KEY_CLOCK_DISPLAY' },
		icon: 'mdi:clock',
	},
	{
		name: 'clock_timer_setup',
		tap_action: { action: 'key', key: 'KEY_SETUP_CLOCK_TIMER' },
		icon: 'mdi:clock-alert',
	},
	{
		name: 'subtitle',
		tap_action: { action: 'key', key: 'KEY_SUB_TITLE' },
		icon: 'mdi:subtitles',
	},
	{
		name: 'zoom_move',
		tap_action: { action: 'key', key: 'KEY_ZOOM_MOVE' },
		icon: 'mdi:magnify-plus-cursor',
	},
	{
		name: 'zoom_in',
		tap_action: { action: 'key', key: 'KEY_ZOOM_IN' },
		icon: 'mdi:magnify-plus',
	},
	{
		name: 'zoom_out',
		tap_action: { action: 'key', key: 'KEY_ZOOM_OUT' },
		icon: 'mdi:magnify-minus',
	},
	{
		name: 'zoom_1',
		tap_action: { action: 'key', key: 'KEY_ZOOM1' },
		icon: 'mdi:magnify-plus-outline',
	},
	{
		name: 'zoom_2',
		tap_action: { action: 'key', key: 'KEY_ZOOM2' },
		icon: 'mdi:magnify-minus-outline',
	},
];
