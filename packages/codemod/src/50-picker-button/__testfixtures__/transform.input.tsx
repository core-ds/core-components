import React, {Fragment} from 'react';

import { PickerButton } from '@alfalab/core-components-picker-button';
import { PickerButtonDesktop } from '@alfalab/core-components-picker-button/desktop';
import { PickerButtonMobile } from '@alfalab/core-components-picker-button/mobile';

const options= [ { key: '1' },];

export const Component = () => (
    <Fragment>
        <PickerButton size="xxs" options={options} />
        <PickerButton size={"xxs"} options={options} />
        <PickerButtonDesktop size="xxs" options={options} />
        <PickerButtonDesktop size={"xxs"} options={options} />
        <PickerButtonMobile size="xxs" options={options} />
        <PickerButtonMobile size={"xxs"} options={options} />

        <PickerButton size="xs" options={options} />
        <PickerButton size={"xs"} options={options} />
        <PickerButtonDesktop size="xs" options={options} />
        <PickerButtonDesktop size={"xs"} options={options} />
        <PickerButtonMobile size="xs" options={options} />
        <PickerButtonMobile size={"xs"} options={options} />

        <PickerButton size="s" options={options} />
        <PickerButton size={"s"} options={options} />
        <PickerButtonDesktop size="s" options={options} />
        <PickerButtonDesktop size={"s"} options={options} />
        <PickerButtonMobile size="s" options={options} />
        <PickerButtonMobile size={"s"} options={options} />

        <PickerButton size="m" options={options} />
        <PickerButton size={"m"} options={options} />
        <PickerButtonDesktop size="m" options={options} />
        <PickerButtonDesktop size={"m"} options={options} />
        <PickerButtonMobile size="m" options={options} />
        <PickerButtonMobile size={"m"} options={options} />

        <PickerButton size="l" options={options} />
        <PickerButton size={"l"} options={options} />
        <PickerButtonDesktop size="l" options={options} />
        <PickerButtonDesktop size={"l"} options={options} />
        <PickerButtonMobile size="l" options={options} />
        <PickerButtonMobile size={"l"} options={options} />

        <PickerButton size="xl" options={options} />
        <PickerButton size={"xl"} options={options} />
        <PickerButtonDesktop size="xl" options={options} />
        <PickerButtonDesktop size={"xl"} options={options} />
        <PickerButtonMobile size="xl" options={options} />
        <PickerButtonMobile size={"xl"} options={options} />
    </Fragment>
);
