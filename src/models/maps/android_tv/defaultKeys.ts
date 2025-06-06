import { IElementConfig } from '../../interfaces';

/**
 * This is the list of most common commands from the Android TV Remote integration page.
 * Not all are ensured to work, and if they do not it is likely an issue with the underlying package used by the Android TV Remote integration or the Android TV Remote Protocol V2 itself.
 * https://www.home-assistant.io/integrations/androidtv_remote/#remote
 */
export const androidTVDefaultKeys: IElementConfig[] = [
	{
		type: 'button',
		name: 'power',
		tap_action: { action: 'key', key: 'POWER' },
		icon: 'mdi:power',
	},
	{
		type: 'button',
		name: 'home',
		tap_action: { action: 'key', key: 'HOME' },
		icon: 'mdi:home',
	},
	{
		type: 'button',
		name: 'back',
		tap_action: { action: 'key', key: 'BACK' },
		icon: 'mdi:keyboard-backspace',
	},
	{
		type: 'button',
		name: 'menu',
		tap_action: { action: 'key', key: 'MENU' },
		icon: 'mdi:menu',
	},
	{
		type: 'button',
		name: 'top_menu',
		tap_action: { action: 'key', key: 'MEDIA_TOP_MENU' },
		icon: 'mdi:backburger',
	},
	{
		type: 'button',
		name: 'settings',
		tap_action: { action: 'key', key: 'SETTINGS' },
		icon: 'mdi:cog',
	},
	{
		type: 'button',
		name: 'volume_up',
		tap_action: { action: 'key', key: 'VOLUME_UP' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:volume-high',
	},
	{
		type: 'button',
		name: 'volume_down',
		tap_action: { action: 'key', key: 'VOLUME_DOWN' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:volume-medium',
	},
	{
		type: 'button',
		name: 'volume_mute',
		tap_action: { action: 'key', key: 'MUTE' },
		icon: 'mdi:volume-low',
	},
	{
		type: 'button',
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
		type: 'button',
		name: 'up',
		tap_action: { action: 'key', key: 'DPAD_UP' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-up',
	},
	{
		type: 'button',
		name: 'down',
		tap_action: { action: 'key', key: 'DPAD_DOWN' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-down',
	},
	{
		type: 'button',
		name: 'left',
		tap_action: { action: 'key', key: 'DPAD_LEFT' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-left',
	},
	{
		type: 'button',
		name: 'right',
		tap_action: { action: 'key', key: 'DPAD_RIGHT' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-right',
	},
	{
		type: 'button',
		name: 'center',
		tap_action: { action: 'key', key: 'DPAD_CENTER' },
		icon: 'mdi:checkbox-blank-circle',
	},
	{
		type: 'button',
		name: 'navigation_buttons',
		icon: 'mdi:gamepad',
	},
	{
		type: 'button',
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
		type: 'button',
		name: 'play_pause',
		tap_action: { action: 'key', key: 'MEDIA_PLAY_PAUSE' },
		icon: 'mdi:play-pause',
	},
	{
		type: 'button',
		name: 'play',
		tap_action: { action: 'key', key: 'MEDIA_PLAY' },
		icon: 'mdi:play',
	},
	{
		type: 'button',
		name: 'pause',
		tap_action: { action: 'key', key: 'MEDIA_PAUSE' },
		icon: 'mdi:pause',
	},
	{
		type: 'button',
		name: 'rewind',
		tap_action: { action: 'key', key: 'MEDIA_REWIND' },
		icon: 'mdi:rewind',
	},
	{
		type: 'button',
		name: 'fast_forward',
		tap_action: { action: 'key', key: 'MEDIA_FAST_FORWARD' },
		icon: 'mdi:fast-forward',
	},
	{
		type: 'button',
		name: 'previous',
		tap_action: { action: 'key', key: 'MEDIA_PREVIOUS' },
		icon: 'mdi:skip-previous',
	},
	{
		type: 'button',
		name: 'next',
		tap_action: { action: 'key', key: 'MEDIA_NEXT' },
		icon: 'mdi:skip-next',
	},
	{
		type: 'button',
		name: 'stop',
		tap_action: { action: 'key', key: 'MEDIA_STOP' },
		icon: 'mdi:stop',
	},
	{
		type: 'button',
		name: 'record',
		tap_action: { action: 'key', key: 'MEDIA_RECORD' },
		icon: 'mdi:record',
	},
	{
		type: 'button',
		name: 'page_up',
		tap_action: { action: 'key', key: 'PAGE_UP' },
		icon: 'mdi:arrow-up',
	},
	{
		type: 'button',
		name: 'page_down',
		tap_action: { action: 'key', key: 'PAGE_DOWN' },
		icon: 'mdi:arrow-down',
	},
	{
		type: 'button',
		name: 'keyboard',
		tap_action: { action: 'keyboard' },
		icon: 'mdi:keyboard',
	},
	{
		type: 'button',
		name: 'textbox',
		tap_action: { action: 'textbox' },
		icon: 'mdi:text-box',
	},
	{
		type: 'button',
		name: 'search',
		tap_action: { action: 'search' },
		icon: 'mdi:google-assistant',
	},
	{
		type: 'button',
		name: 'delete',
		tap_action: { action: 'key', key: 'DEL' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:backspace',
	},
	{
		type: 'button',
		name: 'forward_delete',
		tap_action: { action: 'key', key: 'FOWARD_DEL' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:backspace-reverse',
	},
	{
		type: 'button',
		name: 'enter',
		tap_action: { action: 'key', key: 'ENTER' },
		icon: 'mdi:magnify',
	},
	{
		type: 'button',
		name: 'move_home',
		tap_action: { action: 'key', key: 'MOVE_HOME' },
		icon: 'mdi:arrow-left',
	},
	{
		type: 'button',
		name: 'move_end',
		tap_action: { action: 'key', key: 'MOVE_END' },
		icon: 'mdi:arrow-right',
	},
	{
		type: 'button',
		name: 'channel_up',
		tap_action: { action: 'key', key: 'CHANNEL_UP' },
		icon: 'mdi:arrow-up-circle',
	},
	{
		type: 'button',
		name: 'channel_down',
		tap_action: { action: 'key', key: 'CHANNEL_DOWN' },
		icon: 'mdi:arrow-down-circle',
	},
	{
		type: 'button',
		name: 'red',
		tap_action: { action: 'key', key: 'PROG_RED' },
		icon: 'mdi:alpha-r-box',
	},
	{
		type: 'button',
		name: 'green',
		tap_action: { action: 'key', key: 'PROG_GREEN' },
		icon: 'mdi:alpha-g-box',
	},
	{
		type: 'button',
		name: 'yellow',
		tap_action: { action: 'key', key: 'PROG_YELLOW' },
		icon: 'mdi:alpha-y-box',
	},
	{
		type: 'button',
		name: 'blue',
		tap_action: { action: 'key', key: 'PROG_BLUE' },
		icon: 'mdi:alpha-b-box',
	},
	{
		type: 'button',
		name: 'a',
		tap_action: { action: 'key', key: 'BUTTON_A' },
		icon: 'mdi:alpha-a-circle',
	},
	{
		type: 'button',
		name: 'b',
		tap_action: { action: 'key', key: 'BUTTON_B' },
		icon: 'mdi:alpha-b-circle',
	},
	{
		type: 'button',
		name: 'c',
		tap_action: { action: 'key', key: 'BUTTON_C' },
		icon: 'mdi:alpha-c-circle',
	},
	{
		type: 'button',
		name: 'x',
		tap_action: { action: 'key', key: 'BUTTON_X' },
		icon: 'mdi:alpha-x-circle',
	},
	{
		type: 'button',
		name: 'y',
		tap_action: { action: 'key', key: 'BUTTON_Y' },
		icon: 'mdi:alpha-y-circle',
	},
	{
		type: 'button',
		name: 'z',
		tap_action: { action: 'key', key: 'BUTTON_Z' },
		icon: 'mdi:alpha-z-circle',
	},
	{
		type: 'button',
		name: 'l1',
		tap_action: { action: 'key', key: 'BUTTON_L1' },
		icon: 'mdi:alpha-l-circle',
	},
	{
		type: 'button',
		name: 'l2',
		tap_action: { action: 'key', key: 'BUTTON_L2' },
		icon: 'mdi:alpha-l-box',
	},
	{
		type: 'button',
		name: 'l3',
		tap_action: { action: 'key', key: 'BUTTON_L3' },
		icon: 'mdi:alpha-l-box-outline',
	},
	{
		type: 'button',
		name: 'l_thumb',
		tap_action: { action: 'key', key: 'BUTTON_THUMBL' },
		icon: 'mdi:alpha-l-circle-outline',
	},
	{
		type: 'button',
		name: 'r1',
		tap_action: { action: 'key', key: 'BUTTON_R1' },
		icon: 'mdi:alpha-r-circle',
	},
	{
		type: 'button',
		name: 'r2',
		tap_action: { action: 'key', key: 'BUTTON_R2' },
		icon: 'mdi:alpha-r-box',
	},
	{
		type: 'button',
		name: 'r3',
		tap_action: { action: 'key', key: 'BUTTON_R3' },
		icon: 'mdi:alpha-r-box-outline',
	},
	{
		type: 'button',
		name: 'r_thumb',
		tap_action: { action: 'key', key: 'BUTTON_THUMBR' },
		icon: 'mdi:alpha-r-circle-outline',
	},
	{
		type: 'button',
		name: 'start',
		tap_action: { action: 'key', key: 'BUTTON_START' },
		icon: 'mdi:rectangle',
	},
	{
		type: 'button',
		name: 'select',
		tap_action: { action: 'key', key: 'BUTTON_SELECT' },
		icon: 'mdi:rectangle-outline',
	},
	{
		type: 'button',
		name: 'xpad',
		icon: 'mdi:gamepad-circle',
	},
	{
		type: 'button',
		name: 'npad',
		icon: 'mdi:gamepad-circle',
	},
	{
		type: 'button',
		name: 'n0',
		tap_action: { action: 'key', key: '0' },
		icon: 'mdi:numeric-0',
	},
	{
		type: 'button',
		name: 'n1',
		tap_action: { action: 'key', key: '1' },
		icon: 'mdi:numeric-1',
	},
	{
		type: 'button',
		name: 'n2',
		tap_action: { action: 'key', key: '2' },
		icon: 'mdi:numeric-2',
	},
	{
		type: 'button',
		name: 'n3',
		tap_action: { action: 'key', key: '3' },
		icon: 'mdi:numeric-3',
	},
	{
		type: 'button',
		name: 'n4',
		tap_action: { action: 'key', key: '4' },
		icon: 'mdi:numeric-4',
	},
	{
		type: 'button',
		name: 'n5',
		tap_action: { action: 'key', key: '5' },
		icon: 'mdi:numeric-5',
	},
	{
		type: 'button',
		name: 'n6',
		tap_action: { action: 'key', key: '6' },
		icon: 'mdi:numeric-6',
	},
	{
		type: 'button',
		name: 'n7',
		tap_action: { action: 'key', key: '7' },
		icon: 'mdi:numeric-7',
	},
	{
		type: 'button',
		name: 'n8',
		tap_action: { action: 'key', key: '8' },
		icon: 'mdi:numeric-8',
	},
	{
		type: 'button',
		name: 'n9',
		tap_action: { action: 'key', key: '9' },
		icon: 'mdi:numeric-9',
	},
	{
		type: 'button',
		name: 'numpad',
		icon: 'mdi:dialpad',
	},
	{
		type: 'button',
		name: 'f1',
		tap_action: { action: 'key', key: 'F1' },
		icon: 'mdi:keyboard-f1',
	},
	{
		type: 'button',
		name: 'f2',
		tap_action: { action: 'key', key: 'F2' },
		icon: 'mdi:keyboard-f2',
	},
	{
		type: 'button',
		name: 'f3',
		tap_action: { action: 'key', key: 'F3' },
		icon: 'mdi:keyboard-f3',
	},
	{
		type: 'button',
		name: 'f4',
		tap_action: { action: 'key', key: 'F4' },
		icon: 'mdi:keyboard-f4',
	},
	{
		type: 'button',
		name: 'f5',
		tap_action: { action: 'key', key: 'F5' },
		icon: 'mdi:keyboard-f5',
	},
	{
		type: 'button',
		name: 'f6',
		tap_action: { action: 'key', key: 'F6' },
		icon: 'mdi:keyboard-f6',
	},
	{
		type: 'button',
		name: 'f7',
		tap_action: { action: 'key', key: 'F7' },
		icon: 'mdi:keyboard-f7',
	},
	{
		type: 'button',
		name: 'f8',
		tap_action: { action: 'key', key: 'F8' },
		icon: 'mdi:keyboard-f8',
	},
	{
		type: 'button',
		name: 'f9',
		tap_action: { action: 'key', key: 'F9' },
		icon: 'mdi:keyboard-f9',
	},
	{
		type: 'button',
		name: 'f10',
		tap_action: { action: 'key', key: 'F10' },
		icon: 'mdi:keyboard-f10',
	},
	{
		type: 'button',
		name: 'f11',
		tap_action: { action: 'key', key: 'F11' },
		icon: 'mdi:keyboard-f11',
	},
	{
		type: 'button',
		name: 'f12',
		tap_action: { action: 'key', key: 'F12' },
		icon: 'mdi:keyboard-f12',
	},
	{
		type: 'button',
		name: 'info',
		tap_action: { action: 'key', key: 'INFO' },
		icon: 'mdi:information',
	},
	{
		type: 'button',
		name: 'window',
		tap_action: { action: 'key', key: 'WINDOW' },
		icon: 'mdi:picture-in-picture-top-right',
	},
	{
		type: 'button',
		name: 'guide',
		tap_action: { action: 'key', key: 'GUIDE' },
		icon: 'mdi:television-box',
	},
	{
		type: 'button',
		name: 'captions',
		tap_action: { action: 'key', key: 'CAPTIONS' },
		icon: 'mdi:closed-caption',
	},
	{
		type: 'button',
		name: 'button_mode',
		tap_action: { action: 'key', key: 'BUTTON_MODE' },
		icon: 'mdi:gesture-tap-button',
	},
	{
		type: 'button',
		name: 'explorer',
		tap_action: { action: 'key', key: 'EXPLORER' },
		icon: 'mdi:folder-multiple',
	},
	{
		type: 'button',
		name: 'teletext',
		tap_action: { action: 'key', key: 'TV_TELETEXT' },
		icon: 'mdi:card-text',
	},
	{
		type: 'button',
		name: 'tv',
		tap_action: { action: 'key', key: 'TV' },
		icon: 'mdi:television-box',
	},
	{
		type: 'button',
		name: 'tv_power',
		tap_action: { action: 'key', key: 'TV_POWER' },
		icon: 'mdi:power-cycle',
	},
	{
		type: 'button',
		name: 'source',
		tap_action: { action: 'key', key: 'TV_INPUT' },
		icon: 'mdi:import',
	},
	{
		type: 'button',
		name: 'dvr',
		tap_action: { action: 'key', key: 'DVR' },
		icon: 'mdi:audio-video',
	},
	{
		type: 'button',
		name: 'stb_power',
		tap_action: { action: 'key', key: 'STB_POWER' },
		icon: 'mdi:power-cycle',
	},
	{
		type: 'button',
		name: 'stb_input',
		tap_action: { action: 'key', key: 'STB_INPUT' },
		icon: 'mdi:vhs',
	},
	{
		type: 'button',
		name: 'avr_power',
		tap_action: { action: 'key', key: 'AVR_POWER' },
		icon: 'mdi:power-cycle',
	},
	{
		type: 'button',
		name: 'avr_input',
		tap_action: { action: 'key', key: 'AVR_INPUT' },
		icon: 'mdi:audio-video',
	},
	{
		type: 'button',
		name: 'hdmi_1',
		tap_action: { action: 'key', key: 'TV_INPUT_HDMI_1' },
		icon: 'mdi:video-input-hdmi',
	},
	{
		type: 'button',
		name: 'hdmi_2',
		tap_action: { action: 'key', key: 'TV_INPUT_HDMI_2' },
		icon: 'mdi:video-input-hdmi',
	},
	{
		type: 'button',
		name: 'hdmi_3',
		tap_action: { action: 'key', key: 'TV_INPUT_HDMI_3' },
		icon: 'mdi:video-input-hdmi',
	},
	{
		type: 'button',
		name: 'hdmi_4',
		tap_action: { action: 'key', key: 'TV_INPUT_HDMI_4' },
		icon: 'mdi:video-input-hdmi',
	},
	{
		type: 'button',
		name: 'composite_1',
		tap_action: { action: 'key', key: 'TV_INPUT_COMPOSITE_1' },
		icon: 'mdi:video-input-component',
	},
	{
		type: 'button',
		name: 'composite_2',
		tap_action: { action: 'key', key: 'TV_INPUT_COMPOSITE_2' },
		icon: 'mdi:video-input-component',
	},
	{
		type: 'button',
		name: 'component_1',
		tap_action: { action: 'key', key: 'TV_INPUT_COMPONENT_1' },
		icon: 'mdi:video-input-component',
	},
	{
		type: 'button',
		name: 'component_2',
		tap_action: { action: 'key', key: 'TV_INPUT_COMPONENT_2' },
		icon: 'mdi:video-input-component',
	},
	{
		type: 'button',
		name: 'audio_track',
		tap_action: { action: 'key', key: 'MEDIA_AUDIO_TRACK' },
		icon: 'mdi:waveform',
	},
];
