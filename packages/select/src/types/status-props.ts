import { type ReactNode } from 'react';

export type StatusProps = {
    /**
     * Отображение ошибки
     */
    error?: ReactNode | boolean;

    /**
     * Позволяет управлять отображением иконки ошибки для статуса error
     * @default false
     * @description Отобразится при условии, что передан пропс error
     */
    showErrorIcon?: boolean;

    /**
     * Отображение иконки успеха
     */
    success?: boolean;
};
