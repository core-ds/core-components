/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';

import { IconButton } from '@alfalab/core-components-icon-button';
import { Text } from '@alfalab/core-components-typography';
import { speeds } from '@alfalab/core-components-video/constants';
import { VideoContext } from '@alfalab/core-components-video/context';
import { ChevronRightShiftRightSIcon } from '@alfalab/icons-glyph/ChevronRightShiftRightSIcon';

import qualityIcon from '../../../../../../assets/quality.svg';
import speed1Icon from '../../../../../../assets/speed_1.svg';
import subsOnIcon from '../../../../../../assets/subs_on.svg';

import styles from './index.module.css';

type Props = {
    haveSubs?: boolean;
};

export const VideoSettings = ({ haveSubs = true }: Props) => {
    const { playbackRate, setPlaybackRate, qualities, setQuality, currentQuality } =
        useContext(VideoContext);

    const handleSpeedPrev = () => {
        setPlaybackRate((prev) => Math.max(prev - 1, 0));
    };

    const handleSpeedNext = () => {
        setPlaybackRate((prev) => Math.min(prev + 1, speeds.length - 1));
    };

    const handleQualityPrev = () => {
        const newIndex =
            currentQuality === -1 ? qualities.length - 1 : Math.max(0, currentQuality - 1);

        setQuality(newIndex);
    };

    const handleQualityNext = () => {
        const newIndex =
            currentQuality === -1 ? 0 : Math.min(qualities.length - 1, currentQuality + 1);

        setQuality(newIndex);
    };

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
            className={styles.settings}
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            {haveSubs && (
                <div className={styles.settingElement}>
                    <img src={subsOnIcon} alt='subs' className={styles.icon} />
                    <Text className={styles.settingLabel} color='primary-inverted'>
                        Субтитры
                    </Text>
                    <div className={styles.swiper}>
                        <IconButton
                            size={24}
                            style={{ color: 'white' }}
                            icon={ChevronRightShiftRightSIcon}
                            className={styles.leftArrow}
                        />

                        <Text color='primary-inverted'>Выкл</Text>

                        <IconButton
                            size={24}
                            style={{ color: 'white' }}
                            icon={ChevronRightShiftRightSIcon}
                        />
                    </div>
                </div>
            )}
            <div className={styles.settingElement}>
                <img src={speed1Icon} alt='speed' className={styles.icon} />
                <Text className={styles.settingLabel} color='primary-inverted'>
                    Скорость
                </Text>
                <div className={styles.swiper}>
                    <IconButton
                        size={24}
                        style={{ color: 'white' }}
                        icon={ChevronRightShiftRightSIcon}
                        className={styles.leftArrow}
                        onClick={handleSpeedPrev}
                    />

                    <Text color='primary-inverted'>{speeds[playbackRate]}x</Text>

                    <IconButton
                        size={24}
                        style={{ color: 'white' }}
                        icon={ChevronRightShiftRightSIcon}
                        onClick={handleSpeedNext}
                    />
                </div>
            </div>
            <div className={styles.settingElement}>
                <img src={qualityIcon} alt='quality' className={styles.icon} />
                <Text className={styles.settingLabel} color='primary-inverted'>
                    Качество
                </Text>
                <div className={styles.swiper}>
                    <IconButton
                        size={24}
                        style={{ color: 'white' }}
                        icon={ChevronRightShiftRightSIcon}
                        className={styles.leftArrow}
                        disabled={currentQuality <= -1 || currentQuality === 0}
                        onClick={handleQualityPrev}
                    />

                    <Text color='primary-inverted'>
                        {currentQuality === -1 ? 'Auto' : `${qualities[currentQuality]?.height}p`}
                    </Text>

                    <IconButton
                        size={24}
                        style={{ color: 'white' }}
                        icon={ChevronRightShiftRightSIcon}
                        disabled={currentQuality >= qualities.length - 1}
                        onClick={handleQualityNext}
                    />
                </div>
            </div>
        </div>
    );
};
