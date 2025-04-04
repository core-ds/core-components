import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { select, text, boolean } from '@storybook/addon-knobs';

import {
    getQueryParam,
    stylesStringToObj,
} from '../../../screenshot-utils/screenshots-story/utils';
import { Accordion } from '@balafla/core-components-accordion';

import './demo.css';

const meta: Meta<typeof Accordion> = {
    title: 'Components/Accordion',
    component: Accordion,
    id: 'Accordion',
};

type Story = StoryObj<typeof Accordion>;

export const accordion: Story = {
    name: 'Accordion',
    render: () => {
        const previewStyles = stylesStringToObj(getQueryParam('wrapperStyles'));
        const isPreview = Object.keys(previewStyles).length > 0;

        const header = boolean('header', true) ? (
            <div className='accordion-header' />
        ) : (
            text('headerText', 'Зачем нужен аккордион?')
        );
        const control = boolean('control', true) ? (
            <div className='accordion-control' />
        ) : undefined;
        const children = boolean('children', true) ? (
            <div className='accordion-body' />
        ) : (
            text(
                'childrenText',
                'Используется для создания интерактивных списков, ' +
                    'которые можно разворачивать и сворачивать для отображения дополнительной информации.',
            )
        );
        const controlPosition = select('controlPosition', ['start', 'end'], 'end');

        return (
            <div style={previewStyles}>
                <Accordion
                    header={header}
                    controlPosition={controlPosition}
                    control={control}
                    expanded={isPreview || undefined}
                    className='accordion-wrapper'
                    bodyClassName='accordion-container'
                >
                    {children}
                </Accordion>
            </div>
        );
    },
};

export default meta;
