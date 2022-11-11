import React, { FC, ReactNode, useContext, useEffect } from 'react';
import cn from 'classnames';

import { CrossMIcon } from '@alfalab/icons-glyph/CrossMIcon';

import { getDataTestId } from '../../../../utils';
import { ModalContext } from '../../Context';
import { ResponsiveContext } from '../../ResponsiveContext';
import { Closer } from '../closer/Component';

import desktopStyles from './desktop.module.css';
import styles from './index.module.css';
import mobileStyles from './mobile.module.css';

export type HeaderProps = {
    /**
     * Контент шапки
     */
    children?: ReactNode;

    /**
     * Слот слева
     */
    leftAddons?: ReactNode;

    /**
     * Наличие компонента крестика
     */
    hasCloser?: ReactNode;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительный класс для аддонов
     */
    addonClassName?: string;

    /**
     * Дополнительный класс для контента
     */
    contentClassName?: string;

    /**
     * Заголовок шапки
     */
    title?: string;

    /**
     * Выравнивание заголовка
     */
    align?: 'left' | 'center';

    /**
     * Обрезать ли заголовок
     */
    trim?: boolean;

    /**
     * Фиксирует шапку
     */
    sticky?: boolean;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const Header: FC<HeaderProps> = ({
    className,
    addonClassName,
    contentClassName,
    leftAddons,
    children,
    align = 'left',
    trim = true,
    title,
    hasCloser = true,
    sticky,
    dataTestId,
}) => {
    const { headerHighlighted, setHasHeader } = useContext(ModalContext);
    const { size, view } = useContext(ResponsiveContext);

    const hasContent = title || Boolean(children);

    useEffect(() => {
        setHasHeader(true);
    }, [setHasHeader]);

    return (
        <div
            className={cn(styles.header, className, {
                [styles.highlighted]: hasContent && sticky && headerHighlighted,
                [styles.sticky]: sticky,
                [styles.hasContent]: hasContent,
                [desktopStyles.header]: view === 'desktop',
                [desktopStyles.hasContent]: view === 'desktop' && hasContent,
                [desktopStyles.sticky]: view === 'desktop' && sticky,
                [desktopStyles[size]]: view === 'desktop',
                [mobileStyles.sticky]: view === 'mobile' && sticky,
            })}
            data-test-id={getDataTestId(dataTestId)}
        >
            {(leftAddons || view === 'desktop') && (
                <div className={cn(styles.addon, addonClassName)}>{leftAddons}</div>
            )}

            {hasContent && (
                <div
                    className={cn(styles.content, contentClassName, styles[align], {
                        [styles.trim]: trim,
                        [desktopStyles.content]: view === 'desktop',
                        [mobileStyles.content]: view === 'mobile',
                    })}
                >
                    {children}
                    {title && (
                        <div
                            className={styles.title}
                            data-test-id={getDataTestId(dataTestId, 'title')}
                        >
                            {title}
                        </div>
                    )}
                </div>
            )}

            {hasCloser && (
                <div className={cn(styles.addon, styles.closer, addonClassName)}>
                    {view === 'desktop' ? (
                        <Closer dataTestId={getDataTestId(dataTestId, 'closer')} />
                    ) : (
                        <Closer
                            icon={CrossMIcon}
                            size='xs'
                            dataTestId={getDataTestId(dataTestId, 'closer')}
                        />
                    )}
                </div>
            )}
        </div>
    );
};
