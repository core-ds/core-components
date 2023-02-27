export const calculatePaddingWidth = (element: HTMLElement) => {
    const { paddingLeft, paddingRight} = getComputedStyle(element);
    return parseInt(paddingLeft) + parseInt(paddingRight)
};