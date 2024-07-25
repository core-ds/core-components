import React, {
    forwardRef,
    RefObject,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import mergeRefs from 'react-merge-refs';
import { Virtuoso } from 'react-virtuoso';
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';
import cn from 'classnames';
import { isAfter } from 'date-fns';
import endOfDay from 'date-fns/endOfDay';
import isSameMonth from 'date-fns/isSameMonth';
import startOfDay from 'date-fns/startOfDay';
import startOfMonth from 'date-fns/startOfMonth';

import { ButtonMobile } from '@alfalab/core-components-button/mobile';
import { ModalMobile } from '@alfalab/core-components-modal/mobile';
import { getDataTestId } from '@alfalab/core-components-shared';
import { Typography } from '@alfalab/core-components-typography';

import { CalendarDesktop } from '../../desktop';
import { Month } from '../../typings';
import { useCalendar } from '../../useCalendar';
import { useRange } from '../../useRange';
import {
    addonArrayToHashTable,
    dateArrayToHashTable,
    generateMonths,
    generateWeeks,
    isRangeValue,
    limitDate,
    monthName,
    WEEKDAYS,
} from '../../utils';
import { DaysTable } from '../days-table';

import { CalendarContentProps, CalendarMobileProps, ResetCurrentClickedMonth } from './typings';

import backdropTransitionStyles from './backdrop-transitions.module.css';
import styles from './index.module.css';
import transitionStyles from './transitions.module.css';

// ResizeObserverPolyfill необходим для корректной работы react-virtuoso.
if (typeof window !== 'undefined' && !window.ResizeObserver) {
    window.ResizeObserver = ResizeObserverPolyfill;
}

export const CalendarMonthOnlyView = ({
    value,
    mode = 'single',
    rangeBehavior = 'clarification',
    month: monthTimestamp,
    minDate: minDateTimestamp,
    maxDate: maxDateTimestamp,
    defaultMonth: defaultMonthTimestamp,
    offDays,
    events,
    holidays,
    onChange,
    onMonthTitleClick,
    selectedFrom,
    selectedTo,
    yearsAmount = 3,
    dayAddons,
    shape = 'rounded',
    scrollableContainer,
    clickableMonth,
    resetCurrentClickedMonth,
}: CalendarContentProps & {
    /**
     * FIXME нужно сделать для компонента CalendarMonthOnlyView отдельный тип пропсов, т.к. тип CalendarContentProps intersection для типа CalendarMobileProps
     * FIXME это приводит к тому, что в доку сторибука попадают типы пропсов, которые нужны для работы компонента CalendarMonthOnlyView, но не нужны для компонента CalendarMobile
     * TODO Вынести компонент CalendarMonthOnlyView в отдельный файл
     */
    clickableMonth?: boolean;

    /**
     * Ref для сброса заголовка clickableMonth
     */
    resetCurrentClickedMonth?: RefObject<ResetCurrentClickedMonth>;
}) => {
    const [currentActiveMonth, setCurrentActiveMonth] = useState('');

    const range = useRange({
        mode,
        value,
        selectedFrom,
        selectedTo,
        rangeBehavior,
        onChange,
    });

    const month = useMemo(
        () => (monthTimestamp ? new Date(monthTimestamp) : undefined),
        [monthTimestamp],
    );

    const minDate = useMemo(
        () => (minDateTimestamp ? startOfDay(minDateTimestamp) : undefined),
        [minDateTimestamp],
    );

    const maxDate = useMemo(() => {
        // блокируем последующие дни после текущего
        if (clickableMonth && !maxDateTimestamp) {
            return new Date();
        }

        return maxDateTimestamp ? endOfDay(maxDateTimestamp) : undefined;
    }, [maxDateTimestamp, clickableMonth]);

    const selected = useMemo(
        () => (range.value ? new Date(range.value) : undefined),
        [range.value],
    );

    const startingDate = useRef(range.value);

    const defaultMonth = useMemo(
        () =>
            startOfMonth(
                selected ||
                    limitDate(
                        defaultMonthTimestamp || Date.now(),
                        minDateTimestamp,
                        maxDateTimestamp,
                    ),
            ),
        [defaultMonthTimestamp, maxDateTimestamp, minDateTimestamp, selected],
    );

    const { activeMonth, highlighted, getDayProps } = useCalendar({
        month,
        defaultMonth,
        view: 'months',
        minDate,
        maxDate,
        selected,
        offDays,
        events,
        onChange: range.onChange,
        dayAddons,
        ...(clickableMonth && { resetCurrentClickedMonth }),
    });

    const activeMonths = useMemo(() => {
        const eventsMap = dateArrayToHashTable(events || []);
        const offDaysMap = dateArrayToHashTable(offDays || []);
        const holidaysMap = dateArrayToHashTable(holidays || []);
        const dayAddonsMap = addonArrayToHashTable(dayAddons || []);

        const prevMonths: Month[] = [];
        const nextMonths: Month[] = [];

        const date = startingDate.current ? new Date(startingDate.current) : new Date();
        const currentYear = date.getFullYear();
        const currYearMonths = generateMonths(date, {});

        for (let i = 0; i < yearsAmount; i++) {
            const prevYear = date.setFullYear(currentYear - (i + 1));
            const nextYear = date.setFullYear(currentYear + (i + 1));

            const prevYearMonths = generateMonths(new Date(prevYear), {});
            const nextYearMonths = generateMonths(new Date(nextYear), {});

            prevMonths.unshift(...prevYearMonths);
            nextMonths.push(...nextYearMonths);
        }

        const generatedMonths = [...prevMonths, ...currYearMonths, ...nextMonths];

        return generatedMonths.map((item) => ({
            ...item,
            weeks: generateWeeks(item.date, {
                minDate,
                maxDate,
                selected,
                eventsMap,
                offDaysMap,
                holidaysMap,
                dayAddonsMap,
            }),
            title: `${monthName(item.date)} ${item.date.getFullYear()}`,
        }));
    }, [events, offDays, holidays, dayAddons, minDate, maxDate, yearsAmount, selected]);

    const initialMonthIndex = useMemo(() => {
        const date = range.value || range.selectedFrom || activeMonth.getTime() || Date.now();

        return activeMonths.findIndex((m) => isSameMonth(date, m.date));
    }, [range.value, range.selectedFrom, activeMonth, activeMonths]);

    const handleClickMonth = (index: number) => {
        if (activeMonths[index].title !== currentActiveMonth || currentActiveMonth === '') {
            setCurrentActiveMonth(activeMonths[index].title);
        } else {
            setCurrentActiveMonth('');
            if (onChange) {
                onChange();
            }
        }
    };

    const renderMonth = (index: number) => {
        const monthClicked = currentActiveMonth === activeMonths[index].title;
        const isAfterDate = isAfter(activeMonths[index].date, activeMonth);

        return (
            <div className={styles.daysTable} id={`month-${index}`}>
                {onMonthTitleClick ? (
                    /* eslint-disable-next-line jsx-a11y/click-events-have-key-events */
                    <span
                        className={styles.month}
                        onClick={onMonthTitleClick}
                        tabIndex={0}
                        role='button'
                    >
                        {activeMonths[index].title}
                    </span>
                ) : (
                    // todo вынести все в компоненты, чтобы не добавлять кучу проверок на пропс clickableMonth
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                    <span
                        className={cn(styles.month, {
                            ...(clickableMonth && {
                                [styles.clickableMonth]: true,
                                [styles.rectangular]: shape === 'rectangular',
                                [styles.active]: monthClicked,
                                [styles.disabled]: isAfterDate,
                            }),
                        })}
                        {...(clickableMonth && { onClick: () => handleClickMonth(index) })}
                    >
                        {clickableMonth ? (
                            <Typography.Text
                                className={styles.monthTitle}
                                view='primary-small'
                                color='primary'
                            >
                                {`\u00A0${activeMonths[index].title}\u00A0`}
                            </Typography.Text>
                        ) : (
                            `\u00A0${activeMonths[index].title}\u00A0`
                        )}
                    </span>
                )}
                <DaysTable
                    withTransition={false}
                    weeks={activeMonths[index].weeks}
                    activeMonth={activeMonth}
                    selectedFrom={range.selectedFrom}
                    selectedTo={range.selectedTo}
                    getDayProps={getDayProps}
                    highlighted={highlighted}
                    hasHeader={false}
                    responsive={true}
                    shape={shape}
                    monthClicked={monthClicked}
                    onChange={onChange}
                />
            </div>
        );
    };

    useImperativeHandle(resetCurrentClickedMonth, () => ({
        resetCurrentClickedMonth: () => {
            setCurrentActiveMonth('');
        },
    }));

    return (
        <Virtuoso
            totalCount={activeMonths.length}
            itemContent={renderMonth}
            initialTopMostItemIndex={{ index: initialMonthIndex ?? 0, align: 'center' }}
            increaseViewportBy={500}
            itemSize={(el) => el.getBoundingClientRect().height + 32}
            customScrollParent={scrollableContainer}
            useWindowScroll={true}
            className={styles.virtuoso}
        />
    );
};

export const CalendarMonthOnlyViewHeader = () => (
    <table className={styles.dayNames}>
        <thead>
            <tr>
                {WEEKDAYS.map((dayName) => (
                    <th className={styles.dayName} key={dayName}>
                        {dayName}
                    </th>
                ))}
            </tr>
        </thead>
    </table>
);

export const CalendarMobile = forwardRef<HTMLDivElement, CalendarMobileProps>(
    (
        {
            hasHeader = true,
            allowSelectionFromEmptyRange = false,
            className,
            defaultView = 'days',
            selectorView = 'full',
            value,
            selectedFrom,
            selectedTo,
            onChange,
            onMonthTitleClick,
            dataTestId,
            open,
            onClose,
            title = 'Календарь',
            yearsAmount = 3,
            onApply,
            clickableMonth,
            ...restProps
        },
        ref,
    ) => {
        const [modalRef, setModalRef] = useState<HTMLElement>();
        const resetCurrentClickedMonth = useRef<ResetCurrentClickedMonth>(null);
        const monthOnlyView = selectorView === 'month-only';

        const handleClose = () => {
            if (onClose) onClose();
        };

        const handleApply = () => {
            onApply?.();
            handleClose?.();
        };

        const handleClear = () => {
            if (onChange) onChange();
            resetCurrentClickedMonth?.current?.resetCurrentClickedMonth();
        };

        const renderDayNames = () => (monthOnlyView ? <CalendarMonthOnlyViewHeader /> : null);

        const renderContent = () => {
            const commonProps = {
                value,
                onChange,
                defaultView,
                selectorView,
                selectedFrom,
                selectedTo,
            };

            if (monthOnlyView) {
                return (
                    <CalendarMonthOnlyView
                        yearsAmount={yearsAmount}
                        scrollableContainer={modalRef}
                        onMonthTitleClick={onMonthTitleClick}
                        clickableMonth={clickableMonth}
                        resetCurrentClickedMonth={resetCurrentClickedMonth}
                        {...commonProps}
                        {...restProps}
                    />
                );
            }

            return (
                <CalendarDesktop
                    responsive={true}
                    className={cn(className, styles.calendar)}
                    contentClassName={styles.content}
                    dataTestId={getDataTestId(dataTestId, 'mobile')}
                    {...commonProps}
                    {...restProps}
                />
            );
        };

        const renderFooter = () => {
            const valueFrom = isRangeValue(value) ? value.dateFrom : selectedFrom;
            const valueTo = isRangeValue(value) ? value.dateTo : selectedTo;

            if (valueFrom || valueTo) {
                let selectButtonDisabled = !valueFrom || !valueTo;

                if (allowSelectionFromEmptyRange) {
                    selectButtonDisabled = !valueFrom;
                }

                return (
                    <React.Fragment>
                        <ButtonMobile
                            view='secondary'
                            size='m'
                            block={true}
                            onClick={handleClear}
                            dataTestId={getDataTestId(dataTestId, 'btn-reset')}
                        >
                            Сбросить
                        </ButtonMobile>
                        <ButtonMobile
                            view='primary'
                            size='m'
                            block={true}
                            onClick={handleApply}
                            disabled={selectButtonDisabled}
                            dataTestId={getDataTestId(dataTestId, 'btn-apply')}
                        >
                            Выбрать
                        </ButtonMobile>
                    </React.Fragment>
                );
            }

            if (value) {
                return (
                    <ButtonMobile
                        view='primary'
                        size='m'
                        block={true}
                        onClick={handleApply}
                        dataTestId={getDataTestId(dataTestId, 'btn-apply')}
                    >
                        Выбрать
                    </ButtonMobile>
                );
            }

            return (
                <ButtonMobile
                    view='secondary'
                    size='m'
                    block={true}
                    onClick={handleClose}
                    dataTestId={getDataTestId(dataTestId, 'btn-reset')}
                >
                    Отмена
                </ButtonMobile>
            );
        };

        return (
            <ModalMobile
                open={open}
                onClose={handleClose}
                ref={mergeRefs([(node: HTMLDivElement) => setModalRef(node), ref])}
                className={className}
                wrapperClassName={styles.wrapper}
                transitionProps={{
                    timeout: 360,
                    classNames: transitionStyles,
                }}
                backdropProps={{
                    transitionClassNames: backdropTransitionStyles,
                    timeout: 360,
                }}
                dataTestId={dataTestId}
            >
                {hasHeader && (
                    <ModalMobile.Header
                        hasCloser={true}
                        title={title}
                        sticky={true}
                        bottomAddons={renderDayNames()}
                        className={cn({ [styles.withZIndex]: selectorView === 'full' })}
                    />
                )}
                <ModalMobile.Content className={styles.contentModal} flex={true}>
                    {renderContent()}
                </ModalMobile.Content>
                <ModalMobile.Footer
                    sticky={true}
                    className={cn({ [styles.withZIndex]: selectorView === 'full' })}
                >
                    {renderFooter()}
                </ModalMobile.Footer>
            </ModalMobile>
        );
    },
);
