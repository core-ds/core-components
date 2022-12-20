import React from 'react';

import { Gap } from './components/Gap.jsx';
import { DocumentIcon } from './components/icons/DocumentIcon.jsx';
import { ComponentIcon } from './components/icons/ComponentIcon.jsx';
import { FolderIcon } from './components/icons/FolderIcon.jsx';
import { DiamondsBlankIcon } from './components/icons/DiamondsBlankIcon.jsx';
import { FlashIcon } from './components/icons/FlashIcon.jsx';
// import { SandboxIcon } from './components/icons/SandboxIcon.jsx';
import SandboxIcon from './public/images/sandbox-icon.svg';

const renderIcon = (type, parent, depth, name) => {
    switch (type) {
        case 'component': {
            if (name === 'Sandbox') {
                // Сложная иконка песочницы не отображается svg компонентом
                return <img src={SandboxIcon} className='sidebar-icon' />;
            }
            if (name === 'Intro') {
                return <FlashIcon />;
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
