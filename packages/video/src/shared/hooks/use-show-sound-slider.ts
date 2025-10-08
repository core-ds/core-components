import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Хук для скрытия/показа слайдера громкости
 */
export const useShowSoundSlider = (closeDelay = 1000) => {
    const [volumeSliderOpen, setVolumeSliderOpen] = useState(false);

    const isDraggingRef = useRef(false);
    const isHoveringWrapperRef = useRef(false);
    const isHoveringSliderRef = useRef(false);
    const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearHideTimer = useCallback(() => {
        if (hideTimer.current) {
            clearTimeout(hideTimer.current);
            hideTimer.current = null;
        }
    }, []);

    const scheduleCloseSlider = useCallback(() => {
        clearHideTimer();
        hideTimer.current = setTimeout(() => {
            if (
                !isDraggingRef.current &&
                !isHoveringWrapperRef.current &&
                !isHoveringSliderRef.current
            ) {
                setVolumeSliderOpen(false);
            }
            hideTimer.current = null;
        }, closeDelay);
    }, [clearHideTimer, closeDelay]);

    const openSoundSlider = useCallback(() => {
        clearHideTimer();
        setVolumeSliderOpen(true);
    }, [clearHideTimer]);

    const handleDragStart = useCallback(() => {
        isDraggingRef.current = true;
    }, []);

    const handleDragEnd = useCallback(() => {
        isDraggingRef.current = false;
        scheduleCloseSlider();
    }, [scheduleCloseSlider]);

    const handleMouseEnterWrapper = useCallback(() => {
        isHoveringWrapperRef.current = true;
        openSoundSlider();
    }, [openSoundSlider]);

    const handleMouseLeaveWrapper = useCallback(() => {
        isHoveringWrapperRef.current = false;
        scheduleCloseSlider();
    }, [scheduleCloseSlider]);

    const handleMouseEnterSlider = useCallback(() => {
        isHoveringSliderRef.current = true;
    }, []);

    const handleMouseLeaveSlider = useCallback(() => {
        isHoveringSliderRef.current = false;
        scheduleCloseSlider();
    }, [scheduleCloseSlider]);

    useEffect(() => clearHideTimer, [clearHideTimer]);

    return {
        volumeSliderOpen,
        handleDragStart,
        handleDragEnd,
        handleMouseEnterWrapper,
        handleMouseLeaveWrapper,
        handleMouseEnterSlider,
        handleMouseLeaveSlider,
    };
};
