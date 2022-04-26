<template>
  <div :keydown="keydown">
    一時間サンプラー{{ currentScene }}
    <div>
      <button
        v-for="name in sceneNames"
        :key="name"
        @click="currentScene = name"
      >
        {{ name }}
      </button>
    </div>
    <div v-for="(name, index) in sceneNames" :key="name">
      <Scene v-if="name == currentScene" :audio-entry="audioArray[index]" />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

const audioList = require(`~/assets/audioList.json`)
export type audioArrayType = [string, string[]]
type DataType = {
  currentScene: string
  audioArray: audioArrayType[]
  sceneNames: string[]
}
export default Vue.extend({
  components: {},
  data(): DataType {
    return {
      currentScene: '',
      audioArray: Object.entries(audioList),
      sceneNames: [],
    }
  },
  created() {
    for (const elem of this.audioArray) {
      this.sceneNames.push(elem[0])
    }
    this.currentScene = this.sceneNames[0]
  },
  methods: {
    keydown(e) {
      console.log('e:', e)
    },
  },
})
</script>
