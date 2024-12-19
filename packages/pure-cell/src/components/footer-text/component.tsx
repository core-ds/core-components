import React, { ReactNode, useContext } from 'react';

import { getDataTestId } from '@alfalab/core-components-shared';
import { type Color, Text } from '@alfalab/core-components-typography';

import { PureCellContext } from '../../component';

export type FooterTextProps = {
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

export const FooterText: React.FC<FooterTextProps> = ({
    children,
    color = 'secondary',
    dataTestId,
}) => {
    const pureCellContext = useContext(PureCellContext);

    return (
        <Text
            view='primary-small'
            color={color}
            data-test-id={getDataTestId(dataTestId || pureCellContext.dataTestId, 'footer-title')}
        >
            {children}
        </Text>
    );
};
