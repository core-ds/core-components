import React from 'react';
import { CardImage } from '@alfalab/core-components-card-image';
import { Wrapper } from './Wrapper';

const CardImageExample = () => {
    return (
        <Wrapper>
            <CardImage
                cardId='EG'
                width={500}
                rounded={false}
                baseUrl='https://online.alfabank.ru/cards-images/cards/'
                className='some name'
                id='some id'
                dataTestId='test id'
            />
        </Wrapper>
    );
};

export default CardImageExample;
