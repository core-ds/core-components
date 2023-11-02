import React, { useContext, useEffect } from 'react';
import cn from 'classnames';

import { BaseModalContext } from '@alfalab/core-components-base-modal';
import { ButtonMobile } from '@alfalab/core-components-button/mobile';

import styles from './index.module.css';

export type FooterProps = {
    handleClear?: () => void;
    handleApply?: () => void;
    showClear?: boolean;
};

export const Footer = ({ handleApply, handleClear, showClear }: FooterProps) => {
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
                    size='m'
                    view='secondary'
                    className={styles.button}
                    onClick={handleClear}
                >
                    Сбросить
                </ButtonMobile>
            )}

            <ButtonMobile size='m' view='primary' className={styles.button} onClick={handleApply}>
                Применить
            </ButtonMobile>
        </div>
    );
};
