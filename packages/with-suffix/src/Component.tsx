import React, {
    type FC,
    forwardRef,
    Fragment,
    type ReactNode,
    type RefAttributes,
    useCallback,
    useMemo,
    useState,
} from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { type InputProps } from '@alfalab/core-components-input';
import { Portal } from '@alfalab/core-components-portal';
import { useRefAsState } from '@alfalab/core-components-shared';

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

            const [inputNodeRef, inputNode] = useRefAsState<HTMLInputElement>(null);

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

            /*
             * для react v18 сохраняем ref функцию между рендерами
             * если она меняется, react вызовет старую с null, этот null в state не сохраняем,
             * иначе снова ререндер и бесконечный цикл.
             */
            const handleInputNodeRef = useCallback((node: HTMLInputElement | null) => {
                if (node === null) {
                    return;
                }

                setInputNode((current) => (current === node ? current : node));
            }, []);

            const inputMergedRef = useMemo(
                () => mergeRefs([ref, handleInputNodeRef]),
                [ref, handleInputNodeRef],
            );

            return (
                <Fragment>
                    <Input
                        ref={inputMergedRef}
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
                                [styles.bold]:
                                    (restProps.fontWeight ??
                                        (restProps.bold ? 'bold' : 'regular')) === 'bold',
                                [styles.medium]: restProps.fontWeight === 'medium',
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
