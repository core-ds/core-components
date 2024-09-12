import React, { ElementType, HTMLAttributeAnchorTarget, MouseEvent, ReactNode } from 'react';
import cn from 'classnames';

import { Content } from './components/content';
import { LeftAddon } from './components/left-addon';
import { RightAddon } from './components/right-addon';
import { FileUploadItemContext } from './context/file-upload-item-context';
import { FileStatuses, FileTypes } from './types';

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
     * Процент загрузки файла
     */
    uploadPercent?: number;

    /**
     * Статус загрузки файла
     */
    uploadStatus?: FileStatuses;

    /**
     * Сообщение об ошибке
     */
    error?: ReactNode;

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
     * Разрешить многострочное название файла
     */
    multiline?: boolean;

    /**
     * Указывает, где открыть скачиваемый документ
     */
    target?: HTMLAttributeAnchorTarget;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Тип загружаемого файла
     * @default attach
     */
    fileType?: FileTypes;

    /**
     * Цвет заполнения иконки
     * @default Gray
     */
    iconStyle?: 'gray' | 'colored';

    /**
     * Кастомная иконка
     */
    customIcon?: ElementType<{ className?: string }>;
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
    uploadPercent = 0,
    error,
    showDelete,
    showRestore,
    onDelete,
    onDownload,
    onRestore,
    disableButtons,
    multiline = false,
    target,
    dataTestId,
    fileType = 'attach',
    customIcon,
    iconStyle = 'gray',
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
            value={{
                showRestore,
                uploadStatus,
                error,
                multiline,
                title,
                subtitle,
                uploadPercent,
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
                fileType,
                customIcon,
                iconStyle,
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
