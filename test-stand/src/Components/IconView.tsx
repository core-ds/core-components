import React from 'react';
import {
    SuperEllipse,
    SuperEllipseProps,
} from '@alfalab/core-components-icon-view/src/components/super-ellipse';
import { SfTouchIdXxlIcon } from '@alfalab/icons-glyph/SfTouchIdXxlIcon';
import { Wrapper } from './Wrapper';
import { Container, Row, Col } from '../../../.storybook/blocks/grid';

const SIZES: Array<SuperEllipseProps['size']> = [128, 80, 64, 48];

const IconViewExample = () => {
    return (
        <Wrapper>
            <Container>
                <Row>
                    {SIZES.map(size => (
                        <Col key={size}>
                            <SuperEllipse size={size}>
                                <SfTouchIdXxlIcon />
                            </SuperEllipse>
                        </Col>
                    ))}
                </Row>
            </Container>
        </Wrapper>
    );
};

export default IconViewExample;
