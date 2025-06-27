<script setup lang="ts">
  import cities from '~/assets/data/cities.json'

  type Place = { id: number; title: string }

  const props = defineProps<{ city: string, place: string }>()
  const emit = defineEmits(['selected-place'])

  const currentCity = computed(() => cities.find(c => c.city === props.city) )

  const places = computed<Place[]>(() => {
    if (!currentCity.value || !props.place || props.place === "Не выбрано")
      return []
    return currentCity.value.place[props.place] || []
  })

  const currentRotation = ref<number>(0)
  const selectedPlace = ref<string | null>(null)

  // логика рулетки
  class Roulette {
    sliceCircle: number
    skew: number
    places: Place[]
    idleSpin: number

    constructor(places: Place[]) {
      this.idleSpin = 5
      this.places = places
      this.sliceCircle = places.length > 0 ? 360 / places.length : 0
      this.skew = this.sliceCircle - 90
    }

    rotate (index: number):number {
      const segmentDeg = -(this.sliceCircle * index - this.sliceCircle / 2)
      const randomDeg = (this.sliceCircle - 4) * Math.random() - 2
      const idleS = 360 * this.idleSpin

      const rotate = segmentDeg - randomDeg - idleS
      return rotate
    }

    spin(currentRotation: Ref<number>, selectedPlace: Ref<string | null>) {
      if (this.places.length === 0) {
        currentRotation.value = 0
        selectedPlace.value = null
        return null
      }
      const randomIndex = Math.floor(Math.random() * this.places.length)
      currentRotation.value = this.rotate(randomIndex)
      selectedPlace.value = this.places[randomIndex].title
      return this.places[randomIndex]
    }
  }

  const roulette = computed(() => new Roulette(places.value))
  const sliceLength = computed(() => roulette.value.sliceCircle)
  const skew = computed(() => roulette.value.skew)

  const isTwoSectors = computed(() => places.value.length === 2)

  const spin = () => {
    const selected = roulette.value.spin(currentRotation, selectedPlace)
    emit('selected-place', selected)
  }

  defineExpose({ spin })
</script>

<template>
  <div class="roulette-wrapper">
    <div class="roulette">
      <div class="roulette__arrow">
        <svg xmlns="http://www.w3.org/2000/svg" width="61" height="96" viewBox="0 0 61 96" fill="none">
          <path d="M60.3777 26.5483C60.3777 15.0483 45.1177 2.65733e-05 29.3776 2.79493e-05C13.6375 2.93254e-05 5.37762 14.5483 0.877597 27.5C-6.29162 48.1339 32.8485 47.0483 31.8484 95.0483C31.8484 95.0483 60.3777 60.5156 60.3777 26.5483Z" fill="#4B69DB"/>
          <path d="M32.6787 93.1929C33.4551 92.187 34.5654 90.7106 35.8984 88.8325C38.5649 85.0759 42.1206 79.7133 45.6758 73.2935C52.7932 60.4413 59.8779 43.4058 59.8779 26.5483C59.8779 20.9971 56.1746 14.4844 50.4463 9.33349C44.7302 4.19361 37.094 0.500588 29.3779 0.500486C21.6848 0.500486 15.813 4.04746 11.2891 9.22217C6.75502 14.4085 3.59047 21.2151 1.3496 27.6646C0.477598 30.1745 0.318917 32.3259 0.682612 34.2661C1.04691 36.2092 1.94191 37.9775 3.23339 39.7104C4.52784 41.4474 6.20916 43.1345 8.12988 44.9175C10.0313 46.6826 12.2085 48.5776 14.3936 50.6489C18.7958 54.8221 23.4181 59.8788 26.8721 66.9253C30.1861 73.6864 32.4097 82.2535 32.3643 93.5933C32.4612 93.4689 32.5677 93.3366 32.6787 93.1929Z" stroke="black" stroke-opacity="0.05"/>
        </svg>
      </div>
      <div class="roulette-overflow">
        <div class="roulette-items"
             :style="
             {
               transform: `rotate(${currentRotation}deg)`
             }">
        <!-- сектора -->
          <div class="roulette-items__item"
               v-for="(item, i) in places"
               :key="item.id"
               :style="isTwoSectors
              ? {
            left: 0,
            top: i === 0 ? 0 : '50%',
            transform: i === 0 ? 'rotate(0deg)' : 'rotate(360deg)',
            transformOrigin: 'center top'
                }
                : {
                    transform: `rotate(${sliceLength * i + skew - sliceLength / 2}deg) skewX(${skew}deg)`
                  }">
          </div>
        <!-- текст -->
          <div class="roulette-items__label"
               v-for="(item, i) in places"
               :key="item.id"
               :style="
             {
               transform: `rotate(${sliceLength * i }deg)`
             }">
            <span class="roulette-items__title">
              {{ item.title }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <h2 class="roulette-results"></h2>
  </div>
</template>


<style scoped lang="scss">
  @use '~/assets/style/mixins.scss' as *;

  .roulette {
    height: 100%;
    width: 100%;
    position: relative;
    border-radius: 50%;
    background: var(--wheel-color);
    border: 3px solid var(--wheel-border-color);
    @include transition-theme(all);
    &-wrapper {
      width: 100%;
      max-width: 495px;
      aspect-ratio: 495/475;
    }
    &-overflow {
      position: relative;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
    }
    &__arrow {
      z-index: 1000;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -10%;
      width: 12%;
      @media (max-width: 410px) {
        top: -11%;
      }
      svg {
        width: 100%;
        height: auto;
        display: block;
      }
    }
    &-items {
      width: 100%;
      height: 100%;
      &__item {
        position: absolute;
        width: 100%;
        height: 100%;
        top: -50%;
        left: 50%;
        transform-origin: 0 100%;
        &:nth-child(2n) {
          background-color: var(--wheel-border-color); // поменять
        }
      }
      &__label {
        position: absolute;
        top: 0;
        left: 50%;
        width: 50%;
        height: 50%;
        transform-origin: 0 100%;
      }
      &__title {
        position: absolute;
        top: 0;
        left: 0;
        margin-left: -6%;
        margin-top: 8%;
        width: 100%;
        height: 100%;
        transform: rotate(-90deg);
        text-align: center;
        font-size: 3.5vw;
        font-family: var(--medium-font-family);
        @media (min-width: 550px) {
          font-size: 18px;
        }
        @media (max-width: 350px) {
          font-size: 3.2vw;
        }
      }
    }
  }
</style>