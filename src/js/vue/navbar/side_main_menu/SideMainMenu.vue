<template>
  <MobileHeader
    v-model:show-main-menu="showMainMenu"
    class="w-100"
    :logo-href="logoHref"
    :logo-data="logoData"
    :end-menu-item-active="mobileMenuItemOpen"
    :end-menu-item="mobileEndMenuItem"
    @end-menu-item-click="handleMobileMenuItem($event.mouseEvent,$event.menuItem as CustomSidePanelMenuItem)"
    @header-logo-click="$emit('header-logo-click')"
    v-if="isMobile"
  />
  <aside ref="navRef" class="SideMainMenu" :class="sideMainMenuClasses">
    <div
      v-show="!shouldShowSidePanel"
      @click.stop="toggleMenuState()"
      class="colapse-main-nav cursor-pointer"
      :class="{ 'mainmenu-collapsed': isIconMode }"
      v-if="!isMobile"
    >
      <ChevronLeftIcon size="16" class="collapse-icon text-gray-600 rtl-rotate-180" />
    </div>
    <div
      class="main-nav"
      :class="{
        'cursor-pointer': isIconMode && !shouldShowSidePanel,
      }"
      @click="toggleMenuState(MainMenuState.Expanded)"
    >
      <section ref="navHeaderElement" class="navbar-header" v-if="!isMobile">
        <HeaderLogo
          v-bind="logoData"
          :logo-href="logoHref"
          :is-icon-mode="isIconMode"
          @header-logo-click="$emit('header-logo-click')"
          v-if="logoData"
        />
      </section>
      <section
        v-for="item in localMenuItems"
        :key="item.name"
        :class="{ 'icon-mode': isIconMode }"
        class="main-nav-section block-end-07 w-100"
      >
        <h3 class="mainmenu-section-title font-tag text-gray-700 block-end-04" v-show="!isIconMode">
          {{ item.name }}
        </h3>
        <div
          v-for="child in item.children"
          v-show="!child.hideOnIconMode || !isIconMode"
          :key="child.name"
          v-tooltip="tooltipProps(child)"
        >
          <button
            v-if="child.children?.length"
            class="mainmenu-sidepanel-link w-100 font-body-small text-gray-900 cursor-pointer"
            @click.stop="displaySidePanel(child)"
          >
            <NavLinkLabel
              :show-chevron="!child.coverScreen"
              :icons-size="isIconMode ? 24 : 20"
              :class="{
                active: isActive(child),
              }"
              :item="child"
              :show-only-icon="isIconMode"
            />
          </button>
          <NavLink
            v-else
            class="mainmenu-regular-link"
            :icons-size="isIconMode ? 24 : 20"
            :item="{
              ...child,
              current: isActive(child),
            }"
            :show-only-icon="isIconMode"
            @click=" menuItemActionClick($event,child as CustomSidePanelMenuItem)"
          />
        </div>
      </section>
      <section class="block-start-auto block-end-04 w-100" :class="{ 'inline-auto': isIconMode }">
        <slot name="footer">
          <UserWidget
            v-if="userInfo"
            class="user-sections cursor-pointer w-100"
            @click="userWidgetClick"
            @logout="$attrs.onLogout"
            v-bind="userInfo"
            :mini="isIconMode"
          />
        </slot>
      </section>
    </div>
    <KeepAlive>
      <Component
        v-if="shouldShowSidePanel"
        :is="sidePanelComponent"
        autofocus
        v-bind="{ ...sidePanelProps, coverScreen: !isMobile && sidePanelProps.coverScreen }"
        @close="closeSidePanel()"
        :key="sidePanelProps.title"
        :is-mobile="isMobile"
      />
    </KeepAlive>
  </aside>
</template>

<script lang="ts">
  export default {
    name: 'SideMainMenu',
  };
</script>

<script setup lang="ts">
  import { ref, PropType, watch, computed, Component, defineAsyncComponent } from 'vue';

  import { ChevronLeftIcon } from 'vue-tabler-icons';

  import { tooltip as vTooltip } from '../../directives/tooltip';
  import useWatchResize from '../../hooks/useWatchResize';
  import { PositionEnum } from '../../tooltip/types';
  import UserWidget from '../../userWidget/UserWidget.vue';
  import { isMobileScreenSize } from '../../utils/isMobile';
  import setGlobalCssVar from '../../utils/setGlobalCssVar';
  import NavLink from '../NavLink.vue';
  import NavLinkLabel from '../NavLinkLabel.vue';
  import { MainMenuState, MAIN_MENU_STATE_LOCAL_KEY, TOOLTIP_DELAY } from '../constants';
  import HeaderLogo from '../header_logo/HeaderLogo.vue';
  import {
    CollapsableMenuItem,
    CustomSidePanelMenuItem,
    LogoData,
    MenuItem,
    UserInfo,
  } from '../types';

  const SidePanel = defineAsyncComponent(
    () => import(/* webpackChunkName: "SidePanel" */ '../side_panel/SidePanel.vue')
  );

  const MobileHeader = defineAsyncComponent(
    () => import(/* webpackChunkName: "MobileHeader" */ '../mobile_header/MobileHeader.vue')
  );

  const props = defineProps({
    logoHref: { type: String, required: false },
    menuItems: {
      type: Array as PropType<CollapsableMenuItem[]>,
      default: () => [],
    },
    userWidgetMenuItem: {
      type: Object as PropType<CustomSidePanelMenuItem>,
      required: false,
    },
    startOtherMenuItems: {
      type: Array as PropType<MenuItem[]>,
      default: () => [],
    },
    endOtherMenuItems: {
      type: Array as PropType<MenuItem[]>,
      default: () => [],
    },
    userInfo: {
      type: Object as PropType<UserInfo>,
      required: false,
    },
    defaultIconMode: {
      type: Boolean,
      default: false,
    },
    logoData: {
      type: Object as PropType<LogoData>,
      required: true,
    },
    isRegularCursorOnLogo: {
      type: Boolean,
      default: false,
    },
    mobileEndMenuItem: {
      type: Object as PropType<CustomSidePanelMenuItem>,
      required: false,
    },
  });

  const emit = defineEmits(['user-widget-click', 'header-logo-click', 'menu-item-action']);

  const navRef = ref<HTMLElement>();
  const navHeaderElement = ref<HTMLElement>();
  const navWidth = ref<string>('0px');
  const sidePanelComponent = ref<Component>(SidePanel);
  const isMobile = isMobileScreenSize();
  useWatchResize(navRef, (el) => {
    navWidth.value = `${el.target.clientWidth}px`;
  });

  watch(
    () => navWidth.value,
    () => setGlobalCssVar('--sidenavbar-width', isMobile ? '0px' : navWidth.value),
    { immediate: true }
  );

  const getLocalStorageMenuState = () => window.localStorage.getItem(MAIN_MENU_STATE_LOCAL_KEY);
  const showMainMenu = ref<boolean>(false);
  const isIconMode = ref<boolean>(!isMobile && getMenuDefaultState() === MainMenuState.Collapse);
  const sidePanelProps = ref();

  const localMenuItems = computed<CollapsableMenuItem[]>(() => {
    const menuItems: CollapsableMenuItem[] = [];
    if (props.startOtherMenuItems?.length) {
      menuItems.push({ name: '', icon: '', children: props.startOtherMenuItems });
    }
    menuItems.push(...props.menuItems);
    if (props.endOtherMenuItems?.length) {
      menuItems.push({ name: '', icon: '', children: props.endOtherMenuItems });
    }

    return menuItems;
  });
  const userWidgetClick = () => {
    emit('user-widget-click');
    if (props.userWidgetMenuItem) {
      displaySidePanel(props.userWidgetMenuItem);
    }
  };

  // For use when user is currenty navigating
  const currentMainMenuLink = ref<MenuItem | null>();

  const shouldShowSidePanel = ref(false);
  const mobileMenuItemOpen = ref(false);
  const displaySidePanel = (menuItem: MenuItem) => {
    if (!mobileMenuItemOpen.value) closeSidePanel();
    if ((menuItem as CustomSidePanelMenuItem).customSidePanelComponent) {
      sidePanelComponent.value = (menuItem as CustomSidePanelMenuItem).customSidePanelComponent;
      sidePanelProps.value = (menuItem as CustomSidePanelMenuItem).customSidePanelProps || {};
    } else if (!menuItem.children) {
      return;
    } else {
      sidePanelProps.value.menuItems = menuItem.children;
      sidePanelProps.value.title = menuItem.name;
    }
    sidePanelProps.value.name = menuItem.name;
    sidePanelProps.value.coverScreen = !!menuItem.coverScreen;
    currentMainMenuLink.value = menuItem;
    setIconMode(true);

    shouldShowSidePanel.value = true;
  };

  const closeSidePanel = () => {
    if (mobileMenuItemOpen.value) {
      showMainMenu.value = false;
      mobileMenuItemOpen.value = false;
    }
    currentMainMenuLink.value = null;
    shouldShowSidePanel.value = false;
    setIconMode(getMenuDefaultState() === MainMenuState.Collapse);
    sidePanelComponent.value = SidePanel;
    sidePanelProps.value = {};
  };

  const toggleMenuState = (
    newState: MainMenuState = isIconMode.value ? MainMenuState.Expanded : MainMenuState.Collapse
  ) => {
    if (shouldShowSidePanel.value) return;
    setIconMode(newState === MainMenuState.Collapse);
    window.localStorage.setItem(MAIN_MENU_STATE_LOCAL_KEY, newState);
  };

  const isActive = (menuItem: MenuItem) =>
    shouldShowSidePanel.value
      ? currentMainMenuLink.value?.name === menuItem.name
      : menuItem.current;

  const tooltipProps = (menuItem: MenuItem) => ({
    text: menuItem.name,
    shouldDisplay: isIconMode.value,
    position: PositionEnum.InlineEnd,
    delay: TOOLTIP_DELAY,
  });

  function getMenuDefaultState() {
    return (
      getLocalStorageMenuState() ||
      (props.defaultIconMode ? MainMenuState.Collapse : MainMenuState.Expanded)
    );
  }

  const handleMobileMenuItem = (e: MouseEvent, clickedMenuItem: CustomSidePanelMenuItem) => {
    if (mobileMenuItemOpen.value) {
      closeSidePanel();
      return;
    }
    mobileMenuItemOpen.value = true;
    showMainMenu.value = true;
    menuItemActionClick(e, {
      ...clickedMenuItem,
      customSidePanelProps: {
        ...(typeof clickedMenuItem.customSidePanelProps === 'object'
          ? clickedMenuItem.customSidePanelProps
          : {}),
        showClose: false,
      },
    });
  };

  const menuItemActionClick = (e: MouseEvent, clickedMenuItem: CustomSidePanelMenuItem) => {
    if (clickedMenuItem.customSidePanelComponent) {
      e.stopPropagation();
      e.preventDefault();
      displaySidePanel(clickedMenuItem);
    } else {
      emit('menu-item-action', clickedMenuItem);
    }
  };

  const setIconMode = (state: boolean) => {
    isIconMode.value = !isMobile && state;
  };

  const sideMainMenuClasses = computed(() => ({
    'side-mainmenu-collapsed': isIconMode.value,
    'show-main-menu': showMainMenu.value,
    'mobile-navbar': isMobile,
    'side-panel-open': shouldShowSidePanel.value,
  }));

  watch(
    () => showMainMenu.value,
    (value: boolean) => {
      //Handle a close of mobile sidepanel by click on the menu icon in mobile header
      if (!value && mobileMenuItemOpen.value) {
        mobileMenuItemOpen.value = false;
        closeSidePanel();
        showMainMenu.value = true;
        return;
      }
      if (value === false) {
        shouldShowSidePanel.value = false;
        return;
      }
    }
  );
</script>

<style lang="scss">
  @import './side_main_menu.scss';
</style>
