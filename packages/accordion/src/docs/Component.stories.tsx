import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { select, text, boolean } from '@storybook/addon-knobs';

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
        const header = boolean('header', true) ? (
            <div className='accordion-header' />
        ) : (
            text('headerText', 'Зачем нужен аккордион?')
        );
        const control = boolean('control', true) ? (
            <div className='accordion-control' />
        ) : undefined;
        const body = boolean('body', true) ? (
            <div className='accordion-body' />
        ) : (
            text(
                'bodyText',
                'Используется для создания интерактивных списков, ' +
                    'которые можно разворачивать и сворачивать для отображения дополнительной информации.',
            )
        );
        const controlPosition = select('controlPosition', ['start', 'end'], 'end');
        const expanded = boolean('expanded', false);

        return (
            <Accordion
                header={header}
                controlPosition={controlPosition}
                control={control}
                expanded={expanded}
                bodyClassName='accordion-container'
            >
                {body}
            </Accordion>
        );
    },
};

export default meta;
