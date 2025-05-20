import React from 'react';

import { SelectMobile, SelectMobileProps } from '@alfalab/core-components-select/mobile';
import { Arrow } from '@alfalab/core-components-select/shared';


export const AccountSelectMobile: React.FC<SelectMobileProps> = (props) => {
    return <SelectMobile valueRenderer={() => <div>test</div>} Arrow={Arrow} {...props}></SelectMobile>;
};
