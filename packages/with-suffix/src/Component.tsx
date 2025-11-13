import React, {
    type ChangeEvent,
    type FC,
    forwardRef,
    type ForwardRefExoticComponent,
    Fragment,
    type ReactNode,
    type RefAttributes,
    useCallback,
    useState,
} from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { Portal } from '@alfalab/core-components-portal';

import styles from './index.module.css';

// eslint-disable-next-line @typescript-eslint/naming-convention
export type withSuffixProps<P> = P & {
    /**
     * Дополнительный закрепленный текст справа от основного значения.
     * Например: value='85' suffix=' мес' -> 85 мес
     */
    suffix?: ReactNode;

    /**
     * Дополнительный класс для контейнера с суффиксом
     */
    suffixContainerClassName?: string;
};

type ValueLike = string | number | null;

type MinimalInputLikeProps<V extends ValueLike> = {
    value?: V;
    defaultValue?: V;
    onChange?: (event: ChangeEvent<HTMLInputElement> | null, payload: { value: V }) => void;
    onClear?: (event: ChangeEvent<HTMLInputElement> | null) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    readOnly?: boolean;
    size?: unknown;
    colors?: unknown;
};

export const withSuffix = <V extends ValueLike, P extends MinimalInputLikeProps<V>>(
    Input:
        | ForwardRefExoticComponent<P & RefAttributes<HTMLInputElement>>
        | FC<P & RefAttributes<HTMLInputElement>>,
) =>
    forwardRef<HTMLInputElement, withSuffixProps<P>>(
        (
            {
                value,
                defaultValue,
                onChange,
                onClear,
                suffix = '',
                placeholder,
                className,
                disabled,
                readOnly,
                suffixContainerClassName,
                ...restProps
            },
            ref,
        ) => {
            const uncontrolled = value === undefined;

            const [inputNode, setInputNode] = useState<HTMLInputElement | null>(null);

            const [stateValue, setStateValue] = useState<V>((defaultValue ?? ('' as unknown)) as V);

            const handleInputChange = useCallback<
                NonNullable<MinimalInputLikeProps<V>['onChange']>
            >(
                (event, payload) => {
                    onChange?.(event, payload);

                    if (uncontrolled) {
                        setStateValue(payload.value);
                    }
                },
                [onChange, uncontrolled],
            );

            const handleClear = useCallback<NonNullable<MinimalInputLikeProps<V>['onClear']>>(
                (event) => {
                    if (uncontrolled) {
                        setStateValue('' as V);
                    }

                    onClear?.(event);
                },
                [onClear, uncontrolled],
            );

            const getPortalContainer = useCallback(
                // TODO: Изменить сигнатуру getPortalContainer в Portal
                () => (inputNode?.parentElement || null) as HTMLElement,
                [inputNode],
            );

            const visibleValue = uncontrolled ? stateValue : value;

            const isInverted = (restProps as MinimalInputLikeProps<V>).colors === 'inverted';

            return (
                <Fragment>
                    <Input
                        ref={mergeRefs([ref, setInputNode])}
                        value={visibleValue as never}
                        disabled={disabled}
                        readOnly={readOnly}
                        onChange={handleInputChange as never}
                        onClear={handleClear as never}
                        placeholder={placeholder}
                        className={cn(className, {
                            [styles.suffixVisible]: Boolean(visibleValue ?? ''),
                            [styles.hasSuffix]: suffix,
                        })}
                        {...(restProps as P)}
                    />
                    <Portal getPortalContainer={getPortalContainer}>
                        <div
                            translate='no'
                            className={cn(styles.suffixContainer, suffixContainerClassName, {
                                [styles[`size-${(restProps as MinimalInputLikeProps<V>).size}`]]: (
                                    restProps as MinimalInputLikeProps<V>
                                ).size,
                            })}
                        >
                            <span className={styles.spacer}>{`${visibleValue ?? ''}`}</span>
                            {suffix && (
                                <div
                                    className={cn(styles.suffix, {
                                        [styles.disabled]: disabled,
                                        [styles.readOnly]: readOnly,
                                        [styles.inverted]: isInverted,
                                    })}
                                >
                                    {suffix}
                                </div>
                            )}
                        </div>
                    </Portal>
                </Fragment>
            );
        },
    );
