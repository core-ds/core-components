import React, { FC } from 'react';

import { Button } from '@alfalab/core-components-button';
import { Typography } from '@alfalab/core-components-typography';
import ArrowLeftMediumMIcon from '@alfalab/icons-glyph/ArrowLeftMediumMIcon';

import { Header } from '../../../components/header/Component';
import { HeaderPresetTypesMobile } from '../../constants/headerPresetTypesMobile';
import { TModalHeaderPresetMobile } from '../../types/typings';

type HeaderPresetProps = {
    preset: TModalHeaderPresetMobile['preset'];
    hiddenTitle: boolean;
};

export const ModalHeaderPresetMobile: FC<HeaderPresetProps> = (props) => {
    const { preset, hiddenTitle } = props;

    if (preset) {
        const { type } = preset;

        if (type === HeaderPresetTypesMobile.HEADER_WITH_NAVIGATION_WITHOUT_TITLE) {
            return (
                <Header
                    sticky={true}
                    leftAddons={
                        <Button leftAddons={<ArrowLeftMediumMIcon />} shape='rounded' size={48}>
                            {!hiddenTitle && (
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
                />
            );
        }

        return null;
    }

    return null;
};
