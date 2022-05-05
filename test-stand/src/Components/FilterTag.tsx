import React from 'react';
import { FilterTag, FilterTagProps } from '@alfalab/core-components-filter-tag';
import { Container, Col, Row } from '../../../.storybook/blocks/grid';
import { Wrapper } from './Wrapper';

const FilterTagExample = () => {
    const variants: Array<FilterTagProps['variant']> = ['default', 'alt'];
    const checkedContent = (
        <span>
            Время года:<b> Весна</b>
        </span>
    );
    const content = <span>Время года</span>;
    const [checkedFilterTag, setCheckedFilterTag] = React.useState<
        Array<FilterTagProps['variant']>
    >([]);
    return (
        <Wrapper>
            <Container>
                <Row align='middle'>
                    {variants.map(variant => (
                        <Col key={variant}>
                            <FilterTag
                                size='xxs'
                                onClick={() => setCheckedFilterTag([...checkedFilterTag, variant])}
                                onClear={() =>
                                    setCheckedFilterTag(
                                        checkedFilterTag.filter(item => item !== variant),
                                    )
                                }
                                checked={checkedFilterTag.includes(variant)}
                                variant={variant}
                            >
                                {checkedFilterTag.includes(variant) ? checkedContent : content}
                            </FilterTag>
                        </Col>
                    ))}
                </Row>
            </Container>
        </Wrapper>
    );
};

export default FilterTagExample;
