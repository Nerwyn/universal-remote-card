export const unifiedRemoteDefaultKeys = [
    {
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
        name: 'numpad',
        icon: 'mdi:dialpad',
    },
    {
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
        type: 'button',
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
