import React from 'react';
import { Input } from '@balafla/core-components-input';
import { InputDesktop } from '@balafla/core-components-input/desktop';
import { InputMobile } from '@balafla/core-components-input/mobile';

export const Component = () => (
    <React.Fragment>
        <Input type='number'/>
        <Input type='email'/>
        <Input inputMode='numeric' size='56'/>
        <Input inputMode='numeric'/>
        <Input type='text'/>
        <Input/>
        <InputDesktop type='number'/>
        <InputDesktop type='email'/>
        <InputDesktop inputMode='numeric' size='56'/>
        <InputDesktop inputMode='numeric'/>
        <InputDesktop type='text'/>
        <InputDesktop/>
        <InputMobile type='number'/>
        <InputMobile type='email'/>
        <InputMobile inputMode='numeric' size='56'/>
        <InputMobile inputMode='numeric'/>
        <InputMobile type='text'/>
        <InputMobile/>
    </React.Fragment>
);
