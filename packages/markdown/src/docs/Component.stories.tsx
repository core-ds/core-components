import React from 'react';
import type { StoryObj, Meta } from '@storybook/react';
import { Story } from '@storybook/addon-docs';
import { radios, text } from '@storybook/addon-knobs';

import { Markdown } from '@alfalab/core-components-markdown';

const meta: Meta<typeof Markdown> = {
    title: 'Components/Markdown',
    component: Markdown,
    id: 'Markdown',
};

type Story = StoryObj<typeof Markdown>;

export const markdown: Story = {
    name: 'Markdown',
    render: () => {
        return (
            <Markdown font={radios('font', { system: 'system', styrene: 'styrene' }, 'system')}>
                {text('children', '') ||
                    `
# Заголовок первого уровня

## Заголовок второго уровня

### Заголовок третьего уровня

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
