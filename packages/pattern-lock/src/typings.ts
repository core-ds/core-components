import { ReactNode } from 'react';
import { ReactPatternLockProps } from 'react-canvas-pattern-lock';

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
} & Omit<ReactPatternLockProps, 'theme' | 'width' | 'height' | 'rows' | 'cols'>;

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
