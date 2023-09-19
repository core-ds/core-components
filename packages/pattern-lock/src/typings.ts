import { MouseEvent, ReactNode } from 'react';
import { ReactPatternLockProps } from 'react-canvas-pattern-lock';

type ConditionalProps =
    | {
          /**
           * Текст кнопки "забыли код"
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

export type PatternLockProps = {
    /**
     * Дополнительный класс.
     */
    className?: string;

    /**
     * Сообщение об ошибке
     */
    error?: ReactNode;

    /**
     * Сообщение над графическим ключом
     */
    message?: ReactNode;

    /**
     * Идентификатор для систем автоматизированного тестирования.
     */
    dataTestId?: string;

    /**
     * Следить ли за изменениями значений цветовых токенов.
     * @default false
     */
    observeTokens?: boolean;

    /**
     * Параметры MutationObserver для наблюдения за изменениями режима(css custom properties).
     */
    observerParams?: {
        getTarget?: () => Node;
        options?: MutationObserverInit;
    };
} & Omit<ReactPatternLockProps, 'theme' | 'width' | 'height' | 'rows' | 'cols'> &
    ConditionalProps;

export type ObservableTokens = {
    ACCENT_INITIAL: string;
    ACCENT_SUCCESS: string;
    ACCENT_FAILURE: string;
    RING_BG_INITIAL: string;
    SELECTED_RING_BG_INITIAL: string;
    SELECTED_RING_BG_SUCCESS: string;
    SELECTED_RING_BG_FAILURE: string;
    PRIMARY: string;
    BG: string;
};
