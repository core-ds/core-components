import React, {Fragment} from 'react';

import { CustomPickerButton } from '@alfalab/core-components-custom-picker-button';
import { CustomPickerButtonDesktop } from '@alfalab/core-components-custom-picker-button/desktop';
import { CustomPickerButtonMobile } from '@alfalab/core-components-custom-picker-button/mobile';

const options = [{ key: '1' }];

export const Component = () => (
    <Fragment>
        <CustomPickerButton size={32} options={options} />
        <CustomPickerButton size={32} options={options} />
        <CustomPickerButtonDesktop size={32} options={options} />
        <CustomPickerButtonDesktop size={32} options={options} />
        <CustomPickerButtonMobile size={32} options={options} />
        <CustomPickerButtonMobile size={32} options={options} />

        <CustomPickerButton size={40} options={options} />
        <CustomPickerButton size={40} options={options} />
        <CustomPickerButtonDesktop size={40} options={options} />
        <CustomPickerButtonDesktop size={40} options={options} />
        <CustomPickerButtonMobile size={40} options={options} />
        <CustomPickerButtonMobile size={40} options={options} />

        <CustomPickerButton size={48} options={options} />
        <CustomPickerButton size={48} options={options} />
        <CustomPickerButtonDesktop size={48} options={options} />
        <CustomPickerButtonDesktop size={48} options={options} />
        <CustomPickerButtonMobile size={48} options={options} />
        <CustomPickerButtonMobile size={48} options={options} />

        <CustomPickerButton size={56} options={options} />
        <CustomPickerButton size={56} options={options} />
        <CustomPickerButtonDesktop size={56} options={options} />
        <CustomPickerButtonDesktop size={56} options={options} />
        <CustomPickerButtonMobile size={56} options={options} />
        <CustomPickerButtonMobile size={56} options={options} />

        <CustomPickerButton size={64} options={options} />
        <CustomPickerButton size={64} options={options} />
        <CustomPickerButtonDesktop size={64} options={options} />
        <CustomPickerButtonDesktop size={64} options={options} />
        <CustomPickerButtonMobile size={64} options={options} />
        <CustomPickerButtonMobile size={64} options={options} />

        <CustomPickerButton size={72} options={options} />
        <CustomPickerButton size={72} options={options} />
        <CustomPickerButtonDesktop size={72} options={options} />
        <CustomPickerButtonDesktop size={72} options={options} />
        <CustomPickerButtonMobile size={72} options={options} />
        <CustomPickerButtonMobile size={72} options={options} />
    </Fragment>
);
