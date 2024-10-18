import React, { FC } from 'react';
import cn from 'classnames';

import { Button } from '@alfalab/core-components-button';
import { Typography } from '@alfalab/core-components-typography';
import ArrowLeftMediumMIcon from '@alfalab/icons-glyph/ArrowLeftMediumMIcon';

import { Header } from '../../../components/header/Component';
import { HEADER_MEDIUM_BREAKPOINT, PresetTypes } from '../../../constants/presetTypes';
import { ModalByCenterProps } from '../../types/props';

import styles from './headerPreset.module.css';

type HeaderPresetProps = {
    preset: ModalByCenterProps['preset'];
    scrollPosition: number;
    width: number;
};

export const HeaderPreset: FC<HeaderPresetProps> = (props) => {
    const { preset, scrollPosition, width } = props;

    if (preset) {
        const { type } = preset;

        if (type === PresetTypes.HeaderWithNavigationWithoutTitle) {
            return (
                <Header
                    className={styles.container}
                    sticky={true}
                    leftAddons={
                        <Button
                            className={styles.backButton}
                            leftAddons={<ArrowLeftMediumMIcon className={styles.closeButton} />}
                            shape='rounded'
                            size={48}
                        >
                            <Typography.Text view='primary-large' weight='medium' color='primary'>
                                Назад
                            </Typography.Text>
                        </Button>
                    }
                    closerClassName={styles.closeButton}
                />
            );
        }

        if (type === PresetTypes.HeaderWithNavigationWithTitle) {
            const { title } = preset;

            return (
                <Header
                    className={cn(styles.container, {
                        [styles.hasScrollContent]: scrollPosition > 5,
                    })}
                    sticky={true}
                    title={title}
                    leftAddons={
                        <Button
                            className={styles.backButton}
                            leftAddons={<ArrowLeftMediumMIcon className={styles.closeButton} />}
                            shape='rounded'
                            size={48}
                        >
                            <Typography.Text view='primary-large' weight='medium' color='primary'>
                                Назад
                            </Typography.Text>
                        </Button>
                    }
                    closerClassName={styles.closeButton}
                    contentClassName={cn(styles.title, {
                        [styles.medium]: width >= HEADER_MEDIUM_BREAKPOINT,
                    })}
                />
            );
        }

        if (type === PresetTypes.HeaderWithTitle) {
            const { title } = preset;

            return (
                <Header
                    className={cn(styles.container, {
                        [styles.hasScrollContent]: scrollPosition > 5,
                    })}
                    sticky={true}
                    title={title}
                    closerClassName={styles.closeButton}
                    contentClassName={cn(styles.title, {
                        [styles.medium]: width >= HEADER_MEDIUM_BREAKPOINT,
                    })}
                />
            );
        }

        return null;
    }

    return null;
};
