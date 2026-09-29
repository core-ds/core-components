import React from 'react';

import { SystemMessage } from '../Component';
import { Caption } from '../components/caption';
import { Controls } from '../components/controls';
import { Graphic } from '../components/graphic';
import { Subtitle } from '../components/subtitle';
import { Title } from '../components/title';
import { type SystemMessageMobileProps } from '../types';

const SystemMessageMobileComponent: React.FC<SystemMessageMobileProps> = ({
    children,
    ...restProps
}) => (
    <SystemMessage {...restProps} view='mobile'>
        {children}
    </SystemMessage>
);

export const SystemMessageMobile = Object.assign(SystemMessageMobileComponent, {
    Graphic,
    Title,
    Subtitle,
    Caption,
    Controls,
});

export {
    SystemMessageMobileComponent as SystemMessageComponentMobile,
    Caption as SystemMessageCaptionMobile,
    Controls as SystemMessageControlsMobile,
    Graphic as SystemMessageGraphicMobile,
    Subtitle as SystemMessageSubtitleMobile,
    Title as SystemMessageTitleMobile,
};
