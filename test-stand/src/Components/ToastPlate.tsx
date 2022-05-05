import React from 'react';
import { ToastPlate } from '@alfalab/core-components-toast-plate';
import { Button } from '@alfalab/core-components-button';
import { Wrapper } from './Wrapper';

const ToastPlateExample = () => {
    return (
        <Wrapper>
            <ToastPlate
                badge='positive'
                title='Поздравляем, полный успех'
                hasCloser={true}
                block={true}
                actionButton={
                    <Button colors='inverted' view='ghost' size='s'>
                        Восстановить
                    </Button>
                }
            />
        </Wrapper>
    );
};

export default ToastPlateExample;
