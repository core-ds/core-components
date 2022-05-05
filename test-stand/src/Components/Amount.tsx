import React from 'react';
import { Space } from '@alfalab/core-components-space';
import { Amount } from '@alfalab/core-components-amount';
import { Wrapper } from './Wrapper';
import { Col, Container, Row } from '../../../.storybook/blocks/grid';

const AmountExample = () => {
    return (
        <React.Fragment>
            <Wrapper>
                <Space>
                    <Amount
                        value={100000000}
                        minority={100}
                        currency='RUB'
                        view='withZeroMinorPart'
                    />
                    <Container>
                        <Row>
                            <Col>
                                <Row>Значение</Row>
                                <Row>1234500</Row>
                                <Row>1234567</Row>
                            </Col>
                            <Col>
                                <Row>view=&quot;default&quot;</Row>
                                <Row>
                                    <Amount value={1234500} currency='RUR' minority={100} />
                                </Row>
                                <Row>
                                    <Amount value={1234567} currency='RUR' minority={100} />
                                </Row>
                            </Col>
                            <Col>
                                <Row>view = &quot;withZeroMinorPart&quot;</Row>
                                <Row>
                                    <Amount
                                        view='withZeroMinorPart'
                                        value={1234500}
                                        currency='RUR'
                                        minority={100}
                                    />
                                </Row>
                                <Row>
                                    <Amount
                                        view='withZeroMinorPart'
                                        value={1234567}
                                        currency='RUR'
                                        minority={100}
                                    />
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Space>
            </Wrapper>
        </React.Fragment>
    );
};

export default AmountExample;
