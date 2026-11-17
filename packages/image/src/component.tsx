import React, { type ImgHTMLAttributes, memo, useMemo } from 'react';
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
     * Загружать изображение только когда оно попадает во viewport
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
 */
export const Image = memo(
    ({ className, dataTestId, src, proxyMap, inViewOption, ...props }: ImageProps) => {
        const componentContext = useComponentOverrides('Image');
        const [imgRef, inView] = useInViewRef({
            inViewOption: inViewOption ?? componentContext?.inViewOption,
        });

        const url = useMemo(() => {
            const map = proxyMap || componentContext?.proxyMap || [];

            const resourceMap = map.find((resource) => src.includes(resource.from));

            if (resourceMap) {
                return src.replace(resourceMap.from, resourceMap.to);
            }

            return src;
        }, [src, componentContext?.proxyMap, proxyMap]);

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
            />
        );
    },
);
