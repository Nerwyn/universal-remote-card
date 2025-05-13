import { IElementConfig } from '../../interfaces';
import { androidTVDefaultSources } from '../android_tv';

/**
 * Copied from Android TV map to simplify configuration.
 */
export const genericIRRFDefaultSources: IElementConfig[] = androidTVDefaultSources.map(
    (key) => ({
        ...key,
        tap_action: {
            action: 'key',
            key: `SOURCE_${key.name.toUpperCase()}`,
        },
    })
)
