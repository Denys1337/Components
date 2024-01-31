import { RouterLinkStub, mount } from '@vue/test-utils';
import { Component, nextTick, markRaw } from 'vue';

import * as isMobileScreenSize from '../../utils/isMobile';
import { MAIN_MENU_STATE_LOCAL_KEY, MainMenuState } from '../constants';
import SidePanel from '../side_panel/SidePanel.vue';
import { CollapsableMenuItem, CustomSidePanelMenuItem } from '../types';
import SideMainMenu from './SideMainMenu.vue';
const mountSideMainMenu = (newProps: {}) => {
  // @ts-ignore
  return mount(markRaw(SideMainMenu), {
    props: {
      logoData: {
        defaultIconUrl: '',
        defaultLogoUrl: '',
      },
      ...newProps,
    },
    global: {
      mocks: {
        $t: (a: string) => a,
      },
      stubs: { RouterLink: RouterLinkStub },
    },
  });
};
let isMobile = false;
jest.spyOn(isMobileScreenSize, 'isMobileScreenSize').mockImplementation(() => isMobile);

beforeEach(async () => {
  window.localStorage.clear();
  await nextTick();
});

describe('SideMainMenu modes ', () => {
  it('should be in expanded mode by default', () => {
    isMobile = false;
    const sideMainMenu = mountSideMainMenu({});
    expect(sideMainMenu.find('.mainmenu-collapsed').exists()).toBe(false);
  });
  it('should be in collpased mode with defaultIconMode', () => {
    isMobile = false;
    const sideMainMenu = mountSideMainMenu({ defaultIconMode: true });
    expect(sideMainMenu.find('.mainmenu-collapsed').exists()).toBe(true);
  });
  it('should not have a localstorage state', () => {
    expect(window.localStorage.getItem(MAIN_MENU_STATE_LOCAL_KEY)).toBeFalsy();
  });
  it('localStorage with default expanded - should have a localstorage state - collapse', () => {
    isMobile = false;
    const sideMainMenu = mountSideMainMenu({});
    sideMainMenu.find('.colapse-main-nav').trigger('click');
    expect(window.localStorage.getItem(MAIN_MENU_STATE_LOCAL_KEY)).toBe(MainMenuState.Collapse);
  });
  it('localStorage with default expanded - should have a localstorage state - Expanded', () => {
    isMobile = false;
    const sideMainMenu = mountSideMainMenu({});
    //trigger twice
    sideMainMenu.find('.colapse-main-nav').trigger('click');
    expect(window.localStorage.getItem(MAIN_MENU_STATE_LOCAL_KEY)).toBe(MainMenuState.Collapse);
    sideMainMenu.find('.colapse-main-nav').trigger('click');
    expect(window.localStorage.getItem(MAIN_MENU_STATE_LOCAL_KEY)).toBe(MainMenuState.Expanded);
  });

  it('localStorage with default collapsed - should have a localstorage state - collapse', () => {
    isMobile = false;
    const sideMainMenu = mountSideMainMenu({ defaultIconMode: true });
    sideMainMenu.find('.colapse-main-nav').trigger('click');
    expect(window.localStorage.getItem(MAIN_MENU_STATE_LOCAL_KEY)).toBe(MainMenuState.Expanded);
  });
  it('localStorage with default collapsed - should have a localstorage state - Expanded', () => {
    isMobile = false;
    const sideMainMenu = mountSideMainMenu({ defaultIconMode: true });
    //trigger twice
    sideMainMenu.find('.colapse-main-nav').trigger('click');
    expect(window.localStorage.getItem(MAIN_MENU_STATE_LOCAL_KEY)).toBe(MainMenuState.Expanded);
    sideMainMenu.find('.colapse-main-nav').trigger('click');
    expect(window.localStorage.getItem(MAIN_MENU_STATE_LOCAL_KEY)).toBe(MainMenuState.Collapse);
  });

  it('should expand on chveron click', () => {
    isMobile = false;
    const sideMainMenu = mountSideMainMenu({});
    expect(sideMainMenu.find('.mainmenu-collapsed').exists()).toBe(false);
    sideMainMenu.find('.colapse-main-nav').trigger('click');
    nextTick(() => {
      expect(sideMainMenu.find('.mainmenu-collapsed').exists()).toBe(true);
    });
  });

  it('should have 2 sections', () => {
    const menuItems: CollapsableMenuItem[] = [
      { name: '1', children: [], icon: '' },
      { name: '2', children: [], icon: '' },
    ];
    isMobile = false;
    const sideMainMenu = mountSideMainMenu({ menuItems });
    expect(sideMainMenu.findAll('.mainmenu-section-title').length).toBe(2);
  });

  it('should have 3 links', () => {
    const menuItems: CollapsableMenuItem[] = [
      {
        name: '1',
        children: [
          { name: 'child 1', link: 'link', icon: '' },
          { name: 'child 2', link: 'link', icon: '' },
          { name: 'child 3', link: 'link', icon: '' },
        ],
        icon: '',
      },
    ];
    isMobile = false;
    const sideMainMenu = mountSideMainMenu({ menuItems });
    expect(sideMainMenu.findAll('.mainmenu-regular-link').length).toBe(3);
  });
});

describe('SideMainMenu sidepanel', () => {
  const menuItems: CollapsableMenuItem[] = [
    {
      name: '1',
      children: [
        {
          name: 'parent 1',
          link: 'link',
          icon: '',
          children: [{ name: 'child 1', link: 'link', icon: '' }],
        },
      ],
      icon: '',
    },
  ];
  isMobile = false;
  const sideMainMenuWithSidepanel = mountSideMainMenu({ menuItems });
  it('should have a side panel link', () => {
    expect(sideMainMenuWithSidepanel.findAll('.mainmenu-sidepanel-link').length).toBe(1);
  });

  it('should open a side panel', async () => {
    const sidepanelLink = sideMainMenuWithSidepanel.find('.mainmenu-sidepanel-link');
    sidepanelLink.trigger('click');
    await nextTick();
    await nextTick();
    //Just to make that the panel is actually opening the panel
    setTimeout(() => {
      expect(sideMainMenuWithSidepanel.find('.SidePanel').exists()).toBe(true);
    });
  });
});

describe('SideMainMenu mobile behaviour', () => {
  const customEndItem: CustomSidePanelMenuItem = {
    name: 'mobile-end',
    customSidePanelComponent: SidePanel as unknown as Component,
    icon: '',
  };

  isMobile = true;
  const mobileSideMainMenu = mountSideMainMenu({
    mobileEndMenuItem: customEndItem,
    mobileScreenWidth: Infinity,
  });

  it('have the main menu closed by default', () => {
    expect(mobileSideMainMenu.findAll('.show-main-menu').length).toBe(0);
  });

  it('should open the main nav on click ,second click should close the menu', async () => {
    const menuButton = mobileSideMainMenu.find('[data-testid="MobileHeader-main-menu-button"]');
    menuButton.trigger('click');
    await nextTick();
    expect(mobileSideMainMenu.findAll('.show-main-menu').length).toBe(1);
    menuButton.trigger('click');
    await nextTick();
    expect(mobileSideMainMenu.findAll('.show-main-menu').length).toBe(0);
  });

  it('should open the end item sidepanel on click ,second click should close the menu', async () => {
    const menuEndItem = mobileSideMainMenu.find('[data-testid="MobileHeader-end-item-button"]');
    menuEndItem.trigger('click');
    await nextTick();
    expect(mobileSideMainMenu.findAll('.SidePanel').length).toBe(1);
    menuEndItem.trigger('click');
    await nextTick();
    expect(mobileSideMainMenu.findAll('.SidePanel').length).toBe(0);
  });

  it('should open the end item sidepanel on click ,click on menu should close the sidepanel and open the main menu', async () => {
    const menuEndItem = mobileSideMainMenu.find('[data-testid="MobileHeader-end-item-button"]');
    const menuButton = mobileSideMainMenu.find('[data-testid="MobileHeader-main-menu-button"]');
    menuEndItem.trigger('click');
    await nextTick();

    expect(mobileSideMainMenu.findAll('.SidePanel').length).toBe(1);
    menuButton.trigger('click');
    await nextTick();

    expect(mobileSideMainMenu.findAll('.SidePanel').length).toBe(0);
    expect(mobileSideMainMenu.findAll('.show-main-menu').length).toBe(1);

    //Closing the menu for next tests
    menuButton.trigger('click');
    await nextTick();
    expect(mobileSideMainMenu.findAll('.show-main-menu').length).toBe(0);
    expect(mobileSideMainMenu.findAll('.SidePanel').length).toBe(0);
  });

  it('should open the menu on click ,click on end item should open he sidepanel', async () => {
    const menuEndItem = mobileSideMainMenu.find('[data-testid="MobileHeader-end-item-button"]');
    const menuButton = mobileSideMainMenu.find('[data-testid="MobileHeader-main-menu-button"]');

    menuButton.trigger('click');
    await nextTick();
    expect(mobileSideMainMenu.findAll('.show-main-menu').length).toBe(1);

    menuEndItem.trigger('click');
    await nextTick();
    expect(mobileSideMainMenu.findAll('.SidePanel').length).toBe(1);
  });
});
