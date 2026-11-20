import React from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { boolean, number, text } from '@storybook/addon-knobs';
import { CoreConfigContext } from '@alfalab/core-components-config';

import { Image } from '@alfalab/core-components-image';

const meta: Meta<typeof Image> = {
    title: 'Components/Image',
    component: Image,
    id: 'Image',
};

type Story = StoryObj<typeof Image>;

export const image: Story = {
    name: 'Image',
    render: () => {
        const src = text(
            'src',
            'https://web.alfabank.ru/mobile/s3/static/loyalty/services/travel_300x300.png',
        );
        const inViewOption = boolean('inViewOption', true);
        const width = number('width', 300);
        const height = number('height', 300);

        return (
            <CoreConfigContext.Provider
                value={{
                    breakpoint: 1024,
                    client: 'desktop',
                    components: {
                        Image: {
                            inViewOption,
                            proxyMap: [
                                {
                                    from: 'https://web.alfabank.ru/mobile',
                                    to: 'https://alfaonline.servicecdn.ru/public',
                                },
                            ],
                        },
                    },
                }}
            >
                {inViewOption ? <div style={{ height: 800 }} /> : null}
                <Image src={src} width={width} height={height} />
            </CoreConfigContext.Provider>
        );
    },
};

export default meta;
