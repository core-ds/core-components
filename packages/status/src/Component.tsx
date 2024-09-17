import React, { FC, ReactNode } from 'react';
import cn from 'classnames';

import { colors, sizes } from './consts';

import styles from './index.module.css';

export type StatusProps = {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     *  Вид компонента
     * @description soft deprecated, используйте вместо него muted-alt
     */
    view?: 'contrast' | 'soft' | 'muted' | 'muted-alt';

    /**
     * Цветовое оформление иконки
     */
    color?: (typeof colors)[number];

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Дочерние элементы.
     */
    children?: ReactNode;

    /**
     * Размер компонента
     * @default 20
     */
    size?: (typeof sizes)[number];

    /**
     * Форма компонента
     * @default rectangular
     */
    shape?: 'rounded' | 'rectangular';

    /**
     * Текст компонента в верхнем регистре
     * @default true
     */
    uppercase?: boolean;
};

const logWarning = () => {
    if (process.env.NODE_ENV !== 'development') {
        return;
    }

    // eslint-disable-next-line no-console
    console.warn(
        // eslint-disable-next-line prefer-template
        '@alfalab/core-components/status: view=soft будет удален в следующих мажорных версиях. ' +
            'Используйте view=muted-alt. Чтобы изменить view=soft на view=muted-alt, можно воспользоваться codemod: ' +
            'npx @alfalab/core-components-codemod --transformers=status-soft src/**/*.tsx',
    );
};

export const Status: FC<StatusProps> = ({
    className,
    view = 'muted-alt',
    color = 'green',
    children,
    dataTestId,
    size = 20,
    shape = 'rectangular',
    uppercase = true,
}) => {
    if (view === 'soft') {
        logWarning();
    }

    return (
        <span
            className={cn(
                styles.component,
                styles[color],
                styles[view],
                styles[`size-${size}`],
                styles[shape],
                className,
                {
                    [styles.uppercase]: uppercase,
                },
            )}
            data-test-id={dataTestId}
        >
            <span className={styles.ellipsis}>{children}</span>
        </span>
    );
};
