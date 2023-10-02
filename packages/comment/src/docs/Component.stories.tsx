import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import { Comment } from '@alfalab/core-components-comment';

import {
    stylesStringToObj,
    getQueryParam,
} from '../../../screenshot-utils/screenshots-story/utils';

const meta: Meta<typeof Comment> = {
    title: 'Components/Comment',
    component: Comment,
    id: 'Comment',
};

type Story = StoryObj<typeof Comment>;

export const comment: Story = {
    name: 'Comment',
    render: () => {
        const children = text('Текст комментария', 'Comment');
        const rowLimit = select('Количество строк', ['', '2', '5'], '');
        const previewStyles = stylesStringToObj(getQueryParam('wrapperStyles'));
        return (
            <div style={previewStyles}>
                <style>
                    {`.comment{background: var(--color-light-specialbg-secondary-transparent)}  `}
                </style>
                <Comment rowLimit={rowLimit} className='comment'>
                    {children}
                </Comment>
            </div>
        );
    },
};

export default meta;
