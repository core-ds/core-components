import { ReactNode } from 'react';

export type BaseCodeInputProps = {
    /**
     * Количество полей
     */
    fields?: number;

    /**
     * Значение для предзаполнения
     */
    initialValues?: string;

    /**
     * Заблокированное состояние
     */
    disabled?: boolean;

    /**
     * Состояние с ошибкой
     */
    error?: ReactNode;

    /**
     * Дополнительный класс (native prop)
     */
    className?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Флаг - нужно ли очищать код при возникновении ошибки
     * @default true
     */
    clearCodeOnError?: boolean;

    /**
     * Коллбэк вызываемый после окончания проигрывания анимации при возникновении ошибки.
     */
    onErrorAnimationEnd?: () => void;

    /**
     * Коллбек ввода значения
     */
    onChange?: (code: string) => void;

    /**
     * Коллбек полного заполнения
     */
    onComplete?: (code: string) => void;

    /**
     * Продолжительность отображения ошибки
     * @default 300
     */
    errorVisibleDuration?: number;

    /**
     * Основные стили компонента.
     */
    stylesInput?: { [key: string]: string };
};

export type CustomInputRef = {
    focus: (index?: number) => void;
    blur: () => void;
    reset: () => void;
    unselect: () => void;
};

export interface CredentialRequestOtpOptions extends CredentialRequestOptions {
    otp: { transport: Array<'sms'> };
}

export interface CredentialOtp extends Credential {
    code?: string;
}
