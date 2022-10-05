import React, { FC, ReactNode, useContext, useEffect } from 'react';
import cn from 'classnames';

import { BaseModalContext } from '@alfalab/core-components-base-modal';
import { Typography } from '@alfalab/core-components-typography';

import { getDataTestId } from '../../../../utils/getDataTestId';
import { BottomSheetTitleAlign, HEADER_OFFSET } from '../..';
import { Backer } from '../backer/Component';
import { Closer } from '../closer/Component';

import styles from './index.module.css';

export type HeaderProps = {
    /**
     * Заголовок
     */
    title?: ReactNode;

    /**
     * Дополнительный класс
     */
    headerClassName?: string;

    /**
     * Дополнительный класс для аддонов
     */
    addonClassName?: string;

    /**
     * Дополнительный класс для компонента крестика
     */
    closerClassName?: string;

    /**
     * Дополнительный класс для компонента стрелки назад
     */
    backerClassName?: string;

    /**
     * Слот слева
     */
    leftAddons?: ReactNode;

    /**
     * Слот справа
     */
    rightAddons?: ReactNode;

    /**
     * Слот снизу
     */
    bottomAddons?: ReactNode;

    /**
     * Наличие компонента крестика
     */
    hasCloser?: boolean;

    /**
     * Наличие компонента стрелки назад
     */
    hasBacker?: boolean;

    /**
     * Выравнивание заголовка
     */
    titleAlign?: BottomSheetTitleAlign;

    /**
     * Будет ли обрезан заголовок
     */
    trimTitle?: boolean;

    /**
     * Фиксирует шапку
     */
    sticky?: boolean;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Обработчик нажатия на стрелку назад
     */
    onBack?: () => void;
};

export const Header: FC<HeaderProps> = ({
    title,
    headerClassName,
    addonClassName,
    closerClassName,
    backerClassName,
    leftAddons,
    rightAddons,
    bottomAddons,
    hasCloser,
    hasBacker,
    titleAlign,
    trimTitle,
    sticky,
    dataTestId,
    onBack,
}) => {
    const { headerHighlighted, setHasHeader, setHeaderOffset } = useContext(BaseModalContext);

    const hasLeftPart = hasBacker || leftAddons || titleAlign === 'center';
    const hasRightPart = hasCloser || rightAddons || titleAlign === 'center';
    const hasHeaderContent = title || hasBacker || hasCloser;

    useEffect(() => {
        setHasHeader(true);
    }, [setHasHeader]);

    useEffect(() => {
        setHeaderOffset(HEADER_OFFSET);
    }, [setHeaderOffset]);

    const getTitleIndent = (): string => {
        const titleAlignedCenter = titleAlign === 'center';
        const hasLeftPart = hasBacker || leftAddons;
        const hasRightPart = hasCloser || rightAddons;

        return cn({
            [styles.titleBigIndentHorizontal]:
                !sticky && titleAlignedCenter && (hasLeftPart || hasRightPart),
            [styles.titleIndentLeft]: !sticky && !titleAlignedCenter && hasLeftPart,
            [styles.titleIndentRight]: !sticky && !titleAlignedCenter && hasRightPart,
        });
    };

    return (
        <div
            className={cn(styles.headerWrapper, headerClassName, {
                [styles.highlighted]: headerHighlighted && sticky,
                [styles.sticky]: sticky,
            })}
            data-test-id={getDataTestId(dataTestId)}
        >
            <div
                className={cn(styles.header, headerClassName, {
                    [styles.justifyEnd]: !title,
                })}
            >
                {hasLeftPart && (
                    <div
                        className={cn(styles.addon, addonClassName, {
                            [styles.addonFixed]: !sticky,
                            [styles.addonLeft]: !sticky,
                        })}
                    >
                        {hasBacker ? (
                            <Backer
                                className={backerClassName}
                                onClick={onBack}
                                dataTestId={getDataTestId(dataTestId, 'backer')}
                            />
                        ) : (
                            leftAddons
                        )}
                    </div>
                )}

                {hasHeaderContent && (
                    <Typography.Text
                        view='primary-large'
                        weight='bold'
                        className={cn(styles.title, getTitleIndent(), {
                            [styles.titleCenter]: titleAlign === 'center',
                            [styles.titleLeft]: titleAlign === 'left',
                            [styles.trimTitle]: trimTitle,
                        })}
                        color='primary'
                        dataTestId={getDataTestId(dataTestId, 'title')}
                    >
                        {title}
                    </Typography.Text>
                )}

                {hasRightPart && (
                    <div
                        className={cn(styles.addon, addonClassName, {
                            [styles.addonFixed]: !sticky,
                            [styles.addonRight]: !sticky,
                        })}
                    >
                        {hasCloser ? (
                            <Closer
                                className={closerClassName}
                                dataTestId={getDataTestId(dataTestId, 'closer')}
                            />
                        ) : (
                            rightAddons
                        )}
                    </div>
                )}
            </div>

            {bottomAddons}
        </div>
    );
};
