import React from 'react';
import { Badge } from '@alfalab/core-components-badge';
import { Wrapper } from './Wrapper';
import { Col, Container, Row } from '../../../.storybook/blocks/grid';

const BadgeExample = () => {
    return (
        <React.Fragment>
            <Wrapper>
                <Container>
                    <Row>
                        <Col>
                            <Badge view='count' />
                        </Col>
                        <Col>
                            <Badge view='count' content={1} />
                        </Col>
                        <Col>
                            <Badge view='count' content={100} />
                        </Col>
                    </Row>
                </Container>
            </Wrapper>
        </React.Fragment>
    );
};

export default BadgeExample;
