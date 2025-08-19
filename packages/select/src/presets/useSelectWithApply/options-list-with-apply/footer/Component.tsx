import React from 'react';
import cn from 'classnames';

import { ButtonDesktop } from '@alfalab/core-components-button/desktop';
import { getDataTestId } from '@alfalab/core-components-shared';

import { SIZE_TO_CLASSNAME_MAP } from '../../../../consts';
import { OptionShape, OptionsListProps } from '../../../../typings';

import styles from './index.module.css';

export type FooterProps = {
    handleClear?: () => void;
    handleApply?: () => void;
    showClear?: boolean;
    selectedDraft?: OptionShape[];
    dataTestId?: string;
    size?: OptionsListProps['size'];
};

export const Footer = ({
    handleApply,
    handleClear,
    showClear,
    selectedDraft = [],
    dataTestId,
    size,
}: FooterProps) => (
    <div
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        className={cn(styles.footer, size && styles[SIZE_TO_CLASSNAME_MAP[size]])}
    >
        <ButtonDesktop
            size={32}
            view='primary'
            onClick={handleApply}
            dataTestId={getDataTestId(dataTestId, 'apply')}
            className={styles.button}
        >
            Применить
        </ButtonDesktop>

        {showClear && selectedDraft.length > 0 && (
            <ButtonDesktop
                size={32}
                view='secondary'
                onClick={handleClear}
                dataTestId={getDataTestId(dataTestId, 'clear')}
                className={styles.button}
            >
                Сбросить
            </ButtonDesktop>
        )}
    </div>
);
