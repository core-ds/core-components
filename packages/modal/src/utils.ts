import { getDataTestId } from '@alfalab/core-components-shared';

import { type ModalResponsiveProps } from './typings';

export function getModalTestIds(dataTestId: string) {
    return {
        modal: dataTestId,
        content: getDataTestId(dataTestId, 'content'),
        footer: getDataTestId(dataTestId, 'footer'),
        controls: getDataTestId(dataTestId, 'controls'),
        header: getDataTestId(dataTestId, 'header'),
        title: getDataTestId(dataTestId, 'header-title'),
        closer: getDataTestId(dataTestId, 'header-closer'),
        backButton: getDataTestId(dataTestId, 'header-back-button'),
    };
}

export const getSizeStyle = (size: ModalResponsiveProps['size']) => {
    if (size === 'fullscreen') {
        return size;
    }

    return `size-${size}`;
};
