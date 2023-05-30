import React from 'react';

import { ButtonDesktop as Button } from '@alfalab/core-components-button/desktop';

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
        <Button size='xxs' view='primary' onClick={handleApply}>
            Применить
        </Button>

        {showClear && selectedDraft.length > 0 && (
            <Button size='xxs' view='secondary' onClick={handleClear}>
                Сбросить
            </Button>
        )}
    </div>
);
