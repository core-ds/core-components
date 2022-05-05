import React from 'react';
import { CarMIcon } from '@alfalab/icons-glyph/CarMIcon';
import { StarMIcon } from '@alfalab/icons-glyph/StarMIcon';
import { CardTransferMIcon } from '@alfalab/icons-glyph/CardTransferMIcon';
import { Space } from '@alfalab/core-components-space';
import { PickerButton } from '@alfalab/core-components-picker-button';
import { Wrapper } from './Wrapper';

const Card = ({ name, balance }: { name: string; balance: string }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
            style={{ width: '76px', height: '48px', marginRight: '16px', background: '#E7E9EB' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '14px' }}>{name}</span>
            <span style={{ fontSize: '16px' }}>{balance}</span>
        </div>
    </div>
);

const cardOptions = [
    { key: 'Account1', content: <Card name='Account1 Name ··0000' balance='100 000,00 ₽' /> },
    { key: 'Account2', content: <Card name='Account2 Name ··0000' balance='150 000,00 ₽' /> },
    { key: 'Account3', content: <Card name='Account3 Name ··0000' balance='230 000,00 ₽' /> },
    { key: 'Account4', content: <Card name='Account4 Name ··0000' balance='12 000,00 ₽' /> },
];

const options = [
    { key: 'Название опции 1' },
    { key: 'Название опции 2' },
    { key: 'Название опции 3' },
];

const optionsWithIcons = [
    { key: 'Название опции 1', icon: CarMIcon },
    { key: 'Название опции 2', icon: StarMIcon },
    { key: 'Название опции 3', icon: CardTransferMIcon },
];

const PickerButtonExample = () => {
    return (
        <React.Fragment>
            <Wrapper>
                <Space direction='horizontal'>
                    <PickerButton options={options} view='primary' label='Picker button' />
                    <PickerButton options={optionsWithIcons} view='primary' variant='compact' />
                </Space>
            </Wrapper>
            <Wrapper>
                <PickerButton
                    size='m'
                    options={cardOptions}
                    view='primary'
                    label='Выберите карту'
                    preventFlip={false}
                />
            </Wrapper>
        </React.Fragment>
    );
};

export default PickerButtonExample;
