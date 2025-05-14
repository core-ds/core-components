import React, {
    FC,
    forwardRef,
    Fragment,
    ReactNode,
    RefAttributes,
    useCallback,
    useState,
} from 'react';
import mergeRefs from 'react-merge-refs';
import { InputProps } from '@balafla/core-components-input';
import { Portal } from '@balafla/core-components-portal';
import cn from 'classnames';

import styles from './index.module.css';

// eslint-disable-next-line @typescript-eslint/naming-convention
export type withSuffixProps = InputProps & {
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

export const withSuffix = (Input: FC<InputProps & RefAttributes<HTMLInputElement>>) =>
    forwardRef<HTMLInputElement, withSuffixProps>(
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

            // add new info
            const [inputNode, setInputNode] = useState<HTMLInputElement | null>(null);

            const [stateValue, setStateValue] = useState(defaultValue || '');

            const handleInputChange = useCallback<Required<InputProps>['onChange']>(
                (event, payload) => {
                    if (onChange) {
                        onChange(event, payload);
                    }

                    if (uncontrolled) {
                        setStateValue(payload.value);
                    }
                },
                [onChange, uncontrolled],
            );

            const handleClear = useCallback<Required<InputProps>['onClear']>(
                (event) => {
                    if (uncontrolled) {
                        setStateValue('');
                    }

                    if (onClear) {
                        onClear(event);
                    }
                },
                [onClear, uncontrolled],
            );

            const getPortalContainer = useCallback(
                // TODO: Изменить сигнатуру getPortalContainer в Portal
                () => (inputNode?.parentElement || null) as HTMLElement,
                [inputNode],
            );

            const visibleValue = uncontrolled ? stateValue : value;

            const isInverted = restProps.colors === 'inverted';

            return (
                <Fragment>
                    <Input
                        ref={mergeRefs([ref, setInputNode])}
                        value={visibleValue}
                        disabled={disabled}
                        readOnly={readOnly}
                        onChange={handleInputChange}
                        onClear={handleClear}
                        placeholder={placeholder}
                        className={cn(className, {
                            [styles.suffixVisible]: Boolean(visibleValue),
                            [styles.hasSuffix]: suffix,
                        })}
                        {...restProps}
                    />
                    <Portal getPortalContainer={getPortalContainer}>
                        <div
                            translate='no'
                            className={cn(styles.suffixContainer, suffixContainerClassName, {
                                [styles[`size-${restProps.size}`]]: restProps.size,
                            })}
                        >
                            <span className={styles.spacer}>{visibleValue}</span>
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
