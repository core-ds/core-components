import React, { ElementType, ReactNode, useMemo } from 'react';
import cn from 'classnames';

import { Typography } from '@alfalab/core-components-typography';

import {
    SIZE_TO_CLASSNAME_MAP,
    SIZES,
    STROKE,
    TYPOGRAPHY_COLOR,
    VIEW_TEXT,
    VIEW_TITLE,
} from './consts';

import styles from './index.module.css';

export type TypographyColor = 'primary' | 'secondary' | 'tertiary' | 'positive' | 'negative';

export type CircularProgressBarProps = {
    /**
     * Уровень прогресса, %
     */
    value: number;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Основной текст
     */
    title?: ReactNode;

    /**
     * Цвет контента
     */
    contentColor?: TypographyColor | string;

    /**
     * Дополнительный текст
     */
    subtitle?: ReactNode;

    /**
     * Основной текст при 100%
     */
    titleComplete?: ReactNode;

    /**
     * Дополнительный текст при 100%
     */
    subtitleComplete?: ReactNode;

    /**
     * Цвет заполнения
     */
    view?: 'positive' | 'negative';

    /**
     * Размер (xxl — 144×144px, xl — 128×128px, l — 80×80px, m — 64×64px, s — 48×48px, xs — 24×24px)
     * @description xs, s, m, l, xl, xxl deprecated, используйте вместо них 24, 48, 64 , 80, 128, 144 соответственно
     */
    size?: 'xxl' | 'xl' | 'l' | 'm' | 's' | 'xs' | 24 | 48 | 64 | 80 | 128 | 144;

    /**
     * Наличие желоба
     */
    stroke?: boolean;

    /**
     * Заливка при 100%
     */
    fillComplete?: boolean;

    /**
     * Цвет текста при 100%
     */
    completeTextColor?: 'primary' | 'primary-inverted' | 'positive' | 'negative';

    /**
     * Цвет иконки при 100%
     */
    completeIconColor?: 'primary-inverted' | 'positive' | 'negative' | 'tertiary';

    /**
     * Компонент иконки
     */
    icon?: ElementType<{ className?: string }>;

    /**
     * Компонент иконки при 100%
     */
    iconComplete?: ElementType<{ className?: string }>;

    /**
     * Направление прогресса (clockwise - по часовой стрелке, counter-clockwise - против часовой стрелки)
     */
    direction?: 'clockwise' | 'counter-clockwise';

    /**
     * Высота компонента, min = 24; max = 144
     * использовать совместно с size :
     * xxl от 144
     * xl  от 128 до 143
     * l   от 80 до 127
     * m   от 64 до 79
     * s   от 48 до 63
     * xs  от 24 до 47
     */
    height?: number;

    /**
     * Id компонента для тестов
     */
    dataTestId?: string;

    /**
     * Дочерние элементы
     */
    children?: ReactNode;

    /**
     * Цвет прогресса
     */
    progressStrokeColor?: string;

    /**
     * Цвет заливки внутри круга
     */
    circleColor?: string;

    /**
     * Цвет желоба
     */
    strokeColor?: string;
};

/**
 * Компонент круглого прогресс бара.
 */
export const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
    value,
    view = 'positive',
    size = 64,
    className,
    dataTestId,
    title = value ? value.toString() : '0',
    titleComplete,
    subtitle,
    contentColor = 'secondary',
    subtitleComplete,
    stroke = true,
    fillComplete,
    icon: Icon,
    iconComplete: IconComplete,
    completeTextColor,
    completeIconColor = 'tertiary',
    direction = 'clockwise',
    height,
    children,
    progressStrokeColor,
    circleColor,
    strokeColor,
}) => {
    const memorized = useMemo(() => {
        const strokeWidth = STROKE[size];
        const maxProgress = 100;
        const minProgress = 0;
        const widthSVG = SIZES[size];
        const heightSVG = SIZES[size];
        const center = widthSVG / 2;
        const radius = center - strokeWidth / 2;
        const circumference = Math.PI * radius * 2;
        const progress = Math.min(Math.max(value, minProgress), maxProgress);
        const strokeDasharray = circumference.toFixed(3);
        const strokeDashoffset = (((100 - progress) / 100) * circumference).toFixed(3);

        return {
            widthSVG,
            heightSVG,
            center,
            radius,
            strokeDasharray,
            strokeDashoffset,
        };
    }, [value, size]);

    const isComplete = value === 100;
    const isCompleteTextColor = isComplete && completeTextColor;
    const titleContent = titleComplete && isComplete ? titleComplete : title;
    const subtitleContent = subtitleComplete && isComplete ? subtitleComplete : subtitle;
    const IconComponent = IconComplete && isComplete ? IconComplete : Icon;
    const typographyContentColor = TYPOGRAPHY_COLOR.includes(contentColor)
        ? (contentColor as TypographyColor)
        : undefined;

    const renderTitleString = () =>
        SIZES[size] > 64 ? (
            <Typography.TitleMobile
                className={cn(styles.typography, styles.title)}
                color={isCompleteTextColor ? completeTextColor : typographyContentColor}
                tag='div'
                font='system'
                view={VIEW_TITLE[size]}
                style={{
                    ...(!typographyContentColor && { color: contentColor }),
                }}
            >
                {titleContent}
            </Typography.TitleMobile>
        ) : (
            <Typography.Text
                className={styles.title}
                color={isCompleteTextColor ? completeTextColor : typographyContentColor}
                tag='div'
                weight='bold'
                view={VIEW_TEXT[size]}
                style={{
                    ...(!typographyContentColor && { color: contentColor }),
                }}
            >
                {titleContent}
            </Typography.Text>
        );

    const renderTitle = () => (typeof title === 'string' ? renderTitleString() : titleContent);

    const renderSubTitle = () =>
        typeof subtitle === 'string' ? (
            <Typography.Text
                tag='div'
                className={styles.subtitle}
                color={isCompleteTextColor ? completeTextColor : typographyContentColor}
                view='primary-small'
                style={{
                    ...(!typographyContentColor && { color: contentColor }),
                }}
            >
                {subtitleContent}
            </Typography.Text>
        ) : (
            subtitleContent
        );

    const renderIcon = () => (
        <span
            className={cn(
                styles.iconWrapper,
                styles[SIZE_TO_CLASSNAME_MAP[size]],
                styles.tertiary,
                styles[`icon-${contentColor}`],
                {
                    [styles[`icon-${completeIconColor}`]]: completeIconColor,
                },
            )}
        >
            {IconComponent && <IconComponent className={styles.icon} />}
        </span>
    );

    const renderContent = () =>
        Icon || (IconComplete && isComplete) ? (
            renderIcon()
        ) : (
            <React.Fragment>
                {SIZES[size] > 24 && renderTitle()}
                {SIZES[size] > 64 && renderSubTitle()}
            </React.Fragment>
        );

    return (
        <div
            className={cn(styles.component, styles[SIZE_TO_CLASSNAME_MAP[size]], className, {
                [styles[`bg-${view}`]]: fillComplete && isComplete,
            })}
            style={{
                ...(height && { height, width: height }),
                ...(circleColor && { backgroundColor: circleColor }),
            }}
            data-test-id={dataTestId}
        >
            <svg
                viewBox={`0 0 ${memorized.widthSVG} ${memorized.heightSVG}`}
                className={styles.svg}
                xmlns='http://www.w3.org/2000/svg'
            >
                <circle
                    className={cn(styles.backgroundCircle, styles[SIZE_TO_CLASSNAME_MAP[size]], {
                        [styles.stroke]: !stroke,
                    })}
                    style={{
                        ...(strokeColor && stroke && { stroke: strokeColor }),
                    }}
                    cx={memorized.center}
                    cy={memorized.center}
                    r={memorized.radius}
                    strokeWidth={STROKE[size]}
                />
                <circle
                    className={cn(
                        styles.progressCircle,
                        styles[view],
                        styles[SIZE_TO_CLASSNAME_MAP[size]],
                    )}
                    style={{
                        ...(progressStrokeColor && { stroke: progressStrokeColor }),
                    }}
                    cx={memorized.center}
                    cy={memorized.center}
                    r={memorized.radius}
                    strokeWidth={STROKE[size]}
                    strokeDasharray={memorized.strokeDasharray}
                    strokeDashoffset={
                        direction === 'counter-clockwise'
                            ? -memorized.strokeDashoffset
                            : memorized.strokeDashoffset
                    }
                    transform={`rotate(${-90} ${memorized.center} ${memorized.center})`}
                />
            </svg>
            <div
                className={cn(styles.labelWrapper, {
                    [styles.label]: Icon || IconComplete,
                })}
            >
                {children || renderContent()}
            </div>
        </div>
    );
};
