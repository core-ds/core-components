import React from 'react';
import { Button } from '@alfalab/core-components-button';
import { Wrapper } from './Wrapper';
import { Col, Container, Row } from '../../../.storybook/blocks/grid';

const ButtonExample = () => {
    return (
        <Wrapper>
            <Container>
                <Row align='middle'>
                    <Col>
                        <Button view='primary'>Primary</Button>
                    </Col>
                    <Col>
                        <Button view='secondary'>Secondary</Button>
                    </Col>
                    <Col>
                        <Button view='tertiary'>Tertiary</Button>
                    </Col>
                    <Col>
                        <Button view='link'>Link</Button>
                    </Col>
                    <Col>
                        <Button view='ghost'>Ghost</Button>
                    </Col>
                </Row>
            </Container>
        </Wrapper>
    );
};

export default ButtonExample;
