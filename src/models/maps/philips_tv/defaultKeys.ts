import { IElementConfig } from '../../interfaces';

/**
 * https://www.home-assistant.io/integrations/philips_js/
 */
export const philipsTVDefaultKeys: IElementConfig[] = [
	{
		name: 'power',
		tap_action: { action: 'key', key: 'PowerOn' },
		hold_action: { action: 'key', key: 'PowerOff' },
		icon: 'mdi:power',
	},
	{
		name: 'power_on',
		tap_action: { action: 'key', key: 'PowerOn' },
		icon: 'mdi:power-on',
	},
	{
		name: 'power_off',
		tap_action: { action: 'key', key: 'PowerOff' },
		icon: 'mdi:power-off',
	},
	{
		name: 'standby',
		tap_action: { action: 'key', key: 'Standby' },
		icon: 'mdi:power-standby',
	},
	{
		name: 'list',
		tap_action: { action: 'key', key: 'List' },
		icon: 'mdi:format-list-bulleted',
	},
	{
		name: 'find',
		tap_action: { action: 'key', key: 'Find' },
		icon: 'mdi:tag-search',
	},

	{
		name: 'home',
		tap_action: { action: 'key', key: 'Home' },
		icon: 'mdi:home',
	},
	{
		name: 'back',
		tap_action: { action: 'key', key: 'Back' },
		icon: 'mdi:keyboard-backspace',
	},

	{
		name: 'exit',
		tap_action: { action: 'key', key: 'Exit' },
		icon: 'mdi:exit-to-app',
	},

	{
		name: 'options',
		tap_action: { action: 'key', key: 'Options' },
		icon: 'mdi:backburger',
	},
	{
		name: 'adjust',
		tap_action: { action: 'key', key: 'Adjust' },
		icon: 'mdi:adjust',
	},
	{
		name: 'volume_up',
		tap_action: { action: 'key', key: 'VolumeUp' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:volume-high',
	},
	{
		name: 'volume_down',
		tap_action: { action: 'key', key: 'VolumeDown' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:volume-medium',
	},
	{
		name: 'volume_mute',
		tap_action: { action: 'key', key: 'Mute' },
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
		tap_action: { action: 'key', key: 'CursorUp' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-up',
	},
	{
		name: 'down',
		tap_action: { action: 'key', key: 'CursorDown' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-down',
	},
	{
		name: 'left',
		tap_action: { action: 'key', key: 'CursorLeft' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-left',
	},
	{
		name: 'right',
		tap_action: { action: 'key', key: 'CursorRight' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-right',
	},
	{
		name: 'center',
		tap_action: { action: 'key', key: 'Confirm' },
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
			key: 'Confirm',
		},
		up: {
			icon: 'mdi:chevron-up',
			tap_action: { action: 'key', key: 'CursorUp' },
			hold_action: { action: 'repeat' },
		},
		down: {
			icon: 'mdi:chevron-down',
			tap_action: { action: 'key', key: 'CursorDown' },
			hold_action: { action: 'repeat' },
		},
		left: {
			icon: 'mdi:chevron-left',
			tap_action: { action: 'key', key: 'CursorLeft' },
			hold_action: { action: 'repeat' },
		},
		right: {
			icon: 'mdi:chevron-right',
			tap_action: { action: 'key', key: 'CursorRight' },
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
				key: 'PhilipsMenu',
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
				key: 'Rewind',
			},
		},
		right: {
			icon: 'mdi:skip-forward',
			styles: '.icon {\n  translate: var(--icon-offset) var(--icon-offset);\n}',
			tap_action: {
				action: 'key',
				key: 'FastForward',
			},
		},
		drag_action: {
			action: 'key',
			key: 'Volume{{"Up" if clockwise else "Down"}}',
		},
		tap_action: {
			action: 'key',
			key: 'Confirm',
		},
	},
	{
		type: 'touchpad',
		name: 'touchpad',
		tap_action: {
			action: 'key',
			key: 'Confirm',
		},
		up: {
			tap_action: { action: 'key', key: 'CursorUp' },
			hold_action: { action: 'repeat' },
		},
		down: {
			tap_action: { action: 'key', key: 'CursorDown' },
			hold_action: { action: 'repeat' },
		},
		left: {
			tap_action: { action: 'key', key: 'CursorLeft' },
			hold_action: { action: 'repeat' },
		},
		right: {
			tap_action: { action: 'key', key: 'CursorRight' },
			hold_action: { action: 'repeat' },
		},
	},
	{
		type: 'touchpad',
		name: 'dragpad',
		tap_action: {
			action: 'key',
			key: 'Confirm',
		},
		drag_action: {
			action: 'key',
			key: 'Cursor{{ ("Right" if deltaX > 0 else "Left") if (deltaX | abs) > (deltaY | abs) else ("Down" if deltaY > 0 else "Up") }}',
			repeat_delay: 100,
		},
		multi_drag_action: {
			action: 'key',
			key: 'Cursor{{ ("Right" if deltaX > 0 else "Left") if (deltaX | abs) > (deltaY | abs) else ("Down" if deltaY > 0 else "Up") }}',
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
		tap_action: { action: 'key', key: 'Play' },
		icon: 'mdi:play',
	},
	{
		name: 'pause',
		tap_action: { action: 'key', key: 'Pause' },
		icon: 'mdi:pause',
	},
	{
		name: 'rewind',
		tap_action: { action: 'key', key: 'Rewind' },
		icon: 'mdi:rewind',
	},
	{
		name: 'fast_forward',
		tap_action: { action: 'key', key: 'FastForward' },
		icon: 'mdi:fast-forward',
	},
	{
		name: 'stop',
		tap_action: { action: 'key', key: 'Stop' },
		icon: 'mdi:stop',
	},
	{
		name: 'record',
		tap_action: { action: 'key', key: 'Record' },
		icon: 'mdi:record',
	},
	{
		name: 'channel_up',
		tap_action: { action: 'key', key: 'ChannelStepUp' },
		icon: 'mdi:arrow-up-circle',
	},
	{
		name: 'channel_down',
		tap_action: { action: 'key', key: 'ChannelStepDown' },
		icon: 'mdi:arrow-down-circle',
	},
	{
		name: 'red',
		tap_action: { action: 'key', key: 'RedColour' },
		icon: 'mdi:alpha-r-box',
	},
	{
		name: 'green',
		tap_action: { action: 'key', key: 'GreenColour' },
		icon: 'mdi:alpha-g-box',
	},
	{
		name: 'yellow',
		tap_action: { action: 'key', key: 'YellowColour' },
		icon: 'mdi:alpha-y-box',
	},
	{
		name: 'blue',
		tap_action: { action: 'key', key: 'BlueColour' },
		icon: 'mdi:alpha-b-box',
	},
	{
		name: 'n0',
		tap_action: { action: 'key', key: 'Digit0' },
		icon: 'mdi:numeric-0',
	},
	{
		name: 'n1',
		tap_action: { action: 'key', key: 'Digit1' },
		icon: 'mdi:numeric-1',
	},
	{
		name: 'n2',
		tap_action: { action: 'key', key: 'Digit2' },
		icon: 'mdi:numeric-2',
	},
	{
		name: 'n3',
		tap_action: { action: 'key', key: 'Digit3' },
		icon: 'mdi:numeric-3',
	},
	{
		name: 'n4',
		tap_action: { action: 'key', key: 'Digit4' },
		icon: 'mdi:numeric-4',
	},
	{
		name: 'n5',
		tap_action: { action: 'key', key: 'Digit5' },
		icon: 'mdi:numeric-5',
	},
	{
		name: 'n6',
		tap_action: { action: 'key', key: 'Digit6' },
		icon: 'mdi:numeric-6',
	},
	{
		name: 'n7',
		tap_action: { action: 'key', key: 'Digit7' },
		icon: 'mdi:numeric-7',
	},
	{
		name: 'n8',
		tap_action: { action: 'key', key: 'Digit8' },
		icon: 'mdi:numeric-8',
	},
	{
		name: 'n9',
		tap_action: { action: 'key', key: 'Digit9' },
		icon: 'mdi:numeric-9',
	},
	{
		name: 'numpad',
		icon: 'mdi:dialpad',
	},
	{
		name: 'info',
		tap_action: { action: 'key', key: 'Info' },
		icon: 'mdi:information',
	},
	{
		name: 'teletext',
		tap_action: { action: 'key', key: 'Teletext' },
		icon: 'mdi:card-text',
	},
	{
		name: 'subtitle',
		tap_action: { action: 'key', key: 'Subtitle' },
		icon: 'mdi:subtitles',
	},

	{
		name: 'guide',
		tap_action: { action: 'key', key: 'TvGuide' },
		icon: 'mdi:television-box',
	},
	{
		name: 'captions',
		tap_action: { action: 'key', key: 'ClosedCaption' },
		icon: 'mdi:closed-caption',
	},
	{
		name: 'smart_tv',
		tap_action: { action: 'key', key: 'SmartTV' },
		icon: 'mdi:television',
	},
	{
		name: 'source',
		tap_action: { action: 'key', key: 'Source' },
		icon: 'mdi:import',
	},
	{
		name: 'tv',
		tap_action: { action: 'key', key: 'WatchTV' },
		icon: 'mdi:television',
	},
	{
		name: 'ambient',
		tap_action: { action: 'key', key: 'AmbilightOnOff' },
		icon: 'mdi:television-ambient-light',
	},
	{
		name: 'viewmode',
		tap_action: { action: 'key', key: 'Viewmode' },
		icon: 'mdi:view-column-outline',
	},
	{
		name: '3d_format',
		tap_action: { action: 'key', key: '3dFormat' },
		icon: 'mdi:video-3d',
	},
	{
		name: 'multiview',
		tap_action: { action: 'key', key: 'Multiview' },
		icon: 'mdi:picture-in-picture-top-right-outline',
	},
	{
		name: 'picturestyle',
		tap_action: { action: 'key', key: 'PictureStyle' },
		icon: 'mdi:panorama-variant-outline',
	},
	{
		name: '3d_depth',
		tap_action: { action: 'key', key: '3dDepth' },
		icon: 'mdi:video-3d-variant',
	},
	{
		name: 'sound_style',
		tap_action: { action: 'key', key: 'SoundStyle' },
		icon: 'mdi:volume-low',
	},
	{
		name: 'surround_mode',
		tap_action: { action: 'key', key: 'SurroundMode' },
		icon: 'mdi:surround-sound',
	},
	{
		name: 'headphones_volume',
		tap_action: { action: 'key', key: 'HeadphonesVolume' },
		icon: 'mdi:headphones-settings',
	},
	{
		name: 'two_player_gaming',
		tap_action: { action: 'key', key: '2PlayerGaming' },
		icon: 'mdi:gamepad-variant',
	},
	{
		name: 'setup',
		tap_action: { action: 'key', key: 'Setup' },
		icon: 'mdi:application-settings',
	},
	{
		name: 'white_color',
		tap_action: { action: 'key', key: 'WhiteColour' },
		icon: 'mdi:white-balance-incandescent',
	},
	{
		name: 'online',
		tap_action: { action: 'key', key: 'Online' },
		icon: 'mdi:web',
	},
	{
		name: 'philips_menu',
		tap_action: { action: 'key', key: 'PhilipsMenu' },
		icon: 'mdi:menu',
	},
	{
		name: 'dot',
		tap_action: { action: 'key', key: 'Dot' },
		icon: 'mdi:dots-circle',
	},
];
