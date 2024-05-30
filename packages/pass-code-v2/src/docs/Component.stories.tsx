import { Story } from '@storybook/addon-docs';
import { number, text, boolean } from '@storybook/addon-knobs';

import { PassCode, KeyPadButton } from '@alfalab/core-components-pass-code';
import { SfFaceIdXxlIcon } from '@alfalab/icons-glyph/SfFaceIdXxlIcon';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta<typeof PassCode> = {
    title: 'Components/PassCodeV2',
    component: PassCode,
    id: 'PassCodeV2',
};

type Story = StoryObj<typeof PassCode>;

export const pass_code_v2: Story = {
    name: 'PassCodeV2',
    render: () => {
        const codeLength = number('codeLength', 0, { min: 0, max: 12, range: true });

        return (
            <PassCode
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
