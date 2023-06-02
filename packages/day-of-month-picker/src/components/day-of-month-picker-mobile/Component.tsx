import React, { forwardRef, useRef } from 'react';
import cn from 'classnames';

import { ModalMobile } from '@alfalab/core-components-modal/mobile';

import { DayOfMonthPickerDesktop, DayOfMontPickerDesktopProps } from '../../Component.desktop';

import styles from './index.module.css';

export type DayOfMonthPickerMobileProps = DayOfMontPickerDesktopProps & {
    /**
     * Управление видимостью модалки
     */
    open: boolean;
    /**
     * Обработчик закрытия модалки
     */
    onClose?: () => void;
};

export const DayOfMonthPickerMobile = forwardRef<HTMLDivElement, DayOfMonthPickerMobileProps>(
    ({ className, value, onChange, dataTestId, open, onClose }, ref) => {
        const modalRef = useRef<HTMLDivElement>(null);

        return (
            <div className={cn(className, styles.component)} ref={ref} data-test-id={dataTestId}>
                <ModalMobile
                    open={open}
                    onClose={onClose}
                    ref={modalRef}
                    className={styles.modal}
                    wrapperClassName={styles.wrapper}
                >
                    <ModalMobile.Header
                        hasCloser={true}
                        title='Какого числа'
                        sticky={true}
                        className={cn({ [styles.withZIndex]: true })}
                    />
                    <ModalMobile.Content flex={true}>
                        <DayOfMonthPickerDesktop
                            responsive={true}
                            className={styles.calendar}
                            value={value}
                            onChange={onChange}
                        />
                    </ModalMobile.Content>
                </ModalMobile>
            </div>
        );
    },
);
