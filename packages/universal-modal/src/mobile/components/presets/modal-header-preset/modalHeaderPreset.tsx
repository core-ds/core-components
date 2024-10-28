import React, { FC } from 'react';

import { Button } from '@alfalab/core-components-button';
import { ActionIconAddon } from '@alfalab/core-components-navigation-bar/shared';
import { Typography } from '@alfalab/core-components-typography';
import ArrowLeftMediumMIcon from '@alfalab/icons-glyph/ArrowLeftMediumMIcon';

import { Header } from '../../../../components/header/Component';
import { HeaderPresetTypesMobile } from '../../../constants/headerPresetTypesMobile';
import { TModalHeaderPresetMobile } from '../../../types/typings';

import styles from './modalHeaderPreset.module.css';

type HeaderPresetProps = {
    preset: TModalHeaderPresetMobile['preset'];
    hasScroll: boolean;
    onClose?: () => void;
};

export const ModalHeaderPresetMobile: FC<HeaderPresetProps> = (props) => {
    const { preset, hasScroll, onClose } = props;

    if (preset) {
        const { type } = preset;

        if (type === HeaderPresetTypesMobile.HEADER_WITH_NAVIGATION_WITHOUT_TITLE) {
            return (
                <Header
                    sticky={true}
                    leftAddons={
                        <Button leftAddons={<ArrowLeftMediumMIcon />} shape='rounded' size={48}>
                            {!hasScroll && (
                                <Typography.Text
                                    view='primary-large'
                                    weight='medium'
                                    color='primary'
                                >
                                    Назад
                                </Typography.Text>
                            )}
                        </Button>
                    }
                    rightAddons={<ActionIconAddon action='close' onClick={onClose} />}
                    backgroundColor='transparent'
                />
            );
        }

        if (type === HeaderPresetTypesMobile.HEADER_WITH_BACK_ARROW_WITH_CENTER_TITLE) {
            const { title } = preset;

            return (
                <Header
                    sticky={true}
                    leftAddons={<ActionIconAddon action='back' />}
                    {...(!hasScroll && { bottomAddons: title })}
                    {...(hasScroll && { title })}
                    align='center'
                    border={hasScroll}
                    bottomAddonsClassName={styles.withBackArrowWithCenterTitle}
                />
            );
        }

        if (type === HeaderPresetTypesMobile.HEADER_WITH_TITLE_WITH_SUBTITLE) {
            const { title, subtitle } = preset;

            return (
                <Header
                    sticky={true}
                    title={title}
                    subtitle={subtitle}
                    rightAddons={<ActionIconAddon action='close' onClick={onClose} />}
                    border={hasScroll}
                    align='left'
                    contentWrapperClassName={styles.withTitleWithSubtitleContentWrapper}
                />
            );
        }

        if (type === HeaderPresetTypesMobile.HEADER_WITH_CENTRAL_TITLE) {
            const { title } = preset;

            return (
                <Header
                    sticky={true}
                    title={title}
                    rightAddons={<ActionIconAddon action='close' onClick={onClose} />}
                    border={hasScroll}
                />
            );
        }

        if (type === HeaderPresetTypesMobile.HEADER_WITH_CENTRAL_TITLE_WITH_SUBTITLE) {
            const { title, subtitle } = preset;

            return (
                <Header
                    sticky={true}
                    title={title}
                    subtitle={subtitle}
                    rightAddons={<ActionIconAddon action='close' onClick={onClose} />}
                    border={hasScroll}
                />
            );
        }

        return null;
    }

    return null;
};
