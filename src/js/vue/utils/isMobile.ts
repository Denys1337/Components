export const MOBILE_MAX_WIDTH = 576;

export const isMobileScreenSize = () => {
  return MOBILE_MAX_WIDTH >= window.innerWidth;
};

export function isMobileDevice() {
  return (
    navigator.userAgent.toLowerCase().includes('android') ||
    navigator.userAgent.toLowerCase().includes('iphone')
  );
}
