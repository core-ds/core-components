import React from 'react';

import { Input } from '@alfalab/core-components-input';
import { InputDesktop } from '@alfalab/core-components-input/desktop';
import { InputMobile } from '@alfalab/core-components-input/mobile';

export const Component = () => (
    <React.Fragment>
        <Input type='number'/>
        <Input type='email'/>
        <Input type='card' size='56'/>
        <Input type='card'/>
        <Input type='text'/>
        <Input/>
        <InputDesktop type='number'/>
        <InputDesktop type='email'/>
        <InputDesktop type='card' size='56'/>
        <InputDesktop type='card'/>
        <InputDesktop type='text'/>
        <InputDesktop/>
        <InputMobile type='number'/>
        <InputMobile type='email'/>
        <InputMobile type='card' size='56'/>
        <InputMobile type='card'/>
        <InputMobile type='text'/>
        <InputMobile/>
    </React.Fragment>
);
