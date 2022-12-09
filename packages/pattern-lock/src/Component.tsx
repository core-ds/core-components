import React, { forwardRef, useEffect, useState } from 'react';
import type { Theme, TPatternLockInstance } from 'react-canvas-pattern-lock';
import { ReactCanvasPatternLock } from 'react-canvas-pattern-lock';
import cn from 'classnames';

import { Gap } from '@alfalab/core-components-gap';

import { OBSERVABLE_TOKENS, OBSERVE_OPTIONS, THEME_STATE } from './consts';
import type { PatternLockProps } from './typings';
import { getColorByToken, getDefaultObserveTarget, getSizes, getTheme } from './utils';

import styles from './index.module.css';

export const PatternLock = forwardRef<TPatternLockInstance, PatternLockProps>(
    (
        {
            observeTokens = false,
            observerParams = {},
            justifyNodes = 'space-between',
            className,
            error,
            dataTestId,
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
                className={cn(styles.component, className, { [styles.hidden]: !params })}
                data-test-id={dataTestId}
            >
                <Gap size='m' />
                <Gap size='s' />

                <div className={styles.error}>{error}</div>

                <Gap size='xl' />

                <ReactCanvasPatternLock
                    {...restProps}
                    {...params}
                    ref={ref}
                    rows={3}
                    cols={3}
                    justifyNodes={justifyNodes}
                />
            </div>
        );
    },
);
