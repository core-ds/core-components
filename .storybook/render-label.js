import React from 'react';

import { Gap } from './components/Gap.jsx';
import { DocumentIcon } from './components/icons/DocumentIcon.jsx';
import { ComponentIcon } from './components/icons/ComponentIcon.jsx';
import { FolderIcon } from './components/icons/FolderIcon.jsx';
import { FlashIcon } from './components/icons/FlashIcon.jsx';
import { SandboxIcon } from './components/icons/SandboxIcon.jsx';
import { OverviewIcon } from './components/icons/OverviewIcon.jsx';
import { ComponentsOverviewIcon } from './components/icons/ComponentsOverviewIcon.jsx';
import { DiamondsBlankIcon } from './components/icons/DiamondsBlankIcon.jsx';

const renderIcon = (type, parent, depth, name) => {
    switch (type) {
        case 'component': {
            if (name === 'Sandbox') {
                return <SandboxIcon />;
            }
            if (name === 'Quick start') {
                return <FlashIcon />;
            }
            if (name === 'Icons overview') {
                return <OverviewIcon />;
            }
            if (name === 'Components overview') {
                return <ComponentsOverviewIcon />;
            }

            if (parent && parent.includes('components')) {
                return <ComponentIcon />;
            }

            return <DocumentIcon />;
        }
        case 'story': {
            return (
                <>
                    {depth > 1 && <Gap size={20} />}
                    {depth > 1 ? <DiamondsBlankIcon /> : <ComponentIcon />}
                </>
            );
        }
        case 'group': {
            return <FolderIcon />;
        }
        default:
            return null;
    }
};

export const renderLabel = (item) => (
    <span className='item-label'>
        {renderIcon(item.type, item.parent, item.depth, item.name)}
        <span>{item.name}</span>
    </span>
);
