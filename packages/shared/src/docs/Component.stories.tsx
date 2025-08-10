import React, { useEffect, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { getColorVar } from '../get-color-var';

const meta: Meta<typeof Image> = {
    title: 'Components/shared/getColorVar',
    id: 'getColorVar',
};

type Story = StoryObj<typeof Image>;

export const image: Story = {
    name: 'getColorVar',
    render: () => {
        const [token, setToken] = useState('backgroundColorNeutral');

        const lightToken = getColorVar({ color: token as any, pure: true });
        const darkToken = getColorVar({ color: token as any, pure: true, theme: 'dark' });
        return (
            <div>
                <div>
                    <div>
                        <b>token: {token}</b>
                    </div>
                    <input
                        type='text'
                        value={token}
                        onChange={(e) => {
                            setToken(e.target.value);
                        }}
                    />
                </div>
                <br />
                <div>
                    lightToken: {lightToken}
                    <div style={{ width: 300, height: 20, background: lightToken }}></div>
                </div>
                <div>darkToken: {darkToken}</div>
                <div style={{ width: 300, height: 20, background: darkToken }}></div>
            </div>
        );
    },
};

export default meta;
