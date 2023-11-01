import React from 'react';

import { Gap } from './components/Gap.jsx';
import { DocumentIcon } from './components/icons/DocumentIcon.jsx';
import { ComponentIcon } from './components/icons/ComponentIcon.jsx';
import { FlashIcon } from './components/icons/FlashIcon.jsx';
import { SandboxIcon } from './components/icons/SandboxIcon.jsx';
import { OverviewIcon } from './components/icons/OverviewIcon.jsx';
import { ComponentsOverviewIcon } from './components/icons/ComponentsOverviewIcon.jsx';
import { DiamondsBlankIcon } from './components/icons/DiamondsBlankIcon.jsx';
import { MuseumIcon } from './components/icons/MuseumIcon.jsx';

const renderIcon = (item) => {
    const { type, name, parent, depth } = item;

    switch (type) {
        case 'docs': {
            if (item.name === 'Sandbox') {
                return <SandboxIcon />;
            }
            if (item.name === 'Quick start') {
                return <FlashIcon />;
            }
            if (name === 'Icons overview') {
                return <OverviewIcon />;
            }
            if (name === 'Components overview') {
                return <ComponentsOverviewIcon />;
            }
            if (name === 'Museum') {
                return <MuseumIcon />;
            }

            return (
                <>
                    {depth > 1 && <Gap size={20} />}
                    <DocumentIcon />
                </>
            );
        }

        case 'component': {
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

        default:
            return null;
    }
};

export const renderLabel = (item) => (
    <span className='item-label'>
        {renderIcon(item)}
        <span>{item.name}</span>
    </span>
);
