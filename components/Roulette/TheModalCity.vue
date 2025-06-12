<script setup lang="ts">
  const cities = ['Хабаровск', 'Владивосток', 'Спасск-Дальний'];

  const emit = defineEmits(['close', 'selectCity']);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.roulette-modal')) {
      emit('close');
    }
  }

  const selectCity = (city: string) => {
    emit('selectCity', city);
    emit('close');
  }
</script>

<template>
  <div class="roulette-overlay" @click="handleClickOutside">
    <div class="roulette-modal">
      <ul class="roulette-modal__list">
        <li class="roulette-modal__item"
            v-for="(city, i) in cities"
            :key="i"
            @click="selectCity(city)"
        >
          {{ city }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @use '~/assets/style/mixins.scss' as *;

  .roulette-modal {
    position: absolute;
    top: 70px;
    width: 194px;
    padding: 11px 12px;
    background-color: var(--modal-city-color);
    border: 1px solid var(--modal-border-color);
    border-radius: 10px;
    @include transition-theme(all);
    &__list {
      @include flex-wrap;
      gap: 5px;
    }
    &__item {
      cursor: pointer;
      transition: color .3s ease;
      &:hover {
        color: var(--primary-blue-color);
      }
    }
  }
</style>