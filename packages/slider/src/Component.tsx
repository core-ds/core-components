import React, { type FC, useEffect, useMemo, useRef } from 'react';
import cn from 'classnames';
import noUiSlider, { type API } from 'nouislider';

import { useSliderMarkers } from './hooks';
import { type SliderProps } from './types';
import { createPipsConfig, updateMarkerClasses } from './utils';

import styles from './index.module.css';

const SIZE_TO_CLASSNAME_MAP = {
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
    showNumbers = true,
    hideCustomDotsNumbers = false,
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
    const { values } = pips || {};
    const hasCustomDotsSlider = dotsSlider === 'custom';
    const shouldCreatePipsConfig = pips || customDots?.length;

    const getSlider = () => sliderRef.current?.noUiSlider;

    const pipsConfig = useMemo(() => {
        const configParams = {
            dotsSlider,
            pips,
            pipsValues: Array.isArray(values) ? values : [],
            customDots: Array.isArray(customDots) ? customDots : [],
            showNumbers,
            hideCustomDotsNumbers,
        };

        return createPipsConfig(configParams);
    }, [values, pips, dotsSlider, customDots, showNumbers, hideCustomDotsNumbers]);

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
            pips: shouldCreatePipsConfig ? pipsConfig : undefined,
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
                pips: shouldCreatePipsConfig ? pipsConfig : undefined,
                snap,
            },
            true,
        );
    }, [pipsConfig, shouldCreatePipsConfig, range, snap, step]);

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
        const pipsValues = Array.isArray(values) ? values : [];

        if (!hasCustomDotsSlider || !pipsValues.length || !sliderRef.current) return;

        updateMarkerClasses({
            sliderElement: sliderRef.current,
            pipsValues,
            customDots,
        });
    }, [customDots, dotsSlider, hasCustomDotsSlider, values]);

    return (
        <div
            className={cn(styles.component, className, styles[SIZE_TO_CLASSNAME_MAP[size]], {
                [styles.numbersDisabled]: hasCustomDotsSlider && !customDots?.length,
                [styles.hideLargePips]: hasCustomDotsSlider,
                [styles.dotsDisabled]: !dots,
                [styles.disabled]: disabled,
            })}
            ref={sliderRef}
            data-test-id={dataTestId}
            {...{ disabled }}
        />
    );
};
