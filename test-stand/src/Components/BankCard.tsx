import React from 'react';
import { BankCard, BankCardProps } from '@alfalab/core-components-bank-card';
import { Button } from '@alfalab/core-components-button';
import { Space } from '@alfalab/core-components-space';
import { Wrapper } from './Wrapper';

const BankCardExample = () => {
    const [value, setValue] = React.useState('');

    const handleChange: BankCardProps['onChange'] = (event, payload) => {
        setValue(payload.value);
    };

    return (
        <Wrapper>
            <BankCard value={value} onChange={handleChange} />
            <div style={{ height: '16px' }} />
            <Space direction='horizontal'>
                <Button size='xs' onClick={() => setValue('4111111111111111')}>
                    Вставить номер карты
                </Button>
                <Button size='xs' onClick={() => setValue('')}>
                    Очистить
                </Button>
            </Space>
        </Wrapper>
    );
};

export default BankCardExample;
