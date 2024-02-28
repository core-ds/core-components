import React from 'react';

import { Button } from '@alfalab/core-components-button';
import { ButtonDesktop } from '@alfalab/core-components-button/desktop';
import { ButtonMobile } from '@alfalab/core-components-button/mobile';

export const Component = () => (
    <React.Fragment>
        <Button>Button</Button>
        <Button view='tertiary'>Button</Button>
        <Button view='link'>Button</Button>
        <Button view='ghost'>Button</Button>
        <Button view='secondary'>Button</Button>
        <Button view='accent'>Button</Button>
        <Button view='secondary'>Button</Button>
        <ButtonDesktop>Button</ButtonDesktop>
        <ButtonDesktop view='tertiary'>Button</ButtonDesktop>
        <ButtonDesktop view='link'>Button</ButtonDesktop>
        <ButtonDesktop view='ghost'>Button</ButtonDesktop>
        <ButtonDesktop view='secondary'>Button</ButtonDesktop>
        <ButtonDesktop view='accent'>Button</ButtonDesktop>
        <ButtonDesktop view='secondary'>Button</ButtonDesktop>
        <ButtonMobile>Button</ButtonMobile>
        <ButtonMobile view='tertiary'>Button</ButtonMobile>
        <ButtonMobile view='link'>Button</ButtonMobile>
        <ButtonMobile view='ghost'>Button</ButtonMobile>
        <ButtonMobile view='secondary'>Button</ButtonMobile>
        <ButtonMobile view='accent'>Button</ButtonMobile>
        <ButtonMobile view='secondary'>Button</ButtonMobile>
    </React.Fragment>
);
