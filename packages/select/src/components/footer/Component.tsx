import React, { useContext, useEffect } from 'react';
import cn from 'classnames';

import { BaseModalContext } from '@alfalab/core-components-base-modal';
import { ButtonMobile } from '@alfalab/core-components-button/mobile';
import { getDataTestId } from '@alfalab/core-components-shared';

import styles from './index.module.css';

export type FooterProps = {
    handleClear?: () => void;
    handleApply?: () => void;
    showClear?: boolean;
    clearText?: string;
    applyText?: string;
    dataTestId?: string;
};

export const Footer = ({
    handleApply,
    handleClear,
    showClear,
    clearText = 'Сбросить',
    applyText = 'Применить',
    dataTestId,
}: FooterProps) => {
    const { footerHighlighted, setHasFooter } = useContext(BaseModalContext);

    useEffect(() => {
        setHasFooter(true);
    }, [setHasFooter]);

    return (
        <div
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
            className={cn(styles.footer, {
                [styles.highlighted]: footerHighlighted,
            })}
        >
            {showClear && (
                <ButtonMobile
                    size={56}
                    view='secondary'
                    className={styles.button}
                    onClick={handleClear}
                    dataTestId={getDataTestId(dataTestId, 'clear')}
                >
                    {clearText}
                </ButtonMobile>
            )}

            <ButtonMobile
                size={56}
                view='primary'
                className={styles.button}
                onClick={handleApply}
                dataTestId={getDataTestId(dataTestId, 'apply')}
            >
                {applyText}
            </ButtonMobile>
        </div>
    );
};
