/* eslint-disable no-console */
let warnings: Set<string> | null;

if (process.env.NODE_ENV === 'development') {
    warnings = new Set();
}

export function devWarning(message: string) {
    if (!(process.env.NODE_ENV === 'development') || warnings?.has(message)) return;
    console.warn(message);
}
