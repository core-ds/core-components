import { isIOS } from '../os';

function canProgrammaticallyFocus() {
    return !isIOS();
}

export function mergeAutoFocus(autoFocus?: boolean) {
    return Boolean(autoFocus) && canProgrammaticallyFocus();
}

export function programmaticFocus(
    element: HTMLInputElement | HTMLTextAreaElement | null | undefined,
    options?: FocusOptions,
) {
    if (canProgrammaticallyFocus()) {
        element?.focus(options);
    }
}
