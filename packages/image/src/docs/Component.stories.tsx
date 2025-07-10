import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { CoreConfigContext } from '@alfalab/core-components-config';

import { Image } from '..';

const meta: Meta<typeof Image> = {
    title: 'Components/Image',
    component: Image,
    id: 'Image',
};

type Story = StoryObj<typeof Image>;

export const image: Story = {
    name: 'Image',
    render: () => {
        return (
            <CoreConfigContext.Provider
                value={{
                    components: {
                        Image: {
                            warning: {},
                        },
                        // Image: {
                        //     proxyMap: [
                        //         {
                        //             from: 'https://web-test.alfabank.ru/mobile',
                        //             to: 'https://web-test.servicecdn.ru/public',
                        //         },
                        //         {
                        //             from: 'https://web.alfabank.ru/mobile',
                        //             to: 'https://alfaonline.servicecdn.ru/public',
                        //         },
                        //     ],
                        // },
                    },
                }}
            >
                <Image src='https://web-test.alfabank.ru/mobile/s3/static/loyalty/services/travel_300x300.png' />
            </CoreConfigContext.Provider>
        );
    },
};

export default meta;
