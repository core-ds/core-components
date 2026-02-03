import React, {Fragment} from 'react';

import { PickerButton } from '@alfalab/core-components-picker-button';
import { PickerButtonDesktop } from '@alfalab/core-components-picker-button/desktop';
import { PickerButtonMobile } from '@alfalab/core-components-picker-button/mobile';

const options= [ { key: '1' },];

export const Component = () => (
    <Fragment>
        <PickerButton size={32} options={options} />
        <PickerButton size={32} options={options} />
        <PickerButtonDesktop size={32} options={options} />
        <PickerButtonDesktop size={32} options={options} />
        <PickerButtonMobile size={32} options={options} />
        <PickerButtonMobile size={32} options={options} />

        <PickerButton size={40} options={options} />
        <PickerButton size={40} options={options} />
        <PickerButtonDesktop size={40} options={options} />
        <PickerButtonDesktop size={40} options={options} />
        <PickerButtonMobile size={40} options={options} />
        <PickerButtonMobile size={40} options={options} />

        <PickerButton size={48} options={options} />
        <PickerButton size={48} options={options} />
        <PickerButtonDesktop size={48} options={options} />
        <PickerButtonDesktop size={48} options={options} />
        <PickerButtonMobile size={48} options={options} />
        <PickerButtonMobile size={48} options={options} />

        <PickerButton size={56} options={options} />
        <PickerButton size={56} options={options} />
        <PickerButtonDesktop size={56} options={options} />
        <PickerButtonDesktop size={56} options={options} />
        <PickerButtonMobile size={56} options={options} />
        <PickerButtonMobile size={56} options={options} />

        <PickerButton size={64} options={options} />
        <PickerButton size={64} options={options} />
        <PickerButtonDesktop size={64} options={options} />
        <PickerButtonDesktop size={64} options={options} />
        <PickerButtonMobile size={64} options={options} />
        <PickerButtonMobile size={64} options={options} />

        <PickerButton size={72} options={options} />
        <PickerButton size={72} options={options} />
        <PickerButtonDesktop size={72} options={options} />
        <PickerButtonDesktop size={72} options={options} />
        <PickerButtonMobile size={72} options={options} />
        <PickerButtonMobile size={72} options={options} />
    </Fragment>
);
