<template>
  <nav class="MainNav">
    <div class="MainNav-content">
      <button
        v-for="group in routeGroups"
        :key="group.route.label"
        class="MainNav-item p-relative d-block w-100"
      >
        <RouterLink
          v-if="group.route"
          class="MainNav-route capitalize"
          :to="{ name: group.route.name }"
          >{{ group.route.label }}
        </RouterLink>
        <div class="MainNav-submenu" v-if="group.subroutes.length > 0">
          <RouterLink
            class="MainNav-route capitalize border-box"
            v-for="route in group.subroutes"
            :key="route.label"
            :to="{ name: route.name }"
            >{{ route.label }}
          </RouterLink>
        </div>
      </button>
    </div>
  </nav>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import { routeGroups } from '../helpers/routes';

  export default defineComponent({
    name: 'MainNav',
    setup() {
      return {
        routeGroups,
      };
    },
  });
</script>

<style lang="scss">
  .MainNav {
    --main-color: var(--menu-links-color);
    --background: var(--white);

    background: var(--background);

    &-content {
      position: sticky;
      top: 5px;
    }

    &-route {
      display: block;
      font-size: 1rem;
      text-decoration: none;
      text-align: start;
      padding: 0.5em 1em;
    }

    > .MainNav-item {
      .MainNav-route {
      }
    }

    // submenus
    &-submenu {
      min-width: 100%;
      background: inherit;

      .MainNav-route {
        width: 100%;
        text-align: start;
        padding-inline-start: 1.5em;

        &:nth-last-child(1) {
          border-bottom: solid 1px var(--border-color);
        }
      }
    }

    &-route {
      color: var(--menu-links-color);
      background: inherit;

      &.router-link-active {
        ~ .MainNav-submenu {
          display: block;
        }
      }

      &:hover,
      &:focus {
        &:not(.router-link-exact-active) {
          font-weight: bold;
        }
      }

      &.router-link-active {
        cursor: pointer;
      }

      &.router-link-exact-active {
        color: var(--lightish-blue);
        font-weight: bold;
        background: var(--white);
        box-shadow: var(--page-shadow);
        cursor: default;
      }
    }
  }
</style>
