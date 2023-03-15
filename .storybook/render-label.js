import React from 'react';

import { DiamondsSIcon } from '@alfalab/icons-glyph/DiamondsSIcon';

import { Gap } from './components/Gap.jsx';
import { DocumentIcon } from './components/icons/DocumentIcon.jsx';
import { ComponentIcon } from './components/icons/ComponentIcon.jsx';
import { FolderIcon } from './components/icons/FolderIcon.jsx';
import { FlashIcon } from './components/icons/FlashIcon.jsx';
import { SandboxIcon } from './components/icons/SandboxIcon.jsx';

const iconWrapperStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
};

const renderIcon = (type, parent, depth, name) => {
    switch (type) {
        case 'component': {
            if (name === 'Sandbox') {
                return <SandboxIcon />;
            }
            if (name === 'Intro') {
                return <FlashIcon />;
            }
            if (name === 'Components overview') {
                return (
                    <span style={iconWrapperStyles}>
                        <DiamondsSIcon
                            className='sidebar-icon'
                            style={{ transform: 'rotate(45deg)' }}
                        />
                    </span>
                );
            }
            if (parent && parent.includes('components')) {
                return (
                    <>
                        {name === 'KeyboardFocusable' && <Gap size={8} />}
                        <ComponentIcon />
                    </>
                );
            }
            if (
                (parent && parent.includes('instructions')) ||
                (parent && parent.includes('guidelines'))
            ) {
                return (
                    <>
                        <Gap size={depth > 1 ? 10 : 6} />
                        <DocumentIcon />
                    </>
                );
            }
            return <DocumentIcon />;
        }
        case 'story': {
            return (
                <>
                    <Gap size={6} />
                    <ComponentIcon />
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
