import { MouseEvent } from 'react';

import { ReactPatternLockProps } from '@alfalab/react-canvas-pattern-lock';

type ConditionalProps =
    | {
          /**
           * Показать кнопку "забыли код"
           * @default "Забыли код?"
           */
          showForgotCodeBtn: true;

          /**
           * Текст кнопки "забыли код"
           * @default "Забыли код?"
           */
          forgotCodeBtnText?: string;

          /**
           * Коллбэк, вызываемый при клике на кнопку "Забыли код"
           */
          onForgotBtnClick: (event: MouseEvent<HTMLButtonElement>) => void;
      }
    | {
          showForgotCodeBtn?: false;
          onForgotBtnClick?: never;
          forgotCodeBtnText?: never;
      };

export type CommonPatternLockProps = {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования.
     * Для сообщения используется модификатор -message, ошибки -error,
     * кнопки "забыли код" -forgot-code-btn
     */
    dataTestId?: string;

    /**
     * Следить ли за изменениями значений цветовых токенов
     * @default false
     */
    observeTokens?: boolean;

    /**
     * Параметры MutationObserver для наблюдения за изменениями режима(css custom properties)
     */
    observerParams?: {
        getTarget?: () => Node;
        options?: MutationObserverInit;
    };

    /**
     * Дополнительный класс для message/errorMessage
     */
    messageClassName?: string;

    /**
     * Отключает ввод паттерна
     * @default false
     */
    disabled?: boolean;
} & Omit<
    ReactPatternLockProps,
    'theme' | 'width' | 'height' | 'rows' | 'cols' | 'hover' | 'justifyNodes'
> &
    ConditionalProps;

export type PrivatePatternLockProps = {
    /**
     * Включает ховер-эффект
     */
    hover?: boolean;
    /**
     * Стили компонента
     */
    styles: { [key: string]: string };
};

export type PatternLockProps = CommonPatternLockProps & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;

    /**
     * Значение по-умолчанию для хука useMatchMedia
     */
    defaultMatchMediaValue?: boolean | (() => boolean);
};
export type ObservableTokens = {
    ACCENT_INITIAL: string;
    ACCENT_SUCCESS: string;
    ACCENT_FAILURE: string;
    RING_BG_INITIAL: string;
    SELECTED_RING_BG_INITIAL: string;
    SELECTED_RING_BG_SUCCESS: string;
    SELECTED_RING_BG_FAILURE: string;
    PRIMARY: string;
    HOVER_INNER: string;
    HOVER_OUTER: string;
};
