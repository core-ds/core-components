import React, { type FC, type ReactNode } from 'react';
import cn from 'classnames';

import { type COLORS, type SIZES } from './consts';

import styles from './index.module.css';

export type StatusProps = {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Вид компонента
     * @default muted-alt
     * @description soft deprecated, используйте вместо него muted-alt
     */
    view?: 'contrast' | 'soft' | 'muted' | 'muted-alt';

    /**
     * Цветовое оформление компонента
     * @default green
     */
    color?: (typeof COLORS)[number];

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
    size?: (typeof SIZES)[number];

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

    /**
     * Слот слева
     */
    leftAddons?: ReactNode;
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
    leftAddons,
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
                    [styles.withLeftAddons]: leftAddons,
                },
            )}
            data-test-id={dataTestId}
        >
            {leftAddons && <span className={styles.leftAddons}>{leftAddons}</span>}
            <span className={styles.ellipsis}>{children}</span>
        </span>
    );
};
