<script lang="ts" setup>

import TheModalCity from "~/components/Roulette/TheModalCity.vue";
import TheRoulette from "~/components/Roulette/TheRoulette.vue";
import cities from '~/assets/data/cities.json'

const titleText = ref('МЫ ГЕНЕРИРУЕМ — ВЫ ИДЕТЕ!'); // в будущем, чтобы менялся

const isModalCityOpen = ref(false);

const city = ref(cities[0].city)
const selectPlace = ref('Не выбрано')
const currentCity = computed(() => cities.find(c => c.city === city.value))

const places = computed(() => {
    const arr = currentCity.value ? Object.keys(currentCity.value.place) : []
    return ["Не выбрано", ...arr]
});

const handleCitySelect = (selectedCity: string) => {
  city.value = selectedCity;
}

const currentSelectPlace = (place: string) => {
  selectPlace.value = place;
  console.log(selectPlace.value);
}

watch(currentCity, () => {
  selectPlace.value = places.value[0] || '';
});
</script>

<template>
  <div class="main-block">
    <h1 class="main-block__h1">
      {{ titleText }}
    </h1>
    <div class="roulette">
      <div class="roulette__left">
        <div class="roulette-city">
          <div class="roulette-city__items">
            <button class="roulette-city__item roulette-city__item_design"
                    @click.stop="isModalCityOpen = true"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M7.99998 8.9533C9.14874 8.9533 10.08 8.02206 10.08 6.8733C10.08 5.72455 9.14874 4.7933 7.99998 4.7933C6.85123 4.7933 5.91998 5.72455 5.91998 6.8733C5.91998 8.02206 6.85123 8.9533 7.99998 8.9533Z" stroke="#464646" stroke-width="1.7"/>
                <path d="M2.41333 5.65998C3.72667 -0.113352 12.28 -0.106685 13.5867 5.66665C14.3533 9.05331 12.2467 11.92 10.4 13.6933C9.06 14.9866 6.94 14.9866 5.59333 13.6933C3.75333 11.92 1.64667 9.04665 2.41333 5.65998Z" stroke="#464646" stroke-width="1.7"/>
              </svg>
              {{ city }}
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="none">
                <path d="M11 4L6.88384 7.67453C6.39773 8.10849 5.60227 8.10849 5.11616 7.67453L1 4" stroke="#464646" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <Transition name="modal-transition">
            <TheModalCity
                v-if="isModalCityOpen"
                @close="isModalCityOpen = false"
                @selectCity="handleCitySelect"
                :current-city="city"
            />
          </Transition>
        </div>
        <h4 class="roulette-title">
          выберите место
        </h4>
        <form class="roulette-places">
          <div class="roulette-places__buttons">
            <button type="button"
                    class="roulette-places__button roulette-places__button_design"
                    v-for="(place, index) in places" :key="index"
                    @click="currentSelectPlace(place)"
                    :class="{'chosen': selectPlace === place}"
            >
              {{ place }}
            </button>
          </div>
          <button type="submit"
                  class="roulette-places__submit"
                  @click.prevent=""
          >
            генерация места
          </button>
        </form>
      </div>
      <div class="roulette__right">
        <TheRoulette :city="city" :place="selectPlace" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @use '~/assets/style/mixins.scss' as *;

  .main-block {
    padding: 0 18px;
    &__h1 {
      margin-bottom: 36px;
      font-family: var(--bold-font-family);
      font-size: 28px;
      color: var(--h1-main-color);
      @include transition-theme(color);
    }
    @media (max-width: 1100px) {
      padding: 0 12px;
    }
    @media (max-width: 768px) {
      padding: 0 4px;
    }
  }

  .roulette {
    @include flex-nowrap;
    align-items: flex-start;
    justify-content: space-between;
    gap: 40px;
    @media (max-width: 1280px) {
      gap: 20px;
    }

    @media (max-width: 1100px) {
      @include flex-wrap;
    }
    &-places {
      &__buttons {
        @include flex-wrap;
        gap: 8px;
        margin-bottom: 50px;
        @media (max-width: 1000px) {
          margin-bottom: 25px;
        }
      }
      &__submit {
        @include no-style-button;
        @include flex-nowrap;
        @include transition-theme(all);
        @include button-main-design;
        font-family: var(--medium-font-family);
        width: 100%;
        height: 45px;
        &:hover {
          transform: scale(1.03);
        }
      }
      &__button {
        @include no-style-button;
        @include transition-theme(all);
        height: 40px;
        padding: 0 10px !important;
        &:hover:not(.chosen) {
          background-color: var(--primary-blue-color);
          color: var(--white-color);
        }
        &.chosen  {
          pointer-events: none;
          cursor: default;
          background-color: var(--primary-blue-color);
          color: var(--white-color);
        }
        &_design {
          @include button-main-design;
        }
        &.chosen {
          box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
        }
      }
    }
    &-title {
      @include transition-theme(color);
      font-size: 16px;
      font-family: var(--regular-font-family);
      color: var(--button-main-text-color);
      margin-bottom: 18px;
    }
    &-city {
      overflow-y: scroll;
      border-radius: 10px;
      scrollbar-width: none;
      -ms-overflow-style: none;
      margin-bottom: 30px;
      &::-webkit-scrollbar {
        display: none;
      }
      &__items {
        @include flex-nowrap;
      }
      &__item {
        gap: 8px;
        height: 40px;
        padding: 0 10px !important;
        & svg path {
          @include transition-theme(stroke);
          stroke: var(--arrow-color);
        }
      }
      &__item_design {
        @include no-style-button;
        @include flex-nowrap;
        @include transition-theme(all);
        @include button-main-design;
      }
    }
    &__left {
      position: relative;
      @include transition-theme(background-color);
      max-width: 100%;
      width: 380px;
      background-color: var(--block-main-bg-color);
      border-radius: 25px;
      border-left: 6px solid var(--main-border-color);
      border-bottom: 6px solid var(--main-border-color);
      padding: 18px 20px 22px 20px;
      @media (max-width: 1100px) {
        width: 100%;
        border-bottom: none;
        border-right: 3px solid var(--main-border-color);
        border-left: 3px solid var(--main-border-color);
        border-top: 3px solid var(--main-border-color);

        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
    &__right {
      @include transition-theme(background-color);
      max-width: 100%;
      width: 1140px;
      height: 595px;
      background-color: var(--block-main-bg-color);
      border-radius: 25px;
      border-right: 6px solid var(--main-border-color);
      border-bottom: 6px solid var(--main-border-color);
      padding: 70px 50px 20px 50px;
      @media (max-width: 1100px) {
        border-right: 3px solid var(--main-border-color);
        border-left: 3px solid var(--main-border-color);
        border-bottom: 3px solid var(--main-border-color);

        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }
    }
  }

  .modal-transition-enter-active,
  .modal-transition-leave-active {
    transition: all 0.2s ease;
  }

  .modal-transition-enter-from,
  .modal-transition-leave-to {
    opacity: 0;
    transform: translateY(-5px);
  }


</style>