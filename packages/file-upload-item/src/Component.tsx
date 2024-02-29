import React, { ElementType, MouseEvent, ReactNode } from 'react';
import cn from 'classnames';

import { IconButton } from '@alfalab/core-components-icon-button';
import { Link } from '@alfalab/core-components-link';
import { Spinner } from '@alfalab/core-components-spinner';
import { AlertCircleMIcon } from '@alfalab/icons-glyph/AlertCircleMIcon';
import { CheckmarkCircleMIcon } from '@alfalab/icons-glyph/CheckmarkCircleMIcon';
import { ClockMIcon } from '@alfalab/icons-glyph/ClockMIcon';
import { CrossSIcon } from '@alfalab/icons-glyph/CrossSIcon';
import { PointerDownSIcon } from '@alfalab/icons-glyph/PointerDownSIcon';

import { fileIcon, humanFileSize } from './utils';

import styles from './index.module.css';

export type FileStatuses = 'ERROR' | 'SUCCESS' | 'LOADING' | 'UPLOADING';

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
    onDelete?: (id: string) => void;

    /**
     * Обработчик восстановления файла
     */
    onRestore?: (id: string) => void;

    /**
     * Управление активностью кнопок
     */
    disableButtons?: boolean;

    /**
     * Убирает нижнюю границу
     */
    withoutBorder?: boolean;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const FileUploadItem: React.FC<FileUploadItemProps> = ({
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
    withoutBorder,
    dataTestId,
}) => {
    const handleDownload = (event: MouseEvent<HTMLElement>) => {
        if (onDownload) {
            event.preventDefault();
            onDownload(id);
        }
    };

    const handleDelete = () => {
        if (onDelete) onDelete(id);
    };

    const handleRestore = () => {
        if (onRestore) onRestore(id);
    };

    const renderIcon = () => {
        if (showRestore) {
            return <ClockMIcon className={styles.restoreIcon} />;
        }

        switch (uploadStatus) {
            case 'ERROR':
                return <AlertCircleMIcon className={styles.errorIcon} />;
            case 'SUCCESS':
                return <CheckmarkCircleMIcon className={styles.successIcon} />;
            case 'LOADING':
            case 'UPLOADING':
                return (
                    <div className={styles.spinnerWrapper}>
                        <Spinner visible={true} className={styles.spinner} />
                    </div>
                );
            default: {
                return <Icon className={styles.icon} />;
            }
        }
    };

    const renderInfoSection = () => {
        const shouldShownError = uploadStatus === 'ERROR' || !!error;
        const errorContent =
            uploadStatus === 'ERROR' && !error ? 'Не удалось загрузить файл' : error;

        return (
            <div className={styles.infoSection}>
                <div className={styles.name}>{name}</div>

                {shouldShownError && (
                    <div className={styles.errorWrapper} role='alert'>
                        {errorContent}
                    </div>
                )}
            </div>
        );
    };

    const showMeta = !showRestore && (!uploadStatus || uploadStatus === 'SUCCESS');
    const showDownload = Boolean(downloadLink) && !showRestore;

    return (
        <div
            className={cn(
                className,
                styles.component,
                uploadStatus && styles[uploadStatus.toLocaleLowerCase()],
                {
                    [styles.withoutBorder]: withoutBorder,
                },
            )}
            data-test-id={dataTestId}
        >
            <div className={styles.info}>
                {renderIcon()}

                {renderInfoSection()}

                {children}

                {uploadStatus === 'UPLOADING' && (
                    <span className={styles.uploadPercent}>{`${Math.round(uploadPercent)}%`}</span>
                )}

                {showMeta && (
                    <div className={styles.meta}>
                        {uploadDate && <span key={uploadDate}>{uploadDate}</span>}

                        {size && (
                            <span key={size} className={styles.size}>
                                {humanFileSize(size)}
                            </span>
                        )}
                    </div>
                )}
            </div>

            {showRestore && (
                <Link pseudo={true} className={styles.restore} onClick={handleRestore}>
                    Восстановить
                </Link>
            )}

            {showDownload && (
                <IconButton
                    size='xxs'
                    icon={PointerDownSIcon}
                    className={styles.download}
                    aria-label='скачать'
                    href={downloadLink}
                    onClick={handleDownload}
                    disabled={disableButtons}
                    download={download}
                />
            )}

            {showDelete && !showRestore && (
                <IconButton
                    size='xxs'
                    icon={CrossSIcon}
                    onClick={handleDelete}
                    disabled={disableButtons}
                    className={styles.delete}
                    aria-label='удалить'
                />
            )}
        </div>
    );
};
