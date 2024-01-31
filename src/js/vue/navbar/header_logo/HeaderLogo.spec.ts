import { mount } from '@vue/test-utils';

import { LogoData } from '../types';
import HeaderLogo from './HeaderLogo.vue';

const defaultLogoData: LogoData = {
  defaultIconUrl: 'icon_default',
  defaultLogoUrl: 'logo_default',
};

describe('HeaderLogo.vue', () => {
  it('should display the default logo if no client logo is passed', () => {
    const headerLogo = mountHeader({ ...defaultLogoData });
    expect(headerLogo.find('.client-logo-container').exists()).toBe(false);
    expect(headerLogo.find('.full-width-logo').attributes('src')).toBe(
      defaultLogoData.defaultLogoUrl
    );
  });

  it('should display the default icon if no client logo is passed and isIconMode', () => {
    const headerLogo = mountHeader({ ...defaultLogoData, isIconMode: true });
    expect(headerLogo.find('.client-icon').exists()).toBe(false);
    expect(headerLogo.find('.icon-mode-logo').attributes('src')).toBe(
      defaultLogoData.defaultIconUrl
    );
  });

  it('should display the client logo if one is provided', () => {
    const props = { ...defaultLogoData };
    const clientLogo = 'client_logo';
    props.clientLogoUrl = clientLogo;
    const headerLogo = mountHeader(props);
    expect(headerLogo.find('.client-logo-container').exists()).toBe(true);
    expect(headerLogo.find('.client-logo').attributes('src')).toBe(clientLogo);
  });

  it('should display the client icon if minimized', () => {
    const clientIconUrl = 'client_icon';
    const props = { ...defaultLogoData, clientIconUrl, isIconMode: true };
    const headerLogo = mountHeader(props);
    expect(headerLogo.find('.client-icon').exists()).toBe(true);
    expect(headerLogo.find('.client-icon').attributes('src')).toBe(clientIconUrl);
  });
});

const mountHeader = (newProps: { isIconMode?: boolean } & LogoData) => {
  // @ts-ignore
  return mount(HeaderLogo, {
    props: newProps,
    global: {
      mocks: {
        $t: (a: string) => a,
      },
    },
  });
};
