export const isRTL = () => document.body.getAttribute('dir') === 'rtl';

export type GridBreakpointsLabels = 'xs' | 'sm' | 'md' | 'lg' | 'xlg' | 'xxlg' | 'xl';
export const GridBreakpoints: Readonly<Record<GridBreakpointsLabels, number>> = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xlg: 1200,
  xxlg: 1300,
  xl: 1693,
};
