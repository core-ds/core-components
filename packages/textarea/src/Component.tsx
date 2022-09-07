import React, {
    useState,
    useEffect,
    useRef,
    TextareaHTMLAttributes,
    ChangeEvent,
    forwardRef,
    ReactNode,
} from 'react';
import cn from 'classnames';
import TextareaAutosize from 'react-textarea-autosize';
import mergeRefs from 'react-merge-refs';
import { useFocus, useMedia } from '@alfalab/hooks';
import { Scrollbar } from '@alfalab/core-components-scrollbar';
import { FormControl } from '@alfalab/core-components-form-control';

import styles from './index.module.css';
import defaultColors from './default.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

type NativeProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export type TextareaProps = Omit<
    NativeProps,
    'size' | 'style' | 'value' | 'defaultValue' | 'onChange'
> & {
    /**
     * Значение поля ввода
     */
    value?: string;

    /**
     * Начальное значение поля
     */
    defaultValue?: string;

    /**
     * Растягивает компонент на ширину контейнера
     */
    block?: boolean;

    /**
     * Размер компонента
     */
    size?: 's' | 'm' | 'l' | 'xl';

    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';

    /**
     * Отображение ошибки
     */
    error?: ReactNode | boolean;

    /**
     * Текст подсказки
     */
    hint?: ReactNode;

    /**
     * Лейбл компонента
     */
    label?: React.ReactNode;

    /**
     * Вид лейбла внутри / снаружи
     */
    labelView?: 'inner' | 'outer';

    /**
     * Слот слева
     */
    leftAddons?: React.ReactNode;

    /**
     * Слот справа
     */
    rightAddons?: React.ReactNode;

    /**
     * Слот под компонентом
     */
    bottomAddons?: React.ReactNode;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительный класс для поля
     */
    fieldClassName?: string;

    /**
     * Дополнительный класс textarea
     */
    textareaClassName?: string;

    /**
     * Управление возможностью подстраивать высоту компонента под высоту текста
     */
    autosize?: boolean;

    /**
     * Максимальное количество отображаемых строк (работает только вместе с autosize)
     */
    maxRows?: number;

    /**
     * Минимальное количество отображаемых строк (работает только вместе c autosize)
     */
    minRows?: number;

    /**
     * Максимальная высота элемента
     */
    maxHeight?: number;

    /**
     * Управление возможностью изменения размеров компонента (не работает вместе c autosize)
     */
    resize?: 'vertical' | 'none';

    /**
     * Обработчик ввода
     */
    onChange?: (event: ChangeEvent<HTMLTextAreaElement>, payload: { value: string }) => void;

    /**
     * Обработчик события изменения высоты компонента (работает только вместе c autosize)
     */
    onHeightChange?: (height?: number) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Максимальное количество символов (native prop)
     */
    maxLength?: number;

    /**
     * Показывать счетчик введенных символов
     */
    showCounter?: boolean;

    /**
     * Функция, возвращающая текст для счетчика
     */
    getCounterText?: (textLength: number, maxLength?: number) => string;

    /**
     * Нужно ли использовать нативный скроллбар.
     */
    nativeScrollbar?: boolean;
};

export const getDefaultCounterText = (textLength: number, maxLength = 0): string =>
    `${textLength}/${maxLength} символов`;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        {
            autoComplete = 'on',
            autosize = true,
            size = 's',
            colors = 'default',
            block = false,
            bottomAddons,
            fieldClassName,
            className,
            dataTestId,
            disabled,
            error,
            hint,
            textareaClassName,
            label,
            labelView = 'inner',
            leftAddons,
            onFocus,
            onBlur,
            onChange,
            onHeightChange,
            rightAddons,
            maxRows,
            minRows,
            maxHeight,
            resize = 'none',
            value,
            defaultValue,
            rows = autosize ? 1 : 3,
            showCounter = false,
            getCounterText = getDefaultCounterText,
            maxLength,
            nativeScrollbar: nativeScrollbarProp,
            ...restProps
        },
        ref,
    ) => {
        const uncontrolled = value === undefined;

        let [nativeScrollbar] = useMedia<boolean>([[true, '(max-width: 1023px)']], false);
        nativeScrollbar = resize !== 'none' || Boolean(nativeScrollbarProp ?? nativeScrollbar);

        const textareaRef = useRef<HTMLTextAreaElement>(null);

        const [focused, setFocused] = useState(false);
        const [stateValue, setStateValue] = useState(defaultValue || '');
        const [scrollableHeight, setScrollableHeight] = useState<number>();

        const [focusVisible] = useFocus(textareaRef, 'keyboard');

        const filled = Boolean(uncontrolled ? stateValue : value);

        // Хак, так как react-textarea-autosize перестал поддерживать maxHeight
        useEffect(() => {
            if (autosize) {
                if (
                    nativeScrollbar &&
                    maxHeight &&
                    textareaRef.current &&
                    textareaRef.current.style
                ) {
                    textareaRef.current.style.maxHeight = `${maxHeight}px`;
                }
            } else if (!nativeScrollbar && textareaRef.current) {
                const textareaHeight = textareaRef.current.scrollHeight;
                setScrollableHeight(textareaHeight);
            }
        }, [autosize, maxHeight, nativeScrollbar]);

        const handleTextareaFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
            setFocused(true);

            if (onFocus) {
                onFocus(event);
            }
        };

        const handleTextareaBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
            setFocused(false);

            if (onBlur) {
                onBlur(event);
            }
        };

        const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            if (onChange) {
                onChange(event, { value: event.target.value });
            }

            if (uncontrolled) {
                setStateValue(event.target.value);
            }
        };

        const getValueLength = (): number => {
            if (uncontrolled) {
                return stateValue.length;
            }

            return (value as string).length;
        };

        const getHint = () => {
            if (showCounter) {
                return getCounterText(getValueLength(), maxLength);
            }

            return hint;
        };

        const textareaProps = {
            ...restProps,
            className: cn(
                styles.textarea,
                colorStyles[colors].textarea,
                styles[size],
                {
                    [styles.hasInnerLabel]: nativeScrollbar && label && labelView === 'inner',
                    [colorStyles[colors].hasLabel]: label,
                    [styles.filled]: nativeScrollbar && filled,
                    [styles.resizeVertical]: resize === 'vertical',
                },
                textareaClassName,
            ),
            autoComplete,
            disabled,
            onBlur: handleTextareaBlur,
            onFocus: handleTextareaFocus,
            onChange: handleTextareaChange,
            value: uncontrolled ? stateValue : value,
            rows,
            ref: mergeRefs([ref, textareaRef]),
            'data-test-id': dataTestId,
            maxLength,
        };

        const renderWithNativeScrollbar = () => {
            return autosize ? (
                <TextareaAutosize
                    {...textareaProps}
                    maxRows={maxRows}
                    minRows={minRows}
                    onHeightChange={onHeightChange}
                />
            ) : (
                <textarea {...textareaProps} style={{ maxHeight }} />
            );
        };

        const renderWithCustomScrollbar = () => {
            const minRowsValue = autosize ? minRows : rows;

            return (
                <Scrollbar
                    style={{ maxHeight, height: scrollableHeight, padding: 0 }}
                    className={cn(styles.scrollable, styles[size], {
                        [styles.scrollableWithLabel]: label,
                        [styles.filled]: filled,
                    })}
                    horizontalAutoStretch={!block}
                    widthPropName='width'
                    contentNodeProps={{ className: styles.scrollableWrapper }}
                >
                    <TextareaAutosize {...textareaProps} minRows={minRowsValue} />

                    {/* Используется только для вычисления размера контейнера */}
                    <TextareaAutosize
                        className={cn(textareaProps.className, styles.textareaHidden)}
                        rows={textareaProps.rows}
                        maxRows={maxRows}
                        minRows={minRowsValue}
                        value={textareaProps.value}
                        onHeightChange={height => {
                            if (autosize) {
                                setScrollableHeight(height);

                                if (onHeightChange) {
                                    onHeightChange(height);
                                }
                            }
                        }}
                    />
                </Scrollbar>
            );
        };

        return (
            <FormControl
                className={cn(className)}
                fieldClassName={cn(fieldClassName, {
                    [styles.focusVisible]: focusVisible,
                })}
                size={size}
                colors={colors}
                block={block}
                disabled={disabled}
                filled={filled || focused}
                focused={focused}
                error={error}
                label={label}
                labelView={labelView}
                hint={getHint()}
                leftAddons={leftAddons}
                rightAddons={rightAddons}
                bottomAddons={bottomAddons}
            >
                {nativeScrollbar ? renderWithNativeScrollbar() : renderWithCustomScrollbar()}
            </FormControl>
        );
    },
);

/**
 * Для отображения в сторибуке
 */
Textarea.defaultProps = {
    autoComplete: 'on',
    autosize: true,
    size: 's',
    block: false,
    resize: 'none',
};
