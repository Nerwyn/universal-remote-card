import { IElementConfig } from '../../interfaces';

/**
 * https://www.home-assistant.io/integrations/denonavr/#action-denonavrget_command
 */
export const denonAVRDefaultKeys: IElementConfig[] = [
	{
		type: 'button',
		name: '',
		tap_action: { action: 'key', key: '' },
		icon: '',
	},
];
