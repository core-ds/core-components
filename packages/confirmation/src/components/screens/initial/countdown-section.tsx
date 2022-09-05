import React, { useContext, FC } from 'react';
import cn from 'classnames';

import { Loader } from '@alfalab/core-components-loader';
import { Button } from '@alfalab/core-components-button';
import { Typography } from '@alfalab/core-components-typography';

import { ConfirmationContext } from '../../../context';
import { formatMsAsMinutes } from '../../../utils';

import styles from './index.module.css';

type CountdownSectionProps = {
    codeSendHintVisible: boolean;
    timePassed: boolean;
    processing: boolean;
    mobile?: boolean;
    handleSmsRetryClick: () => void;
};

export const CountdownSection: FC<CountdownSectionProps> = ({
    codeSendHintVisible,
    timePassed,
    processing,
    mobile,
    handleSmsRetryClick,
}) => {
    const { state, texts, timeLeft, blockSmsRetry } = useContext(ConfirmationContext);

    if (codeSendHintVisible) {
        return (
            <Typography.Text
                className={styles.countdownContainer}
                view={mobile ? 'primary-small' : 'primary-medium'}
                tag='div'
            >
                {texts.codeSended}
            </Typography.Text>
        );
    }

    if (processing) {
        return (
            <div className={cn(styles.loaderWrap, styles.countdownContainer)}>
                <Loader />

                <span className={styles.loaderText}>
                    {state === 'CODE_CHECKING' ? texts.codeChecking : texts.codeSending}
                </span>
            </div>
        );
    }

    if (blockSmsRetry) {
        return (
            <Typography.Text
                className={styles.countdownContainer}
                view={mobile ? 'primary-small' : 'primary-medium'}
                tag='div'
            >
                {texts.noAttemptsLeft}
            </Typography.Text>
        );
    }

    if (timePassed) {
        return (
            <Button
                size={mobile ? 'xs' : 's'}
                view='secondary'
                onClick={handleSmsRetryClick}
                className={styles.getCodeButton}
            >
                {texts.buttonRetry}
            </Button>
        );
    }

    return (
        <Typography.Text
            className={cn(styles.countdown, styles.countdownContainer)}
            view={mobile ? 'primary-small' : 'primary-medium'}
            tag='div'
        >
            {texts.countdown} {formatMsAsMinutes(timeLeft)}
        </Typography.Text>
    );
};
