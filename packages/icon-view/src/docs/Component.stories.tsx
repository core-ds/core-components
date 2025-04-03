import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { select, boolean, text } from '@storybook/addon-knobs';
import { Badge } from '@alfalab/core-components-badge';
import { DiamondsXxlIcon } from '@alfalab/icons-glyph/DiamondsXxlIcon';
import { DiamondsMIcon } from '@alfalab/icons-glyph/DiamondsMIcon';
import { DiamondsSIcon } from '@alfalab/icons-glyph/DiamondsSIcon';
import { Circle } from '@alfalab/core-components-icon-view/circle';
import { SuperEllipse } from '@alfalab/core-components-icon-view/super-ellipse';
import { Rectangle } from '@alfalab/core-components-icon-view/rectangle';
import { NoShape } from '@alfalab/core-components-icon-view/no-shape';

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

export const super_ellipse: Story = {
    name: 'SuperEllipse',
    render: () => {
        const topAddons = boolean('topAddons', false);
        const bottomAddons = boolean('bottomAddons', false);
        const indicator = boolean('indicator', false);
        const size = select(
            'size',
            ['16', '20', '24', '32', '40', '48', '56', '64', '72', '80', '128'],
            '64',
        );
        const mainSize = select(
            'mainSize',
            [16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 128],
            undefined,
        );
        const sizeAddons =
            size === '128'
                ? '40'
                : size === '80' || size === '72' || size === '64' || size === '56'
                ? '24'
                : '20';
        const backgroundColor = text('backgroundColor', '#f3f4f5');
        const border = boolean('border', false);
        const isSkeleton = boolean('isSkeleton', false);
        const addonsIcon = (
            <Circle size={sizeAddons}>
                {size === '20' ? <DiamondsSIcon /> : <DiamondsMIcon />}{' '}
            </Circle>
        );
        const previewStyles = stylesStringToObj(getQueryParam('wrapperStyles'));
        const isPreview = Object.keys(previewStyles).length > 0;
        return isPreview ? (
            <div style={previewStyles}>
                <SuperEllipse size={size} backgroundColor={backgroundColor} border={border}>
                    <DiamondsXxlIcon />
                </SuperEllipse>
            </div>
        ) : (
            <SuperEllipse
                size={size}
                backgroundColor={backgroundColor}
                border={border}
                imageUrl={text('imageUrl', '')}
                topAddons={topAddons && addonsIcon}
                bottomAddons={bottomAddons && addonsIcon}
                indicator={indicator && <Badge view='count' />}
                text={text('text', '')}
                mainSize={mainSize}
                isSkeleton={isSkeleton}
            >
                {size === '128' || size === '80' ? (
                    <DiamondsXxlIcon />
                ) : size <= '20' ? (
                    <DiamondsSIcon />
                ) : (
                    <DiamondsMIcon />
                )}
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
        const size = select(
            'size',
            ['16', '20', '24', '32', '40', '48', '56', '64', '72', '80', '128'],
            '64',
        );
        const mainSize = select(
            'mainSize',
            [16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 128],
            undefined,
        );
        const sizeAddons =
            size === '128'
                ? '40'
                : size === '80' || size === '72' || size === '64' || size === '56'
                ? '24'
                : '20';
        const addonsIcon = (
            <Circle size={sizeAddons}>
                {size === '20' ? <DiamondsSIcon /> : <DiamondsMIcon />}
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
                indicator={indicator && <Badge view='count' />}
                text={text('text', '')}
                mainSize={mainSize}
            >
                {size === '128' || size === '80' ? (
                    <DiamondsXxlIcon />
                ) : size <= '20' ? (
                    <DiamondsSIcon />
                ) : (
                    <DiamondsMIcon />
                )}
            </Circle>
        );
    },
};

export const rectangle: Story = {
    name: 'Rectangle',
    render: () => {
        const size = select(
            'size',
            ['20', '24', '32', '40', '48', '56', '64', '72', '80', '128'],
            '64',
        );
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
                {size === '128' || size === '80' ? (
                    <DiamondsXxlIcon />
                ) : size === '20' ? (
                    <DiamondsSIcon />
                ) : (
                    <DiamondsMIcon />
                )}
            </Rectangle>
        );
    },
};

export const no_shape: Story = {
    name: 'NoShape',
    render: () => {
        const size = select(
            'size',
            ['16', '20', '24', '32', '40', '48', '56', '64', '72', '80', '128'],
            '64',
        );
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
                {size === '128' || size === '80' ? (
                    <DiamondsXxlIcon />
                ) : size <= '20' ? (
                    <DiamondsSIcon />
                ) : (
                    <DiamondsMIcon />
                )}
            </NoShape>
        );
    },
};

export default meta;
