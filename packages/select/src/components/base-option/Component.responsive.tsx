import React from 'react';

import { OptionProps } from '../../typings';

import { BaseOptionDesktop } from './desktop/Component';
import { BaseOptionMobile } from './mobile/Component';

export const BaseOptionResponsive = ({ mobile = false, ...props }: OptionProps) =>
    mobile ? <BaseOptionMobile {...props} /> : <BaseOptionDesktop {...props} />;
