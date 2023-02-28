export const calculatePaddingWidth = (element: HTMLElement) => {
    const { paddingLeft, paddingRight } = getComputedStyle(element);
    const result = parseInt(paddingLeft, 10) + parseInt(paddingRight, 10);
    if (Number.isNaN(result)) {
        return 0;
    }
    return result;
};
