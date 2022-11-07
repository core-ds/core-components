import React, { ReactNode } from 'react';

import { Color, Typography } from '@alfalab/core-components-typography';

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

    /**
     * Дочерние элементы.
     */
    children?: ReactNode;
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
