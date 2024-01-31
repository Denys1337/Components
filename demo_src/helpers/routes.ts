import { RouteRecordRaw } from 'vue-router';

import BasicFormPage from '../coms/pages/BasicFormPage.vue';
import ColorsPage from '../coms/pages/ColorsPage.vue';
import DecorationsPage from '../coms/pages/DecorationsPage.vue';
import FlexPage from '../coms/pages/FlexPage.vue';
import HomePage from '../coms/pages/HomePage.vue';
import SpacingPage from '../coms/pages/SpacingPage.vue';
import TagsPage from '../coms/pages/TagsPage.vue';
import TextUtilsPage from '../coms/pages/TextUtilsPage.vue';

export type RouteName =
  | 'home'
  | 'basic-form'
  | 'vars'
  | 'colors'
  | 'text'
  | 'spacing'
  | 'tags'
  | 'decorations'
  | 'flex';
export const DEFAULT_ROUTE: RouteName = 'home';

interface RouteGroup {
  route: NamedRouteConfig | null;
  subroutes: NamedRouteConfig[];
}

type NamedRouteConfig = RouteRecordRaw & {
  label: string;
  name: RouteName;
};

export const routeGroups: RouteGroup[] = [
  {
    route: {
      label: 'home',
      path: '/home',
      name: 'home',
      component: HomePage,
    },
    subroutes: [],
  },
  {
    route: {
      label: 'variables',
      redirect: { name: 'colors' },
      name: 'vars',
      path: '/vars',
    },
    subroutes: [
      {
        label: 'colors',
        path: '/vars/colors',
        name: 'colors',
        component: ColorsPage,
      },
      {
        label: 'text & font',
        path: '/vars/text-utilities',
        name: 'text',
        component: TextUtilsPage,
      },
      {
        label: 'spacing',
        path: '/vars/spacing-utilities',
        name: 'spacing',
        component: SpacingPage,
      },
      {
        label: 'flex',
        path: '/vars/flex',
        name: 'flex',
        component: FlexPage,
      },
      {
        label: 'decorations',
        path: '/vars/decorations-classes',
        name: 'decorations',
        component: DecorationsPage,
      },
    ],
  },
  {
    route: {
      label: 'tags',
      path: '/tags',
      name: 'tags',
      component: TagsPage,
    },
    subroutes: [],
  },
  {
    route: {
      label: 'form',
      path: '/form',
      name: 'basic-form',
      component: BasicFormPage,
    },
    subroutes: [],
  },
];

export const routes = routeGroups.reduce((acc, group) => {
  group.route && acc.push(group.route);
  acc = [...acc, ...group.subroutes];
  return acc;
}, [] as RouteRecordRaw[]);
