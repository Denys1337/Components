<template>
  <div class="NavLink" @click.stop>
    <RouterLink
      v-if="(item as RouteMenuItem).route"
      :class="linkClasses"
      :to="createRouterToObject(item as RouteMenuItem)"
      @focusout="$emit('focusout')"
      :aria-label="item.name"
    >
      <NavLinkLabel
        :class="linkClasses"
        :item="item"
        :icons-size="iconsSize"
        :show-only-icon="showOnlyIcon"
      />
    </RouterLink>
    <Component
      v-else
      :is="isCustomAction ? 'div' : 'a'"
      :href="(item as URLMenuItem).link"
      :aria-label="item.name"
      target="_self"
      :class="linkClasses"
      @focusout="$emit('focusout')"
    >
      <NavLinkLabel
        :class="linkClasses"
        :item="item"
        :icons-size="iconsSize"
        :show-only-icon="showOnlyIcon"
      />
    </Component>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'NavLink',
  };
</script>

<script setup lang="ts">
  import { PropType, computed } from 'vue';

  import { RouteParamsRaw } from 'vue-router';

  import NavLinkLabel from './NavLinkLabel.vue';
  import { DEFAULT_ICON_SIZE } from './constants';
  import { MenuItem, RouteMenuItem, URLMenuItem } from './types';
  const props = defineProps({
    item: { type: Object as PropType<MenuItem>, required: true },
    showOnlyIcon: { type: Boolean, default: false },
    iconsSize: { type: Number, default: DEFAULT_ICON_SIZE },
    capitalizeLabels: { type: Boolean, default: true },
    isChild: { type: Boolean, default: false },
    isCustomAction: { type: Boolean, default: false },
  });

  defineEmits(['focusout']);

  const createRouterToObject = (item: RouteMenuItem) =>
    ({
      name: item.route.to.name,
      params: item.route.to.params,
    } as RouteParamsRaw);

  const linkClasses = computed(() => [
    `NavLink router-link font-body-small cursor-pointer`,
    { child: props.isChild, capitalize: props.capitalizeLabels, active: props.item.current },
  ]);
</script>
