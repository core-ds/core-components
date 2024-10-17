import React from 'react';

import { Button } from '@alfalab/core-components-button';
import ArrowLeftMediumMIcon from '@alfalab/icons-glyph/ArrowLeftMediumMIcon';

import { PresetTypes } from '../../../constants/presetTypes';
import { ModalByCenterProps } from '../../types/props';

export const getHeaderPresetComponent = (preset: ModalByCenterProps['preset']) => {
    if (preset) {
        const { type } = preset;

        if (type === PresetTypes.HeaderWithNavigationWithoutTitle) {
            const { component: Component } = preset;

            return (
                <Component
                    sticky={true}
                    leftAddons={<Button leftAddons={<ArrowLeftMediumMIcon />}>Назад</Button>}
                />
            );
        }

        if (type === PresetTypes.HeaderWithNavigationWithTitle) {
            const { component: Component, title } = preset;

            return (
                <Component
                    sticky={true}
                    title={title}
                    leftAddons={<Button leftAddons={<ArrowLeftMediumMIcon />}>Назад</Button>}
                />
            );
        }

        if (type === PresetTypes.HeaderWithTitle) {
            const { component: Component, title } = preset;

            return <Component sticky={true} title={title} />;
        }

        return null;
    }

    return null;
};
