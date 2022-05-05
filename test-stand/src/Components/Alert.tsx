import React from 'react';
import { Alert } from '@alfalab/core-components-alert';
import { Space } from '@alfalab/core-components-space';
import { Button } from '@alfalab/core-components-button';
import { Wrapper } from './Wrapper';

const AlertExample = () => (
    <React.Fragment>
        <Wrapper description='Alert с view="common" без Space'>
            <Alert view='common'>Вам одобрено. Согласитесь на предложение</Alert>
        </Wrapper>
        <Wrapper description='Alert-ы обёрнутые в Space'>
            <Space>
                <Alert view='common'>Вам одобрено. Согласитесь на предложение</Alert>
                <Alert view='positive'>Вам одобрено. Согласитесь на предложение</Alert>
                <Alert view='negative'>Вам одобрено. Согласитесь на предложение</Alert>
                <Alert view='attention'>Вам одобрено. Согласитесь на предложение</Alert>
                <Alert
                    hasCloser={true}
                    buttons={[<Button>Хорошо</Button>, <Button>Подробнее</Button>]}
                >
                    Вам одобрено. Согласитесь на предложение
                </Alert>
            </Space>
        </Wrapper>
    </React.Fragment>
);

export default AlertExample;
