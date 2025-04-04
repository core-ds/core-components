import React from 'react';
import { Plate } from '@balafla/core-components-plate';

import { type AlertProps, AlertBase } from './Component';

export const AlertResponsive = (props: AlertProps) => <AlertBase {...props} Plate={Plate} />;
