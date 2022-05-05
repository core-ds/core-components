import React from 'react';
import { Space } from '@alfalab/core-components-space';
import { Skeleton } from '@alfalab/core-components-skeleton';
import { Typography } from '@alfalab/core-components-typography';
import { Wrapper } from './Wrapper';

const SkeletonExample = () => {
    return (
        <React.Fragment>
            <Wrapper>
                <Skeleton visible={true} animate={true}>
                    Заголовок
                </Skeleton>
            </Wrapper>
            <Wrapper>
                <Space>
                    <Skeleton visible={true} animate={true}>
                        Заголовок
                    </Skeleton>
                    <Skeleton visible={true} animate={true}>
                        Какой-то текст
                    </Skeleton>
                    <Skeleton visible={true} animate={true}>
                        <Typography.Text view='primary-large' tag='span'>
                            Какой-то текст
                        </Typography.Text>
                    </Skeleton>
                </Space>
            </Wrapper>
        </React.Fragment>
    );
};

export default SkeletonExample;
