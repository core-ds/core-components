import React from 'react';

import { Typography, Color } from '@alfalab/core-components-typography';
import { getDataTestId } from '../../../../utils/getDataTestId';

export type Props = {
    /**
     * Цвет текста
     */
    color?: Color;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const FooterText: React.FC<Props> = ({ children, color = 'secondary', dataTestId }) => (
    <Typography.Text
        view='primary-small'
        color={color}
        data-test-id={getDataTestId(dataTestId, 'footer-title')}
    >
        {children}
    </Typography.Text>
);
