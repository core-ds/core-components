import React, { forwardRef } from 'react';

import { TitleBase, type TitleProps } from './component';

import alfasansStyles from './alfasans-index.module.css';
import commonStyles from './common.module.css';
import styles from './index.module.css';

const allStyles =
    process.env.CORE_COMPONENTS_ENV === 'test'
        ? commonStyles
        : { ...commonStyles, ...styles, ...alfasansStyles };

const Title = forwardRef<HTMLHeadingElement | HTMLDivElement, TitleProps>((props, ref) => (
    <TitleBase {...props} styles={allStyles} ref={ref} platform='desktop' />
));

export { Title };
export type { TitleProps };
