import React from 'react';

import { SelectDesktop, SelectDesktopProps } from '@alfalab/core-components-select/desktop';
import { Arrow } from '@alfalab/core-components-select/shared';


export const AccountSelectDesktop: React.FC<SelectDesktopProps> = (props) => {
    return <SelectDesktop valueRenderer={() => <div>test</div>} Arrow={Arrow} {...props}></SelectDesktop>;
};
