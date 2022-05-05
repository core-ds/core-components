import React from 'react';
import { CustomButton } from '@alfalab/core-components-custom-button';
import { Wrapper } from './Wrapper';
import { Container, Row, Col } from '../../../.storybook/blocks/grid';

const CustomButtonExample = () => {
    return (
        <Wrapper description='Компонент используется при необходимости отобразить кнопку с кастомным цветом фона.'>
            <Container>
                <Row align='middle'>
                    <Col>
                        <CustomButton backgroundColor='#FF45C3'>Кнопка</CustomButton>
                    </Col>
                    <Col>
                        <CustomButton backgroundColor='#4AF2FD' contentColor='black'>
                            Кнопка
                        </CustomButton>
                    </Col>
                </Row>
            </Container>
        </Wrapper>
    );
};

export default CustomButtonExample;
