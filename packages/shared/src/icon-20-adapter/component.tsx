import React, {
    type FC,
    forwardRef,
    type ForwardRefExoticComponent,
    type RefAttributes,
    type SVGProps,
} from 'react';
import cn from 'classnames';

import styles from './index.module.css';

export interface Icon20AdapterProps extends SVGProps<SVGSVGElement> {
    icon:
        | FC<SVGProps<SVGSVGElement>>
        | ForwardRefExoticComponent<SVGProps<SVGSVGElement> & RefAttributes<SVGSVGElement>>;
}

export const Icon20Adapter = forwardRef<SVGSVGElement, Icon20AdapterProps>(
    ({ icon: Icon, children, className, ...restProps }, ref) => (
        <Icon {...restProps} ref={ref} className={cn(className, styles.adapter)}>
            {children}
        </Icon>
    ),
);
