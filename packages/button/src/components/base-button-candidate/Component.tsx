/* eslint-disable complexity */
import React, {
    type AnchorHTMLAttributes,
    type ButtonHTMLAttributes,
    type ComponentType,
    forwardRef,
    type ForwardRefExoticComponent,
    type MouseEventHandler,
    type RefAttributes,
    useRef,
} from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';
import { Spinner } from '@alfalab/core-components-spinner';
import { useFocus } from '@alfalab/hooks';

import { ButtonComponent } from '../button-component';

import styles from './index.module.css';

interface ComponentProps {
    /**
     * Растягивает компонент на ширину контейнера
     * @default false
     */
    block?: boolean;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительный класс для лоадера
     */
    loaderClassName?: string;

    /**
     * Позволяет использовать кастомный компонент для кнопки (например Link из роутера)
     */
    Component?:
        | ComponentType<AnchorHTMLAttributes<HTMLAnchorElement>>
        | ComponentType<ButtonHTMLAttributes<HTMLButtonElement>>
        | ForwardRefExoticComponent<
              AnchorHTMLAttributes<HTMLAnchorElement> & RefAttributes<HTMLAnchorElement>
          >
        | ForwardRefExoticComponent<
              ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>
          >;

    /**
     * Идентификатор для систем автоматизированного тестирования.
     * Для спиннера используется модификатор -loader
     */
    dataTestId?: string;

    /**
     * Показать лоадер
     * @default false
     */
    loading?: boolean;
}

export interface BaseButtonCandidateProps
    extends ComponentProps,
        Omit<ButtonHTMLAttributes<HTMLElement>, keyof ComponentProps>,
        Omit<
            AnchorHTMLAttributes<HTMLElement>,
            keyof ButtonHTMLAttributes<HTMLElement> | keyof ComponentProps
        > {}

export const BaseButtonCandidate = forwardRef<HTMLElement, BaseButtonCandidateProps>(
    (
        {
            children,
            block = false,
            className,
            loaderClassName,
            dataTestId,
            loading = false,
            Component = ButtonComponent,
            disabled = false,
            type = 'button',
            onClick,
            ...restProps
        },
        ref,
    ) => {
        const buttonRef = useRef<HTMLElement>(null);
        const [focused] = useFocus(buttonRef, 'keyboard');

        const handleClick: MouseEventHandler<HTMLElement> = (event) => {
            if (disabled || loading) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                onClick?.(event);
            }
        };

        return (
            <Component
                data-test-id={dataTestId}
                {...restProps}
                className={cn(
                    styles.component,
                    {
                        [styles.focused]: focused,
                        [styles.block]: block,
                        [styles.loading]: loading,
                    },
                    className,
                )}
                type={type}
                disabled={disabled}
                onClick={handleClick}
                ref={mergeRefs([buttonRef, ref])}
            >
                {loading && (
                    <Spinner
                        preset={24}
                        visible={true}
                        dataTestId={getDataTestId(dataTestId, 'loader')}
                        className={cn(styles.loader, loaderClassName)}
                    />
                )}
                {children}
            </Component>
        );
    },
);
