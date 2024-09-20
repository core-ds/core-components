import React, { ComponentType, FC, useEffect, useMemo } from 'react';
import cn from 'classnames';

import { getComponentBreakpoint } from '@alfalab/core-components-shared';
import { usePrevious } from '@alfalab/hooks';

import { ConfirmationContext } from '../../context';
import { ConfirmationProps, defaultTexts, TConfirmationContext } from '../../types';
import { ONE_DAY, ONE_MINUTE, useCountdown } from '../../utils';
import { FatalError, Hint, Initial, TempBlock } from '../screens';

import styles from './index.module.css';

const confirmationScreens: { [key: string]: ComponentType<{ mobile?: boolean }> } = {
    INITIAL: Initial,
    HINT: Hint,
    FATAL_ERROR: FatalError,
    TEMP_BLOCK: TempBlock,
};

export const BaseConfirmation: FC<ConfirmationProps> = ({
    state,
    screen,
    alignContent = 'left',
    children,
    requiredCharAmount = 5,
    countdownDuration = ONE_MINUTE,
    tempBlockDuration = ONE_DAY,
    phone,
    blockSmsRetry,
    dataTestId,
    className,
    getScreensMap,
    onInputFinished,
    onChangeState,
    onSmsRetryClick,
    onChangeScreen,
    onFatalErrorOkButtonClick,
    onTempBlockFinished,
    mobile,
    clearCodeOnError = true,
    hideCountdownSection = false,
    breakpoint = getComponentBreakpoint(),
    initialScreenHintSlot,
    errorVisibleDuration,
    ...restProps
}) => {
    const [timeLeft, startTimer, stopTimer] = useCountdown(countdownDuration);

    const prevState = usePrevious(state);

    useEffect(() => {
        startTimer();
    }, [startTimer]);

    useEffect(() => {
        /**
         * Перезапускаем таймер после повторного запроса кода
         */
        if (state === 'INITIAL' && prevState === 'CODE_SENDING') {
            startTimer();
        }
    }, [state, prevState, startTimer]);

    useEffect(() => {
        /**
         * Останавливаем таймер, если новый экран/состояние не содержит таймер
         */
        if (!['INITIAL', 'HINT', 'TEMP_BLOCK'].includes(screen) || blockSmsRetry) {
            stopTimer();
        }
    }, [state, screen, blockSmsRetry, stopTimer]);

    const handleSmsRetry = () => {
        onChangeState('CODE_SENDING');

        onSmsRetryClick();
    };

    const handleInputFinished = (code: string) => {
        onChangeState('CODE_CHECKING');

        onInputFinished(code);
    };

    const handleFatalErrorOkButtonClick = () => {
        if (onFatalErrorOkButtonClick) {
            onFatalErrorOkButtonClick();
        }
    };

    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const contextValue: TConfirmationContext = {
        hideCountdownSection,
        alignContent,
        texts: { ...defaultTexts, ...restProps.texts },
        state,
        screen,
        requiredCharAmount,
        countdownDuration,
        timeLeft,
        tempBlockDuration,
        phone,
        blockSmsRetry,
        breakpoint,
        onTempBlockFinished,
        onChangeState,
        onChangeScreen,
        clearCodeOnError,
        errorVisibleDuration,
        initialScreenHintSlot,
        onInputFinished: handleInputFinished,
        onSmsRetryClick: handleSmsRetry,
        onFatalErrorOkButtonClick: handleFatalErrorOkButtonClick,
    };

    const customScreen = useMemo(
        () => getScreensMap && getScreensMap(confirmationScreens),
        [getScreensMap],
    );

    const screensMap = customScreen || confirmationScreens;

    const CurrentScreen = screensMap[screen];

    return (
        <ConfirmationContext.Provider value={contextValue}>
            <div className={cn(styles.component, className)} data-test-id={dataTestId}>
                {CurrentScreen && <CurrentScreen mobile={mobile} />}
            </div>
        </ConfirmationContext.Provider>
    );
};
