import React, { useContext, useEffect, Fragment, FC } from 'react';

import { Typography } from '@alfalab/core-components-typography';

import { CountdownLoader } from '../../countdown-loader';
import { Header } from '../../header';

import { ConfirmationContext } from '../../../context';
import { formatMsAsMinutes, useCountdown } from '../../../utils';

import styles from './index.module.css';

export type TempBlockProps = {
    /**
     * Отображать в мобильной версии экран компонента
     */
    mobile?: boolean;
};

export const TempBlock: FC<TempBlockProps> = ({ mobile }) => {
    const { texts, tempBlockDuration, onChangeScreen, onTempBlockFinished } = useContext(
        ConfirmationContext,
    );

    const [timeLeft, startTimer] = useCountdown(tempBlockDuration);

    useEffect(() => {
        startTimer();
    }, [startTimer]);

    useEffect(() => {
        if (timeLeft === 0 && onTempBlockFinished) {
            onTempBlockFinished();
        }
    }, [timeLeft, onChangeScreen, onTempBlockFinished]);

    return (
        <Fragment>
            <Header mobile={mobile}>{texts.tempBlockTitle}</Header>

            <Typography.Text view='primary-medium' color='primary' className={styles.description}>
                {texts.tempBlockDescription}
            </Typography.Text>

            <div className={styles.countdownWrap}>
                <CountdownLoader
                    progress={1 - timeLeft / tempBlockDuration}
                    className={styles.loader}
                />

                {formatMsAsMinutes(timeLeft)}
            </div>
        </Fragment>
    );
};
