import React from 'react';

import { SystemMessage } from '../Component';
import { Caption } from '../components/caption';
import { Controls } from '../components/controls';
import { Graphic } from '../components/graphic';
import { Subtitle } from '../components/subtitle';
import { Title } from '../components/title';
import type { SystemMessageDesktopProps } from '../types';
import { createCompound } from '../utils';

const SystemMessageDesktopComponent: React.FC<SystemMessageDesktopProps> = ({
    children,
    ...restProps
}) => (
    <SystemMessage {...restProps} view='desktop'>
        {children}
    </SystemMessage>
);

export const SystemMessageDesktop = createCompound(SystemMessageDesktopComponent);

export {
    SystemMessageDesktopComponent as SystemMessageComponentDesktop,
    Caption as SystemMessageCaptionDesktop,
    Controls as SystemMessageControlsDesktop,
    Graphic as SystemMessageGraphicDesktop,
    Subtitle as SystemMessageSubtitleDesktop,
    Title as SystemMessageTitleDesktop,
};
