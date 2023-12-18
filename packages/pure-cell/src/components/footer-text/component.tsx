import React, { ReactNode, useContext } from 'react';

import { getDataTestId } from '@alfalab/core-components-shared';
import { Color, Typography } from '@alfalab/core-components-typography';

import { PureCellContext } from '../../component';

export type Props = {
    /**
     * Цвет текста
     */
    color?: Color;

    /**
     * Идентификатор для систем автоматизированного тестирования.
     * Используется модификатор -footer-title
     */
    dataTestId?: string;

    /**
     * Дочерние элементы.
     */
    children?: ReactNode;
};

export const FooterText: React.FC<Props> = ({ children, color = 'secondary', dataTestId }) => {
    const pureCellContext = useContext(PureCellContext);

    return (
        <Typography.Text
            view='primary-small'
            color={color}
            data-test-id={getDataTestId(dataTestId || pureCellContext.dataTestId, 'footer-title')}
        >
            {children}
        </Typography.Text>
    );
};
