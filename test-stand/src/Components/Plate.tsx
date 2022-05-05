import React from 'react';
import { Space } from '@alfalab/core-components-space';
import { Plate } from '@alfalab/core-components-plate';
import { Badge } from '@alfalab/core-components-badge';
import { InformationCircleMIcon } from '@alfalab/icons-glyph/InformationCircleMIcon';
import { CheckmarkOnCircleMIcon } from '@alfalab/icons-glyph/CheckmarkOnCircleMIcon';
import { AlertCircleMIcon } from '@alfalab/icons-glyph/AlertCircleMIcon';
import { Wrapper } from './Wrapper';

const PlateExample = () => {
    return (
        <Wrapper>
            <Space fullWidth={true}>
                <Plate
                    view='common'
                    title='Компонент плашки'
                    leftAddons={
                        <Badge
                            view='icon'
                            iconColor='secondary'
                            content={<InformationCircleMIcon />}
                        />
                    }
                >
                    Самая обыкновенная плашка
                </Plate>

                <Plate
                    view='positive'
                    title='Компонент плашки'
                    leftAddons={
                        <Badge
                            view='icon'
                            iconColor='positive'
                            content={<CheckmarkOnCircleMIcon />}
                        />
                    }
                >
                    Самая обыкновенная плашка
                </Plate>

                <Plate
                    view='negative'
                    title='Компонент плашки'
                    leftAddons={
                        <Badge view='icon' iconColor='negative' content={<AlertCircleMIcon />} />
                    }
                >
                    Самая обыкновенная плашка
                </Plate>

                <Plate
                    view='attention'
                    title='Компонент плашки'
                    leftAddons={
                        <Badge view='icon' iconColor='attention' content={<AlertCircleMIcon />} />
                    }
                >
                    Самая обыкновенная плашка
                </Plate>
            </Space>
        </Wrapper>
    );
};

export default PlateExample;
