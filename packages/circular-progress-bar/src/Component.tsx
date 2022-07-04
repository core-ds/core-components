import cn from 'classnames';
import React, { ReactNode, useMemo, ElementType } from 'react';
import { Typography } from '@alfalab/core-components-typography';

import styles from './index.module.css';

const SIZES = {
    xs: 24,
    s: 48,
    m: 64,
    l: 80,
    xl: 128,
    xxl: 144,
};

const STROKE = {
    xs: 4,
    s: 4,
    m: 6,
    l: 8,
    xl: 10,
    xxl: 12,
};

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
     */
    size?: 'xxl' | 'xl' | 'l' | 'm' | 's' | 'xs';

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
    completeTextColor?: 'primary-inverted' | 'positive' | 'negative';

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
     * Направление прогресса (true - справа налево, false - слева направо)
     */
    direction?: 'ClockWise' | 'ClockOtherwise';

    /**
     * Id компонента для тестов
     */
    dataTestId?: string;
};

/**
 * Компонент круглого прогресс бара.
 */
export const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
    value,
    view = 'positive',
    size = 'm',
    className,
    dataTestId,
    title = value.toString(),
    titleComplete,
    subtitle,
    subtitleComplete,
    stroke = true,
    fillComplete,
    icon: Icon,
    iconComplete: IconComplete,
    completeTextColor,
    completeIconColor = 'tertiary',
    direction = 'ClockWise',
    children,
}) => {
    const memorized = useMemo(() => {
        const strokeWidth = STROKE[size];
        const maxProgress = 100;
        const minProgress = 0;
        const width = SIZES[size];
        const height = SIZES[size];
        const center = width / 2;
        const radius = center - strokeWidth / 2;
        const circumference = Math.PI * radius * 2;
        const progress = Math.min(Math.max(value, minProgress), maxProgress);
        const strokeDasharray = circumference.toFixed(3);
        const strokeDashoffset = (((100 - progress) / 100) * circumference).toFixed(3);

        return {
            width,
            height,
            center,
            radius,
            strokeDasharray,
            strokeDashoffset,
        };
    }, [value, size]);

    const isComplete = value === 100;

    const renderTitle = () => {
        /* eslint-disable */
        return (
            <React.Fragment>
                {typeof title === 'string' ? (
                    SIZES[size] > 64 ? (
                        <Typography.TitleMobile
                            className={styles.title}
                            color={isComplete ? completeTextColor : 'secondary'}
                            tag='div'
                            font='system'
                            view={size === 'l' ? 'xsmall' : 'medium'}
                        >
                            {titleComplete && isComplete ? titleComplete : title}
                        </Typography.TitleMobile>
                    ) : (
                        <Typography.Text
                            className={styles.title}
                            color={isComplete ? completeTextColor : 'secondary'}
                            tag='div'
                            weight='bold'
                            view={size === 'm' ? 'secondary-large' : 'secondary-small'}
                        >
                            {titleComplete && isComplete ? titleComplete : title}
                        </Typography.Text>
                    )
                ) : titleComplete && isComplete ? (
                    titleComplete
                ) : (
                    title
                )}
            </React.Fragment>
        );
    };

    const renderSubTitle = () => {
        /* eslint-disable */
        return (
            <React.Fragment>
                {typeof subtitle === 'string' ? (
                    <Typography.Text
                        tag='div'
                        className={styles.subtitle}
                        color={isComplete ? completeTextColor : 'primary'}
                        view='primary-small'
                    >
                        {subtitleComplete && isComplete ? subtitleComplete : subtitle}
                    </Typography.Text>
                ) : subtitleComplete && isComplete ? (
                    subtitleComplete
                ) : (
                    subtitle
                )}
            </React.Fragment>
        );
    };

    const renderIcon = (Icon: ElementType) => {
        return (
            <span
                className={cn(styles.iconWrapper, styles[size], styles.tertiary, {
                    [styles[`icon-${completeIconColor}`]]: completeIconColor,
                })}
            >
                {IconComplete && isComplete ? (
                    <IconComplete className={styles.icon} />
                ) : (
                    <Icon className={styles.icon} />
                )}
            </span>
        );
    };
    const renderContentText = () => {
        return (
            <React.Fragment>
                {Icon ? (
                    renderIcon(Icon)
                ) : (
                    <React.Fragment>
                        {SIZES[size] > 24 && renderTitle()}
                        {SIZES[size] > 64 && renderSubTitle()}
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    };

    return (
        <div className={cn(styles.component, styles[size], className)} data-test-id={dataTestId}>
            <svg
                viewBox={`0 0 ${memorized.width} ${memorized.height}`}
                className={styles.svg}
                xmlns='http://www.w3.org/2000/svg'
            >
                <circle
                    className={cn(styles.backgroundCircle, styles[size], {
                        [styles.stroke]: !stroke,
                    })}
                    cx={memorized.center}
                    cy={memorized.center}
                    r={memorized.radius}
                />
                <circle
                    className={cn(styles.progressCircle, styles[view], styles[size], {
                        [styles[`bg-${view}`]]: fillComplete && isComplete,
                    })}
                    cx={memorized.center}
                    cy={memorized.center}
                    r={memorized.radius}
                    strokeDasharray={memorized.strokeDasharray}
                    strokeDashoffset={
                        direction === 'ClockOtherwise'
                            ? -memorized.strokeDashoffset
                            : memorized.strokeDashoffset
                    }
                    transform={`rotate(${-90} ${memorized.center} ${memorized.center})`}
                />
            </svg>
            <div
                className={cn(styles.labelWrapper, {
                    [styles.label]: Icon,
                })}
            >
                {children || renderContentText()}
            </div>
        </div>
    );
};
