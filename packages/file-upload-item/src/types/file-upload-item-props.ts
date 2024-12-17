import React, { ElementType, HTMLAttributeAnchorTarget, MouseEvent } from 'react';

import { type FileUploadItemStatus } from './status';

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
    uploadStatus?: FileUploadItemStatus;

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
     * от 0 до 100
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
