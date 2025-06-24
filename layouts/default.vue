<script setup lang="ts">
  import TheCookie from "~/components/Cookie/TheCookie.vue";
</script>

<template>
  <div class="container">
    <Teleport to="body">
      <Transition name="cookie">
        <TheCookie/>
      </Transition>
    </Teleport>

    <TheHeader class="the-header" />
    <slot/>
  </div>
</template>


<style lang="scss" scoped>
  .the-header {
    margin-bottom: 37px;
  }

  .cookie-enter-active,
  .cookie-leave-active {
    transition: all 2.5s ease;
  }

  .cookie-enter-from,
  .cookie-leave-to {
    bottom: -100%;
    opacity: 0;
  }
</style>