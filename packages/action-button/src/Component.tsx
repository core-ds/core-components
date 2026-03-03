import React, { forwardRef, type ReactNode } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import {
    BaseButtonCandidate,
    type BaseButtonOwnProps,
    type ButtonPropsFactory,
} from '@alfalab/core-components-button/components/base-button-candidate';
import { ButtonContent } from '@alfalab/core-components-button/components/button-content';
import { useLoading } from '@alfalab/core-components-button/shared';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';
import staticColors from './static.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
    static: staticColors,
} as const;

interface ComponentProps
    extends Omit<BaseButtonOwnProps, 'disabledClassName' | 'Content' | 'block'> {
    /**
     * Иконка кнопки
     */
    icon: ReactNode;

    /**
     *  Размер кнопки
     */
    size?: 48;

    /**
     * Тип кнопки
     */
    view?: 'primary' | 'secondary';

    /**
     * Дополнительный класс для обертки иконки
     */
    iconWrapperClassName?: string;

    /**
     * Палитра, в контексте которой используется кнопка
     */
    colors?: 'default' | 'inverted' | 'static';
}

export type ActionButtonProps = ButtonPropsFactory<ComponentProps>;

export const ActionButton = forwardRef<HTMLAnchorElement | HTMLButtonElement, ActionButtonProps>(
    (
        {
            className: classNameFromProps,
            icon,
            children,
            size = 48,
            view = 'primary',
            iconWrapperClassName,
            disabled,
            loading: loadingFromProps,
            colors = 'default',
            dataTestId,
            loaderClassName,
            ...restProps
        },
        ref,
    ) => {
        const loading = useLoading(loadingFromProps);
        const className = cn(
            styles.component,
            colorStyles[colors].component,
            colorStyles[colors][view],
            styles[`size${size}`],
            loading && [colorStyles[colors].loading, styles.loading],
            classNameFromProps,
        );

        return (
            <BaseButtonCandidate
                {...restProps}
                dataTestId={dataTestId}
                ref={mergeRefs([ref])}
                className={className}
                disabled={disabled}
                disabledClassName={colorStyles[colors].disabled}
                loading={loading}
            >
                <div
                    role='img'
                    className={cn(
                        styles.iconWrapper,
                        colorStyles[colors].iconWrapper,
                        iconWrapperClassName,
                    )}
                >
                    <ButtonContent
                        loading={loading}
                        loaderClassName={cn(
                            styles.loader,
                            colorStyles[colors].loader,
                            loaderClassName,
                        )}
                        dataTestId={dataTestId}
                    >
                        {icon}
                    </ButtonContent>
                </div>
                <span className={styles.label}>{children}</span>
            </BaseButtonCandidate>
        );
    },
);

ActionButton.displayName = 'ActionButton';
