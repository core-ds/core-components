import React from 'react';
import { Space } from '@alfalab/core-components-space';
import { AmountInput } from '@alfalab/core-components-amount-input';
import { Wrapper } from './Wrapper';

const AmountInputExample = () => {
    return (
        <Wrapper
            header='Управление суффиксом'
            description='По умолчанию в качестве суффикса отображается символ выбранной валюты. Компонент позволяет как скрыть суффикс, так и вывести произвольный текст.'
        >
            <Space>
                <AmountInput value={9999} />
                <AmountInput value={9999} suffix='' />
                <AmountInput value={9999} suffix='%' />
            </Space>
        </Wrapper>
    );
};

export default AmountInputExample;
