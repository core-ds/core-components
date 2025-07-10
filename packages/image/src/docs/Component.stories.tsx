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
                            inViewOption: true,
                            proxyMap: [
                                {
                                    from: 'https://web-test.alfabank.ru/mobile',
                                    to: 'https://web-test.servicecdn.ru/public',
                                },
                                {
                                    from: 'https://web.alfabank.ru/mobile',
                                    to: 'https://alfaonline.servicecdn.ru/public',
                                },
                            ],
                        },
                    },
                }}
            >
                <div style={{ height: '1000px' }}></div>
                <Image src='https://web-test.alfabank.ru/mobile/s3/static/loyalty/services/travel_300x300.png' />
                <div style={{ height: '300px' }}></div>
                <Image
                    src='https://web-test.alfabank.ru/mobile/s3/static/loyalty/widget/pforfit_492%D1%85469.png
'
                />
            </CoreConfigContext.Provider>
        );
    },
};

export default meta;
