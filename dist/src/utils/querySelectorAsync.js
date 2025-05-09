export async function querySelectorAsync(parent, selector, timeout = 60000) {
    return new Promise((resolve, reject) => {
        const element = parent.querySelector(selector);
        if (element) {
            resolve(element);
        }
        const rejectTimeout = setTimeout(() => reject(`Timeout waiting for ${selector} in ${parent} after ${timeout}ms.`), timeout);
        const observer = new MutationObserver(() => {
            const element = parent.querySelector(selector);
            if (element) {
                clearTimeout(rejectTimeout);
                observer.disconnect();
                resolve(element);
            }
        });
        observer.observe(parent, { childList: true, subtree: true });
    });
}
