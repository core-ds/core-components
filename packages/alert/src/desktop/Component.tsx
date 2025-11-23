import React from 'react';

import { PlateDesktop } from '@alfalab/core-components-plate/desktop';

import { AlertBase, type AlertProps } from '../Component';

export const AlertDesktop = (props: AlertProps) => <AlertBase {...props} Plate={PlateDesktop} />;
