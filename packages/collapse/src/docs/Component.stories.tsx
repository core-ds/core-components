import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Collapse } from '@alfalab/core-components-collapse';
import { Typography } from '@alfalab/core-components-typography';
import { Gap } from '@alfalab/core-components-gap';
import {
    stylesStringToObj,
    getQueryParam,
} from '../../../screenshot-utils/screenshots-story/utils';

const meta: Meta<typeof Collapse> = {
    title: 'Components/Collapse',
    component: Collapse,
    id: 'Collapse',
};

type Story = StoryObj<typeof Collapse>;

export const collapse: Story = {
    name: 'Collapse',
    render: () => {
        const previewStyles = stylesStringToObj(getQueryParam('wrapperStyles'));
        const isPreview = Object.keys(previewStyles).length > 0;
        return isPreview ? (
            <div style={previewStyles}>
                <div style={{ width: 400 }}>
                    <Typography.Text view='primary-medium'>
                        В рамках закона банки могут блокировать карты, отказывать в проведении
                        сомнительных операций, ограничить доступ в интернет-банк или запрашивать
                        документы, если по операции клиента возникли подозрения.
                    </Typography.Text>
                    <Gap size='m' />
                    <Collapse collapsedLabel='Подробнее' />
                </div>
            </div>
        ) : (
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
