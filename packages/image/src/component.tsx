import React, { type ImgHTMLAttributes, Suspense, useMemo, useRef } from 'react';
import cn from 'classnames';

import { useComponentOverrides } from '@alfalab/core-config';

import { useInViewRef } from './hooks/use-in-view-ref';

import styles from './index.module.css';

const LazyImageCdnIntegration = React.lazy(() => import('./components/dev-component'));

export type ImageProxyMap = Array<{ from: string; to: string }>;

// FOR TEST
const prodResourcesMap: ImageProxyMap = [
    {
        from: 'https://web.alfabank.ru/mobile',
        to: 'https://alfaonline.servicecdn.ru/public',
    },
];
// FOR TEST
const devResourcesMap: ImageProxyMap = [
    {
        from: 'https://web-test.alfabank.ru/mobile',
        to: 'https://web-test.servicecdn.ru/public',
    },
    {
        from: 'https://web.alfabank.ru/mobile',
        to: 'https://alfaonline.servicecdn.ru/public',
    },
];

export type ImageProps = {
    /** Источник изображения */
    src: string;
    /** Сss класс для стилизации общей обёртки */
    className?: string;
    /** Id компонента для тестов */
    dataTestId?: string;
    /** Мапа проксирующих ресурсов */
    proxyMap?: ImageProxyMap;
    // Настройки overlay с предупреждением, что картинка слишком большая
    warning?: {
        // Сообщение в overlay
        message?: string;
        // Ссылка на доку
        url?: string;
    };

    quality?: number;
} & ImgHTMLAttributes<unknown>;

/**
 * Компонент, который проксирует картинки из источников
 * Также смотрящий за viewPort пользователя, загружая то что видит человек
 *
 * Например из https://web-test.alfabank.ru/mobile/s3/static/loyalty/services/travel_300x300.png => https://web-test.servicecdn.ru/public/s3/static/loyalty/services/travel_300x300.png
 *
 * [Макет]()
 */
export const Image = ({ className, dataTestId, src, proxyMap, warning, ...props }: ImageProps) => {
    // BLA BLA replace by new IntersectionObserver native api
    const [imgRef, inView] = useInViewRef();
    const loaded = useRef(false);

    const componentContext = useComponentOverrides<ImageProps>('Image');

    const url = useMemo(() => {
        const map = proxyMap || componentContext?.proxyMap || [];

        const resourseMap = map.find((resourse) => src.includes(resourse.from));

        if (resourseMap) {
            return src.replace(resourseMap.from, resourseMap.to);
        }

        return src;
    }, [src, componentContext?.proxyMap, proxyMap]);

    const imgCom = (
        <img
            alt=''
            {...props}
            src={inView || loaded.current ? url : undefined}
            className={cn(className, {
                [styles.fullSize]: Boolean(props.style?.objectFit),
            })}
            data-test-id={dataTestId}
            onLoad={(e) => {
                if (props.onLoad) {
                    props.onLoad(e);
                }

                loaded.current = true;
            }}
            ref={imgRef.current}
        />
    );

    const warningOptions = warning || componentContext?.warning;

    if (!warningOptions) {
        return imgCom;
    }

    return (
        <div
            className={cn(styles.imgWrapper, {
                [styles.fullSize]: Boolean(props.style?.objectFit),
            })}
        >
            {imgCom}

            {(inView || loaded.current) && (
                <Suspense fallback=''>
                    <LazyImageCdnIntegration src={url} warning={warning} />
                </Suspense>
            )}
        </div>
    );
};
