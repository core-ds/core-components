import React from 'react';
import { PlateDesktop } from '@balafla/core-components-plate/desktop';

import { type AlertProps, AlertBase } from '../Component';

export const AlertDesktop = (props: AlertProps) => <AlertBase {...props} Plate={PlateDesktop} />;
