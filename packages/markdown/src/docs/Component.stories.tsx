import React from 'react';
import type { StoryObj, Meta } from '@storybook/react';
import { Story } from '@storybook/addon-docs';
import { radios, text } from '@storybook/addon-knobs';
import { Markdown } from '@alfalab/core-components-markdown';
import { Typography } from '@alfalab/core-components-typography';
import { Gap } from '@alfalab/core-components-gap';
import {
    stylesStringToObj,
    getQueryParam,
} from '@alfalab/core-components-screenshot-utils/screenshots-story/utils';

const meta: Meta<typeof Markdown> = {
    title: 'Components/Markdown',
    component: Markdown,
    id: 'Markdown',
};

type Story = StoryObj<typeof Markdown>;

export const markdown: Story = {
    name: 'Markdown',
    render: () => {
        const previewStyles = stylesStringToObj(getQueryParam('wrapperStyles'));
        const isPreview = Object.keys(previewStyles).length > 0;
        return isPreview ? (
            <div style={previewStyles}>
                <div style={{ width: 250 }}>
                    <Typography.Title view='xsmall' tag='div' font='system'>
                        ### Markdown
                    </Typography.Title>
                    <Gap size='m' />
                    <Typography.Text view='primary-medium'>
                        Облегчённый язык разметки, созданный с целью обозначения форматирования
                        в простом тексте.
                    </Typography.Text>
                </div>
            </div>
        ) : (
            <Markdown font={radios('font', { system: 'system', styrene: 'styrene' }, 'system')}>
                {text('children', '') ||
                    `
# Заголовок первого уровня

## Заголовок второго уровня

### Заголовок третьего уровня

#### Заголовок четвертого уровня

Неупорядоченный список:

-   Элемент списка

-   Элемент списка с абзацами

    Второй абзац в элементе списка

-   Элемент списка с пояснением

    > Текст пояснения к элементу списка

Нумерованный список:

1. Первый нумерованный элемент списка

2. Второй нумерованный элемент списка

3. Третий нумерованный элемент списка

    > Текст пояснения к элементу списка

\`Мелкий текст\`

> Мелкий текст 2

Обычный текст

**Жирный текст**

_Курсивный текст_

~~Зачеркнутый текст~~

Текст с [ссылкой](https://alfabank.ru/get-money/credit-cards/100-days/)
   `}
            </Markdown>
        );
    },
};

export default meta;
