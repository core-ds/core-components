import React, { ElementType, HTMLAttributeAnchorTarget, MouseEvent } from 'react';
import cn from 'classnames';

import { Content } from './components/content';
import { LeftAddon } from './components/left-addon';
import { RightAddon } from './components/right-addon';
import { FileUploadItemContext } from './context/file-upload-item-context';
import { FileStatuses } from './types';

import styles from './index.module.css';

export type FileUploadItemProps = {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор элемента
     */
    id?: string;

    /**
     * Имя файла / заголовок
     */
    title?: string;

    /**
     * Подзаголовок файла
     */
    subtitle?: string;

    /**
     * Размер файла
     */
    size?: string | number;

    /**
     * Дата загрузки файла
     */
    uploadDate?: string;

    /**
     * Ссылка на файл. Если прокидывается этот параметр, то появляется кнопка скачивания
     */
    downloadLink?: string;

    /**
     * Рекомендует браузеру скачивать контент по ссылке.
     * В проп может быть передано рекомендуемое название скачиваемого файла.
     */
    download?: string | true;

    /**
     * Отображение кнопки удаления
     */
    showDelete?: boolean;

    /**
     * Отображение кнопки восстановления
     */
    showRestore?: boolean;

    /**
     * Статус загрузки файла
     */
    uploadStatus?: FileStatuses;

    /**
     * Сообщение об ошибке
     */
    error?: string | string[];

    /**
     * Дочерние элементы
     */
    children?: React.ReactNode;

    /**
     * Обработчик загрузки файла
     */
    onDownload?: (id: string) => void;

    /**
     * Обработчик удаления файла
     */
    onDelete?: (id: string, event?: MouseEvent<HTMLElement>) => void;

    /**
     * Обработчик восстановления файла
     */
    onRestore?: (id: string) => void;

    /**
     * Управление активностью кнопок
     */
    disableButtons?: boolean;

    /**
     * Указывает, где открыть скачиваемый документ
     */
    target?: HTMLAttributeAnchorTarget;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Цвет заполнения иконки
     * @default gray
     */
    iconStyle?: 'gray' | 'colored';

    /**
     * Кастомная иконка
     */
    customIcon?: ElementType<{ className?: string }>;

    /**
     * Шкала прогресса
     * от 0 до 360
     * @default 0
     */
    progressBar?: number;

    /**
     * Кастомный контент
     */
    customContent?: ElementType;

    /**
     * Отсечение контента
     * @default false
     */
    truncate?: boolean;

    /**
     * Фоновое изображение. Имеет приоритет над иконкой и заливкой
     */
    imageUrl?: string;
};

export const FileUploadItemComponent: React.FC<FileUploadItemProps> = ({
    className,
    children,
    id = '0',
    title = '',
    subtitle,
    size,
    uploadDate,
    downloadLink,
    download,
    uploadStatus,
    error,
    showDelete,
    showRestore,
    onDelete,
    onDownload,
    onRestore,
    disableButtons,
    target,
    dataTestId,
    customIcon,
    iconStyle = 'gray',
    progressBar = 0,
    customContent,
    truncate,
    imageUrl,
}) => (
    <div
        className={cn(
            className,
            styles.component,
            uploadStatus && styles[uploadStatus.toLocaleLowerCase()],
        )}
        data-test-id={dataTestId}
    >
        <FileUploadItemContext.Provider
            // eslint-disable-next-line react/jsx-no-constructed-context-values
            value={{
                showRestore,
                uploadStatus,
                error,
                title,
                subtitle,
                uploadDate,
                size,
                id,
                onDownload,
                onDelete,
                onRestore,
                downloadLink,
                download,
                disableButtons,
                target,
                showDelete,
                customIcon,
                iconStyle,
                progressBar,
                customContent,
                truncate,
                imageUrl,
            }}
        >
            {children}
        </FileUploadItemContext.Provider>
    </div>
);

export const FileUploadItem = Object.assign(FileUploadItemComponent, {
    LeftAddon,
    Content,
    RightAddon,
});
