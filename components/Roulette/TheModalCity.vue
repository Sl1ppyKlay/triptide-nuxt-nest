<script setup lang="ts">
  const props = defineProps({
    currentCity: {
      type: String,
      required: true
    }
  })
  const emit = defineEmits(['close', 'selectCity']);

  const cities = ['Хабаровск', 'Владивосток', 'Спасск-Дальний'];
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.roulette-modal')) {
      emit('close');
    }
  }

  const selectCity = (city: string) => {
    if (city === props.currentCity) {
      return;
    }
    emit('selectCity', city);
    emit('close');
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
  });
</script>

<template>
    <div class="roulette-modal">
      <ul class="roulette-modal__list">
        <li class="roulette-modal__item"
            v-for="(city, i) in cities"
            :key="i"
            @click="selectCity(city)"
            :class="{'roulette-modal__item_disabled': city === currentCity}"
        >
          {{ city }}
        </li>
      </ul>
    </div>
</template>

<style scoped lang="scss">
  @use '~/assets/style/mixins.scss' as *;

  .roulette-modal {
    position: absolute;
    top: 65px;
    width: 194px;
    padding: 13px 12px;
    background-color: var(--modal-city-color);
    border: 1px solid var(--modal-border-color);
    border-radius: 10px;
    //@include transition-theme(background-color);
    &__list {
      @include flex-wrap;
      gap: 8px;
    }
    &__item {
      cursor: pointer;
      transition: color .3s ease;
      &_disabled {
        cursor: default;
        opacity: 0.6;
        pointer-events: none;
      }
      &:hover {
        color: var(--primary-blue-color);
      }
    }
  }

</style>