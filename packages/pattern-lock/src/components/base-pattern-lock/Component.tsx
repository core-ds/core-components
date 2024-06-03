import React, { forwardRef, useEffect, useState } from 'react';
import type { Theme, TPatternLockInstance } from 'react-canvas-pattern-lock';
import { ReactCanvasPatternLock } from 'react-canvas-pattern-lock';
import cn from 'classnames';

import { ButtonMobile } from '@alfalab/core-components-button/mobile';
import { getDataTestId } from '@alfalab/core-components-shared';
import { Toast } from '@alfalab/core-components-toast';

import {
    DEFAULT_EXTRA_BOUNDS,
    OBSERVABLE_TOKENS,
    OBSERVE_OPTIONS,
    THEME_STATE,
} from '../../consts';
import { usePatternLock } from '../../hooks/usePatternLock';
import type { CommonPatternLockProps, PrivatePatternLockProps } from '../../typings';
import { getColorByToken, getDefaultObserveTarget, getSizes, getTheme } from '../../utils';

import commonStyles from './index.module.css';

export const BasePatternLock = forwardRef<
    TPatternLockInstance,
    CommonPatternLockProps & PrivatePatternLockProps
>(
    (
        {
            observeTokens = false,
            observerParams = {},
            justifyNodes = 'space-between',
            className,
            error,
            dataTestId,
            forgotCodeBtnText = 'Забыли код?',
            showForgotCodeBtn = false,
            onForgotBtnClick,
            extraBounds = DEFAULT_EXTRA_BOUNDS,
            message,
            messageClassName,
            hover,
            styles = {},
            errorMessage = 'Неправильный код',
            ...restProps
        },
        ref,
    ) => {
        const [params, setParams] = useState<
            { theme: Theme; width: number; height: number } | undefined
        >();

        const { patternLockRef } = usePatternLock();

        useEffect(() => {
            const { elementSizes, width, height } = getSizes();

            setParams({
                theme: getTheme(elementSizes),
                width,
                height,
            });
        }, []);

        useEffect(() => {
            let styleObserver: MutationObserver | null = null;

            if (observeTokens) {
                const { options = OBSERVE_OPTIONS, getTarget = getDefaultObserveTarget } =
                    observerParams;

                styleObserver = new MutationObserver(() =>
                    setParams((prevState) => {
                        const { width, height, elementSizes } = getSizes();

                        if (!prevState) {
                            return { theme: getTheme(elementSizes), width, height };
                        }

                        const prevBgColor = prevState.theme[THEME_STATE.INITIAL].colors.bg;
                        const themeChanged = prevBgColor !== getColorByToken(OBSERVABLE_TOKENS.BG);

                        if (themeChanged) return { ...prevState, theme: getTheme(elementSizes) };

                        return prevState;
                    }),
                );

                styleObserver.observe(getTarget(), options);
            }

            return () => styleObserver?.disconnect();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [observeTokens]);

        const renderMessage = () => (
            <div
                className={cn(commonStyles.message, messageClassName, {
                    [commonStyles.error]: error,
                })}
                data-test-id={getDataTestId(dataTestId, 'message')}
            >
                {message}
            </div>
        );

        return (
            <div
                className={cn(commonStyles.component, styles.component, className, {
                    [commonStyles.hidden]: !params,
                })}
                data-test-id={dataTestId}
                ref={patternLockRef}
            >
                <Toast
                    title={errorMessage}
                    open={Boolean(error)}
                    anchorElement={patternLockRef.current}
                    fallbackPlacements={['top']}
                    position='top'
                    badge='negative-alert'
                    autoCloseDelay={2000}
                    onClose={() => {}}
                />
                {message && renderMessage()}
                <div
                    className={cn(commonStyles.patternContainer, {
                        [commonStyles.withForgotBtn]: showForgotCodeBtn,
                    })}
                >
                    <ReactCanvasPatternLock
                        {...restProps}
                        {...params}
                        ref={ref}
                        rows={3}
                        cols={3}
                        justifyNodes={justifyNodes}
                        extraBounds={extraBounds}
                        hover={hover}
                    />

                    {showForgotCodeBtn && (
                        <ButtonMobile
                            view='transparent'
                            className={cn(commonStyles.forgotBtn, styles.forgotBtn)}
                            onClick={onForgotBtnClick}
                            dataTestId={getDataTestId(dataTestId, 'forgot-code-btn')}
                        >
                            {forgotCodeBtnText}
                        </ButtonMobile>
                    )}
                </div>
            </div>
        );
    },
);
