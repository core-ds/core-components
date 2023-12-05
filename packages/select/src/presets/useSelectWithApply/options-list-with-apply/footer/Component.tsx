import React from 'react';

import { ButtonDesktop } from '@alfalab/core-components-button/desktop';
import { getDataTestId } from '@alfalab/core-components-shared';

import { OptionShape } from '../../../../typings';

import styles from './index.module.css';

export type FooterProps = {
    handleClear?: () => void;
    handleApply?: () => void;
    showClear?: boolean;
    selectedDraft?: OptionShape[];
    dataTestId?: string;
};

export const Footer = ({
    handleApply,
    handleClear,
    showClear,
    selectedDraft = [],
    dataTestId,
}: FooterProps) => (
    <div
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        className={styles.footer}
    >
        <ButtonDesktop
            size={32}
            view='primary'
            onClick={handleApply}
            dataTestId={getDataTestId(dataTestId, 'apply')}
        >
            Применить
        </ButtonDesktop>

        {showClear && selectedDraft.length > 0 && (
            <ButtonDesktop
                size={32}
                view='secondary'
                onClick={handleClear}
                dataTestId={getDataTestId(dataTestId, 'clear')}
            >
                Сбросить
            </ButtonDesktop>
        )}
    </div>
);
