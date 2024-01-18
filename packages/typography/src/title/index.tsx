import React, { forwardRef } from 'react';

import { TitleBase, TitleProps } from './component';

import commonStyles from './common.module.css';
import styles from './index.module.css';

const Title = forwardRef<HTMLHeadingElement | HTMLDivElement, TitleProps>((props, ref) => (
    <TitleBase
        {...props}
        styles={Object.assign(commonStyles, styles)}
        ref={ref}
        platform='desktop'
    />
));

export { Title };
export type { TitleProps };
