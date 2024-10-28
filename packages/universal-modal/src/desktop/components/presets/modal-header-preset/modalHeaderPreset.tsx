import React, { FC } from 'react';
import cn from 'classnames';

import { Button } from '@alfalab/core-components-button';
import { ActionIconAddon } from '@alfalab/core-components-navigation-bar/shared';
import { Typography } from '@alfalab/core-components-typography';
import ArrowLeftMediumMIcon from '@alfalab/icons-glyph/ArrowLeftMediumMIcon';

import { Header } from '../../../../components/header/Component';
import { HEADER_MEDIUM_BREAKPOINT, HeaderPresetTypes } from '../../../constants/headerPresetTypes';
import { TModalHeaderPreset } from '../../../types/typings';

import styles from './modalHeaderPreset.module.css';

type HeaderPresetProps = {
    preset: TModalHeaderPreset['preset'];
    scrollPosition: number;
    width: number;
    onClose?: () => void;
};

export const ModalHeaderPreset: FC<HeaderPresetProps> = (props) => {
    const { preset, scrollPosition, width, onClose } = props;

    if (preset) {
        const { type } = preset;

        if (type === HeaderPresetTypes.HEADER_WITH_NAVIGATION_WITHOUT_TITLE) {
            return (
                <Header
                    className={styles.container}
                    sticky={true}
                    leftAddons={
                        <Button
                            className={styles.backButton}
                            leftAddons={<ArrowLeftMediumMIcon />}
                            shape='rounded'
                            size={48}
                        >
                            <Typography.Text view='primary-large' weight='medium' color='primary'>
                                Назад
                            </Typography.Text>
                        </Button>
                    }
                    rightAddons={
                        <ActionIconAddon
                            action='close'
                            classNameIconWrapper={styles.closeButton}
                            onClick={onClose}
                        />
                    }
                    backgroundColor='transparent'
                />
            );
        }

        if (type === HeaderPresetTypes.HEADER_WITH_NAVIGATION_WITH_TITLE) {
            const { title } = preset;

            return (
                <Header
                    className={cn(styles.container, {
                        [styles.hasScrollContent]: scrollPosition > 5,
                    })}
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
                    rightAddons={
                        <ActionIconAddon
                            action='close'
                            classNameIconWrapper={styles.closeButton}
                            onClick={onClose}
                        />
                    }
                    bottomAddons={title}
                    bottomAddonsClassName={cn(styles.title, {
                        [styles.medium]: width >= HEADER_MEDIUM_BREAKPOINT,
                    })}
                />
            );
        }

        if (type === HeaderPresetTypes.HEADER_WITH_TITLE) {
            const { title } = preset;

            return (
                <Header
                    className={cn(styles.container, {
                        [styles.hasScrollContent]: scrollPosition > 5,
                    })}
                    sticky={true}
                    title={title}
                    align='left'
                    rightAddons={
                        <ActionIconAddon
                            action='close'
                            classNameIconWrapper={styles.closeButton}
                            onClick={onClose}
                        />
                    }
                    contentWrapperClassName={cn(styles.title, {
                        [styles.medium]: width >= HEADER_MEDIUM_BREAKPOINT,
                    })}
                />
            );
        }

        return null;
    }

    return null;
};
