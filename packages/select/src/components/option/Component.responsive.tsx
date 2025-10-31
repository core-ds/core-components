import React from 'react';

import { type OptionProps } from '../../typings';

import { OptionDesktop } from './desktop/Component';
import { OptionMobile } from './mobile/Component';

export const OptionResponsive = ({ mobile, ...props }: OptionProps) =>
    mobile ? <OptionMobile {...props} /> : <OptionDesktop {...props} />;
