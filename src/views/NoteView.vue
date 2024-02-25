<template>
  <Swiper
    :slides-per-view="1"
    :loop="true"
    :centeredSlides="true"
    :pagination="swiperPagination"
    :modules="swiperModules"
    class="full-height"
  >
    <!-- TODO: resolve CSS issue to display pagination -->
    <SwiperSlide class="full-page">Slide 1</SwiperSlide>
    <SwiperSlide class="full-page">Slide 2</SwiperSlide>
    <SwiperSlide class="full-page">Slide 3</SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

import { Pagination } from 'swiper/modules'
import { type PaginationOptions } from 'swiper/types'
import { onBeforeMount, ref, type Ref } from 'vue'
import { generateDefaultConfig, type Config } from '@/model/config'
import { persistentStorage } from '@/model/storage'
import { useRouter } from 'vue-router'
import { generateDefaultGameNote, type GameNote } from '@/model/gameNote'
import { getColorHex } from '@/model/constant'

const swiperModules = [Pagination]
const swiperPagination: PaginationOptions = {
  clickable: true,
  renderBullet: (index, className) =>
    `<span style="background-color:${backgroundColorForIndex(index)}" class="${className}"></span>`,
}

const router = useRouter()

const config: Ref<Config> = ref(generateDefaultConfig())
const gameNote: Ref<GameNote> = ref(generateDefaultGameNote([]))

onBeforeMount(() => {
  const gameStartedAt = persistentStorage.getGameStartedAt()
  const loadedConfig = persistentStorage.getConfig()
  const loadedGameNote = persistentStorage.getGameNote()

  if (!gameStartedAt || !loadedConfig || !loadedGameNote) {
    resetAndGoHomeView()
    return
  }

  config.value = loadedConfig
  gameNote.value = loadedGameNote
})

function resetAndGoHomeView() {
  persistentStorage.markGameOff()
  router.replace({ name: 'home' })
}

function backgroundColorForIndex(index: number): string {
  if (index === 0) {
    return '#111111'
  }

  return getColorHex(config.value.rivalColors[index - 1])
}
</script>

<style>
.full-height {
  height: 100vh;
}

.full-page {
  width: 100%;
  height: 100%;
}
</style>
