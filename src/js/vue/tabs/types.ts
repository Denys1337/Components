import { Component } from 'vue';

export interface TabsConfiguration {
  title: string;
  component: Component;
  properties?: object;
}

export interface AtTabsProps {
  configuration: TabsConfiguration[];
  selectedTab: string;
}
