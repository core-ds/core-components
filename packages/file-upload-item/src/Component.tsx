import React, { ElementType, HTMLAttributeAnchorTarget, MouseEvent, ReactNode } from 'react';
import cn from 'classnames';

import { fileIcon } from './utils';

import styles from './index.module.css';
import { LeftAddon } from './components/left-addon';
import { FileUploadItemContext } from './context/file-upload-item-context';
import { FileStatuses } from './types';
import { Content } from './components/content';
import { RightAddon } from './components/right-addon';

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
     * Имя файла с расширением
     */
    name?: string;

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
     * Компонент кастомной иконки
     */
    icon?: ElementType<{ className?: string }>;

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
};

export const FileUploadItemComponent: React.FC<FileUploadItemProps> = ({
    className,
    children,
    id = '0',
    name = '',
    size,
    icon: Icon = fileIcon(name),
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
}) => {
    return (
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
                    icon: Icon,
                    error,
                    multiline,
                    name,
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
                }}
            >
                {children}
            </FileUploadItemContext.Provider>
        </div>
    );
};

export const FileUploadItem = Object.assign(FileUploadItemComponent, {
    LeftAddon,
    Content,
    RightAddon,
});
