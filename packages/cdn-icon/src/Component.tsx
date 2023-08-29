import React, { ReactNode, useEffect, useState } from 'react';
import cn from 'classnames';

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
    fallback?: ReactNode;
};

enum LoadingStatus {
    INITIAL,
    SUCCESS,
    FAILURE,
}

export const CDNIcon: React.FC<CDNIconProps> = ({
    name,
    color,
    dataTestId,
    className,
    baseUrl = 'https://alfabank.servicecdn.ru/icons',
    fallback,
}) => {
    const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>(LoadingStatus.INITIAL);
    const [icon, setIcon] = useState('');

    const monoIcon = !name.includes('_color');

    useEffect(() => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', `${baseUrl}/${name}.svg`);
        xhr.send();
        xhr.onload = function onload() {
            const svg = xhr.response;

            if (svg.startsWith('<svg')) {
                setLoadingStatus(LoadingStatus.SUCCESS);
                setIcon(svg);
            }
        };

        xhr.onerror = function onError() {
            setLoadingStatus(LoadingStatus.FAILURE);
        };

        return () => xhr.abort();
    }, [name, baseUrl]);

    return (
        <span
            style={{ color }}
            className={cn(styles.component, className, { [styles.parentColor]: monoIcon })}
            data-test-id={dataTestId}
            {...(loadingStatus === LoadingStatus.FAILURE
                ? { children: fallback }
                : { dangerouslySetInnerHTML: { __html: icon } })}
        />
    );
};
