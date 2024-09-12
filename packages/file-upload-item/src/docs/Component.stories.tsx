import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, number, select, boolean } from '@storybook/addon-knobs';
import { FileUploadItem } from '@alfalab/core-components-file-upload-item';

import {
    getQueryParam,
    stylesStringToObj,
} from '../../../screenshot-utils/screenshots-story/utils';

const WRAPPER_STYLES = {
    background: 'var(--color-light-modal-bg-primary)',
};

const meta: Meta<typeof FileUploadItem> = {
    title: 'Components/FileUploadItem',
    component: FileUploadItem,
    id: 'FileUploadItem',
};

type Story = StoryObj<typeof FileUploadItem>;

export const file_upload_item: Story = {
    name: 'FileUploadItem',
    render: () => {
        const previewStyles = stylesStringToObj(getQueryParam('wrapperStyles'));
        const isPreview = Object.keys(previewStyles).length > 0;
        return isPreview ? (
            <div style={{ width: 432, ...previewStyles }}>
                <div style={isPreview ? WRAPPER_STYLES : undefined}>
                    <FileUploadItem
                        name={'Название файла.pdf'}
                        uploadDate='22.01.2023'
                        size={4096}
                        downloadLink='link'
                        showDelete={true}
                    />
                    <FileUploadItem
                        name={'Название файла.docx'}
                        uploadDate='22.01.2023'
                        size={8192}
                        downloadLink='link'
                        showDelete={true}
                    />
                    <FileUploadItem
                        name={'Название файла.docx'}
                        uploadDate='22.01.2023'
                        size={9216}
                        downloadLink='link'
                        showDelete={true}
                    />
                </div>
            </div>
        ) : (
            <div style={{ width: 456 }}>
                <FileUploadItem
                    name={text('name', 'Довольно длинное название файла.pdf')}
                    uploadDate={text('uploadDate', '22.01.2018')}
                    downloadLink={text('downloadLink', '')}
                    error={text('error', '')}
                    size={number('size', 500000000)}
                    uploadStatus={select(
                        'uploadStatus',
                        ['INITIAL', 'ERROR', 'SUCCESS', 'LOADING', 'UPLOADING'],
                        'INITIAL',
                    )}
                    uploadPercent={number('uploadPercent', undefined)}
                    showDelete={boolean('showDelete', false)}
                    showRestore={boolean('showRestore', false)}
                >
                    <FileUploadItem.LeftAddon />
                    <FileUploadItem.Content />
                    <FileUploadItem.RightAddon />
                </FileUploadItem>
            </div>
        );
    },
};

export default meta;
