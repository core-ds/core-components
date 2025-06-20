import React, { FC, Fragment, ReactNode, useContext } from 'react';
import cn from 'classnames';

import { Button } from '@alfalab/core-components-button';
import { Spinner } from '@alfalab/core-components-spinner';
import { Text } from '@alfalab/core-components-typography';

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
    const { state, texts, timeLeft, blockSmsRetry, breakpoint, client } =
        useContext(ConfirmationContext);

    const renderText = (content: ReactNode) => (
        <Text
            className={cn(styles.countdownContainer, {
                [styles.countdownMobile]: mobile,
                [styles.typographyTheme]: !mobile,
            })}
            view={mobile ? 'primary-small' : 'primary-medium'}
            tag='div'
        >
            {content}
        </Text>
    );

    if (codeSendHintVisible) return renderText(texts.codeSended);

    if (processing) {
        return (
            <div
                className={cn(styles.loaderWrap, styles.countdownContainer, {
                    [styles.countdownLoaderMobile]: mobile,
                    [styles.typographyTheme]: !mobile,
                })}
            >
                <Spinner preset={24} visible={true} />

                <span className={styles.loaderText}>
                    {state === 'CODE_CHECKING' ? texts.codeChecking : texts.codeSending}
                </span>
            </div>
        );
    }

    if (blockSmsRetry) return renderText(texts.noAttemptsLeft);

    if (timePassed) {
        return (
            <Button
                size={mobile ? 'xs' : 'xxs'}
                view='secondary'
                onClick={handleSmsRetryClick}
                className={cn(styles.getCodeButton, { [styles.getCodeButtonMobile]: mobile })}
                breakpoint={breakpoint}
                client={client}
            >
                {texts.buttonRetry}
            </Button>
        );
    }

    return renderText(
        <Fragment>
            {texts.countdown}
            {'\u00A0'}
            <time className={styles.timeCounter}>{formatMsAsMinutes(timeLeft)}</time>
        </Fragment>,
    );
};
