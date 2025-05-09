export function getDeepKeys(obj) {
    let keys = [];
    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            const subkeys = getDeepKeys(obj[key]);
            keys = keys.concat(subkeys.map((subkey) => key + '.' + subkey));
        }
        else {
            keys.push(key);
        }
    }
    return keys;
}
export function deepGet(obj, key) {
    const keys = key.split('.');
    if (obj == undefined) {
        return undefined;
    }
    if (keys.length == 1) {
        return obj[keys[0]];
    }
    return deepGet(obj[keys[0]], keys.splice(1).join('.'));
}
export function deepSet(obj, key, value) {
    const keys = key.split('.');
    if (keys.length == 1) {
        obj[keys[0]] = value;
    }
    else {
        if (!(keys[0] in obj) ||
            !(typeof obj[keys[0]] == 'object')) {
            if (/^-?\d+$/.test(keys[1])) {
                obj[keys[0]] = new Array(parseInt(keys[1]));
            }
            else {
                obj[keys[0]] = {};
            }
        }
        deepSet(obj[keys[0]], keys.splice(1).join('.'), value);
    }
    return obj;
}
export function mergeDeep(target, ...sources) {
    function isObject(item) {
        return item && typeof item === 'object' && !Array.isArray(item);
    }
    if (!sources.length) {
        return target;
    }
    const source = sources.shift();
    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key])
                    Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            }
            else {
                Object.assign(target, {
                    [key]: source[key],
                });
            }
        }
    }
    return mergeDeep(target, ...sources);
}
