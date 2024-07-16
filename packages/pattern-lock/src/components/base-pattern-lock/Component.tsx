import React, { forwardRef, useEffect, useState } from 'react';
import cn from 'classnames';

import { ButtonMobile } from '@alfalab/core-components-button/mobile';
import { getDataTestId } from '@alfalab/core-components-shared';
import type { Theme, TPatternLockInstance } from '@alfalab/react-canvas-pattern-lock';
import { ReactCanvasPatternLock } from '@alfalab/react-canvas-pattern-lock';

import {
    DEFAULT_EXTRA_BOUNDS,
    OBSERVABLE_TOKENS,
    OBSERVE_OPTIONS,
    THEME_STATE,
} from '../../consts';
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
            className,
            dataTestId,
            forgotCodeBtnText = 'Забыли код?',
            showForgotCodeBtn = false,
            onForgotBtnClick,
            extraBounds = DEFAULT_EXTRA_BOUNDS,
            messageClassName,
            hover,
            styles = {},
            ...restProps
        },
        ref,
    ) => {
        const [params, setParams] = useState<
            { theme: Theme; width: number; height: number } | undefined
        >();

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

        return (
            <div
                className={cn(commonStyles.component, styles.component, className, {
                    [commonStyles.hidden]: !params,
                    [commonStyles.withForgotBtn]: showForgotCodeBtn,
                })}
                data-test-id={dataTestId}
            >
                <div className={commonStyles.canvasContainer}>
                    <div className={commonStyles.canvasInner}>
                        <ReactCanvasPatternLock
                            {...restProps}
                            {...params}
                            ref={ref}
                            rows={3}
                            cols={3}
                            justifyNodes='space-between'
                            extraBounds={extraBounds}
                            hover={hover}
                        />
                    </div>
                </div>
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
        );
    },
);

BasePatternLock.displayName = 'BasePatternLock';
ReactCanvasPatternLock.displayName = 'ReactCanvasPatternLock';
