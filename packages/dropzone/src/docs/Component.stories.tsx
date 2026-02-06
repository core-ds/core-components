import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import { Dropzone } from '@alfalab/core-components-dropzone';

import {
    getQueryParam,
    stylesStringToObj,
} from '@alfalab/core-components-screenshot-utils/screenshots-story/utils';

const WRAPPER_STYLES = {
    display: 'inline-block',
    background: 'var(--color-light-modal-bg-primary)',
};

const meta: Meta<typeof Dropzone> = {
    title: 'Components/Dropzone',
    component: Dropzone,
    id: 'Dropzone',
};

type Story = StoryObj<typeof Dropzone>;

export const dropzone: Story = {
    name: 'Dropzone',
    render: () => {
        const [filesList, setFilesList] = React.useState([]);
        const handleDrop = (files: FileList) => {
            setFilesList(
                Array.from(files)
                    .map((file) => file.name)
                    .filter(Boolean),
            );
        };
        return (
            <div
                style={{
                    display: 'inline-block',
                    ...stylesStringToObj(getQueryParam('wrapperStyles')),
                }}
            >
                <div style={WRAPPER_STYLES}>
                    <Dropzone
                        error={boolean('error', false)}
                        block={boolean('block', false)}
                        disabled={boolean('disabled', false)}
                        onDrop={handleDrop}
                    >
                        <div
                            style={{
                                minWidth: 400,
                                width: '100%',
                                height: 200,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {filesList.length > 0 ? (
                                <ul>
                                    {filesList.map((file) => (
                                        <li key={file}>{file}</li>
                                    ))}
                                </ul>
                            ) : (
                                <span>Перетащите файлы</span>
                            )}
                        </div>
                    </Dropzone>
                </div>
            </div>
        );
    },
};

export default meta;
