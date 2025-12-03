import { IElementConfig } from '../../interfaces';

/**
 * This list contains commands listed by the Sony BRAVIA KD-55X750H used during development.
 * Additional commands may be supported.
 *
 * https://www.home-assistant.io/integrations/braviatv/#remote
 */
export const braviaTVDefaultKeys: IElementConfig[] = [
	{
		name: 'power',
		tap_action: { action: 'key', key: 'TvPower' },
		icon: 'mdi:power',
	},
	{
		name: 'home',
		tap_action: { action: 'key', key: 'Home' },
		icon: 'mdi:home',
	},
	{
		name: 'back',
		tap_action: { action: 'key', key: 'Return' },
		icon: 'mdi:keyboard-backspace',
	},
	{
		name: 'menu',
		tap_action: { action: 'key', key: 'ActionMenu' },
		icon: 'mdi:menu',
	},
	{
		name: 'source',
		tap_action: { action: 'key', key: 'Input' },
		icon: 'mdi:import',
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
		tap_action: { action: 'key', key: 'Up' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-up',
	},
	{
		name: 'down',
		tap_action: { action: 'key', key: 'Down' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-down',
	},
	{
		name: 'left',
		tap_action: { action: 'key', key: 'Left' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-left',
	},
	{
		name: 'right',
		tap_action: { action: 'key', key: 'Right' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-right',
	},
	{
		name: 'center',
		tap_action: { action: 'key', key: 'Confirm' },
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
			key: 'Confirm',
		},
		up: {
			icon: 'mdi:chevron-up',
			tap_action: { action: 'key', key: 'Up' },
			hold_action: { action: 'repeat' },
		},
		down: {
			icon: 'mdi:chevron-down',
			tap_action: { action: 'key', key: 'Down' },
			hold_action: { action: 'repeat' },
		},
		left: {
			icon: 'mdi:chevron-left',
			tap_action: { action: 'key', key: 'Left' },
			hold_action: { action: 'repeat' },
		},
		right: {
			icon: 'mdi:chevron-right',
			tap_action: { action: 'key', key: 'Right' },
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
				key: 'ActionMenu',
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
				key: 'Prev',
			},
		},
		right: {
			icon: 'mdi:skip-forward',
			styles: '.icon {\n  translate: var(--icon-offset) var(--icon-offset);\n}',
			tap_action: {
				action: 'key',
				key: 'Next',
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
			tap_action: { action: 'key', key: 'Up' },
			hold_action: { action: 'repeat' },
		},
		down: {
			tap_action: { action: 'key', key: 'Down' },
			hold_action: { action: 'repeat' },
		},
		left: {
			tap_action: { action: 'key', key: 'Left' },
			hold_action: { action: 'repeat' },
		},
		right: {
			tap_action: { action: 'key', key: 'Right' },
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
			key: '{{ ("Right" if deltaX > 0 else "Left") if (deltaX | abs) > (deltaY | abs) else ("Down" if deltaY > 0 else "Up") }}',
			repeat_delay: 100,
		},
		multi_drag_action: {
			action: 'key',
			key: '{{ ("Right" if deltaX > 0 else "Left") if (deltaX | abs) > (deltaY | abs) else ("Down" if deltaY > 0 else "Up") }}',
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
		tap_action: { action: 'key', key: 'Forward' },
		icon: 'mdi:fast-forward',
	},
	{
		name: 'previous',
		tap_action: { action: 'key', key: 'Prev' },
		icon: 'mdi:skip-previous',
	},
	{
		name: 'next',
		tap_action: { action: 'key', key: 'Next' },
		icon: 'mdi:skip-next',
	},
	{
		name: 'stop',
		tap_action: { action: 'key', key: 'Stop' },
		icon: 'mdi:stop',
	},
	{
		name: 'record',
		tap_action: { action: 'key', key: 'Rec' },
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
		name: 'search',
		tap_action: { action: 'search' },
		icon: 'mdi:google-assistant',
	},
	{
		name: 'delete',
		tap_action: { action: 'key', key: 'input keyevent 67' },
		hold_action: { action: 'repeat' },
		icon: 'mdi:backspace',
	},
	{
		name: 'enter',
		tap_action: {
			action: 'perform-action',
			perform_action: 'remote.send_command',
			data: {
				command: 'input keyevent 66',
			},
		},
		icon: 'mdi:magnify',
	},
	{
		name: 'channel_up',
		tap_action: { action: 'key', key: 'ChannelUp' },
		icon: 'mdi:arrow-up-circle',
	},
	{
		name: 'channel_down',
		tap_action: { action: 'key', key: 'ChannelDown' },
		icon: 'mdi:arrow-down-circle',
	},
	{
		name: 'red',
		tap_action: { action: 'key', key: 'Red' },
		icon: 'mdi:alpha-r-box',
	},
	{
		name: 'green',
		tap_action: { action: 'key', key: 'Green' },
		icon: 'mdi:alpha-g-box',
	},
	{
		name: 'yellow',
		tap_action: { action: 'key', key: 'Yellow' },
		icon: 'mdi:alpha-y-box',
	},
	{
		name: 'blue',
		tap_action: { action: 'key', key: 'Blue' },
		icon: 'mdi:alpha-b-box',
	},
	{
		name: 'n0',
		tap_action: { action: 'key', key: 'Num0' },
		icon: 'mdi:numeric-0',
	},
	{
		name: 'n1',
		tap_action: { action: 'key', key: 'Num1' },
		icon: 'mdi:numeric-1',
	},
	{
		name: 'n2',
		tap_action: { action: 'key', key: 'Num2' },
		icon: 'mdi:numeric-2',
	},
	{
		name: 'n3',
		tap_action: { action: 'key', key: 'Num3' },
		icon: 'mdi:numeric-3',
	},
	{
		name: 'n4',
		tap_action: { action: 'key', key: 'Num4' },
		icon: 'mdi:numeric-4',
	},
	{
		name: 'n5',
		tap_action: { action: 'key', key: 'Num5' },
		icon: 'mdi:numeric-5',
	},
	{
		name: 'n6',
		tap_action: { action: 'key', key: 'Num6' },
		icon: 'mdi:numeric-6',
	},
	{
		name: 'n7',
		tap_action: { action: 'key', key: 'Num7' },
		icon: 'mdi:numeric-7',
	},
	{
		name: 'n8',
		tap_action: { action: 'key', key: 'Num8' },
		icon: 'mdi:numeric-8',
	},
	{
		name: 'n9',
		tap_action: { action: 'key', key: 'Num9' },
		icon: 'mdi:numeric-9',
	},
	{
		name: 'numpad',
		icon: 'mdi:dialpad',
	},
	{
		name: 'captions',
		tap_action: { action: 'key', key: 'SubTitle' },
		icon: 'mdi:closed-caption',
	},
	{
		name: 'explorer',
		tap_action: { action: 'key', key: 'ApplicationLauncher' },
		icon: 'mdi:folder-multiple',
	},
	{
		name: 'teletext',
		tap_action: { action: 'key', key: 'Teletext' },
		icon: 'mdi:card-text',
	},
	{
		name: 'tv',
		tap_action: { action: 'key', key: 'Tv' },
		icon: 'mdi:television-box',
	},
	{
		name: 'audio_track',
		tap_action: { action: 'key', key: 'MediaAudioTrack' },
		icon: 'mdi:waveform',
	},
];
