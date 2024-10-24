import React, { FC } from 'react';

import { Button } from '@alfalab/core-components-button';
import { ActionIconAddon } from '@alfalab/core-components-navigation-bar/src/shared';
import { Typography } from '@alfalab/core-components-typography';
import ArrowLeftMediumMIcon from '@alfalab/icons-glyph/ArrowLeftMediumMIcon';

import { Header } from '../../../components/header/Component';
import { HeaderPresetTypesMobile } from '../../constants/headerPresetTypesMobile';
import { TModalHeaderPresetMobile } from '../../types/typings';

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
                />
            );
        }

        return null;
    }

    return null;
};
