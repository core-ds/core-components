import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Collapse } from '@alfalab/core-components-collapse';

const meta: Meta<typeof Collapse> = {
    title: 'Components/Collapse',
    component: Collapse,
    id: 'Collapse',
};

type Story = StoryObj<typeof Collapse>;

export const collapse: Story = {
    name: 'Collapse',
    render: () => {
        return (
            <Collapse collapsedLabel={'Подробнее'} expandedLabel={'Скрыть'} isExpanded={true}>
                {'Банк, основанный в 1990 году, является универсальным банком, осуществляющим все основные ' +
                    'виды банковских операций, представленных на рынке финансовых услуг, включая обслуживание ' +
                    'частных и корпоративных клиентов, инвестиционный банковский бизнес, торговое финансирование ' +
                    'и т.д.'}
            </Collapse>
        );
    },
};

export default meta;
