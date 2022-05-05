import React from 'react';
import { Tooltip } from '@alfalab/core-components-tooltip';
import { Wrapper } from './Wrapper';

const TooltipExample = () => {
    return (
        <Wrapper>
            <div
                style={{
                    width: '100%',
                    height: '300px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Tooltip
                    position='left'
                    trigger='click'
                    content={
                        <div style={{ width: '215px' }}>
                            Теперь вам можно снимать наличные в кассе и банкоматах, если ваш тариф
                            это позволяет
                        </div>
                    }
                    fallbackPlacements={['bottom', 'top']}
                >
                    <div style={{ padding: '15px', border: '1px dashed rgba(0, 0, 0, 0.1)' }}>
                        Нажми на меня
                    </div>
                </Tooltip>
            </div>
        </Wrapper>
    );
};

export default TooltipExample;
