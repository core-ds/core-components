import React from 'react';

import { Plate } from '@alfalab/core-components-plate';

import { AlertBase, type AlertProps } from './Component';

export const AlertResponsive = (props: AlertProps) => <AlertBase {...props} Plate={Plate} />;
