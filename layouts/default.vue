<template>
  <div class="container">
    <TheHeader class="the-header" />
    <slot/>
  </div>
</template>


<style lang="scss" scoped>
  //@use '~/assets/style/style.scss' as *;

  .the-header {
    margin-bottom: 37px;
  }
</style>

