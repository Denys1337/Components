<template>
  <div tabindex="0" aria-label="User widget" class="UserWidget p-relative" :class="cssClasses">
    <div data-testid="user_menu" id="user_menu" class="user-menu p-relative" :class="{ mini }">
      <UserInitialsBadge :name="name" :last-name="lastName" :first-name="firstName" />
      <div v-if="!mini" class="user-widget-texts-area">
        <span class="user-name capitalize ont-body-small">{{ fullName }}</span>
        <span class="user-role capitalize font-subtext" v-if="role">{{ role }}</span>
        <button type="button" @click.stop="$emit('logout')" class="logout capitalize font-subtext">
          {{ $t('account.logout') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';

  import UserInitialsBadge from './UserInitialsBadge.vue';
  import './userWidget.scss';

  export default defineComponent({
    name: 'UserWidget',
    components: { UserInitialsBadge },
    props: {
      mini: { type: Boolean, default: false },
      lastName: { type: String, required: false },
      firstName: { type: String, required: false },
      name: { type: String, default: '' },
      role: { type: String, default: '' },
    },
    emits: ['logout'],
    setup(props) {
      const cssClasses = computed(() => ({ mini: props.mini }));
      const fullName = computed(() => {
        if (props.firstName && props.lastName) {
          return `${props.firstName} ${props.lastName}`;
        } else {
          return props.name;
        }
      });

      return { cssClasses, fullName };
    },
  });
</script>
