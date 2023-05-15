import React, { forwardRef } from 'react';
import cn from 'classnames';

import { IndicatorProps } from './types';

import styles from './index.module.css';
import tokens from './tokens.module.css';

const getSize = (height?: number, value?: IndicatorProps['value']) => {
    if (!height) {
        return typeof value === 'undefined' ? 'xs' : 's';
    }

    if (height <= 8) return 'xs';
    if (height <= 18) return 's';
    if (height <= 24) return 'm';
    if (height <= 32) return 'l';
    if (height <= 40) return 'xl';

    return 'xxl';
};

/**
 * Из-за того что нам будут прокидывать ноду — часть логики им придется дублировать снаружи.
 * Тут это не проблема, но 100% где-то в другом компоненте будет больно.
 */
function formatValue(rawValue: IndicatorProps['value']) {
    if (typeof rawValue === 'number' && rawValue >= 100) return '99+';

    return rawValue;
}

/**
 * Если делать просто через style — то ломается совместимость с ie, т.к. var'сы будут инлайниться
 * Для поддержки всех токенов — нужно шэрить классы между компонентами. Иначе будет плохо
 * С общими классами есть проблема — класс жестко завязан на конкретное свойство. Токены bg-* ->  background-color,
 * text-* -> color и т.д.
 *
 * В этом компоненте можно было бы заюзать outline и box-shadow, но - для outline нет классов)))
 * А box-shadow вообще не бьется на отдельные свойства. Поэтому только инлайн :``((
 *
 * Можно конечно сделать словари со значениями токенов и юзать их, типа style={{ color: colors.lightTextPrimary }},
 * но тогда не будет работать дарк мод :(
 */
function createStyler() {
    const cssProps: Record<string, unknown> = {};
    const classNames: string[] = [];

    const apply = (v: string | number | undefined, attr: string) => {
        if (!v) return;

        if (tokens[v]) {
            classNames.push(tokens[v]);
        } else {
            cssProps[attr] = v;
        }
    };

    return {
        apply,
        cssProps,
        classNames,
    };
}

export const Indicator = forwardRef<HTMLDivElement, IndicatorProps>(
    (
        {
            value,
            color,
            backgroundColor,
            border,
            height,
            view,
            className,
            dataTestId,
            style,
            ...restProps
        },
        ref,
    ) => {
        const size = getSize(height, value);

        // Велосипед:
        const styler = createStyler();
        const borderStyler = createStyler();

        if (view === 'red') {
            styler.apply('bg-accent', 'backgroundColor');
            styler.apply('static-text-primary-light', 'color');
        }

        if (view === 'white') {
            styler.apply('bg-primary', 'backgroundColor');
            styler.apply('text-primary', 'color');
        }

        if (view === 'grey') {
            styler.apply('specialbg-secondary-transparent', 'backgroundColor');
            styler.apply('text-primary', 'color');
        }

        if (!view) {
            styler.apply(backgroundColor, 'backgroundColor');
            styler.apply(color, 'color');

            // if (border) {
            //     /*
            //      * Чтобы работало в IE - нужны классы. Класс накидывает свойства border'у, а сюда нужен именно outline.
            //      * Как это сделать - хз?
            //      */
            //     styler.apply(border.color, 'outlineColor');
            //     styler.apply(border.width, 'outlineWidth');
            //     styler.apply(border.style || 'solid', 'outlineStyle');
            // }

            if (border) {
                borderStyler.apply(border.color, 'borderColor');
                borderStyler.apply(border.width, 'borderWidth');
                borderStyler.apply(border.style || 'solid', 'borderStyle');
            }
        }

        const showContent = typeof value !== 'undefined' && size !== 'xs';

        return (
            <div
                ref={ref}
                className={cn(styles.component, cn(styler.classNames), styles[size], className)}
                style={{
                    ...styler.cssProps,
                    ...style,
                    height,
                    minWidth: height,
                }}
                data-test-id={dataTestId}
                {...restProps}
            >
                {showContent && <span className={styles.content}>{formatValue(value)}</span>}
                {border && (
                    <span
                        className={cn(styles.border, cn(borderStyler.classNames))}
                        style={borderStyler.cssProps}
                    />
                )}
            </div>
        );
    },
);
