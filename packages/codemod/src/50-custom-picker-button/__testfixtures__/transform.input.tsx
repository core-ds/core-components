import React, {Fragment} from 'react';

import { CustomPickerButton } from '@alfalab/core-components-custom-picker-button';
import { CustomPickerButtonDesktop } from '@alfalab/core-components-custom-picker-button/desktop';
import { CustomPickerButtonMobile } from '@alfalab/core-components-custom-picker-button/mobile';

const options = [{ key: '1' }];

export const Component = () => (
    <Fragment>
        <CustomPickerButton size="xxs" options={options} />
        <CustomPickerButton size={"xxs"} options={options} />
        <CustomPickerButtonDesktop size="xxs" options={options} />
        <CustomPickerButtonDesktop size={"xxs"} options={options} />
        <CustomPickerButtonMobile size="xxs" options={options} />
        <CustomPickerButtonMobile size={"xxs"} options={options} />

        <CustomPickerButton size="xs" options={options} />
        <CustomPickerButton size={"xs"} options={options} />
        <CustomPickerButtonDesktop size="xs" options={options} />
        <CustomPickerButtonDesktop size={"xs"} options={options} />
        <CustomPickerButtonMobile size="xs" options={options} />
        <CustomPickerButtonMobile size={"xs"} options={options} />

        <CustomPickerButton size="s" options={options} />
        <CustomPickerButton size={"s"} options={options} />
        <CustomPickerButtonDesktop size="s" options={options} />
        <CustomPickerButtonDesktop size={"s"} options={options} />
        <CustomPickerButtonMobile size="s" options={options} />
        <CustomPickerButtonMobile size={"s"} options={options} />

        <CustomPickerButton size="m" options={options} />
        <CustomPickerButton size={"m"} options={options} />
        <CustomPickerButtonDesktop size="m" options={options} />
        <CustomPickerButtonDesktop size={"m"} options={options} />
        <CustomPickerButtonMobile size="m" options={options} />
        <CustomPickerButtonMobile size={"m"} options={options} />

        <CustomPickerButton size="l" options={options} />
        <CustomPickerButton size={"l"} options={options} />
        <CustomPickerButtonDesktop size="l" options={options} />
        <CustomPickerButtonDesktop size={"l"} options={options} />
        <CustomPickerButtonMobile size="l" options={options} />
        <CustomPickerButtonMobile size={"l"} options={options} />

        <CustomPickerButton size="xl" options={options} />
        <CustomPickerButton size={"xl"} options={options} />
        <CustomPickerButtonDesktop size="xl" options={options} />
        <CustomPickerButtonDesktop size={"xl"} options={options} />
        <CustomPickerButtonMobile size="xl" options={options} />
        <CustomPickerButtonMobile size={"xl"} options={options} />
    </Fragment>
);
