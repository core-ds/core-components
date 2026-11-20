import React, { type ImgHTMLAttributes, memo, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';

import { useComponentOverrides } from '@alfalab/core-components-config';

import { useInViewRef } from './hooks/use-in-view-ref';

import styles from './index.module.css';

export type ImageProxyMap = Array<{ from: string; to: string }>;

export type ImageProps = {
    /**
     * Источник изображения
     */
    src: string;
    /**
     * Css класс для стилизации
     */
    className?: string;
    /**
     * Загружать изображение только когда оно попадает во viewport.
     * При `true` задайте размер заранее (`width`/`height` или CSS) — иначе при загрузке
     * страница может прыгнуть. Без ленивой загрузки размеры указывать не обязательно.
     */
    inViewOption?: boolean;
    /**
     * Id компонента для тестов
     */
    dataTestId?: string;
    /**
     * Карта проксирующих ресурсов
     */
    proxyMap?: ImageProxyMap;
} & ImgHTMLAttributes<HTMLImageElement>;

/**
 * Компонент изображения с подменой CDN-источников и ленивой загрузкой по viewport.
 *
 * Например:
 * `https://web-test.alfabank.ru/mobile/s3/static/...`
 * → `https://web-test.servicecdn.ru/public/s3/static/...`
 *
 * При ошибке загрузки CDN откатывается на исходный `src`.
 */
export const Image = memo(
    ({ className, dataTestId, src, proxyMap, inViewOption, ...props }: ImageProps) => {
        const componentContext = useComponentOverrides('Image');
        const [imgRef, inView] = useInViewRef({
            inViewOption: inViewOption ?? componentContext?.inViewOption,
        });
        const [cdnFailed, setCdnFailed] = useState(false);

        useEffect(() => {
            setCdnFailed(false);
        }, [src]);

        const proxiedUrl = useMemo(() => {
            const map = proxyMap || componentContext?.proxyMap || [];

            const resourceMap = map.find((resource) => src.includes(resource.from));

            if (resourceMap) {
                return src.replace(resourceMap.from, resourceMap.to);
            }

            return src;
        }, [src, componentContext?.proxyMap, proxyMap]);

        const url = cdnFailed ? src : proxiedUrl;

        const handleError = () => {
            if (!cdnFailed && proxiedUrl !== src) {
                setCdnFailed(true);
            }
        };

        return (
            <img
                alt=''
                {...props}
                src={inView ? url : undefined}
                className={cn(className, {
                    [styles.fullSize]: Boolean(props.style?.objectFit),
                })}
                data-test-id={dataTestId}
                ref={imgRef}
                onError={handleError}
            />
        );
    },
);
