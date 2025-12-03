import { IElementConfig } from '../../interfaces';

/**
 * https://github.com/DaviPtrs/hass-unified-remote?tab=readme-ov-file#how-to-use
 *
 * https://github.com/unifiedremote/Remotes/blob/329d04f3c32b29038b0a6bc1ba034eefaff04267/Main/Monitor/remote_win.lua
 * https://github.com/unifiedremote/Remotes/blob/329d04f3c32b29038b0a6bc1ba034eefaff04267/Main/Media/remote.lua
 * https://github.com/unifiedremote/Remotes/blob/329d04f3c32b29038b0a6bc1ba034eefaff04267/Main/Basic%20Input/remote.lua
 * https://github.com/unifiedremote/Remotes/blob/329d04f3c32b29038b0a6bc1ba034eefaff04267/Core/Input/remote.lua
 */
export const unifiedRemoteDefaultKeys: IElementConfig[] = [
	{
		name: 'monitor',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Unified.Monitor',
				action: 'turn_on',
			},
		},
		hold_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Unified.Monitor',
				action: 'turn_off',
			},
		},
		icon: 'mdi:monitor',
	},
	{
		name: 'monitor_on',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Unified.Monitor',
				action: 'turn_on',
			},
		},
		icon: 'mdi:monitor',
	},
	{
		name: 'monitor_off',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Unified.Monitor',
				action: 'turn_off',
			},
		},
		icon: 'mdi:monitor-off',
	},
	{
		name: 'windows',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: 'lwin',
						},
					],
				},
			},
		},
		icon: 'mdi:microsoft',
	},
	{
		name: 'window_switcher',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Stroke',
				extras: {
					Values: [
						{
							Value: 'lwin',
						},
						{
							Value: 'tab',
						},
					],
				},
			},
		},
		icon: 'mdi:apps',
	},
	{
		name: 'back',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: 'back',
						},
					],
				},
			},
		},
		icon: 'mdi:keyboard-backspace',
	},
	{
		name: 'close',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Stroke',
				extras: {
					Values: [
						{
							Value: 'alt',
						},
						{
							Value: 'f4',
						},
					],
				},
			},
		},
		icon: 'mdi:window-close',
	},
	{
		name: 'volume_up',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Unified.Media',
				action: 'volume_up',
			},
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:volume-high',
	},
	{
		name: 'volume_down',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Unified.Media',
				action: 'volume_down',
			},
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:volume-medium',
	},
	{
		name: 'volume_mute',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Unified.Media',
				action: 'volume_mute',
			},
		},
		icon: 'mdi:volume-low',
	},
	{
		name: 'volume_buttons',
		icon: 'mdi:volume-plus',
	},
	{
		type: 'touchpad',
		name: 'mousepad',
		drag_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Relmtech.Basic Input',
				action: 'delta',
				extras: {
					Values: [
						{
							Value: 0,
						},
						{
							Value: '{{ 3 * deltaX }}',
						},
						{
							Value: '{{ 3 * deltaY }}',
						},
					],
				},
			},
		},
		multi_drag_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			repeat_delay: 50,
			data: {
				remote_id: 'Core.Input',
				action: '{{ "Horz" if (deltaX | abs) > (deltaY | abs) else "Vert" }}',
				extras: {
					Values: [
						{
							Value: '{{ -1 * (deltaX if (deltaX | abs) > (deltaY | abs) else deltaY) }}',
						},
					],
				},
			},
		},
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Relmtech.Basic Input',
				action: 'tap',
			},
		},
		hold_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Relmtech.Basic Input',
				action: 'hold',
			},
		},
		multi_tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Relmtech.Basic Input',
				action: 'right',
			},
		},
		up: {},
		down: {},
		left: {},
		right: {},
		icon: 'mdi:mouse',
	},
	{
		name: 'up',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: 'up',
						},
					],
				},
			},
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-up',
	},
	{
		name: 'down',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: 'down',
						},
					],
				},
			},
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-down',
	},
	{
		name: 'left',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: 'left',
						},
					],
				},
			},
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-left',
	},
	{
		name: 'right',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: 'right',
						},
					],
				},
			},
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:chevron-right',
	},
	{
		name: 'center',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: 'enter',
						},
					],
				},
			},
		},
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
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: 'enter',
						},
					],
				},
			},
		},
		up: {
			icon: 'mdi:chevron-up',
			tap_action: {
				action: 'perform-action',
				perform_action: 'unified_remote.call',
				data: {
					remote_id: 'Core.Input',
					action: 'Press',
					extras: {
						Values: [
							{
								Value: 'up',
							},
						],
					},
				},
			},
			hold_action: { action: 'repeat' },
		},
		down: {
			icon: 'mdi:chevron-down',
			tap_action: {
				action: 'perform-action',
				perform_action: 'unified_remote.call',
				data: {
					remote_id: 'Core.Input',
					action: 'Press',
					extras: {
						Values: [
							{
								Value: 'down',
							},
						],
					},
				},
			},
			hold_action: { action: 'repeat' },
		},
		left: {
			icon: 'mdi:chevron-left',
			tap_action: {
				action: 'perform-action',
				perform_action: 'unified_remote.call',
				data: {
					remote_id: 'Core.Input',
					action: 'Press',
					extras: {
						Values: [
							{
								Value: 'left',
							},
						],
					},
				},
			},
			hold_action: { action: 'repeat' },
		},
		right: {
			icon: 'mdi:chevron-right',
			tap_action: {
				action: 'perform-action',
				perform_action: 'unified_remote.call',
				data: {
					remote_id: 'Core.Input',
					action: 'Press',
					extras: {
						Values: [
							{
								Value: 'right',
							},
						],
					},
				},
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
				action: 'perform-action',
				perform_action: 'unified_remote.call',
				data: {
					remote_id: 'Core.Input',
					action: 'Press',
					extras: {
						Values: [
							{
								Value: 'lwin',
							},
						],
					},
				},
			},
		},
		down: {
			styles: '.icon {\n  translate: calc(-1 * var(--icon-offset)) var(--icon-offset);\n\n}',
			icon: 'mdi:play-pause',
			tap_action: {
				action: 'perform-action',
				perform_action: 'unified_remote.call',
				data: {
					remote_id: 'Unified.Media',
					action: 'play_pause',
				},
			},
		},
		left: {
			icon: 'mdi:skip-backward',
			styles: '.icon {\n  translate: calc(-1 * var(--icon-offset)) calc(-1 * var(--icon-offset));\n}',
			tap_action: {
				action: 'perform-action',
				perform_action: 'unified_remote.call',
				data: {
					remote_id: 'Unified.Media',
					action: 'previous',
				},
			},
		},
		right: {
			icon: 'mdi:skip-forward',
			styles: '.icon {\n  translate: var(--icon-offset) var(--icon-offset);\n}',
			tap_action: {
				action: 'perform-action',
				perform_action: 'unified_remote.call',
				data: {
					remote_id: 'Unified.Media',
					action: 'next',
				},
			},
		},
		drag_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Unified.Media',
				action: 'volume_{{"up" if clockwise else "down" }}',
			},
		},
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: 'enter',
						},
					],
				},
			},
		},
	},
	{
		type: 'touchpad',
		name: 'touchpad',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: 'enter',
						},
					],
				},
			},
		},
		up: {
			tap_action: {
				action: 'perform-action',
				perform_action: 'unified_remote.call',
				data: {
					remote_id: 'Core.Input',
					action: 'Press',
					extras: {
						Values: [
							{
								Value: 'up',
							},
						],
					},
				},
			},
			hold_action: { action: 'repeat' },
		},
		down: {
			tap_action: {
				action: 'perform-action',
				perform_action: 'unified_remote.call',
				data: {
					remote_id: 'Core.Input',
					action: 'Press',
					extras: {
						Values: [
							{
								Value: 'down',
							},
						],
					},
				},
			},
			hold_action: { action: 'repeat' },
		},
		left: {
			tap_action: {
				action: 'perform-action',
				perform_action: 'unified_remote.call',
				data: {
					remote_id: 'Core.Input',
					action: 'Press',
					extras: {
						Values: [
							{
								Value: 'left',
							},
						],
					},
				},
			},
			hold_action: { action: 'repeat' },
		},
		right: {
			tap_action: {
				action: 'perform-action',
				perform_action: 'unified_remote.call',
				data: {
					remote_id: 'Core.Input',
					action: 'Press',
					extras: {
						Values: [
							{
								Value: 'right',
							},
						],
					},
				},
			},
			hold_action: { action: 'repeat' },
		},
	},
	{
		type: 'touchpad',
		name: 'dragpad',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: 'enter',
						},
					],
				},
			},
		},
		drag_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: '{{ ("right" if deltaX > 0 else "left") if (deltaX | abs) > (deltaY | abs) else ("down" if deltaY > 0 else "up") }}',
						},
					],
				},
			},
			repeat_delay: 100,
		},
		multi_drag_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: '{{ ("right" if deltaX > 0 else "left") if (deltaX | abs) > (deltaY | abs) else ("down" if deltaY > 0 else "up") }}',
						},
					],
				},
			},
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
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Unified.Media',
				action: 'play_pause',
			},
		},
		icon: 'mdi:play-pause',
	},
	{
		name: 'stop',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Unified.Media',
				action: 'stop',
			},
		},
		icon: 'mdi:stop',
	},
	{
		name: 'previous',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Unified.Media',
				action: 'previous',
			},
		},
		icon: 'mdi:skip-previous',
	},
	{
		name: 'next',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Unified.Media',
				action: 'next',
			},
		},
		icon: 'mdi:skip-next',
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
		name: 'delete',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: 'back',
						},
					],
				},
			},
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:backspace',
	},
	{
		name: 'forward_delete',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: 'delete',
						},
					],
				},
			},
		},
		hold_action: { action: 'repeat' },
		icon: 'mdi:backspace-reverse',
	},
	{
		name: 'enter',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: 'enter',
						},
					],
				},
			},
		},
		icon: 'mdi:magnify',
	},
	{
		name: 'n0',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: '0',
						},
					],
				},
			},
		},
		icon: 'mdi:numeric-0',
	},
	{
		name: 'n1',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: '1',
						},
					],
				},
			},
		},
		icon: 'mdi:numeric-1',
	},
	{
		name: 'n2',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: '2',
						},
					],
				},
			},
		},
		icon: 'mdi:numeric-2',
	},
	{
		name: 'n3',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: '3',
						},
					],
				},
			},
		},
		icon: 'mdi:numeric-3',
	},
	{
		name: 'n4',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: '4',
						},
					],
				},
			},
		},
		icon: 'mdi:numeric-4',
	},
	{
		name: 'n5',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: '5',
						},
					],
				},
			},
		},
		icon: 'mdi:numeric-5',
	},
	{
		name: 'n6',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: '6',
						},
					],
				},
			},
		},
		icon: 'mdi:numeric-6',
	},
	{
		name: 'n7',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: '7',
						},
					],
				},
			},
		},
		icon: 'mdi:numeric-7',
	},
	{
		name: 'n8',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: '8',
						},
					],
				},
			},
		},
		icon: 'mdi:numeric-8',
	},
	{
		name: 'n9',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: '9',
						},
					],
				},
			},
		},
		icon: 'mdi:numeric-9',
	},
	{
		name: 'numpad',
		icon: 'mdi:dialpad',
	},
	{
		name: 'f1',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: 'f1',
						},
					],
				},
			},
		},
		icon: 'mdi:keyboard-f1',
	},
	{
		name: 'f2',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: 'f2',
						},
					],
				},
			},
		},
		icon: 'mdi:keyboard-f2',
	},
	{
		name: 'f3',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: 'f3',
						},
					],
				},
			},
		},
		icon: 'mdi:keyboard-f3',
	},
	{
		name: 'f4',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: 'f4',
						},
					],
				},
			},
		},
		icon: 'mdi:keyboard-f4',
	},
	{
		name: 'f5',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: 'f5',
						},
					],
				},
			},
		},
		icon: 'mdi:keyboard-f5',
	},
	{
		name: 'f6',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: 'f6',
						},
					],
				},
			},
		},
		icon: 'mdi:keyboard-f6',
	},
	{
		name: 'f7',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: 'f7',
						},
					],
				},
			},
		},
		icon: 'mdi:keyboard-f7',
	},
	{
		name: 'f8',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: 'f8',
						},
					],
				},
			},
		},
		icon: 'mdi:keyboard-f8',
	},
	{
		name: 'f9',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: 'f9',
						},
					],
				},
			},
		},
		icon: 'mdi:keyboard-f9',
	},
	{
		name: 'f10',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: 'f10',
						},
					],
				},
			},
		},
		icon: 'mdi:keyboard-f10',
	},
	{
		name: 'f11',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: 'f11',
						},
					],
				},
			},
		},
		icon: 'mdi:keyboard-f11',
	},
	{
		name: 'f12',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Press',
				extras: {
					Values: [
						{
							Value: 'f12',
						},
					],
				},
			},
		},
		icon: 'mdi:keyboard-f12',
	},
	{
		name: 'dock-top',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Stroke',
				extras: {
					Values: [
						{
							Value: 'lwin',
						},
						{
							Value: 'up',
						},
					],
				},
			},
		},
		icon: 'mdi:dock-top',
	},
	{
		name: 'dock-bottom',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Stroke',
				extras: {
					Values: [
						{
							Value: 'lwin',
						},
						{
							Value: 'down',
						},
					],
				},
			},
		},
		icon: 'mdi:dock-bottom',
	},
	{
		name: 'dock-left',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Stroke',
				extras: {
					Values: [
						{
							Value: 'lwin',
						},
						{
							Value: 'left',
						},
					],
				},
			},
		},
		icon: 'mdi:dock-left',
	},
	{
		name: 'dock-right',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'Stroke',
				extras: {
					Values: [
						{
							Value: 'lwin',
						},
						{
							Value: 'right',
						},
					],
				},
			},
		},
		icon: 'mdi:dock-right',
	},
	{
		name: 'zoom_in',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'ZoomIn',
			},
		},
		icon: 'mdi:magnify-plus',
	},
	{
		name: 'zoom_out',
		tap_action: {
			action: 'perform-action',
			perform_action: 'unified_remote.call',
			data: {
				remote_id: 'Core.Input',
				action: 'ZoomOut',
			},
		},
		icon: 'mdi:magnify-minus',
	},
];
