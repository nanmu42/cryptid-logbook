<template>
  <Swiper
    :slides-per-view="1"
    :loop="true"
    :centeredSlides="true"
    :pagination="swiperPagination"
    :modules="swiperModules"
    class="full-height"
  >
    <SwiperSlide class="full-page">
      <FinalClues :game-note="gameNote" :config="config" />
      <NBackTop class="z-50" />
    </SwiperSlide>
    <SwiperSlide
      v-for="color in config.rivalColors"
      :key="color"
      class="full-page"
      :style="{ backgroundColor: getColorHex(color) }"
    >
      <GameNoteComponent
        :config="config"
        :player-color="color"
        :player-clues="gameNote.clues[color]!"
        :clue-groups="clueGroups"
        :remained-possibilities="remainedPossibilities[color]!"
      />
      <NBackTop class="z-50" right="calc(50% - 22px)" bottom="45px" />
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'

import { Pagination } from 'swiper/modules'
import { type PaginationOptions } from 'swiper/types'
import { computed, onBeforeMount, onBeforeUnmount, ref, type Ref } from 'vue'
import { generateDefaultConfig, type Config } from '@/model/config'
import { persistentStorage } from '@/model/storage'
import { useRouter } from 'vue-router'
import {
  generateDefaultGameNote,
  type GameNote,
  generateDefaultRivalClues,
  excludePlayerClueInPlace,
  executeTerrainsBusterInPlace,
} from '@/model/gameNote'
import {
  chineseClueGroups,
  getColorHex,
  type ClueGroup,
  clueOneOfTwoTerrainList,
  clueWithin1List,
  clueWithin2List,
  clueWithin3List,
  flattenedClueList,
  type PlayerColor,
} from '@/model/constant'
import FinalClues from '@/components/FinalClues.vue'
import GameNoteComponent from '@/components/GameNote.vue'
import { NBackTop } from 'naive-ui'
import {
  eventBus,
  type ClueStateChanged,
  type ResetGameNote,
  type TerrainBusterChanged,
} from '@/model/eventBus'
import { deepCopy } from '@/model/helper'

const swiperModules = [Pagination]
const swiperPagination: PaginationOptions = {
  clickable: true,
  renderBullet: (index, className) =>
    `<span style="background-color:${backgroundColorForIndex(index)}" class="${className}"></span>`,
}

const router = useRouter()

const config: Ref<Config> = ref(generateDefaultConfig())
const rawGameNote: Ref<GameNote> = ref(generateDefaultGameNote([]))

const gameNote = computed<GameNote>(() => {
  if (!config.value.shortcuts.globalSwitch) {
    return rawGameNote.value
  }

  const gameNote = deepCopy(rawGameNote.value)
  if (config.value.shortcuts.excludePlayerClues) {
    excludePlayerClueInPlace(gameNote.clues, config.value.playerClue1!)

    if (config.value.isTwoPlayerMode) {
      excludePlayerClueInPlace(gameNote.clues, config.value.playerClue2!)
    }
  }

  if (config.value.shortcuts.terrainBuster) {
    executeTerrainsBusterInPlace(gameNote.clues)
  }

  return gameNote
})

onBeforeMount(() => {
  const gameStartedAt = persistentStorage.getGameStartedAt()
  const loadedConfig = persistentStorage.getConfig()
  const loadedGameNote = persistentStorage.getGameNote()

  if (!gameStartedAt || !loadedConfig || !loadedGameNote) {
    resetAndGoHomeView()
    return
  }

  config.value = loadedConfig
  rawGameNote.value = loadedGameNote

  eventBus.on('clueStateChanged', processEventClueStateChanged)
  eventBus.on('terrainBusterChanged', processEventTerrainBusterChanged)
  eventBus.on('resetGameNote', processEventResetGameNote)
})

onBeforeUnmount(() => {
  eventBus.off('clueStateChanged', processEventClueStateChanged)
  eventBus.off('terrainBusterChanged', processEventTerrainBusterChanged)
  eventBus.off('resetGameNote', processEventResetGameNote)
})

function resetAndGoHomeView() {
  persistentStorage.markGameOff()
  router.replace({ name: 'home' })
}

function backgroundColorForIndex(index: number): string {
  if (index === 0) {
    return '#141414'
  }

  return getColorHex(config.value.rivalColors[index - 1])
}

const clueGroups = computed<ClueGroup[]>(() => {
  if (config.value.isAdvancedMode) {
    return chineseClueGroups as ClueGroup[]
  }

  const groups: ClueGroup[] = [
    {
      key: 'ClueOneOfTwoTerrain',
      name: '两种地形之中',
      clues: clueOneOfTwoTerrainList,
    },
    {
      key: 'ClueWithin1',
      name: '地形或动物+1',
      clues: clueWithin1List,
    },
    {
      key: 'ClueWithin2',
      name: '地标或特定动物+2',
      clues: clueWithin2List,
    },
    {
      key: 'ClueWithin3',
      name: '颜色+3',
      clues: clueWithin3List.filter((clue) => clue !== 'WITHIN3BLACK'),
    },
  ]

  return groups
})

const allPossibleClueNamesAtOneSide = computed(() => {
  if (config.value.isAdvancedMode) {
    return flattenedClueList
  }

  return flattenedClueList.filter((clue) => clue !== 'WITHIN3BLACK')
})

const remainedPossibilities = computed<{ [key in PlayerColor]?: number }>(() => {
  const possibilities: { [key in PlayerColor]?: number } = {}

  for (let [k, v] of Object.entries(gameNote.value.clues)) {
    let count = 0

    for (const name of allPossibleClueNamesAtOneSide.value) {
      const state = v!.in[name]
      if (state !== 'excluded' && state !== 'autoExcluded') {
        count++
      }
    }
    if (config.value.isAdvancedMode) {
      for (const name of allPossibleClueNamesAtOneSide.value) {
        const state = v!.notIn[name]
        if (state !== 'excluded' && state !== 'autoExcluded') {
          count++
        }
      }
    }
    possibilities[k as PlayerColor] = count
  }

  return possibilities
})

function processEventClueStateChanged(event: ClueStateChanged) {
  const clues = rawGameNote.value.clues[event.playerColor]!

  if (event.inverted) {
    clues.notIn[event.clue] = event.toState
    return
  }

  clues.in[event.clue] = event.toState

  persistentStorage.setGameNote(rawGameNote.value)
}

function processEventTerrainBusterChanged(event: TerrainBusterChanged) {
  const buster = rawGameNote.value.clues[event.playerColor]!.terrainBuster

  switch (event.polarity) {
    case 'positive':
      buster.positive = event.payload
      break
    case 'negative':
      buster.negative = event.payload
      break
    default:
      throw new Error(`processEventTerrainBusterChanged: Invalid polarity '${event.polarity}'`)
  }

  persistentStorage.setGameNote(rawGameNote.value)
}

function processEventResetGameNote(event: ResetGameNote) {
  rawGameNote.value.clues[event.playerColor] = generateDefaultRivalClues()

  persistentStorage.setGameNote(rawGameNote.value)
}
</script>

<style>
.full-height {
  height: 100vh;
}

.full-page {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.swiper-pagination-bullet {
  margin: 0 0.4rem !important;
  border: #ffffff 1px solid;
  display: inline-block;
  width: 1rem;
  height: 1rem;
  text-align: center;
  line-height: 1rem;
  transition: transform 300ms;
  opacity: 1;
}

.swiper-pagination-bullet-active {
  transform: scale(1.2);
}
</style>
