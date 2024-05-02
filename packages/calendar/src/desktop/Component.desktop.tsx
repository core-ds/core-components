import React, { forwardRef, MouseEvent, SyntheticEvent, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';
import startOfMonth from 'date-fns/startOfMonth';

import { hooks } from '@alfalab/core-components-shared';
import { useDidUpdateEffect, useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { DaysTable } from '../components/days-table';
import { Header } from '../components/header';
import { MonthYearHeader } from '../components/month-year-header';
import { MonthsTable } from '../components/months-table';
import { PeriodSlider } from '../components/period-slider';
import { YearsTable } from '../components/years-table';
import { DayAddons, SelectorView, View } from '../typings';
import { useCalendar } from '../useCalendar';
import { useRangeBehavior } from '../useRangeBehavior';
import { limitDate } from '../utils';

import styles from './desktop.module.css';

const { useCustomWebkitScrollbar } = hooks;

export type CalendarDesktopProps = {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительный класс шапки десктопного календаря
     */
    headerClassName?: string;

    /**
     * Дополнительный класс контента десктопного календаря
     */
    contentClassName?: string;

    /**
     * Вид по умолчанию (выбор дней, месяцев, лет)
     */
    defaultView?: View;

    /**
     * Вид шапки — месяц и год или только месяц
     */
    selectorView?: SelectorView;

    /**
     * Выбранная дата (timestamp)
     */
    value?: number | { dateFrom?: number; dateTo?: number };

    /**
     * Режим выбора дат
     * @default single
     */
    mode?: 'single' | 'range';

    /**
     * Тип выбора границ в календаре
     * @default clarification
     */
    rangeBehavior?: 'clarification' | 'reset';

    /**
     * Открытый месяц (timestamp)
     */
    month?: number;

    /**
     * Месяц, открытый по умолчанию (timestamp)
     */
    defaultMonth?: number;

    /**
     * Минимальная дата, доступная для выбора (timestamp)
     */
    minDate?: number;

    /**
     * Максимальная дата, доступная для выбора (timestamp)
     */
    maxDate?: number;

    /**
     * Начало выделенного периода (timestamp)
     * @deprecated используйте value вместе с mode='range'
     */
    selectedFrom?: number;

    /**
     * Конец выделенного периода (timestamp)
     * @deprecated используйте value вместе с mode='range'
     */
    selectedTo?: number;

    /**
     * Индикатор, что выбран полный период
     */
    rangeComplete?: boolean;

    /**
     * Список событий
     */
    events?: Array<Date | number>;

    /**
     * Список отключенных для выбора дней.
     */
    offDays?: Array<Date | number>;

    /**
     * Список выходных
     */
    holidays?: Array<Date | number>;

    /**
     * Обработчик изменения месяца (или года)
     */
    onMonthChange?: (month: number) => void;

    /**
     * Обработчик выбора даты
     */
    onChange?: (date?: number, dateTo?: number) => void;

    /**
     * Обработчик нажатия на кнопку месяца
     */
    onMonthClick?: (event: MouseEvent<HTMLButtonElement>) => void;

    /**
     * Обработчик нажатия на кнопку года
     */
    onYearClick?: (event: MouseEvent<HTMLButtonElement>) => void;

    /**
     * Обработчик нажатия на период
     */
    onPeriodClick?: (event: MouseEvent<HTMLAnchorElement>) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Нужно ли рендерить шапку календаря
     */
    hasHeader?: boolean;

    /**
     * Должен ли календарь подстраиваться под ширину родителя.
     */
    responsive?: boolean;

    /**
     * Дополнительный контент под числом
     */
    dayAddons?: DayAddons[];

    /**
     * Форма ячейки дня
     */
    shape?: 'rounded' | 'rectangular';

    /**
     * Отображать ли текущий год, если selectorView 'month-only'
     * @default false
     */
    showCurrentYearSelector?: boolean;
};

export const CalendarDesktop = forwardRef<HTMLDivElement, CalendarDesktopProps>(
    (
        {
            className,
            headerClassName,
            contentClassName,
            defaultView = 'days',
            selectorView = 'full',
            mode = 'single',
            rangeBehavior,
            value,
            month: monthTimestamp,
            minDate: minDateTimestamp,
            maxDate: maxDateTimestamp,
            defaultMonth: defaultMonthTimestamp = +new Date(),
            selectedFrom,
            selectedTo,
            rangeComplete,
            offDays,
            events,
            holidays,
            onChange,
            onMonthChange,
            onMonthClick,
            onYearClick,
            onPeriodClick,
            dataTestId,
            hasHeader = true,
            responsive,
            dayAddons,
            shape = 'rounded',
            showCurrentYearSelector = false,
        },
        ref,
    ) => {
        const [view, setView] = useState<View>(defaultView);
        const [scrolled, setScrolled] = useState(false);

        const scrollableNodeRef = useRef<HTMLDivElement>(null);
        const firstUpdate = useRef(true);

        const range = useRangeBehavior({
            mode,
            value,
            selectedFrom,
            selectedTo,
            rangeBehavior,
            onChange,
        });

        const selected = useMemo(
            () => (range.value ? new Date(range.value) : undefined),
            [range.value],
        );

        const defaultMonth = useMemo(
            () =>
                startOfMonth(
                    selected ||
                        limitDate(defaultMonthTimestamp, minDateTimestamp, maxDateTimestamp),
                ),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [],
        );

        const month = useMemo(
            () => (monthTimestamp ? new Date(monthTimestamp) : undefined),
            [monthTimestamp],
        );

        const minDate = useMemo(
            () => (minDateTimestamp ? startOfDay(minDateTimestamp) : undefined),
            [minDateTimestamp],
        );

        const maxDate = useMemo(
            () => (maxDateTimestamp ? endOfDay(maxDateTimestamp) : undefined),
            [maxDateTimestamp],
        );

        const {
            activeMonth,
            weeks,
            months,
            years,
            canSetPrevMonth,
            canSetNextMonth,
            setMonthByDate,
            setPrevMonth,
            setNextMonth,
            highlighted,
            getDayProps,
            getMonthProps,
            getYearProps,
            getRootProps,
        } = useCalendar({
            month,
            defaultMonth,
            view,
            minDate,
            maxDate,
            selected,
            offDays,
            events,
            holidays,
            dayAddons,
            onChange: range.onChange,
            onMonthChange,
        });

        const toggleView = (newView: View) => {
            if (scrollableNodeRef.current) scrollableNodeRef.current.scrollTop = 0;

            setView(view === newView ? 'days' : newView);
        };

        const handleScroll = (event: SyntheticEvent) =>
            setScrolled(event.currentTarget.scrollTop > 0);

        const handlePrevArrowClick = () => {
            // TODO: Что должны делать стрелки при view !== days?
            setPrevMonth();
        };

        const handleNextArrowClick = () => setNextMonth();

        const handleMonthClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            toggleView('months');

            if (onMonthClick) {
                onMonthClick(event);
            }
        };

        const handleYearClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            toggleView('years');

            if (onYearClick) {
                onYearClick(event);
            }
        };

        useLayoutEffect_SAFE_FOR_SSR(() => {
            if (view === 'years') {
                const listNode = scrollableNodeRef.current;
                const selectedYearNode =
                    listNode?.querySelector<HTMLButtonElement>('button[tabIndex="0"]');

                if (listNode && selectedYearNode) {
                    const topIndent = listNode.clientHeight / 2 - selectedYearNode.clientHeight / 2;

                    listNode.scrollTop = selectedYearNode.offsetTop - topIndent;

                    setScrolled(listNode.scrollTop > 0);
                }
            }
        }, [view]);

        useLayoutEffect_SAFE_FOR_SSR(() => {
            if (firstUpdate.current) {
                firstUpdate.current = false;
            } else {
                toggleView('days');
            }
        }, [activeMonth]);

        useDidUpdateEffect(() => {
            setScrolled(false);
        }, [view]);

        useDidUpdateEffect(() => {
            const newMonth = range.value && startOfMonth(range.value);

            if (newMonth && newMonth.getTime() !== activeMonth.getTime()) {
                setMonthByDate(newMonth);
            }
        }, [range.value]);

        const shouldUseCustomScrollbar = useCustomWebkitScrollbar();

        return (
            <div
                {...getRootProps({ ref })}
                className={cn('cc-calendar', styles.component, className, {
                    [styles.sixWeeks]: weeks.length === 6,
                    [styles.responsive]: responsive,
                })}
                data-test-id={dataTestId}
            >
                {hasHeader && (
                    <Header view={selectorView} withShadow={scrolled} className={headerClassName}>
                        {selectorView === 'month-only' ? (
                            <PeriodSlider
                                className={styles.period}
                                value={activeMonth}
                                periodType='month'
                                prevArrowDisabled={!canSetPrevMonth}
                                nextArrowDisabled={!canSetNextMonth}
                                hideDisabledArrows={true}
                                showCurrentYearSelector={showCurrentYearSelector}
                                onPrevArrowClick={handlePrevArrowClick}
                                onNextArrowClick={handleNextArrowClick}
                                onPeriodClick={onPeriodClick}
                            />
                        ) : (
                            <MonthYearHeader
                                className={styles.monthYear}
                                value={activeMonth}
                                onMonthClick={handleMonthClick}
                                onYearClick={handleYearClick}
                            />
                        )}
                    </Header>
                )}

                <div
                    ref={scrollableNodeRef}
                    className={cn(
                        styles.container,
                        {
                            [styles.customScrollbar]: view === 'years' && shouldUseCustomScrollbar,
                            [styles.nativeScrollbar]: view === 'years' && !shouldUseCustomScrollbar,
                        },
                        styles[view],
                        contentClassName,
                    )}
                    onScroll={handleScroll}
                >
                    {view === 'days' && (
                        <DaysTable
                            weeks={weeks}
                            activeMonth={activeMonth}
                            selectedFrom={range.selectedFrom}
                            selectedTo={range.selectedTo}
                            getDayProps={getDayProps}
                            highlighted={highlighted}
                            rangeComplete={rangeComplete}
                            responsive={responsive}
                            shape={shape}
                            withTransition={selectorView === 'month-only'}
                        />
                    )}

                    {view === 'months' && (
                        <MonthsTable
                            selectedMonth={activeMonth}
                            months={months}
                            getMonthProps={getMonthProps}
                            responsive={responsive}
                        />
                    )}

                    {view === 'years' && (
                        <YearsTable
                            selectedYear={activeMonth}
                            years={years}
                            getYearProps={getYearProps}
                            responsive={responsive}
                        />
                    )}
                </div>
            </div>
        );
    },
);
