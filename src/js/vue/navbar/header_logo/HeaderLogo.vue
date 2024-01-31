<template>
  <Component
    :is="logoHref ? 'a' : 'button'"
    @click.stop="!logoHref && $emit('header-logo-click')"
    :href="logoHref"
    :style="logoStyle"
    class="HeaderLogo"
  >
    <template v-if="!isIconMode">
      <img v-if="!clientLogoUrl" class="full-width-logo default_logo" :src="defaultLogoUrl" />
      <div v-else class="full-width-logo client-logo-container">
        <img class="client-logo" :src="clientLogoUrl" />
        <div class="d-flex">
          <span class="font-subtext text-gray-700">
            {{ $t('general.powered_by') }}
          </span>
          <img class="powered-by-logo" :src="defaultLogoUrl" />
        </div>
      </div>
    </template>
    <template v-else>
      <img v-if="!clientIconUrl" class="icon-mode-logo" :src="defaultIconUrl" />
      <div v-else class="icon-mode-logo client-logo-container">
        <img class="client-icon" :src="clientIconUrl" alt="" />
        <div class="d-flex">
          <img class="powered-by-logo" :src="defaultLogoUrl" />
        </div>
      </div>
    </template>
  </Component>
</template>

<script lang="ts">
  export default {
    name: 'HeaderLogo',
  };
</script>

<script setup lang="ts">
  defineProps({
    logoHref: { type: String, required: false },
    clientLogoUrl: { type: String, required: false },
    clientIconUrl: { type: String, required: false },
    defaultLogoUrl: { type: String, required: true },
    defaultIconUrl: { type: String, required: true },
    isIconMode: { type: Boolean, default: false },
    logoStyle: { type: Object, required: false },
  });
  defineEmits(['header-logo-click']);
</script>

<style lang="scss">
  .HeaderLogo {
    max-height: 100%;
    .full-width-logo {
      width: 100%;
      &.client-logo-container {
        .client-logo {
          max-width: 150px;
        }
        .powered-by-logo {
          margin-inline-start: var(--spacing-01);
          width: 75px;
        }
      }
    }
    .icon-mode-logo {
      &.client-logo-container {
        .client-icon {
          max-width: 50px;
          margin-block-end: var(--spacing-01);
        }
        .powered-by-logo {
          width: 50px;
        }
      }
    }
    .client-logo-container {
      justify-content: center;
      align-items: center;
      display: flex;
      flex-direction: column;
    }
  }
</style>
