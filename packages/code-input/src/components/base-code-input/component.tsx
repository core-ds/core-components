import React, {
    type FocusEventHandler,
    forwardRef,
    useEffect,
    useImperativeHandle,
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
import { Input, type InputProps } from '../input';

import { parseInputIdx, syncSelection } from './utils';

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
            strictFocus = false,
        },
        ref,
    ) => {
        const inputRef = useRef<HTMLDivElement>(null);

        const [values, setValues] = useState(initialValues.split(''));

        const clearErrorTimerId = useRef<ReturnType<typeof setTimeout>>();

        const getInputs = () =>
            inputRef.current?.querySelectorAll<HTMLInputElement>('input[data-code-input-index]');

        const inputAt = (index: number) => getInputs()?.[index];

        const focus = (index = 0) => {
            inputAt(index)?.focus();
        };

        const blur = () => {
            const input = document.activeElement as HTMLInputElement;

            if (inputRef.current?.contains(input)) {
                input.blur();
            }
        };

        const unselect = () => {
            const input = document.activeElement as HTMLInputElement;

            if (inputRef.current?.contains(input)) {
                input.setSelectionRange(0, 0);
            }
        };

        const reset = () => {
            setValues([]);
        };

        useImperativeHandle(ref, () => ({ focus, blur, reset, unselect }));

        const triggerChange = (argumentValues: string[]) => {
            const newValue = argumentValues.join('');

            onChange?.(newValue);

            if (onComplete && newValue.length >= fields) {
                onComplete(newValue);
            }
        };

        const handleChange = (value: string, index: number, valid: boolean) => {
            const newValue = value.replace(/\D/g, '');

            if (newValue === '' || !valid) {
                return;
            }

            const newValues = [...values];

            newValue.split('').forEach((item, i) => {
                const cursor = index + i;

                if (cursor < fields) {
                    newValues[cursor] = item;
                }
            });

            setValues(newValues);

            const nextIndex = Math.min(index + newValue.length, fields - 1);

            if (nextIndex !== index) {
                focus(nextIndex);
            }

            triggerChange(newValues);
        };

        const handleChangeFromEvent: InputProps['onChange'] = (event) => {
            const {
                target: {
                    value,
                    validity: { valid },
                },
            } = event;

            const index = parseInputIdx(event.currentTarget);

            if (index !== null) {
                handleChange(value, index, valid);
            }
        };

        const handleKeyDown: InputProps['onKeyDown'] = (event) => {
            const index = parseInputIdx(event.currentTarget);

            if (index === null) return;

            const prevIndex = index - 1;
            const nextIndex = index + 1;

            const newValues = [...values];

            switch (event.key) {
                case 'Backspace': {
                    event.preventDefault();

                    const targetIndex = newValues[index] ? index : Math.max(prevIndex, 0);

                    newValues[targetIndex] = '';
                    setValues(newValues);

                    triggerChange(newValues);

                    focus(targetIndex);
                    unselect();

                    break;
                }
                case 'Delete':
                    event.preventDefault();

                    newValues[index] = '';

                    setValues(newValues);

                    triggerChange(newValues);

                    unselect();
                    break;
                case 'ArrowLeft':
                    event.preventDefault();

                    if (prevIndex) {
                        focus(prevIndex);
                    }

                    break;
                case 'ArrowRight':
                    event.preventDefault();

                    focus(nextIndex);

                    break;
                case 'ArrowUp':
                case 'ArrowDown':
                    event.preventDefault();
                    break;
                default:
                    break;
            }
        };

        const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
            const index = parseInputIdx(e.currentTarget);

            if (index === null || index >= fields) return;

            const inputs = getInputs();

            const target =
                inputs &&
                [...inputs].slice(0, index).find((input, i) => !input.value && (strictFocus || !i));

            target?.focus();

            if (e.currentTarget.value) {
                syncSelection(e.currentTarget);
            }
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
                ref={inputRef}
                className={cn(styles.component, className)}
                data-test-id={dataTestId}
                onAnimationEnd={handleErrorAnimationEnd}
                role='group'
                aria-label='Код подтверждения'
            >
                <div className={cn({ [styles.shake]: Boolean(error) })}>
                    {Array.from({ length: fields }, (_, index) => (
                        <Input
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
                            aria-label={`Код ${index + 1} из ${fields}`}
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
