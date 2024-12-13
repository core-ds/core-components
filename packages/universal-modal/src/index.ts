export { UniversalModalResponsive, UniversalModal } from './Component.responsive';
export type { UniversalModalResponsiveProps } from './typings';

export { UniversalModalDesktop, UniversalModalDesktopComponent } from './desktop/Component.desktop';
export type { UniversalModalDesktopProps } from './desktop/types/props';
export { ArrowButtonDesktop } from './desktop/components/buttons/arrow-button';
export { CrossButtonDesktop } from './desktop/components/buttons/cross-button';

export { UniversalModalMobile, UniversalModalMobileComponent } from './mobile/Component.mobile';
export type { UniversalModalMobileProps } from './mobile/types/props';
export { ArrowButtonMobile } from './mobile/components/buttons/arrow-button';
export { CrossButtonMobile } from './mobile/components/buttons/cross-button';

export { ContentDesktop, ContentMobile } from './components/content';
export type { ContentDesktopProps, ContentMobileProps } from './components/content';

export { Controls } from './components/controls';
export type { ControlsProps } from './components/controls';

export { HeaderResponsive, HeaderDesktop, HeaderMobile } from './components/header';
export type {
    HeaderResponsiveProps,
    HeaderPropsDesktop,
    HeaderPropsMobile,
} from './components/header';

export { FooterDesktop, FooterMobile } from './components/footer';
export type { FooterDesktopProps, FooterMobileProps } from './components/footer';
