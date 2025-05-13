import { IElementConfig } from '../../interfaces';
import { androidTVDefaultKeys } from '../android_tv';

/**
 * Copied from Android TV map to simplify configuration.
 */
export const genericIRRFDefaultKeys: IElementConfig[] = androidTVDefaultKeys.filter(
    (key) =>
        key.tap_action === undefined || key.tap_action.action === 'key'
);
