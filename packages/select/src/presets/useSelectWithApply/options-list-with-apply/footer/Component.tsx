import React from 'react';

import { ButtonDesktop } from '@alfalab/core-components-button/desktop';

import { OptionShape } from '../../../../typings';

import styles from './index.module.css';

export type FooterProps = {
    handleClear?: () => void;
    handleApply?: () => void;
    showClear?: boolean;
    selectedDraft?: OptionShape[];
};

export const Footer = ({
    handleApply,
    handleClear,
    showClear,
    selectedDraft = [],
}: FooterProps) => (
    <div
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        className={styles.footer}
    >
        <ButtonDesktop size='xxs' view='primary' onClick={handleApply}>
            Применить
        </ButtonDesktop>

        {showClear && selectedDraft.length > 0 && (
            <ButtonDesktop size='xxs' view='secondary' onClick={handleClear}>
                Сбросить
            </ButtonDesktop>
        )}
    </div>
);
