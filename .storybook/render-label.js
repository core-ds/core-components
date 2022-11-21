import React from 'react';

import { Gap } from './components/Gap.jsx';
import { DocumentIcon } from './components/icons/DocumentIcon.jsx';
import { ComponentIcon } from './components/icons/ComponentIcon.jsx';
import { FolderIcon } from './components/icons/FolderIcon.jsx';
import { DocumentBlankIcon } from './components/icons/DocumentBlankIcon.jsx';
import { DiamondsBlankIcon } from './components/icons/DiamondsBlankIcon.jsx';
// import { SandboxIcon } from './components/icons/SandboxIcon.jsx';
import SandboxIcon from './public/images/sandbox.svg';

const renderIcon = (type, parent, depth, name) => {
    switch (type) {
        case 'component': {
            if (name === 'Песочница') {
                // Сложная иконка песочницы не отображается svg компонентом
                return <img src={SandboxIcon} className='sidebar-icon' />;
            }
            if (parent === 'инструкции-доступность') {
                return <DocumentBlankIcon />;
            }
            if (parent && parent.includes('компоненты')) {
                return (
                    <>
                        <Gap size={name === 'KeyboardFocusable' ? 8 : 24} />
                        <ComponentIcon />
                    </>
                );
            }
            return <DocumentIcon />;
        }
        case 'story': {
            return depth > 2 ? (
                <>
                    <Gap size={16} />
                    <DiamondsBlankIcon />
                </>
            ) : (
                <>
                    <Gap size={8} />
                    <ComponentIcon />
                </>
            );
        }
        case 'group': {
            return parent === 'инструкции' ? <DocumentIcon /> : <FolderIcon />;
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
