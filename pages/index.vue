<template>
  <div>
    <div>
      <button
        v-for="(name, index) in sceneNames"
        :key="name"
        @click="currentScene = name"
      >
        {{ sceneFormat(name, index) }}
      </button>
    </div>
    <div v-for="(name, index) in sceneNames" :key="name">
      <div v-if="name == currentScene">
        <SceneView
          v-if="audioArray.length > index"
          ref="scene"
          :audio-entry="audioArray[index]"
          :chara="chara"
        />
        <div v-else>無音</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
const audioList = require(`~/assets/audioList.json`)
const SOUND_KEY = ['1', '2', '3', 'Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C']
const SWITCH_SCENE_KEY = ['I', 'O', 'P', '{']

export type audioArrayType = [string, string[]]
type DataType = {
  currentScene: string
  audioArray: audioArrayType[]
  sceneNames: string[]
  chara: string[]
}
export default Vue.extend({
  components: {},
  data(): DataType {
    return {
      currentScene: '',
      audioArray: Object.entries(audioList),
      sceneNames: [],
      chara: SOUND_KEY,
    }
  },
  created() {
    for (const elem of this.audioArray) {
      this.sceneNames.push(elem[0])
    }
    this.sceneNames.push('無音')
    this.currentScene = this.sceneNames[0]
  },
  mounted() {
    window.addEventListener('keydown', this.keyAction)
  },
  beforeDestroy() {
    // キーコードによる動作の削除
    window.removeEventListener('keydown', this.keyAction)
  },
  methods: {
    sceneFormat(str: string, index: number) {
      return `${str}\n${SWITCH_SCENE_KEY[index]}`
    },
    keyAction(e: KeyboardEvent) {
      const soundIndex = this.chara.findIndex(
        (c) => c.toUpperCase() === e.key.toUpperCase()
      )
      if (soundIndex !== -1) {
        ;(this.$refs as any).scene[0].play(soundIndex)
        return
      }
      const switchIndex = SWITCH_SCENE_KEY.findIndex(
        (c) => c.toUpperCase() === e.key.toUpperCase()
      )
      if (switchIndex !== -1) {
        this.currentScene = this.sceneNames[switchIndex]
      }
    },
  },
})
</script>
