import { Story } from '@storybook/addon-docs';
import { number, text, boolean } from '@storybook/addon-knobs';

import { PassCodeV1, KeyPadButton } from '@balafla/core-components-pass-code-v1';
import { SfFaceIdXxlIcon } from '@alfalab/icons-glyph/SfFaceIdXxlIcon';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta<typeof PassCodeV1> = {
    title: 'Deprecated components/PassCodeV1',
    component: PassCodeV1,
    id: 'PassCodeV1',
};

type Story = StoryObj<typeof PassCodeV1>;

export const pass_code_v1: Story = {
    name: 'PassCodeV1',
    render: () => {
        const codeLength = number('codeLength', 0, { min: 0, max: 12, range: true });

        return (
            <PassCodeV1
                value={text('value', '')}
                onChange={() => {}}
                maxCodeLength={number('maxCodeLength', 8, { min: 0, max: 12, range: true })}
                codeLength={codeLength === 0 ? undefined : codeLength}
                message={text('message', '')}
                error={text('error', '')}
                leftAddons={
                    boolean('leftAddons', false) && (
                        <KeyPadButton view='text' key='left-addon'>
                            Забыли код?
                        </KeyPadButton>
                    )
                }
                rightAddons={
                    boolean('rightAddons', false) && (
                        <KeyPadButton view='text' key='right-addon'>
                            <SfFaceIdXxlIcon />
                        </KeyPadButton>
                    )
                }
            />
        );
    },
};

export default meta;
