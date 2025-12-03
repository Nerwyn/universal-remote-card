import { IElementConfig } from '../../interfaces';

/**
 * https://www.home-assistant.io/integrations/kodi/#action-kodicall_method
 * https://kodi.wiki/view/JSON-RPC_API/v13
 */
export const kodiDefaultKeys: IElementConfig[] = [
	{
		name: 'power',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'GUI.ActivateWindow',
				window: 'shutdownmenu',
			},
		},
		icon: 'mdi:power',
	},
	{
		name: 'home',
		tap_action: {
			action: 'key',
			key: 'Input.Home',
		},
		icon: 'mdi:home',
	},
	{
		name: 'back',
		tap_action: {
			action: 'key',
			key: 'Input.Back',
		},
		icon: 'mdi:keyboard-backspace',
	},
	{
		name: 'menu',
		tap_action: {
			action: 'key',
			key: 'Input.ContextMenu',
		},
		icon: 'mdi:menu',
	},
	{
		name: 'volume_up',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Application.SetVolume',
				volume: 'increment',
			},
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:volume-high',
	},
	{
		name: 'volume_down',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Application.SetVolume',
				volume: 'decrement',
			},
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:volume-medium',
	},
	{
		name: 'volume_mute',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Application.SetMute',
				mute: 'toggle',
			},
		},
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
		tap_action: {
			action: 'key',
			key: 'Input.Up',
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-up',
	},
	{
		name: 'down',
		tap_action: {
			action: 'key',
			key: 'Input.Down',
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-down',
	},
	{
		name: 'left',
		tap_action: {
			action: 'key',
			key: 'Input.Left',
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-left',
	},
	{
		name: 'right',
		tap_action: {
			action: 'key',
			key: 'Input.Right',
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-right',
	},
	{
		name: 'center',
		tap_action: {
			action: 'key',
			key: 'Input.Select',
		},
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
			key: 'Input.Select',
		},
		up: {
			icon: 'mdi:chevron-up',
			tap_action: {
				action: 'key',
				key: 'Input.Up',
			},
			hold_action: { action: 'repeat' },
		},
		down: {
			icon: 'mdi:chevron-down',
			tap_action: {
				action: 'key',
				key: 'Input.Down',
			},
			hold_action: { action: 'repeat' },
		},
		left: {
			icon: 'mdi:chevron-left',
			tap_action: {
				action: 'key',
				key: 'Input.Left',
			},
			hold_action: { action: 'repeat' },
		},
		right: {
			icon: 'mdi:chevron-right',
			tap_action: {
				action: 'key',
				key: 'Input.Right',
			},
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
				key: 'Input.ContextMenu',
			},
		},
		down: {
			styles: '.icon {\n  translate: calc(-1 * var(--icon-offset)) var(--icon-offset);\n\n}',
			icon: 'mdi:play-pause',
			tap_action: {
				action: 'perform-action',
				perform_action: 'kodi.call_method',
				data: {
					method: 'Player.PlayPause',
					playerid: 1,
				},
			},
		},
		left: {
			icon: 'mdi:skip-backward',
			styles: '.icon {\n  translate: calc(-1 * var(--icon-offset)) calc(-1 * var(--icon-offset));\n}',
			tap_action: {
				action: 'perform-action',
				perform_action: 'kodi.call_method',
				data: {
					method: 'Input.ExecuteAction',
					action: 'rewind',
				},
			},
		},
		right: {
			icon: 'mdi:skip-forward',
			styles: '.icon {\n  translate: var(--icon-offset) var(--icon-offset);\n}',
			tap_action: {
				action: 'perform-action',
				perform_action: 'kodi.call_method',
				data: {
					method: 'Input.ExecuteAction',
					action: 'fastforward',
				},
			},
		},
		drag_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Application.SetVolume',
				volume: '{{ "increment" if clockwise else "decrement" }}',
			},
		},
		tap_action: {
			action: 'key',
			key: 'Input.Select',
		},
	},
	{
		type: 'touchpad',
		name: 'touchpad',
		tap_action: {
			action: 'key',
			key: 'Input.Select',
		},
		up: {
			tap_action: {
				action: 'key',
				key: 'Input.Up',
			},
			hold_action: { action: 'repeat' },
		},
		down: {
			tap_action: {
				action: 'key',
				key: 'Input.Down',
			},
			hold_action: { action: 'repeat' },
		},
		left: {
			tap_action: {
				action: 'key',
				key: 'Input.Left',
			},
			hold_action: { action: 'repeat' },
		},
		right: {
			tap_action: {
				action: 'key',
				key: 'Input.Right',
			},
			hold_action: { action: 'repeat' },
		},
	},
	{
		type: 'touchpad',
		name: 'dragpad',
		tap_action: {
			action: 'key',
			key: 'Input.Select',
		},
		drag_action: {
			action: 'key',
			key: 'Input.{{ ("Right" if deltaX > 0 else "Left") if (deltaX | abs) > (deltaY | abs) else ("Down" if deltaY > 0 else "Up") }}',
			repeat_delay: 100,
		},
		multi_drag_action: {
			action: 'key',
			key: 'Input.{{ ("Right" if deltaX > 0 else "Left") if (deltaX | abs) > (deltaY | abs) else ("Down" if deltaY > 0 else "Up") }}',
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
			perform_action: 'kodi.call_method',
			data: {
				method: 'Player.PlayPause',
				playerid: 1,
			},
		},
		icon: 'mdi:play-pause',
	},
	{
		name: 'play',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Player.PlayPause',
				playerid: 1,
				play: true,
			},
		},
		icon: 'mdi:play',
	},
	{
		name: 'pause',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Player.PlayPause',
				playerid: 1,
				play: false,
			},
		},
		icon: 'mdi:pause',
	},
	{
		name: 'music_play_pause',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Player.PlayPause',
				playerid: 0,
			},
		},
		icon: 'mdi:music',
	},
	{
		name: 'picture_play_pause',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Player.PlayPause',
				playerid: 2,
			},
		},
		icon: 'mdi:image',
	},
	{
		name: 'rewind',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Input.ExecuteAction',
				action: 'rewind',
			},
		},
		icon: 'mdi:rewind',
	},
	{
		name: 'fast_forward',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Input.ExecuteAction',
				action: 'fastforward',
			},
		},
		icon: 'mdi:fast-forward',
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
		icon: 'mdi:kodi',
	},
	{
		name: 'channel_up',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Input.ExecuteAction',
				action: 'channelup',
			},
		},
		icon: 'mdi:arrow-up-bold-circle',
	},
	{
		name: 'channel_down',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'Input.ExecuteAction',
				action: 'channeldown',
			},
		},
		icon: 'mdi:arrow-down-bold-circle',
	},
	{
		name: 'info',
		tap_action: {
			action: 'key',
			key: 'Input.Info',
		},
		icon: 'mdi:information',
	},
	{
		name: 'codec',
		tap_action: {
			action: 'key',
			key: 'Input.ShowCodec',
		},
		icon: 'mdi:information-box',
	},
	{
		name: 'osd',
		tap_action: {
			action: 'key',
			key: 'Input.ShowOSD',
		},
		icon: 'mdi:television-guide',
	},
	{
		name: 'process_info',
		tap_action: {
			action: 'key',
			key: 'Input.ShowPlayerProcessInfo',
		},
		icon: 'mdi:information-variant-circle',
	},
	{
		name: 'guide',
		tap_action: {
			action: 'perform-action',
			perform_action: 'kodi.call_method',
			data: {
				method: 'GUI.ActivateWindow',
				window: 'tvguide',
			},
		},
		icon: 'mdi:television-guide',
	},
];
