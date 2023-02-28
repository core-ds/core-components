export const calculatePaddingWidth = (element: HTMLElement) => {
    const { paddingLeft, paddingRight } = getComputedStyle(element);
    return parseInt(paddingLeft, 10) + parseInt(paddingRight, 10);
};
