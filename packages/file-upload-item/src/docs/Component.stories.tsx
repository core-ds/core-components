import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, number, select, boolean } from '@storybook/addon-knobs';
import { FileUploadItem } from '@alfalab/core-components-file-upload-item';
import {
    getQueryParam,
    stylesStringToObj,
} from '../../../screenshot-utils/screenshots-story/utils';

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
        const subtitle = text('subtitle', 'Нет файла');

        return (
            <div style={previewStyles}>
                <div
                    style={
                        isPreview
                            ? {
                                  width: 394,
                                  borderRadius: 'var(--border-radius-20)',
                                  backgroundColor: 'var(--color-light-base-bg-primary)',
                                  padding: 'var(--gap-12)',
                              }
                            : { width: 456 }
                    }
                >
                    <FileUploadItem
                        uploadStatus={select(
                            'uploadStatus',
                            ['INITIAL', 'ERROR', 'SUCCESS', 'UPLOADING'],
                            'INITIAL',
                        )}
                        title={text('title', 'Прикрепите файл')}
                        subtitle={subtitle === '' ? undefined : subtitle}
                        uploadDate={text('uploadDate', '22.01.2018')}
                        downloadLink={text('downloadLink', '')}
                        error={text('error', '')}
                        size={number('size', 500000000)}
                        progressBar={number('progressBar', 0)}
                        showDelete={boolean('showDelete', false)}
                        showRestore={boolean('showRestore', false)}
                        truncate={boolean('truncate', false)}
                    >
                        <FileUploadItem.StatusControl />
                        <FileUploadItem.Content />
                        <FileUploadItem.Actions />
                    </FileUploadItem>
                </div>
            </div>
        );
    },
};

export const file_upload_item_left_addon: Story = {
    name: 'FileUploadItem.StatusControl',
    render: () => {
        return (
            <div style={{ width: 456 }}>
                <FileUploadItem uploadStatus={'UPLOADING'} progressBar={number('progressBar', 0)}>
                    <FileUploadItem.StatusControl />
                </FileUploadItem>
            </div>
        );
    },
};

export default meta;
