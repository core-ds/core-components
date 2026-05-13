import React, { forwardRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';
import cn from 'classnames';

import { ButtonMobile } from '@alfalab/core-components-button/mobile';
import { ModalMobile } from '@alfalab/core-components-modal/mobile';
import { getDataTestId } from '@alfalab/core-components-shared';

import { CalendarDesktop } from '../../desktop';
import { isRangeValue, WEEKDAYS } from '../../utils';

import { CalendarMonthOnlyView } from './calendarMonthOnlyView';
import { type CalendarMobileProps } from './typings';

import backdropTransitionStyles from './backdrop-transitions.module.css';
import styles from './index.module.css';
import transitionStyles from './transitions.module.css';

// ResizeObserverPolyfill необходим для корректной работы react-virtuoso.
if (typeof window !== 'undefined' && !window.ResizeObserver) {
    window.ResizeObserver = ResizeObserverPolyfill;
}

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
            cancelButtonContent = 'Отмена',
            selectButtonContent = 'Выбрать',
            resetButtonContent = 'Сбросить',
            hasBackButton = false,
            onBack,
            ...restProps
        },
        ref,
    ) => {
        const [modalRef, setModalRef] = useState<HTMLElement>();
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
                    mobile={true}
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
                            size={56}
                            block={true}
                            onClick={handleClear}
                            dataTestId={getDataTestId(dataTestId, 'btn-reset')}
                        >
                            {resetButtonContent}
                        </ButtonMobile>
                        <ButtonMobile
                            view='primary'
                            size={56}
                            block={true}
                            onClick={handleApply}
                            disabled={selectButtonDisabled}
                            dataTestId={getDataTestId(dataTestId, 'btn-apply')}
                        >
                            {selectButtonContent}
                        </ButtonMobile>
                    </React.Fragment>
                );
            }

            /**
             * value может быть числом и объектом, для текущего кейса проверяем на typeof number
             * иначе может приводить к багу, когда выводится кнопка "Выбрать" для дефолтного значения календаря
             */
            if (value && typeof value === 'number') {
                return (
                    <ButtonMobile
                        view='primary'
                        size={56}
                        block={true}
                        onClick={handleApply}
                        dataTestId={getDataTestId(dataTestId, 'btn-apply')}
                    >
                        {selectButtonContent}
                    </ButtonMobile>
                );
            }

            return (
                <ButtonMobile
                    view='secondary'
                    size={56}
                    block={true}
                    onClick={handleClose}
                    dataTestId={getDataTestId(dataTestId, 'btn-reset')}
                >
                    {cancelButtonContent}
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
                        hasBackButton={hasBackButton}
                        title={title}
                        sticky={true}
                        bottomAddons={renderDayNames()}
                        className={cn({ [styles.withZIndex]: selectorView === 'full' })}
                        onBack={onBack}
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
