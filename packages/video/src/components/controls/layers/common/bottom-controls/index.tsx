/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useRef, useState } from 'react';

import { IconButton } from '@alfalab/core-components-icon-button';
import { VideoContext } from '@alfalab/core-components-video/context';
import { useOutsideClick, useShowSoundSlider } from '@alfalab/core-components-video/shared';
import { ArrowsInMIcon } from '@alfalab/icons-glyph/ArrowsInMIcon';
import { ArrowsOutMIcon } from '@alfalab/icons-glyph/ArrowsOutMIcon';
import { AScoresCircleMIcon } from '@alfalab/icons-glyph/AScoresCircleMIcon';
import { DotsHorizontalMIcon } from '@alfalab/icons-glyph/DotsHorizontalMIcon';
import { PauseCircleMIcon } from '@alfalab/icons-glyph/PauseCircleMIcon';
import { PlayCircleMIcon } from '@alfalab/icons-glyph/PlayCircleMIcon';
import { SoundOffSIcon } from '@alfalab/icons-glyph/SoundOffSIcon';
import { SoundSIcon } from '@alfalab/icons-glyph/SoundSIcon';

import { SeekIndicator } from '../../../seek-indicator';
import { CustomSlider } from '../../../slider';

import { ChooseSpeed } from './choose-speed';
import { Subtitles } from './subtitles';
import { VideoSettings } from './video-settings';

import styles from './index.module.css';

export const BottomControls = () => {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [speedsOpen, setSpeedsOpen] = useState(false);
    const [subsOpen, setSubsOpen] = useState(false);
    const settingsRef = useRef<HTMLDivElement>(null);
    const speedsRef = useRef<HTMLDivElement>(null);
    const subsRef = useRef<HTMLDivElement>(null);
    const settingsButtonRef = useRef<HTMLButtonElement>(null);
    const speedsButtonRef = useRef<HTMLButtonElement>(null);
    const subsButtonRef = useRef<HTMLButtonElement>(null);

    const seekingRef = useRef(false);

    const wasPaused = useRef<boolean | null>(null);

    const {
        duration,
        currentTime,
        isPaused,
        isMuted,
        volume,
        skipForwardStep,
        skipBackwardStep,
        fullscreen,
        seekIndicator,
        seekTime,
        buffer,
        togglePause,
        skipForward,
        skipBackward,
        toggleFullscreen,
        setVolume,
        toggleMute,
        setCurrentTime,
        setSeekTime,
    } = useContext(VideoContext);

    const {
        volumeSliderOpen,
        handleMouseEnterWrapper,
        handleMouseLeaveWrapper,
        handleDragStart,
        handleDragEnd,
        handleMouseEnterSlider,
        handleMouseLeaveSlider,
    } = useShowSoundSlider();

    useOutsideClick(settingsRef, () => setSettingsOpen(false), settingsOpen, [settingsButtonRef]);
    useOutsideClick(speedsRef, () => setSpeedsOpen(false), speedsOpen, [speedsButtonRef]);
    useOutsideClick(subsRef, () => setSubsOpen(false), subsOpen, [subsButtonRef]);

    const handleSeekStart = () => {
        wasPaused.current = isPaused;
        seekingRef.current = true;
        togglePause(true);
    };

    const handleSeekInput = (value: number) => {
        setSeekTime(value);
    };

    const handleSeekCommit = () => {
        setCurrentTime(seekTime);

        if (wasPaused.current) {
            togglePause(true);
        } else {
            togglePause(false);
        }

        seekingRef.current = false;
        wasPaused.current = null;
    };

    return (
        <div className={styles.bottomOverlayWrapper}>
            <div className={styles.bottomControls} onClick={(e) => e.stopPropagation()}>
                <div className={styles.sliderWrapper}>
                    {/* TODO: простое решение для того чтобы позиция слайдера вставала на нужное время при первом рендере. В противном случае пока идет загрузка видео, duration = 0 и диапазон для слайдера задается от 0 до 0. Когда видео загружено и duration определяется в нормальное значение, позиция остается на 0, несмотря на корректный currentTime. Возможно стоит переделать на сохранение currentTime в процентах и задавать диапазон слайдеру от 0 до 100. Но пока и так работает */}
                    {duration > 0 && (
                        <CustomSlider
                            min={0}
                            max={duration}
                            value={seekingRef.current ? seekTime : currentTime}
                            buffer={buffer}
                            onStart={handleSeekStart}
                            onInput={handleSeekInput}
                            onCommit={handleSeekCommit}
                        />
                    )}
                </div>

                <div className={styles.underSliderWrapper}>
                    <div className={styles.left}>
                        {isPaused ? (
                            <IconButton
                                size={24}
                                style={{ color: 'white' }}
                                icon={PlayCircleMIcon}
                                onClick={() => togglePause()}
                            />
                        ) : (
                            <IconButton
                                size={24}
                                style={{ color: 'white' }}
                                icon={PauseCircleMIcon}
                                onClick={() => togglePause()}
                            />
                        )}

                        {skipBackwardStep && (
                            <IconButton
                                size={24}
                                style={{ color: 'white' }}
                                icon={AScoresCircleMIcon}
                                onClick={skipBackward}
                            />
                        )}

                        {skipForwardStep && (
                            <IconButton
                                size={24}
                                style={{ color: 'white' }}
                                icon={AScoresCircleMIcon}
                                onClick={skipForward}
                            />
                        )}

                        <div
                            className={styles.volumeControlWrapper}
                            onMouseEnter={handleMouseEnterWrapper}
                            onMouseLeave={handleMouseLeaveWrapper}
                        >
                            <IconButton
                                size={24}
                                style={{ color: 'white' }}
                                icon={isMuted ? SoundOffSIcon : SoundSIcon}
                                onClick={toggleMute}
                            />

                            {volumeSliderOpen && (
                                <div
                                    className={styles.volumeSliderWrapper}
                                    onMouseEnter={handleMouseEnterSlider}
                                    onMouseLeave={handleMouseLeaveSlider}
                                >
                                    <CustomSlider
                                        min={0}
                                        max={100}
                                        value={isMuted ? 0 : volume}
                                        onStart={handleDragStart}
                                        onInput={setVolume}
                                        onCommit={handleDragEnd}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={styles.mid} />

                    <div className={styles.right}>
                        <IconButton
                            style={{ color: 'white' }}
                            size={24}
                            icon={DotsHorizontalMIcon}
                            onClick={() => setSubsOpen((prev) => !prev)}
                            ref={subsButtonRef}
                        />
                        <IconButton
                            style={{ color: 'white' }}
                            size={24}
                            icon={DotsHorizontalMIcon}
                            onClick={() => setSpeedsOpen((prev) => !prev)}
                            ref={speedsButtonRef}
                        />
                        <IconButton
                            style={{ color: 'white' }}
                            size={24}
                            icon={DotsHorizontalMIcon}
                            onClick={() => setSettingsOpen((prev) => !prev)}
                            ref={settingsButtonRef}
                        />
                        {fullscreen ? (
                            <IconButton
                                style={{ color: 'white' }}
                                size={24}
                                icon={ArrowsInMIcon}
                                onClick={toggleFullscreen}
                            />
                        ) : (
                            <IconButton
                                style={{ color: 'white' }}
                                size={24}
                                icon={ArrowsOutMIcon}
                                onClick={toggleFullscreen}
                            />
                        )}
                    </div>
                </div>
            </div>

            {settingsOpen && (
                <div ref={settingsRef}>
                    <VideoSettings />
                </div>
            )}

            {speedsOpen && (
                <div ref={speedsRef}>
                    <ChooseSpeed />
                </div>
            )}

            {subsOpen && (
                <div ref={subsRef}>
                    <Subtitles />
                </div>
            )}

            <SeekIndicator
                amount={seekIndicator.amount}
                direction={seekIndicator.direction}
                visible={seekIndicator.visible}
            />
        </div>
    );
};
