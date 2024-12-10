import React from 'react';

import { CalendarDesktopProps } from '../../desktop';

type OmittedCalendarProps = 'headerClassName' | 'contentClassName';
type OmittedCalendarContentProps =
    | 'className'
    | 'defaultView'
    | 'selectorView'
    | 'rangeComplete'
    | 'onMonthChange'
    | 'onYearClick'
    | 'onPeriodClick'
    | 'dataTestId'
    | 'hasHeader'
    | 'responsive'
    | 'showCurrentYearSelector';

export type CalendarContentProps = {
    /**
     * Обработчик клика на название месяца в мобильном календаре
     */
    onMonthTitleClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;

    /**
     * Количество лет для генерации в обе стороны от текущего года
     */
    yearsAmount?: number;

    /**
     * Родительский контейнер для отслеживания скролла
     */
    scrollableContainer?: HTMLElement;
} & Omit<CalendarDesktopProps, OmittedCalendarContentProps | OmittedCalendarProps>;

export type CalendarMobileProps = {
    /**
     * Заголовок календаря
     */
    title?: string;

    /**
     * Управление видимостью модалки
     */
    open: boolean;

    /**
     * Обработчик закрытия модалки
     */
    onClose?: () => void;

    /**
     * Разрешить выбор из недозаполненного диапазона дат.
     */
    allowSelectionFromEmptyRange?: boolean;

    /**
     * Нужно ли рендерить шапку
     */
    hasHeader?: boolean;

    /**
     * Обработчик клика на кнопку выбрать
     */
    onApply?: () => void;

    /**
     * При клике на месяц будут выбраны все доступные дни месяца
     */
    clickableMonth?: boolean;

    /**
     * Контент кнопки "Отмена"
     * @default Отмена
     */
    cancelButtonContent?: string;

    /**
     * Контент кнопки "Выбрать"
     * @default Выбрать
     */
    selectButtonContent?: string;

    /**
     * Контент кнопки "Сбросить"
     * @default Сбросить
     */
    resetButtonContent?: string;
} & CalendarContentProps &
    Pick<CalendarDesktopProps, OmittedCalendarContentProps>;
