import React from 'react';
import { MaskedInput } from '@alfalab/core-components-masked-input';
import { Wrapper } from './Wrapper';

const MaskedInputExample = () => {
    const masks = {
        // prettier-ignore
        phone: ['+', /\d/, ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/],
        // prettier-ignore
        card: [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]
    };

    const placeholders = {
        phone: '+7 (000) 000-00-00',
        card: '0000 0000 0000 0000',
    };

    return (
        <Wrapper>
            <div style={{ width: '240px' }}>
                <MaskedInput mask={masks.phone} placeholder={placeholders.phone} block={true} />
                <br />
                <MaskedInput mask={masks.card} placeholder={placeholders.card} block={true} />
            </div>
        </Wrapper>
    );
};

export default MaskedInputExample;
