import React, {
    createRef,
    type FocusEventHandler,
    forwardRef,
    type RefObject,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import cn from 'classnames';

import {
    type BaseCodeInputProps,
    type CredentialOtp,
    type CredentialRequestOtpOptions,
    type CustomInputRef,
} from '../../typings';
import { Input, type InputProps } from '..';

import styles from './index.module.css';

/** После истечения этого времени код очищается */
const CODE_ERROR_HINT_VISIBLE_DURATION = 1300;

export const BaseCodeInput = forwardRef<CustomInputRef, BaseCodeInputProps>(
    (
        {
            className,
            disabled,
            error,
            fields = 4,
            initialValues = '',
            dataTestId,
            clearCodeOnError = true,
            errorVisibleDuration = CODE_ERROR_HINT_VISIBLE_DURATION,
            onErrorAnimationEnd,
            onChange,
            onComplete,
            stylesInput = {},
        },
        ref,
    ) => {
        const inputRefs = useMemo(
            () =>
                Array(fields)
                    .fill({})
                    .map(() => createRef<HTMLInputElement>()),
            [fields],
        );

        const [values, setValues] = useState(initialValues.split(''));

        const clearErrorTimerId = useRef<ReturnType<typeof setTimeout>>();

        const focusOnInput = (inputRef: RefObject<HTMLInputElement>) => {
            inputRef?.current?.focus();
        };

        const focus = (index = 0) => {
            focusOnInput(inputRefs[index]);
        };

        const blur = () => {
            const input = document.activeElement;

            if (input?.tagName === 'INPUT') {
                (input as HTMLInputElement).blur();
            }
        };

        const unselect = () => {
            const input = document.activeElement;

            if (input?.tagName === 'INPUT') {
                (input as HTMLInputElement).setSelectionRange(0, 0);
            }
        };

        const reset = () => {
            setValues([]);
        };

        useImperativeHandle(ref, () => ({ focus, blur, reset, unselect }));

        const triggerChange = (argumentValues: string[]) => {
            const newValue = (argumentValues || values).join('');

            if (onChange) {
                onChange(newValue);
            }

            if (onComplete && newValue.length >= fields) {
                onComplete(newValue);
            }
        };

        const handleChange = (value: string, index: number, valid: boolean) => {
            const newValue = value.replace(/\D/g, '');

            if (newValue === '' || !valid) {
                return;
            }

            let nextRef;

            const newValues = [...values];

            if (newValue.length > 1) {
                let nextIndex = newValue.length + index - 1;

                if (nextIndex >= fields) {
                    nextIndex = fields - 1;
                }

                nextRef = inputRefs[nextIndex];

                newValue.split('').forEach((item, i) => {
                    const cursor = index + i;

                    if (cursor < fields) {
                        newValues[cursor] = item;
                    }
                });
            } else {
                nextRef = inputRefs[index + 1];

                newValues[index] = newValue;
            }

            setValues(newValues);

            if (nextRef?.current) {
                nextRef.current.focus();

                nextRef.current.select();
            }

            triggerChange(newValues);
        };

        const handleChangeFromEvent: InputProps['onChange'] = (event, { index }) => {
            const {
                target: {
                    value,
                    validity: { valid },
                },
            } = event;

            handleChange(value, index, valid);
        };

        const handleKeyDown: InputProps['onKeyDown'] = (event, { index }) => {
            const prevIndex = index - 1;
            const nextIndex = index + 1;

            const prevRef = inputRefs[prevIndex];
            const nextRef = inputRefs[nextIndex];
            const curtRef = inputRefs[index];

            const newValues = [...values];

            switch (event.key) {
                case 'Backspace':
                    event.preventDefault();

                    if (values[index]) {
                        newValues[index] = '';
                    } else if (prevRef) {
                        newValues[prevIndex] = '';

                        focusOnInput(prevRef);
                    }

                    setValues(newValues);

                    triggerChange(newValues);

                    break;
                case 'Delete':
                    event.preventDefault();

                    newValues[index] = '';

                    if (!values[nextIndex]) {
                        focusOnInput(curtRef);
                    }

                    if (nextRef) {
                        focusOnInput(nextRef);
                    }

                    setValues(newValues);

                    triggerChange(newValues);

                    break;
                case 'ArrowLeft':
                    event.preventDefault();

                    if (prevRef) {
                        focusOnInput(prevRef);
                    }

                    break;
                case 'ArrowRight':
                    event.preventDefault();

                    if (nextRef) {
                        focusOnInput(nextRef);
                    }

                    break;
                case 'ArrowUp':
                case 'ArrowDown':
                    event.preventDefault();
                    break;
                default:
                    break;
            }
        };

        const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
            event.persist();
            const target = event.target as HTMLInputElement;

            /**
             * В сафари выделение корректно работает только с асинхронным вызовом
             */
            requestAnimationFrame(() => {
                target?.select();
            });
        };

        const handleErrorAnimationEnd = () => {
            clearErrorTimerId.current = setTimeout(() => {
                if (clearCodeOnError) {
                    focus();
                    /** Очищаем только в случае, если код не изменился */
                    setValues((prevState) => (values === prevState ? [] : prevState));
                }

                onErrorAnimationEnd?.();
            }, errorVisibleDuration);
        };

        useEffect(
            () => () => {
                if (clearErrorTimerId.current) {
                    clearTimeout(clearErrorTimerId.current);
                    clearErrorTimerId.current = undefined;
                }
            },
            [error],
        );

        useEffect(() => {
            let ac: AbortController | null = null;
            const unMountReason = 'component unMount';

            if ('OTPCredential' in window && navigator?.credentials?.get) {
                ac = new AbortController();
                const options: CredentialRequestOtpOptions = {
                    otp: { transport: ['sms'] },
                    signal: ac.signal,
                };

                navigator.credentials
                    .get(options)
                    .then((res: CredentialOtp | null) => {
                        if (res?.code) handleChange(res.code, 0, true);
                    })
                    .catch((err) => {
                        if (err !== unMountReason) {
                            // eslint-disable-next-line no-console
                            console.error(err);
                        }
                    });
            }

            return () => {
                if (ac) ac.abort(unMountReason);
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        return (
            <div
                className={cn(styles.component, className)}
                data-test-id={dataTestId}
                onAnimationEnd={handleErrorAnimationEnd}
            >
                <div className={cn({ [styles.shake]: Boolean(error) })}>
                    {/* eslint-disable react/no-array-index-key */}
                    {new Array(fields).fill('').map((_, index) => (
                        <Input
                            ref={inputRefs[index]}
                            key={index.toString()}
                            index={index}
                            value={values[index]}
                            disabled={disabled}
                            error={!!error}
                            onChange={handleChangeFromEvent}
                            onFocus={handleFocus}
                            onKeyDown={handleKeyDown}
                            stylesInput={stylesInput}
                            compact={fields > 6}
                        />
                    ))}
                </div>

                {error && (
                    <div className={styles.error} role='alert'>
                        {error}
                    </div>
                )}
            </div>
        );
    },
);
