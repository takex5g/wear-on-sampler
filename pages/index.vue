<template>
  <div>
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
      <SceneView
        v-if="name == currentScene"
        ref="scene"
        :audio-entry="audioArray[index]"
        :chara="chara"
      />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
const audioList = require(`~/assets/audioList.json`)
const chara = ['1', '2', '3', 'Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C']

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
      chara,
    }
  },
  created() {
    for (const elem of this.audioArray) {
      this.sceneNames.push(elem[0])
    }
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
    keyAction(e: KeyboardEvent) {
      const index = this.chara.findIndex(
        (c) => c.toUpperCase() === e.key.toUpperCase()
      )
      if (index === -1) return
      ;(this.$refs as any).scene[0].play(index)
    },
  },
})
</script>
