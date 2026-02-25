import React, {Fragment} from 'react';

import { IconButton } from '@alfalab/core-components-icon-button';
import { IconButtonDesktop } from '@alfalab/core-components-icon-button/desktop';
import { IconButtonMobile } from '@alfalab/core-components-icon-button/mobile';
import { DiamondsMIcon } from '@alfalab/icons-glyph/DiamondsMIcon';

export const Component = () => (
    <Fragment>
        <IconButton size="xxs" icon={<DiamondsMIcon />} />
        <IconButton size={"xxs"} icon={<DiamondsMIcon />} />
        <IconButtonDesktop size="xxs" icon={<DiamondsMIcon />} />
        <IconButtonDesktop size={"xxs"} icon={<DiamondsMIcon />} />
        <IconButtonMobile size="xxs" icon={<DiamondsMIcon />} />
        <IconButtonMobile size={"xxs"} icon={<DiamondsMIcon />} />

        <IconButton size="xs" icon={<DiamondsMIcon />} />
        <IconButton size={"xs"} icon={<DiamondsMIcon />} />
        <IconButtonDesktop size="xs" icon={<DiamondsMIcon />} />
        <IconButtonDesktop size={"xs"} icon={<DiamondsMIcon />} />
        <IconButtonMobile size="xs" icon={<DiamondsMIcon />} />
        <IconButtonMobile size={"xs"} icon={<DiamondsMIcon />} />

        <IconButton size="s" icon={<DiamondsMIcon />} />
        <IconButton size={"s"} icon={<DiamondsMIcon />} />
        <IconButtonDesktop size="s" icon={<DiamondsMIcon />} />
        <IconButtonDesktop size={"s"} icon={<DiamondsMIcon />} />
        <IconButtonMobile size="s" icon={<DiamondsMIcon />} />
        <IconButtonMobile size={"s"} icon={<DiamondsMIcon />} />
    </Fragment>
);
