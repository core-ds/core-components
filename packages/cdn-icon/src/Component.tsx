import React, { type ReactNode, useEffect } from 'react';
import cn from 'classnames';

import { LoadingStatus, useIcon } from './hooks/use-icon';

import styles from './index.module.css';

interface CDNIconProps {
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
    fallback?: ReactNode;
    /**
     * Callback, вызываемый при ошибке загрузки иконки
     */
    onError?: () => void;
}

export const CDNIcon: React.FC<CDNIconProps> = ({
    name,
    color,
    dataTestId,
    className,
    baseUrl = 'https://alfabank.servicecdn.ru/icons',
    fallback,
    onError,
}) => {
    const [icon, status] = useIcon(name, baseUrl);
    const isMonoIcon = !name.includes('_color');

    const hasError = status === LoadingStatus.FAILURE || status === LoadingStatus.INVALID;

    useEffect(() => {
        if (hasError) {
            onError?.();
        }
    }, [onError, hasError]);

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
            {hasError ? fallback : undefined}
        </span>
    );
};
