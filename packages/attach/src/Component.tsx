import React, {
    ButtonHTMLAttributes,
    ChangeEvent,
    InputHTMLAttributes,
    MouseEvent,
    useEffect,
    useRef,
    useState,
} from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { Button, ButtonProps } from '@alfalab/core-components-button';
import { KeyboardFocusable } from '@alfalab/core-components-keyboard-focusable';
import { ProgressBar } from '@alfalab/core-components-progress-bar';
import { PaperclipMIcon } from '@alfalab/icons-glyph/PaperclipMIcon';
import { PaperclipSIcon } from '@alfalab/icons-glyph/PaperclipSIcon';
import { pluralize } from '@alfalab/utils';

import { truncateFilename } from './utils';

import styles from './index.module.css';

export type AttachProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'size' | 'type' | 'value' | 'defaultValue' | 'onChange' | 'multiple' | 'enterKeyHint'
> & {
    /**
     * Содержимое кнопки для выбора файла
     * @default 'Выберите файл'
     */
    buttonContent?: React.ReactNode;

    /**
     * Свойства для кнопки
     */
    buttonProps?: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительный класс для блока с файлами
     */
    fileClassName?: string;

    /**
     * Дополнительный класс для блока с подсказкой, когда файл не загружен
     */
    noFileClassName?: string;

    /**
     * Число символов, после которого имя файла будет обрезаться
     */
    maxFilenameLength?: number;

    /**
     * Текст для случая, когда файл не загружен
     * @default 'Нет файла'
     */
    noFileText?: string;

    /**
     * Процент выполнения загрузки файла
     */
    progressBarPercent?: number;

    /**
     * Размер компонента
     * @default 48
     * @description xxs, xs, s, m, l deprecated, используйте вместо них 32 , 40 , 48 , 56 , 64 соответственно
     */
    size?: 'xxs' | 'xs' | 's' | 'm' | 'l' | 32 | 40 | 48 | 56 | 64;

    /**
     * Возможность прикрепления нескольких файлов
     */
    multiple?: boolean;

    /**
     * Содержимое поля ввода. Принимает массив объектов типа File или null.
     */
    value?: File[] | null;

    /**
     * Содержимое поля ввода, указанное по умолчанию. Принимает массив объектов типа File или null.
     */
    defaultValue?: File[] | null;

    /**
     * Обработчик поля ввода
     */
    onChange?: (event: ChangeEvent<HTMLInputElement>, payload: { files: File[] }) => void;

    /**
     * Обработчик нажатия на кнопку очистки
     */
    onClear?: (event: MouseEvent<HTMLButtonElement>) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

const MULTIPLE_TEXTS: [string, string, string] = ['файл', 'файла', 'файлов'];

const SIZE_TO_CLASSNAME_MAP = {
    xxs: 'size-32',
    xs: 'size-40',
    s: 'size-48',
    m: 'size-56',
    l: 'size-64',
    32: 'size-32',
    40: 'size-40',
    48: 'size-48',
    56: 'size-56',
    64: 'size-64',
};

export const Attach = React.forwardRef<HTMLInputElement, AttachProps>(
    (
        {
            size = 48,
            accept,
            buttonContent = 'Выберите файл',
            buttonProps = {},
            className,
            fileClassName,
            noFileClassName,
            disabled,
            dataTestId,
            id,
            maxFilenameLength,
            multiple,
            noFileText = 'Нет файла',
            progressBarPercent,
            defaultValue,
            value,
            onChange,
            onClear,
            ...restProps
        },
        ref,
    ) => {
        const uncontrolled = value === undefined;

        const [files, setFiles] = useState(defaultValue || []);

        const inputRef = useRef<HTMLInputElement>(null);
        const labelRef = useRef<HTMLLabelElement>(null);
        const buttonRef = useRef<HTMLButtonElement>(null);

        const getDefaultLeftAddon = () => {
            let IconComponent: React.FC<React.SVGProps<SVGSVGElement>>;

            if (['size-40', 'size-32'].includes(SIZE_TO_CLASSNAME_MAP[size])) {
                IconComponent = PaperclipSIcon;
            } else {
                IconComponent = PaperclipMIcon;
            }

            return <IconComponent className={styles.icon} />;
        };

        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const filesArray = event.target.files ? Array.from(event.target.files) : [];

            if (onChange) {
                onChange(event, { files: filesArray });
            }

            if (uncontrolled && event.target.files) {
                setFiles(filesArray);
            }

            if (inputRef.current) {
                inputRef.current.value = '';
            }
        };

        const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            if (labelRef.current) {
                labelRef.current.click();
            }
            if (buttonRef.current) {
                buttonRef.current.focus();
            }

            if (buttonProps.onClick) {
                buttonProps.onClick(event);
            }
        };

        const handleClearClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
            if (uncontrolled) {
                setFiles([]);
            }

            if (onClear) {
                onClear(ev);
            }
        };

        const statusTextContent =
            files.length === 1 ? (
                truncateFilename(files[0].name, maxFilenameLength)
            ) : (
                <abbr className={styles.abbreviation} title={files.map((file) => file.name).join()}>
                    {files.length} {pluralize(files.length, ...MULTIPLE_TEXTS)}
                </abbr>
            );

        useEffect(() => {
            if (!uncontrolled) {
                setFiles(value || []);
            }
        }, [uncontrolled, value]);

        return (
            <div
                className={cn(
                    styles.component,
                    styles[SIZE_TO_CLASSNAME_MAP[size]],
                    {
                        [styles.disabled]: disabled,
                    },
                    className,
                )}
            >
                <Button
                    {...buttonProps}
                    size={size}
                    disabled={disabled}
                    view={buttonProps?.view || 'secondary'}
                    leftAddons={buttonProps?.leftAddons || getDefaultLeftAddon()}
                    onClick={handleButtonClick}
                    ref={buttonRef}
                >
                    <span>{buttonContent}</span>
                </Button>
                <label className={styles.label} htmlFor={id} ref={labelRef}>
                    <input
                        {...restProps}
                        className={styles.control}
                        accept={accept}
                        disabled={disabled}
                        id={id}
                        multiple={multiple}
                        tabIndex={-1}
                        type='file'
                        onChange={handleInputChange}
                        ref={mergeRefs([ref, inputRef])}
                        data-test-id={dataTestId}
                    />
                </label>
                {files && files.length > 0 ? (
                    <div className={cn(styles.file, fileClassName)}>
                        <span>{statusTextContent}</span>
                        <KeyboardFocusable>
                            {(targetRef, focused) => (
                                <button
                                    aria-label='очистить'
                                    type='button'
                                    className={cn(styles.clear, {
                                        [styles.focused]: focused,
                                    })}
                                    onClick={handleClearClick}
                                    ref={targetRef}
                                />
                            )}
                        </KeyboardFocusable>
                        {progressBarPercent && (
                            <ProgressBar
                                className={styles.progressBar}
                                value={progressBarPercent}
                                view='positive'
                            />
                        )}
                    </div>
                ) : (
                    <div className={cn(styles.noFile, noFileClassName)}>{noFileText}</div>
                )}
            </div>
        );
    },
);

Attach.displayName = 'Attach';
