import { useMediaQuery as useResponsive } from 'react-responsive';

export const useMediaQuery = () => {
    const isDesktop = useResponsive({ query: '(min-width: 1024px)' });
    const isDesktopXs = useResponsive({ query: '(max-width: 1280px)' });
    const isDesktopXL = useResponsive({ query: '(max-width: 1600px)' });
    const from1000 = useResponsive({ query: '(min-width: 1000.99px)' });
    const isTablet = useResponsive({ query: '(min-width: 600px) and (max-width: 1023.98px)' });
    const isTabletLg = useResponsive({ query: '(max-width: 1000px)' });
    const isTabletXs = useResponsive({ query: '(max-width: 768px)' });
    const isMobileLG = useResponsive({ query: '(max-width: 599.98px)' });
    const isMobile = useResponsive({ query: '(max-width: 424.99px)' });
    return {
        desktop: isDesktop,
        desktopXs: isDesktopXs,
        desktopXl: isDesktopXL,
        tablet: isTablet,
        tabletLg: isTabletLg,
        tabletXs: isTabletXs,
        mobileLg: isMobileLG,
        mobile: isMobile,
        from1000: from1000,
    };
};
