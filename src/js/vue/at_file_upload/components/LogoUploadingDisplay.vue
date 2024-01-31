<template>
  <div class="LogoUploadingDisplay pad-04 elevation-level-02">
    <div
      class="LogoUploadingDisplay-image"
      v-if="imageUrl"
      :style="{ backgroundImage: `url(${imageUrl})` }"
    ></div>

    <AwardIcon :size="size" v-else />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import { AwardIcon } from 'vue-tabler-icons';

  export default defineComponent({
    name: 'LogoUploadingDisplay',
    components: { AwardIcon },
    props: {
      size: {
        type: String,
      },
      imageUrl: {
        type: String,
      },
    },
    setup(props) {
      return {
        sizeinpx: `${props.size}px`,
      };
    },
  });
</script>

<style scoped lang="scss">
  .LogoUploadingDisplay {
    border-radius: 50%;
    border: 2px solid var(--gray-400);

    &-image {
      width: v-bind(sizeinpx);
      height: v-bind(sizeinpx);
      background-size: cover;
      background-repeat: no-repeat;
      vertical-align: middle;
    }
    .icon-tabler-award {
      stroke: var(--gray-500);
      vertical-align: middle;
    }
  }
</style>
