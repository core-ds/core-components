import React from 'react';
import { ListHeader } from '@alfalab/core-components-list-header';
import { Wrapper } from './Wrapper';

const ListHeaderExample = () => {
    return (
        <Wrapper>
            <ListHeader title='Сегодня' />
            <div>
                В Санкт-Петербурге ожидаются дожди, ливни с грозой, градом и шквалистым ветром до 20
                м/с.
            </div>
            <ListHeader title='23 мая' description='среда' />
            <div>Ясно, без осадков.</div>
        </Wrapper>
    );
};

export default ListHeaderExample;
