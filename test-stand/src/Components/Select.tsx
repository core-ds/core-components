import React from 'react';
import { Select } from '@alfalab/core-components-select';
import { Wrapper } from './Wrapper';

const SelectExample = () => {
    const options = [
        { key: '1', content: 'Neptunium' },
        { key: '2', content: 'Plutonium' },
        { key: '3', content: 'Americium' },
        { key: '4', content: 'Curium' },
        { key: '5', content: 'Berkelium' },
        { key: '6', content: 'Californium' },
        { key: '7', content: 'Einsteinium' },
        { key: '8', content: 'Fermium' },
    ];

    return (
        <Wrapper>
            <Select options={options} placeholder='Выберите элемент' />
        </Wrapper>
    );
};

export default SelectExample;
