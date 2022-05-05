import React from 'react';
import { IconButton } from '@alfalab/core-components-icon-button';
import { StarMIcon } from '@alfalab/icons-glyph/StarMIcon';
import { Container, Row, Col } from '../../../.storybook/blocks/grid';
import { Wrapper } from './Wrapper';

const IconButtonExample = () => {
    return (
        <Wrapper>
            <Container>
                <Row>
                    <Col>
                        <IconButton
                            view='primary'
                            size='xxs'
                            icon={StarMIcon}
                            style={{ border: '1px solid rgba(0,0,0,0.1) ' }}
                        />
                    </Col>
                    <Col>
                        <IconButton
                            view='primary'
                            size='xs'
                            icon={StarMIcon}
                            style={{ border: '1px solid rgba(0,0,0,0.1) ' }}
                        />
                    </Col>
                    <Col>
                        <IconButton
                            view='primary'
                            size='s'
                            icon={StarMIcon}
                            style={{ border: '1px solid rgba(0,0,0,0.1) ' }}
                        />
                    </Col>
                </Row>
            </Container>
        </Wrapper>
    );
};

export default IconButtonExample;
