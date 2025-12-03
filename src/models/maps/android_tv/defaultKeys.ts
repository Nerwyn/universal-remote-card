import { IElementConfig } from '../../interfaces';

/**
 * This is the list of most common commands from the Android TV Remote integration page.
 * Not all are ensured to work, and if they do not it is likely an issue with the underlying package used by the Android TV Remote integration or the Android TV Remote Protocol V2 itself.
 * https://www.home-assistant.io/integrations/androidtv_remote/#remote
 */
export const androidTVDefaultKeys: IElementConfig[] = [
	{
		name: 'power',
		tap_action: { action: 'key', key: 'POWER' },
		icon: 'mdi:power',
	},
	{
		name: 'home',
		tap_action: { action: 'key', key: 'HOME' },
		icon: 'mdi:home',
	},
	{
		name: 'back',
		tap_action: { action: 'key', key: 'BACK' },
		icon: 'mdi:keyboard-backspace',
	},
	{
		name: 'menu',
		tap_action: { action: 'key', key: 'MENU' },
		icon: 'mdi:menu',
	},
	{
		name: 'top_menu',
		tap_action: { action: 'key', key: 'MEDIA_TOP_MENU' },
		icon: 'mdi:backburger',
	},
	{
		name: 'settings',
		tap_action: { action: 'key', key: 'SETTINGS' },
		icon: 'mdi:cog',
	},
	{
		name: 'volume_up',
		tap_action: { action: 'key', key: 'VOLUME_UP' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:volume-high',
	},
	{
		name: 'volume_down',
		tap_action: { action: 'key', key: 'VOLUME_DOWN' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:volume-medium',
	},
	{
		name: 'volume_mute',
		tap_action: { action: 'key', key: 'MUTE' },
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
		tap_action: { action: 'key', key: 'DPAD_UP' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-up',
	},
	{
		name: 'down',
		tap_action: { action: 'key', key: 'DPAD_DOWN' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-down',
	},
	{
		name: 'left',
		tap_action: { action: 'key', key: 'DPAD_LEFT' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-left',
	},
	{
		name: 'right',
		tap_action: { action: 'key', key: 'DPAD_RIGHT' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-right',
	},
	{
		name: 'center',
		tap_action: { action: 'key', key: 'DPAD_CENTER' },
		icon: 'mdi:checkbox-blank-circle',
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
			key: 'DPAD_CENTER',
		},
		up: {
			icon: 'mdi:chevron-up',
			tap_action: { action: 'key', key: 'DPAD_UP' },
			hold_action: { action: 'repeat' },
		},
		down: {
			icon: 'mdi:chevron-down',
			tap_action: { action: 'key', key: 'DPAD_DOWN' },
			hold_action: { action: 'repeat' },
		},
		left: {
			icon: 'mdi:chevron-left',
			tap_action: { action: 'key', key: 'DPAD_LEFT' },
			hold_action: { action: 'repeat' },
		},
		right: {
			icon: 'mdi:chevron-right',
			tap_action: { action: 'key', key: 'DPAD_RIGHT' },
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
				key: 'MENU',
			},
		},
		down: {
			styles: '.icon {\n  translate: calc(-1 * var(--icon-offset)) var(--icon-offset);\n\n}',
			icon: 'mdi:play-pause',
			tap_action: {
				action: 'key',
				key: 'MEDIA_PLAY_PAUSE',
			},
		},
		left: {
			icon: 'mdi:skip-backward',
			styles: '.icon {\n  translate: calc(-1 * var(--icon-offset)) calc(-1 * var(--icon-offset));\n}',
			tap_action: {
				action: 'key',
				key: 'MEDIA_PREVIOUS',
			},
		},
		right: {
			icon: 'mdi:skip-forward',
			styles: '.icon {\n  translate: var(--icon-offset) var(--icon-offset);\n}',
			tap_action: {
				action: 'key',
				key: 'MEDIA_NEXT',
			},
		},
		drag_action: {
			action: 'key',
			key: 'VOLUME_{{"UP" if clockwise else "DOWN"}}',
		},
		tap_action: {
			action: 'key',
			key: 'DPAD_CENTER',
		},
	},
	{
		type: 'touchpad',
		name: 'touchpad',
		tap_action: {
			action: 'key',
			key: 'DPAD_CENTER',
		},
		up: {
			tap_action: { action: 'key', key: 'DPAD_UP' },
			hold_action: { action: 'repeat' },
		},
		down: {
			tap_action: { action: 'key', key: 'DPAD_DOWN' },
			hold_action: { action: 'repeat' },
		},
		left: {
			tap_action: { action: 'key', key: 'DPAD_LEFT' },
			hold_action: { action: 'repeat' },
		},
		right: {
			tap_action: { action: 'key', key: 'DPAD_RIGHT' },
			hold_action: { action: 'repeat' },
		},
	},
	{
		type: 'touchpad',
		name: 'dragpad',
		tap_action: {
			action: 'key',
			key: 'DPAD_CENTER',
		},
		drag_action: {
			action: 'key',
			key: 'DPAD_{{ ("RIGHT" if deltaX > 0 else "LEFT") if (deltaX | abs) > (deltaY | abs) else ("DOWN" if deltaY > 0 else "UP") }}',
			repeat_delay: 100,
		},
		multi_drag_action: {
			action: 'key',
			key: 'DPAD_{{ ("RIGHT" if deltaX > 0 else "LEFT") if (deltaX | abs) > (deltaY | abs) else ("DOWN" if deltaY > 0 else "UP") }}',
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
		tap_action: { action: 'key', key: 'MEDIA_PLAY_PAUSE' },
		icon: 'mdi:play-pause',
	},
	{
		name: 'play',
		tap_action: { action: 'key', key: 'MEDIA_PLAY' },
		icon: 'mdi:play',
	},
	{
		name: 'pause',
		tap_action: { action: 'key', key: 'MEDIA_PAUSE' },
		icon: 'mdi:pause',
	},
	{
		name: 'rewind',
		tap_action: { action: 'key', key: 'MEDIA_REWIND' },
		icon: 'mdi:rewind',
	},
	{
		name: 'fast_forward',
		tap_action: { action: 'key', key: 'MEDIA_FAST_FORWARD' },
		icon: 'mdi:fast-forward',
	},
	{
		name: 'previous',
		tap_action: { action: 'key', key: 'MEDIA_PREVIOUS' },
		icon: 'mdi:skip-previous',
	},
	{
		name: 'next',
		tap_action: { action: 'key', key: 'MEDIA_NEXT' },
		icon: 'mdi:skip-next',
	},
	{
		name: 'stop',
		tap_action: { action: 'key', key: 'MEDIA_STOP' },
		icon: 'mdi:stop',
	},
	{
		name: 'record',
		tap_action: { action: 'key', key: 'MEDIA_RECORD' },
		icon: 'mdi:record',
	},
	{
		name: 'page_up',
		tap_action: { action: 'key', key: 'PAGE_UP' },
		icon: 'mdi:arrow-up',
	},
	{
		name: 'page_down',
		tap_action: { action: 'key', key: 'PAGE_DOWN' },
		icon: 'mdi:arrow-down',
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
		name: 'search',
		tap_action: { action: 'search' },
		icon: 'mdi:google-assistant',
	},
	{
		name: 'delete',
		tap_action: { action: 'key', key: 'DEL' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:backspace',
	},
	{
		name: 'forward_delete',
		tap_action: { action: 'key', key: 'FOWARD_DEL' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:backspace-reverse',
	},
	{
		name: 'enter',
		tap_action: { action: 'key', key: 'ENTER' },
		icon: 'mdi:magnify',
	},
	{
		name: 'move_home',
		tap_action: { action: 'key', key: 'MOVE_HOME' },
		icon: 'mdi:arrow-left',
	},
	{
		name: 'move_end',
		tap_action: { action: 'key', key: 'MOVE_END' },
		icon: 'mdi:arrow-right',
	},
	{
		name: 'channel_up',
		tap_action: { action: 'key', key: 'CHANNEL_UP' },
		icon: 'mdi:arrow-up-circle',
	},
	{
		name: 'channel_down',
		tap_action: { action: 'key', key: 'CHANNEL_DOWN' },
		icon: 'mdi:arrow-down-circle',
	},
	{
		name: 'red',
		tap_action: { action: 'key', key: 'PROG_RED' },
		icon: 'mdi:alpha-r-box',
	},
	{
		name: 'green',
		tap_action: { action: 'key', key: 'PROG_GREEN' },
		icon: 'mdi:alpha-g-box',
	},
	{
		name: 'yellow',
		tap_action: { action: 'key', key: 'PROG_YELLOW' },
		icon: 'mdi:alpha-y-box',
	},
	{
		name: 'blue',
		tap_action: { action: 'key', key: 'PROG_BLUE' },
		icon: 'mdi:alpha-b-box',
	},
	{
		name: 'a',
		tap_action: { action: 'key', key: 'BUTTON_A' },
		icon: 'mdi:alpha-a-circle',
	},
	{
		name: 'b',
		tap_action: { action: 'key', key: 'BUTTON_B' },
		icon: 'mdi:alpha-b-circle',
	},
	{
		name: 'c',
		tap_action: { action: 'key', key: 'BUTTON_C' },
		icon: 'mdi:alpha-c-circle',
	},
	{
		name: 'x',
		tap_action: { action: 'key', key: 'BUTTON_X' },
		icon: 'mdi:alpha-x-circle',
	},
	{
		name: 'y',
		tap_action: { action: 'key', key: 'BUTTON_Y' },
		icon: 'mdi:alpha-y-circle',
	},
	{
		name: 'z',
		tap_action: { action: 'key', key: 'BUTTON_Z' },
		icon: 'mdi:alpha-z-circle',
	},
	{
		name: 'l1',
		tap_action: { action: 'key', key: 'BUTTON_L1' },
		icon: 'mdi:alpha-l-circle',
	},
	{
		name: 'l2',
		tap_action: { action: 'key', key: 'BUTTON_L2' },
		icon: 'mdi:alpha-l-box',
	},
	{
		name: 'l3',
		tap_action: { action: 'key', key: 'BUTTON_L3' },
		icon: 'mdi:alpha-l-box-outline',
	},
	{
		name: 'l_thumb',
		tap_action: { action: 'key', key: 'BUTTON_THUMBL' },
		icon: 'mdi:alpha-l-circle-outline',
	},
	{
		name: 'r1',
		tap_action: { action: 'key', key: 'BUTTON_R1' },
		icon: 'mdi:alpha-r-circle',
	},
	{
		name: 'r2',
		tap_action: { action: 'key', key: 'BUTTON_R2' },
		icon: 'mdi:alpha-r-box',
	},
	{
		name: 'r3',
		tap_action: { action: 'key', key: 'BUTTON_R3' },
		icon: 'mdi:alpha-r-box-outline',
	},
	{
		name: 'r_thumb',
		tap_action: { action: 'key', key: 'BUTTON_THUMBR' },
		icon: 'mdi:alpha-r-circle-outline',
	},
	{
		name: 'start',
		tap_action: { action: 'key', key: 'BUTTON_START' },
		icon: 'mdi:rectangle',
	},
	{
		name: 'select',
		tap_action: { action: 'key', key: 'BUTTON_SELECT' },
		icon: 'mdi:rectangle-outline',
	},
	{
		name: 'xpad',
		icon: 'mdi:gamepad-circle',
	},
	{
		name: 'npad',
		icon: 'mdi:gamepad-circle',
	},
	{
		name: 'n0',
		tap_action: { action: 'key', key: '0' },
		icon: 'mdi:numeric-0',
	},
	{
		name: 'n1',
		tap_action: { action: 'key', key: '1' },
		icon: 'mdi:numeric-1',
	},
	{
		name: 'n2',
		tap_action: { action: 'key', key: '2' },
		icon: 'mdi:numeric-2',
	},
	{
		name: 'n3',
		tap_action: { action: 'key', key: '3' },
		icon: 'mdi:numeric-3',
	},
	{
		name: 'n4',
		tap_action: { action: 'key', key: '4' },
		icon: 'mdi:numeric-4',
	},
	{
		name: 'n5',
		tap_action: { action: 'key', key: '5' },
		icon: 'mdi:numeric-5',
	},
	{
		name: 'n6',
		tap_action: { action: 'key', key: '6' },
		icon: 'mdi:numeric-6',
	},
	{
		name: 'n7',
		tap_action: { action: 'key', key: '7' },
		icon: 'mdi:numeric-7',
	},
	{
		name: 'n8',
		tap_action: { action: 'key', key: '8' },
		icon: 'mdi:numeric-8',
	},
	{
		name: 'n9',
		tap_action: { action: 'key', key: '9' },
		icon: 'mdi:numeric-9',
	},
	{
		name: 'numpad',
		icon: 'mdi:dialpad',
	},
	{
		name: 'f1',
		tap_action: { action: 'key', key: 'F1' },
		icon: 'mdi:keyboard-f1',
	},
	{
		name: 'f2',
		tap_action: { action: 'key', key: 'F2' },
		icon: 'mdi:keyboard-f2',
	},
	{
		name: 'f3',
		tap_action: { action: 'key', key: 'F3' },
		icon: 'mdi:keyboard-f3',
	},
	{
		name: 'f4',
		tap_action: { action: 'key', key: 'F4' },
		icon: 'mdi:keyboard-f4',
	},
	{
		name: 'f5',
		tap_action: { action: 'key', key: 'F5' },
		icon: 'mdi:keyboard-f5',
	},
	{
		name: 'f6',
		tap_action: { action: 'key', key: 'F6' },
		icon: 'mdi:keyboard-f6',
	},
	{
		name: 'f7',
		tap_action: { action: 'key', key: 'F7' },
		icon: 'mdi:keyboard-f7',
	},
	{
		name: 'f8',
		tap_action: { action: 'key', key: 'F8' },
		icon: 'mdi:keyboard-f8',
	},
	{
		name: 'f9',
		tap_action: { action: 'key', key: 'F9' },
		icon: 'mdi:keyboard-f9',
	},
	{
		name: 'f10',
		tap_action: { action: 'key', key: 'F10' },
		icon: 'mdi:keyboard-f10',
	},
	{
		name: 'f11',
		tap_action: { action: 'key', key: 'F11' },
		icon: 'mdi:keyboard-f11',
	},
	{
		name: 'f12',
		tap_action: { action: 'key', key: 'F12' },
		icon: 'mdi:keyboard-f12',
	},
	{
		name: 'info',
		tap_action: { action: 'key', key: 'INFO' },
		icon: 'mdi:information',
	},
	{
		name: 'window',
		tap_action: { action: 'key', key: 'WINDOW' },
		icon: 'mdi:picture-in-picture-top-right',
	},
	{
		name: 'guide',
		tap_action: { action: 'key', key: 'GUIDE' },
		icon: 'mdi:television-box',
	},
	{
		name: 'captions',
		tap_action: { action: 'key', key: 'CAPTIONS' },
		icon: 'mdi:closed-caption',
	},
	{
		name: 'button_mode',
		tap_action: { action: 'key', key: 'BUTTON_MODE' },
		icon: 'mdi:gesture-tap-button',
	},
	{
		name: 'explorer',
		tap_action: { action: 'key', key: 'EXPLORER' },
		icon: 'mdi:folder-multiple',
	},
	{
		name: 'teletext',
		tap_action: { action: 'key', key: 'TV_TELETEXT' },
		icon: 'mdi:card-text',
	},
	{
		name: 'tv',
		tap_action: { action: 'key', key: 'TV' },
		icon: 'mdi:television-box',
	},
	{
		name: 'tv_power',
		tap_action: { action: 'key', key: 'TV_POWER' },
		icon: 'mdi:power-cycle',
	},
	{
		name: 'source',
		tap_action: { action: 'key', key: 'TV_INPUT' },
		icon: 'mdi:import',
	},
	{
		name: 'dvr',
		tap_action: { action: 'key', key: 'DVR' },
		icon: 'mdi:audio-video',
	},
	{
		name: 'stb_power',
		tap_action: { action: 'key', key: 'STB_POWER' },
		icon: 'mdi:power-cycle',
	},
	{
		name: 'stb_input',
		tap_action: { action: 'key', key: 'STB_INPUT' },
		icon: 'mdi:vhs',
	},
	{
		name: 'avr_power',
		tap_action: { action: 'key', key: 'AVR_POWER' },
		icon: 'mdi:power-cycle',
	},
	{
		name: 'avr_input',
		tap_action: { action: 'key', key: 'AVR_INPUT' },
		icon: 'mdi:audio-video',
	},
	{
		name: 'hdmi_1',
		tap_action: { action: 'key', key: 'TV_INPUT_HDMI_1' },
		icon: 'mdi:video-input-hdmi',
	},
	{
		name: 'hdmi_2',
		tap_action: { action: 'key', key: 'TV_INPUT_HDMI_2' },
		icon: 'mdi:video-input-hdmi',
	},
	{
		name: 'hdmi_3',
		tap_action: { action: 'key', key: 'TV_INPUT_HDMI_3' },
		icon: 'mdi:video-input-hdmi',
	},
	{
		name: 'hdmi_4',
		tap_action: { action: 'key', key: 'TV_INPUT_HDMI_4' },
		icon: 'mdi:video-input-hdmi',
	},
	{
		name: 'composite_1',
		tap_action: { action: 'key', key: 'TV_INPUT_COMPOSITE_1' },
		icon: 'mdi:video-input-component',
	},
	{
		name: 'composite_2',
		tap_action: { action: 'key', key: 'TV_INPUT_COMPOSITE_2' },
		icon: 'mdi:video-input-component',
	},
	{
		name: 'component_1',
		tap_action: { action: 'key', key: 'TV_INPUT_COMPONENT_1' },
		icon: 'mdi:video-input-component',
	},
	{
		name: 'component_2',
		tap_action: { action: 'key', key: 'TV_INPUT_COMPONENT_2' },
		icon: 'mdi:video-input-component',
	},
	{
		name: 'audio_track',
		tap_action: { action: 'key', key: 'MEDIA_AUDIO_TRACK' },
		icon: 'mdi:waveform',
	},
];
