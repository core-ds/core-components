import React from 'react';
import { KeyboardFocusable } from '@alfalab/core-components-keyboard-focusable';
import { Wrapper } from './Wrapper';

const focusOutlineStyles: React.CSSProperties = {
    outline: '2px solid red',
    outlineOffset: '2px',
};

const KeyboardFocusableExample = () => {
    return (
        <Wrapper>
            <KeyboardFocusable>
                {(ref, focused) => (
                    // eslint-disable-next-line jsx-a11y/control-has-associated-label
                    <button
                        type='button'
                        ref={ref}
                        style={focused ? focusOutlineStyles : undefined}
                    >
                        Выбери меня табом
                    </button>
                )}
            </KeyboardFocusable>
        </Wrapper>
    );
};

export default KeyboardFocusableExample;
