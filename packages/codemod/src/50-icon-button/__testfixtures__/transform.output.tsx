import React, {Fragment} from 'react';

import { IconButton } from '@alfalab/core-components-icon-button';
import { IconButtonDesktop } from '@alfalab/core-components-icon-button/desktop';
import { IconButtonMobile } from '@alfalab/core-components-icon-button/mobile';
import { DiamondsMIcon } from '@alfalab/icons-glyph/DiamondsMIcon';

export const Component = () => (
    <Fragment>
        <IconButton size={32} icon={<DiamondsMIcon />} />
        <IconButton size={32} icon={<DiamondsMIcon />} />
        <IconButtonDesktop size={32} icon={<DiamondsMIcon />} />
        <IconButtonDesktop size={32} icon={<DiamondsMIcon />} />
        <IconButtonMobile size={32} icon={<DiamondsMIcon />} />
        <IconButtonMobile size={32} icon={<DiamondsMIcon />} />

        <IconButton size={40} icon={<DiamondsMIcon />} />
        <IconButton size={40} icon={<DiamondsMIcon />} />
        <IconButtonDesktop size={40} icon={<DiamondsMIcon />} />
        <IconButtonDesktop size={40} icon={<DiamondsMIcon />} />
        <IconButtonMobile size={40} icon={<DiamondsMIcon />} />
        <IconButtonMobile size={40} icon={<DiamondsMIcon />} />

        <IconButton size={48} icon={<DiamondsMIcon />} />
        <IconButton size={48} icon={<DiamondsMIcon />} />
        <IconButtonDesktop size={48} icon={<DiamondsMIcon />} />
        <IconButtonDesktop size={48} icon={<DiamondsMIcon />} />
        <IconButtonMobile size={48} icon={<DiamondsMIcon />} />
        <IconButtonMobile size={48} icon={<DiamondsMIcon />} />
    </Fragment>
);
