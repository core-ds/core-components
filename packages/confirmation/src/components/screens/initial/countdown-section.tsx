import React, { FC,useContext } from 'react';
import cn from 'classnames';

import { Button } from '@alfalab/core-components-button';
import { Loader } from '@alfalab/core-components-loader';
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
                className={cn(styles.countdownContainer, {
                    [styles.countdownMobile]: mobile,
                    [styles.typographyTheme]: !mobile,
                })}
                view={mobile ? 'primary-small' : 'primary-medium'}
                tag='div'
            >
                {texts.codeSended}
            </Typography.Text>
        );
    }

    if (processing) {
        return (
            <div
                className={cn(styles.loaderWrap, styles.countdownContainer, {
                    [styles.countdownLoaderMobile]: mobile,
                    [styles.typographyTheme]: !mobile,
                })}
            >
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
                className={cn(styles.countdownContainer, {
                    [styles.countdownMobile]: mobile,
                    [styles.typographyTheme]: !mobile,
                })}
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
                size={mobile ? 'xs' : 'xxs'}
                view='secondary'
                onClick={handleSmsRetryClick}
                className={cn(styles.getCodeButton, { [styles.getCodeButtonMobile]: mobile })}
            >
                {texts.buttonRetry}
            </Button>
        );
    }

    return (
        <Typography.Text
            className={cn(styles.countdown, styles.countdownContainer, {
                [styles.countdownMobile]: mobile,
                [styles.typographyTheme]: !mobile,
            })}
            view={mobile ? 'primary-small' : 'primary-medium'}
            tag='div'
        >
            {texts.countdown} {formatMsAsMinutes(timeLeft)}
        </Typography.Text>
    );
};
