import React from 'react';
import { PasswordInput } from '@alfalab/core-components-password-input';
import { Wrapper } from './Wrapper';

const PasswordInputExample = () => {
    const [passwordVisible, setPasswordVisible] = React.useState(false);

    return (
        <Wrapper>
            <PasswordInput
                passwordVisible={passwordVisible}
                onPasswordVisibleChange={visible => {
                    setPasswordVisible(visible);
                }}
            />
        </Wrapper>
    );
};

export default PasswordInputExample;
