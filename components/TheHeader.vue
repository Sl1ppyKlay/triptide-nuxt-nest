<script setup lang="ts">
  // type Language = 'RU' | 'EN';
  // const language = ref<Language>('RU');
  // type Theme = 'light' | 'dark'
  // const theme = ref('dark')

  import { useTheme } from '~/composables/useTheme'
  const { theme, toggleTheme } = useTheme()
</script>

<template>
  <header class="header">
    <div class="header__left">
      <NuxtLink>
        <svg xmlns="http://www.w3.org/2000/svg" width="166" height="22" viewBox="0 0 166 22" fill="none">
        <g filter="url(#filter0_n_6_285)">
          <path d="M4.75 22V4.5H0.375V0.125H17.875V4.5H13.5V22H4.75ZM22.075 22V0.125H39.575V4.5H43.95V8.875H39.575V17.625H43.95V22H35.2V17.625H30.825V22H22.075ZM30.825 8.875H35.2V4.5H30.825V8.875ZM48.15 22V0.125H56.9V22H48.15ZM61.1 22V0.125H78.6V4.5H82.975V8.875H78.6V13.25H69.85V22H61.1ZM69.85 8.875H74.05V4.5H69.85V8.875ZM91.55 22V4.5H87.175V0.125H104.675V4.5H100.3V22H91.55ZM108.875 22V0.125H117.625V22H108.875ZM121.825 22V0.125H139.325V4.5H143.7V17.625H139.325V22H121.825ZM130.575 17.625H134.775V4.5H130.575V17.625ZM147.9 22V0.125H165.4V4.5H156.65V8.875H165.4V13.25H156.65V17.625H165.4V22H147.9Z" fill="#587AFF"/>
        </g>
        <defs>
          <filter id="filter0_n_6_285" x="0.375" y="0.125" width="165.025" height="21.875" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feTurbulence type="fractalNoise" baseFrequency="2 2" stitchTiles="stitch" numOctaves="3" result="noise" seed="6026"/>
            <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise"/>
            <feComponentTransfer in="alphaNoise" result="coloredNoise1">
              <feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "/>
            </feComponentTransfer>
            <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped"/>
            <feFlood flood-color="rgba(0, 0, 0, 0.25)" result="color1Flood"/>
            <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1"/>
            <feMerge result="effect1_noise_6_285">
              <feMergeNode in="shape"/>
              <feMergeNode in="color1"/>
            </feMerge>
          </filter>
        </defs>
      </svg>
      </NuxtLink>
    </div>
    <div class="header__right">
      <button class="header__theme" @click="toggleTheme">
        <template v-if="theme === 'dark'">
          <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
            <path d="M14.4999 22.3542C18.8377 22.3542 22.3541 18.8377 22.3541 14.5C22.3541 10.1623 18.8377 6.64584 14.4999 6.64584C10.1622 6.64584 6.64575 10.1623 6.64575 14.5C6.64575 18.8377 10.1622 22.3542 14.4999 22.3542Z" fill="#E5B925" stroke="#E5B925" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M23.1276 23.1275L22.9705 22.9704M22.9705 6.02958L23.1276 5.8725L22.9705 6.02958ZM5.87258 23.1275L6.02966 22.9704L5.87258 23.1275ZM14.5001 2.51333V2.41666V2.51333ZM14.5001 26.5833V26.4867V26.5833ZM2.51341 14.5H2.41675H2.51341ZM26.5834 14.5H26.4867H26.5834ZM6.02966 6.02958L5.87258 5.8725L6.02966 6.02958Z" stroke="#E5B925" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </template>
        <template v-else>
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
            <path d="M2.19922 13.455C2.58922 19.0342 7.32339 23.5733 12.9892 23.8225C16.9867 23.9958 20.5617 22.1325 22.7067 19.1967C23.5951 17.9942 23.1184 17.1925 21.6342 17.4633C20.9084 17.5933 20.1609 17.6475 19.3809 17.615C14.0834 17.3983 9.75006 12.9675 9.72839 7.735C9.71756 6.32667 10.0101 4.99417 10.5409 3.78084C11.1259 2.4375 10.4217 1.79834 9.06756 2.3725C4.77756 4.18167 1.84172 8.50417 2.19922 13.455Z" fill="#687DD2" stroke="#687DD2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </template>
      </button>
      <button class="header__auth">Войти</button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
  @use '~/assets/style/mixins.scss' as *;

  .header {
    display: flex;
    height: 80px;
    justify-content: space-between;
    align-items: center;
    &__left {
      a {
        cursor: pointer;
      }
    }
    &__right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      button {
        font-family: var(--bold-font-family);
      }
    }
    &__theme {
      @include no-style-button;
      svg {
        display: block;
      }
      transition: transform .5s ease;
      &:hover {
        transform: rotate(50deg) scale(1.2);
      }
    }
    &__auth {
      @include no-style-button;
      color: var(--auth-color);
      padding: 10px;
      background-color: var(--primary-blue-color);
      border-radius: 10px;
      font-size: 18px;
      transition: transform 0.25s ease;
      &:hover {
        transform: scale(1.02);
      }
    }
  }
</style>