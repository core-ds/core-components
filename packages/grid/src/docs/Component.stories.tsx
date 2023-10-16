import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from '@alfalab/core-components-grid';
import {
    stylesStringToObj,
    getQueryParam,
} from '../../../screenshot-utils/screenshots-story/utils';

const meta: Meta<typeof Grid> = {
    title: 'Components/Grid',
    component: Grid,
    id: 'Grid',
};

type Story = StoryObj<typeof Grid>;

export const grid: Story = {
    name: 'Grid',
    render: () => {
        const style = {
            height: 30,
            background: '#ff5c5c',
        };
        const styleCol = {
            display: 'flex',
            justifyContent: 'center',
            lineHeight: '24px',
            borderRadius: '8px',
            color: 'var(--color-light-text-secondary)',
            background: 'var(--color-light-specialbg-secondary-transparent)',
        };
        const styleRow = {
            padding: '8px 20px',
        };
        const previewStyles = stylesStringToObj(getQueryParam('wrapperStyles'));
        const isPreview = Object.keys(previewStyles).length > 0;
        return isPreview ? (
            <div style={previewStyles}>
                <div style={{ width: 360 }}>
                    <div style={styleRow}>
                        <Grid.Row>
                            <Grid.Col>
                                <div style={styleCol}>12</div>
                            </Grid.Col>
                        </Grid.Row>
                    </div>
                    <div style={styleRow}>
                        <Grid.Row>
                            {[1, 2].map((key) => (
                                <Grid.Col width='6' key={key}>
                                    <div style={styleCol}>6</div>
                                </Grid.Col>
                            ))}
                        </Grid.Row>
                    </div>
                    <div style={styleRow}>
                        <Grid.Row>
                            {[1, 2, 3].map((key) => (
                                <Grid.Col width='4' key={key}>
                                    <div style={styleCol}>4</div>
                                </Grid.Col>
                            ))}
                        </Grid.Row>
                    </div>
                    <div style={styleRow}>
                        <Grid.Row>
                            {[1, 2, 3, 4].map((key) => (
                                <Grid.Col width='3' key={key}>
                                    <div style={styleCol}>3</div>
                                </Grid.Col>
                            ))}
                        </Grid.Row>
                    </div>
                </div>
            </div>
        ) : (
            <Grid.Row gutter={{ mobile: 0, tablet: 16, desktop: 24 }}>
                <Grid.Col>
                    <div style={style} />
                </Grid.Col>
                <Grid.Col>
                    <div style={{ ...style, background: '#f04539' }} />
                </Grid.Col>
                <Grid.Col>
                    <div style={style} />
                </Grid.Col>
            </Grid.Row>
        );
    },
};

export default meta;
