import React, { FC, useContext, useEffect } from 'react';
import cn from 'classnames';

import { Typography } from '@alfalab/core-components-typography';

import { ConfirmationContext } from '../../../context';
import { formatMsAsMinutes, useCountdown } from '../../../utils';
import { CountdownLoader } from '../../countdown-loader';
import { Header } from '../../header';

import styles from './index.module.css';

export type TempBlockProps = {
    /**
     * Отображать в мобильной версии экран компонента
     */
    mobile?: boolean;
};

export const TempBlock: FC<TempBlockProps> = ({ mobile }) => {
    const { alignContent, texts, tempBlockDuration, onChangeScreen, onTempBlockFinished } =
        useContext(ConfirmationContext);

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
        <div className={cn(styles.component, styles[alignContent])}>
            <Header mobile={mobile}>{texts.tempBlockTitle}</Header>

            <Typography.Text
                view='primary-medium'
                color='primary'
                className={cn(styles.description, { [styles.typographyTheme]: !mobile })}
            >
                {texts.tempBlockDescription}
            </Typography.Text>

            <div className={cn(styles.countdownWrap, { [styles.typographyTheme]: !mobile })}>
                <CountdownLoader
                    progress={1 - timeLeft / tempBlockDuration}
                    className={styles.loader}
                />

                {formatMsAsMinutes(timeLeft)}
            </div>
        </div>
    );
};
