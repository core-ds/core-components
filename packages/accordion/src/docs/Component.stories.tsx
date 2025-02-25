import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { select, text, boolean } from '@storybook/addon-knobs';

import {
    getQueryParam,
    stylesStringToObj,
} from '../../../screenshot-utils/screenshots-story/utils';
import { Accordion } from '@alfalab/core-components-accordion';

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

        if (isPreview) {
            return (
                <div style={previewStyles}>
                    <Accordion header='Зачем нужен аккордион?' expanded={true}>
                        Используется для создания интерактивных списков, которые можно разворачивать
                        и сворачивать для отображения дополнительной информации.
                    </Accordion>
                </div>
            );
        }

        return (
            <div style={previewStyles}>
                <Accordion
                    header={
                        boolean('header', true) ? <div className='accordion-header' /> : undefined
                    }
                    controlPosition={select('controlPosition', ['start', 'end'], 'end')}
                    control={
                        boolean('control', true) ? <div className='accordion-control' /> : undefined
                    }
                    className='accordion-wrapper'
                    bodyClassName='accordion-container'
                >
                    {boolean('children', true) ? <div className='accordion-body' /> : undefined}
                </Accordion>
            </div>
        );
    },
};

export default meta;
