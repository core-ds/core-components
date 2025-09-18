import React, { type FC, useEffect, useMemo, useRef } from 'react';
import cn from 'classnames';
import noUiSlider, { type API } from 'nouislider';

import { useSliderMarkers } from './hooks';
import { type SliderProps } from './types';
import { createPipsConfig } from './utils';

import styles from './index.module.css';

export const SIZE_TO_CLASSNAME_MAP = {
    s: 'size-2',
    m: 'size-4',
    2: 'size-2',
    4: 'size-4',
};

export const Slider: FC<SliderProps> = ({
    min = 0,
    max = 100,
    step = 1,
    value = 0,
    valueTo,
    disabled,
    pips,
    behaviour = 'tap',
    range = { min, max },
    size = 2,
    dots = false,
    dotsSlider = 'step',
    customDots,
    showNumbers = false,
    hideCustomDotsNumbers = false,
    hideLargePips = true,
    className,
    onChange,
    onStart,
    onEnd,
    dataTestId,
    snap = false,
}) => {
    const sliderRef = useRef<(HTMLDivElement & { noUiSlider: API }) | null>(null);
    const busyRef = useRef<boolean>(false);
    const hasValueTo = valueTo !== undefined;
    const hasCustomDotsSlider = dotsSlider === 'custom';
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const pipsValues = pips && 'values' in pips && Array.isArray(pips.values) ? pips.values : [];

    const getSlider = () => sliderRef.current?.noUiSlider;

    const shouldCreatePipsConfig = pips || customDots?.length;

    const pipsConfig = useMemo(() => {
        if (!shouldCreatePipsConfig) {
            return undefined;
        }

        const configParams = {
            dotsSlider,
            customDots: hasCustomDotsSlider ? customDots : undefined,
            showNumbers,
            hideCustomDotsNumbers: hasCustomDotsSlider ? hideCustomDotsNumbers : undefined,
            hideLargePips,
            pips,
            min,
            max,
            step,
        };

        return createPipsConfig(configParams);
    }, [
        shouldCreatePipsConfig,
        hasCustomDotsSlider,
        dotsSlider,
        customDots,
        showNumbers,
        hideCustomDotsNumbers,
        hideLargePips,
        pips,
        min,
        max,
        step,
    ]);

    const { updateMarkersState, createSlideHandler } = useSliderMarkers({
        sliderRef,
        hasValueTo,
        value,
        valueTo,
        min,
        max,
        onChange,
    });

    useEffect(() => {
        if (!sliderRef.current) return;

        const slider = noUiSlider.create(sliderRef.current, {
            start: valueTo ? [value, valueTo] : value,
            connect: valueTo ? true : [true, false],
            behaviour,
            step,
            pips: pipsConfig,
            range,
            snap,
        });

        // eslint-disable-next-line consistent-return
        return () => slider.destroy();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const slider = getSlider();

        if (!slider) return;

        slider.on('start', () => {
            busyRef.current = true;
            onStart?.();
        });

        slider.on('change', () => {
            busyRef.current = false;
            onEnd?.();
        });

        // eslint-disable-next-line consistent-return
        return () => {
            slider.off('start');
            slider.off('change');
        };
    }, [onStart, onEnd]);

    useEffect(() => {
        const slider = getSlider();

        if (!slider) return;

        slider.updateOptions(
            {
                step,
                range,
                pips: pipsConfig,
                snap,
            },
            true,
        );
    }, [pipsConfig, range, snap, step]);

    useEffect(() => {
        const slider = getSlider();

        // Пропускаем обновление, если происходит взаимодействие со слайдером
        if (slider && busyRef.current === false) {
            if (valueTo) {
                slider.set([value, valueTo], false);
            } else {
                slider.set(value, false);
            }
        }
    }, [value, valueTo]);

    useEffect(() => {
        const slider = getSlider();

        if (!slider) return;

        const handler = createSlideHandler(slider);

        slider.off('slide');
        slider.on('slide', handler);

        if (hasValueTo) {
            updateMarkersState(value, valueTo);
        } else {
            updateMarkersState(value);
        }
    }, [onChange, hasValueTo, value, valueTo, createSlideHandler, updateMarkersState]);

    useEffect(() => {
        if (!hideLargePips || !pipsValues.length || dotsSlider === 'step' || !sliderRef.current)
            return;

        const markers = sliderRef.current.querySelectorAll('.noUi-marker-large');

        markers.forEach((marker) => {
            const nextElement = marker.nextElementSibling as HTMLElement;

            if (nextElement?.classList.contains('noUi-value')) {
                const dataValue = nextElement.getAttribute('data-value');
                const value = dataValue ? parseFloat(dataValue) : null;

                if (value !== null && pipsValues.includes(value)) {
                    const isAlsoInCustomDots = customDots?.includes(value) ?? false;

                    if (isAlsoInCustomDots) {
                        marker.classList.remove('hide-for-pips-value');
                    } else {
                        marker.classList.add('hide-for-pips-value');
                    }
                } else {
                    marker.classList.remove('hide-for-pips-value');
                }
            }
        });
    }, [hideLargePips, pipsValues, customDots, dotsSlider]);

    return (
        <div
            className={cn(styles.component, className, styles[SIZE_TO_CLASSNAME_MAP[size]], {
                [styles.numbersDisabled]: hasCustomDotsSlider && !customDots?.length,
                [styles.hideLargePips]: hideLargePips,
                [styles.dotsDisabled]: !dots,
                [styles.disabled]: disabled,
            })}
            ref={sliderRef}
            data-test-id={dataTestId}
            {...{ disabled }}
        />
    );
};
