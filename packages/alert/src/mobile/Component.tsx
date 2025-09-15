import React from 'react';

import { PlateMobile } from '@alfalab/core-components-plate/mobile';

import { AlertBase, type AlertProps } from '../Component';

export const AlertMobile = (props: AlertProps) => <AlertBase {...props} Plate={PlateMobile} />;
