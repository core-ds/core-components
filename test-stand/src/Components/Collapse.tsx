import React from 'react';
import { Collapse } from '@alfalab/core-components-collapse';
import { Wrapper } from './Wrapper';

const CollapseExample = () => {
    return (
        <Wrapper>
            <Collapse collapsedLabel='Подробнее' expandedLabel='Скрыть'>
                Банк, основанный в 1990 году, является универсальным банком, осуществляющим все
                основные виды банковских операций, представленных на рынке финансовых услуг, включая
                обслуживание частных и корпоративных клиентов, инвестиционный банковский бизнес,
                торговое финансирование и т.д.
            </Collapse>
        </Wrapper>
    );
};

export default CollapseExample;
