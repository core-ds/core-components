import React from 'react';

import { DocumentIcon } from './public/icons/DocumentIcon';
import { ComponentIcon } from './public/icons/ComponentIcon';
import { FolderIcon } from './public/icons/FolderIcon';
import { DocumentBlankIcon } from './public/icons/DocumentBlankIcon';
import { DiamondsBlankIcon } from './public/icons/DiamondsBlankIcon';
import PencilIcon from './public/images/pencil.svg';

// Через css не удалось выделить нужную группу
const Gap = () => <span style={{ width: '16px' }} />;

const renderIcon = (type, parent, depth, name) => {
    switch (type) {
        case 'component': {
            if (name === 'Песочница') {
                // Иконка карандаша не отображается svg компонентом
                return <img src={PencilIcon} className='sidebar-icon' />;
            }
            if (parent === 'инструкции-доступность') {
                return <DocumentBlankIcon />;
            }
            return parent && parent.includes('компоненты') ? (
                <>
                    <Gap />
                    <ComponentIcon />
                </>
            ) : (
                <DocumentIcon />
            );
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
    <span className='item-label'>
        {renderIcon(item.type, item.parent, item.depth, item.name)}
        <span>{item.name}</span>
    </span>
);
