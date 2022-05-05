import React from 'react';
import { Space } from '@alfalab/core-components-space';
import { Button } from '@alfalab/core-components-button';
import { Portal } from '@alfalab/core-components-portal';
import { StarMIcon } from '@alfalab/icons-glyph/StarMIcon';

const styles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    border: '1px solid #dbdee1',
    padding: 16,
};

const PortalExample = () => {
    const [show, setShow] = React.useState(false);

    const handleClick = () => setShow(!show);

    const getPortalContainer = React.useCallback(
        () => document.querySelector('#portal-container'),
        [],
    );

    return (
        <Space>
            <Button onClick={handleClick}>{show ? 'Unmount children' : 'Mount children'}</Button>
            <div>
                {show && (
                    <Portal getPortalContainer={getPortalContainer}>
                        <StarMIcon />
                    </Portal>
                )}
            </div>

            <div id='portal-container' style={styles}>
                <div>Контейнер для контента портала</div>
            </div>
        </Space>
    );
};

export default PortalExample;
