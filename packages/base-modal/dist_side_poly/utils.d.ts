declare function isScrolledToTop(target: HTMLElement): boolean;
declare function isScrolledToBottom(target: HTMLElement): boolean;
declare function hasScrollbar(target: HTMLElement): boolean;
declare const restoreContainerStyles: (container: HTMLElement) => void;
declare const handleContainer: (container?: HTMLElement, shouldIOSLock?: boolean) => void;
export { isScrolledToTop, isScrolledToBottom, hasScrollbar, restoreContainerStyles, handleContainer };
