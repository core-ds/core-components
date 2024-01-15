import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { select, number, text as textAddons, boolean } from '@storybook/addon-knobs';
import { Text } from '@alfalab/core-components-text';

const meta: Meta<typeof Text> = {
    title: 'Components/Text',
    component: Text,
    id: 'Text',
};

type Story = StoryObj<typeof Text>;
const TAGS = ['span', 'p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
export const text: Story = {
    name: 'Text',
    render: () => (
        <Text
            tag={select('tag', TAGS, 'span')}
            align={select('align', ['left', 'right', 'center'], 'left')}
            rowLimit={number('rowLimit', undefined)}
            view={textAddons('view', 'paragraph-primary-large')}
            color={textAddons('color', 'rgba(4, 4, 19, 0.55)')}
            textBackgroundColor={textAddons('textBackgroundColor', 'rgba(15, 25, 55, 0.1)')}
        >
            {textAddons(
                'children',
                'В 2001 году в России начал действовать Федеральный закон №115 «О противодействии легализации доходов, полученных преступным путём, и финансированию терроризма». В рамках закона банки могут блокировать карты, отказывать в проведении сомнительных операций, ограничить доступ в интернет-банк или запрашивать документы, если по операции клиента возникли подозрения.',
            )}
        </Text>
    ),
};

export default meta;
