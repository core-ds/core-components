import React, { type ImgHTMLAttributes, Suspense, useMemo, useRef } from 'react';
import cn from 'classnames';
import { useInViewRef } from 'rooks';

import styles from './index.module.css';

const LazyImageCdnIntegration = React.lazy(() => import('./components/dev-component'));

const prodResourcesMap = [
    {
        from: 'https://web.alfabank.ru/mobile',
        to: 'https://alfaonline.servicecdn.ru/public',
    },
];
const devResourcesMap = [
    {
        from: 'https://web-test.alfabank.ru/mobile',
        to: 'https://web-test.servicecdn.ru/public',
    },
    {
        from: 'https://web.alfabank.ru/mobile',
        to: 'https://alfaonline.servicecdn.ru/public',
    },
];

export type ImageCdnProps = {
    /** Сss класс для стилизации общей обёртки */
    className?: string;
    /** Id компонента для тестов */
    dataTestId?: string;
    /** Источник изображения */
    // https://web-test.alfabank.ru/mobile/s3/static/loyalty/services/travel_300x300.png
    src: string;

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
export const Image = ({ className, dataTestId, src, ...props }: ImageCdnProps) => {
    const [myRef, inView] = useInViewRef(() => {}, { threshold: 0.2 });
    const loaded = useRef(false);

    const production = process.env.NODE_ENV === 'production';

    const url = useMemo(() => {
        const map = production ? prodResourcesMap : devResourcesMap;

        const resourseMap = map.find((resourse) => src.includes(resourse.from));

        if (resourseMap) {
            return src.replace(resourseMap.from, resourseMap.to);
        }

        return src;
    }, [production, src]);

    const imgCom = (
        <img
            alt=''
            {...props}
            src={inView || loaded.current ? url : undefined}
            className={cn(className, {
                [styles.fullSize]: Boolean(props.style?.objectFit),
            })}
            data-test-id={dataTestId}
            onLoad={() => {
                loaded.current = true;
            }}
            ref={myRef}
        />
    );

    if (production) {
        return imgCom;
    }

    return (
        <div
            className={cn(styles.imgWrapper, {
                [styles.fullSize]: Boolean(props.style?.objectFit),
            })}
        >
            {imgCom}

            {!production && (inView || loaded.current) && (
                <Suspense fallback=''>
                    <LazyImageCdnIntegration src={url} />
                </Suspense>
            )}
        </div>
    );
};
