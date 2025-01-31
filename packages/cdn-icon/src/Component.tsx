import React, { ReactNode, useEffect, useRef, useState } from 'react';
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

// Кэшируем загруженные иконки, чтобы предотвратить их повторную загрузку при каждом монтировании
const cache: Record<string, string> = {};

export const CDNIcon: React.FC<CDNIconProps> = ({
    name,
    color,
    dataTestId,
    className,
    baseUrl = 'https://alfabank.servicecdn.ru/icons',
    fallback,
}) => {
    const url = `${baseUrl}/${name}.svg`;

    const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>(LoadingStatus.INITIAL);
    const [icon, setIcon] = useState(cache[url]);
    const prevIconName = useRef(name);

    const monoIcon = !name.includes('_color');

    useEffect(() => {
        if (cache[url]) {
            if (prevIconName.current !== name) {
                setIcon(cache[url]);
            }

            return undefined;
        }

        const xhr = new XMLHttpRequest();

        xhr.open('GET', url);
        xhr.send();
        xhr.onload = function onload() {
            setLoadingStatus(LoadingStatus.SUCCESS);
            const svg = xhr.response;

            if (svg.startsWith('<svg')) {
                cache[url] = svg;

                setIcon(svg);
            }
        };

        xhr.onerror = function onError() {
            setLoadingStatus(LoadingStatus.FAILURE);
        };

        return () => xhr.abort();
    }, [url, icon, name]);

    return (
        <span
            style={{ color }}
            className={cn('cc-cdn-icon', styles.component, className, {
                [styles.parentColor]: monoIcon,
            })}
            data-test-id={dataTestId}
            {...(loadingStatus === LoadingStatus.FAILURE
                ? { children: fallback }
                : { dangerouslySetInnerHTML: { __html: icon } })}
        />
    );
};
