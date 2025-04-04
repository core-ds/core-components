import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, number, select, boolean } from '@storybook/addon-knobs';
import { FileUploadItemV1 } from '@balafla/core-components-file-upload-item-v1';

import {
    getQueryParam,
    stylesStringToObj,
} from '../../../screenshot-utils/screenshots-story/utils';

const WRAPPER_STYLES = {
    background: 'var(--color-light-modal-bg-primary)',
};

const meta: Meta<typeof FileUploadItemV1> = {
    title: 'Deprecated components/FileUploadItemV1',
    component: FileUploadItemV1,
    id: 'FileUploadItemV1',
};

type Story = StoryObj<typeof FileUploadItemV1>;

export const file_upload_item_v1: Story = {
    name: 'FileUploadItemV1',
    render: () => {
        const previewStyles = stylesStringToObj(getQueryParam('wrapperStyles'));
        const isPreview = Object.keys(previewStyles).length > 0;
        return isPreview ? (
            <div style={{ width: 432, ...previewStyles }}>
                <div style={isPreview ? WRAPPER_STYLES : undefined}>
                    <FileUploadItemV1
                        name={'Название файла.pdf'}
                        uploadDate='22.01.2023'
                        size={4096}
                        downloadLink='link'
                        showDelete={true}
                    />
                    <FileUploadItemV1
                        name={'Название файла.docx'}
                        uploadDate='22.01.2023'
                        size={8192}
                        downloadLink='link'
                        showDelete={true}
                    />
                    <FileUploadItemV1
                        name={'Название файла.docx'}
                        uploadDate='22.01.2023'
                        size={9216}
                        downloadLink='link'
                        showDelete={true}
                    />
                </div>
            </div>
        ) : (
            <div style={{ width: 500 }}>
                <FileUploadItemV1
                    name={text('name', 'Довольно длинное название файла.pdf')}
                    uploadDate={text('uploadDate', '22.01.2018')}
                    downloadLink={text('downloadLink', '')}
                    error={text('error', '')}
                    size={number('size', 500000000)}
                    uploadStatus={select(
                        'uploadStatus',
                        ['ERROR', 'SUCCESS', 'LOADING', 'UPLOADING'],
                        undefined,
                    )}
                    uploadPercent={number('uploadPercent', undefined)}
                    showDelete={boolean('showDelete', false)}
                    showRestore={boolean('showRestore', false)}
                />
            </div>
        );
    },
};

export default meta;
