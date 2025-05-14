import React, { isValidElement, ReactNode } from 'react';
import cn from 'classnames';

import { LoadingStatus, useIcon } from './hooks/use-icon';
import { isFallbackObject, TFallbackObject } from './utils';

import styles from './index.module.css';

type CDNIconProps = {
    /**
     * Имя иконки
     */
    name: string;
    /**
     * Цвет иконки
     */
    color?: string;
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Базовый адрес cdn хранилища c иконками
     * @default https://alfabank.servicecdn.ru/icons
     */
    baseUrl?: string;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Fallback на случай, если не удастся загрузить иконку
     */
    fallback?: ReactNode | TFallbackObject;
};

export const CDNIcon: React.FC<CDNIconProps> = ({
    name,
    color,
    dataTestId,
    className,
    baseUrl = 'https://alfabank.servicecdn.ru/icons',
    fallback,
}) => {
    const [icon, status] = useIcon(`${baseUrl}/${name}.svg`);
    let fallbackNode: ReactNode = null;

    const isMonoIcon = !name.includes('_color');

    if (status === LoadingStatus.FAILURE && fallback) {
        if (isValidElement(fallback)) {
            fallbackNode = fallback;
        } else if (isFallbackObject(fallback)) {
            fallback?.onError?.();
        }
    }

    return (
        <span
            style={{ color }}
            className={cn('cc-cdn-icon', styles.component, className, {
                [styles.parentColor]: isMonoIcon,
            })}
            data-test-id={dataTestId}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                status === LoadingStatus.SUCCESS ? { __html: icon! } : undefined
            }
        >
            {fallbackNode}
        </span>
    );
};
