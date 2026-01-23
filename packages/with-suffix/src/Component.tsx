import React, {
    type ChangeEvent,
    type FC,
    forwardRef,
    Fragment,
    type ReactNode,
    type RefAttributes,
    useCallback,
    useState,
} from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { type InputProps } from '@alfalab/core-components-input';
import { type NumberInputProps } from '@alfalab/core-components-number-input';
import { Portal } from '@alfalab/core-components-portal';

import styles from './index.module.css';

type InputRef = RefAttributes<HTMLInputElement>;

type BaseInputProps = InputProps | NumberInputProps;

type SuffixExtraProps = {
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

// eslint-disable-next-line @typescript-eslint/naming-convention
export type withSuffixProps<P extends BaseInputProps> = P & SuffixExtraProps;

export const withSuffix = <P extends BaseInputProps>(Input: FC<P & InputRef>) =>
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

            const [stateValue, setStateValue] = useState(defaultValue || '');

            const handleInputChange = useCallback(
                (
                    event: ChangeEvent<HTMLInputElement>,
                    payload: { value: string } & { value: number | null },
                ) => {
                    onChange?.(event, payload);

                    if (uncontrolled) {
                        setStateValue(payload.value);
                    }
                },
                [onChange, uncontrolled],
            );

            const handleClear = useCallback<Required<BaseInputProps>['onClear']>(
                (event) => {
                    if (uncontrolled) {
                        setStateValue('');
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

            const isInverted = restProps.colors === 'inverted';

            const inputProps = {
                ref: mergeRefs([ref, setInputNode]),
                value: visibleValue,
                disabled,
                readOnly,
                onChange: handleInputChange,
                onClear: handleClear,
                placeholder,
                className: cn(className, {
                    [styles.suffixVisible]: Boolean(visibleValue),
                    [styles.hasSuffix]: suffix,
                }),
                ...restProps,
            } as unknown as P & InputRef;

            return (
                <Fragment>
                    <Input {...inputProps} />
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
