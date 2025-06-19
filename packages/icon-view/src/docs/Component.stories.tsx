import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { select, boolean, text } from '@storybook/addon-knobs';
import { Indicator } from '@alfalab/core-components-indicator';
import { DiamondsXxlIcon } from '@alfalab/icons-glyph/DiamondsXxlIcon';
import { DiamondsMIcon } from '@alfalab/icons-glyph/DiamondsMIcon';
import { DiamondsSIcon } from '@alfalab/icons-glyph/DiamondsSIcon';
import { SuperEllipse, Circle, Rectangle, NoShape } from '../components';

import {
    stylesStringToObj,
    getQueryParam,
} from '../../../screenshot-utils/screenshots-story/utils';

const meta: Meta<typeof SuperEllipse | typeof Circle | typeof Rectangle | typeof NoShape> = {
    title: 'Components/IconView',
    component: SuperEllipse || Circle || Rectangle || NoShape,
    id: 'IconView',
};

type Story = StoryObj<typeof SuperEllipse | typeof Circle | typeof Rectangle | typeof NoShape>;

const getAddonSize = (size: number | string) => {
    // knobs приходят в строковом формате, преобразуем для корректной работы скриншот тестирования
    const addonSize = typeof size === 'string' ? Number(size) : size;

    if (addonSize === 128) {
        return 40;
    }

    if ([80, 72, 64, 56].includes(addonSize)) {
        return 24;
    }

    return 20;
};

const getChildren = (size: number | string) => {
    // knobs приходят в строковом формате, преобразуем для корректной работы скриншот тестирования
    const childrenSize = typeof size === 'string' ? Number(size) : size;

    if ([128, 80].includes(childrenSize)) {
        return <DiamondsXxlIcon />;
    }

    if (childrenSize <= 20) {
        return <DiamondsSIcon />;
    }

    return <DiamondsMIcon />;
};

export const super_ellipse: Story = {
    name: 'SuperEllipse',
    render: () => {
        const topAddons = boolean('topAddons', false);
        const bottomAddons = boolean('bottomAddons', false);
        const indicator = boolean('indicator', false);

        const size = select('size', [16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 128], 64);

        const mainSize = select(
            'mainSize',
            [16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 128],
            undefined,
        );

        const backgroundColor = text('backgroundColor', '#f3f4f5');
        const border = boolean('border', false);

        const addonsIcon = (
            <Circle size={getAddonSize(size)}>
                {size === 20 ? <DiamondsSIcon /> : <DiamondsMIcon />}
            </Circle>
        );

        const previewStyles = stylesStringToObj(getQueryParam('wrapperStyles'));
        const isPreview = Object.keys(previewStyles).length > 0;

        if (isPreview) {
            return (
                <div style={previewStyles}>
                    <SuperEllipse size={size} backgroundColor={backgroundColor} border={border}>
                        <DiamondsXxlIcon />
                    </SuperEllipse>
                </div>
            );
        }

        return (
            <SuperEllipse
                size={size}
                backgroundColor={backgroundColor}
                border={border}
                imageUrl={text('imageUrl', '')}
                topAddons={topAddons && addonsIcon}
                bottomAddons={bottomAddons && addonsIcon}
                indicator={indicator && <Indicator view='red' />}
                text={text('text', '')}
                mainSize={mainSize}
            >
                {getChildren(size)}
            </SuperEllipse>
        );
    },
};

export const circle: Story = {
    name: 'Circle',
    render: () => {
        const topAddons = boolean('topAddons', false);
        const bottomAddons = boolean('bottomAddons', false);
        const indicator = boolean('indicator', false);

        const size = select('size', [16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 128], 64);

        const mainSize = select(
            'mainSize',
            [16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 128],
            undefined,
        );

        const addonsIcon = (
            <Circle size={getAddonSize(size)}>
                {size === 20 ? <DiamondsSIcon /> : <DiamondsMIcon />}
            </Circle>
        );

        return (
            <Circle
                size={size}
                backgroundColor={text('backgroundColor', '#f3f4f5')}
                border={boolean('border', false)}
                imageUrl={text('imageUrl', '')}
                topAddons={topAddons && addonsIcon}
                bottomAddons={bottomAddons && addonsIcon}
                indicator={indicator && <Indicator view='red' />}
                text={text('text', '')}
                mainSize={mainSize}
            >
                {getChildren(size)}
            </Circle>
        );
    },
};

export const rectangle: Story = {
    name: 'Rectangle',
    render: () => {
        const size = select('size', [20, 24, 32, 40, 48, 56, 64, 72, 80, 128], 64);

        const mainSize = select(
            'mainSize',
            [16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 128],
            undefined,
        );

        const backgroundColor = text('backgroundColor', '#f3f4f5');
        const border = boolean('border', false);

        return (
            <Rectangle
                size={size}
                backgroundColor={backgroundColor}
                border={border}
                imageUrl={text('imageUrl', '')}
                text={text('text', '')}
                mainSize={mainSize}
            >
                {getChildren(size)}
            </Rectangle>
        );
    },
};

export const no_shape: Story = {
    name: 'NoShape',
    render: () => {
        const size = select('size', [16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 128], 64);

        const mainSize = select(
            'mainSize',
            [16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 128],
            undefined,
        );

        const backgroundColor = text('backgroundColor', '#f3f4f5');

        return (
            <NoShape
                size={size}
                backgroundColor={backgroundColor}
                imageUrl={text('imageUrl', '')}
                text={text('text', '')}
                mainSize={mainSize}
            >
                {getChildren(size)}
            </NoShape>
        );
    },
};

export default meta;
