import React from 'react';

import { DocumentIcon } from './public/icons/DocumentIcon';
import { ComponentIcon } from './public/icons/ComponentIcon';
import { FolderIcon } from './public/icons/FolderIcon';
// import { DocumentBlankIcon } from './public/icons/DocumentBlankIcon';
import { DiamondsBlankIcon } from './public/icons/DiamondsBlankIcon';
import PencilIcon from './public/images/pencil.svg';

const renderIcon = (type, parent, depth, name) => {
    switch (type) {
        case 'component': {
            if (name === 'Песочница') {
                // Почему-то не хочет отображать svg компонентом
                return <img src={PencilIcon} className='sidebar-icon' />;
            }
            return parent && parent.includes('компоненты') ? <ComponentIcon /> : <DocumentIcon />;
        }
        case 'story': {
            return depth > 2 ? <DiamondsBlankIcon /> : <ComponentIcon />;
        }
        case 'group': {
            return parent === 'инструкции' ? <DocumentIcon /> : <FolderIcon />;
        }
        default:
            return null;
    }
};

export const renderLabel = (item) => (
    <span>
        {renderIcon(item.type, item.parent, item.depth, item.name)}
        {item.name}
    </span>
);
