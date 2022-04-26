<template>
  <div>
    <b-button
      v-for="(audioname, index) in fileNames"
      :key="index"
      @click="play(index)"
    >
      {{ rmExtension(audioname, index) }}</b-button
    >
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { audioArrayType } from '~/pages/index.vue'
import AudioHandler from '~/assets/ustils/audioMaster'
export type DataType = {
  Audio: (AudioHandler | null)[]
}
export default Vue.extend({
  props: {
    audioEntry: {
      // @ts-ignore
      type: Array as PropType<audioArrayType>,
      required: true,
    },
    chara: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  data(): DataType {
    return {
      Audio: [],
    }
  },
  computed: {
    name(): string {
      return this.audioEntry[0]
    },
    fileNames(): string[] {
      return this.audioEntry[1]
    },
  },
  created() {
    this.loadFiles()
  },
  beforeDestroy() {
    this.closeAudio()
  },
  methods: {
    play(index: number) {
      this.Audio[index]?.play()
    },
    async loadFiles() {
      for (const filename of this.fileNames) {
        this.Audio.push(new AudioHandler(`./audio/${filename}`))
      }

      await Promise.all(this.Audio.map((target) => target?.fetch())).then(
        () => {}
      )
    },
    closeAudio() {
      // 破棄
      for (const handler of this.Audio) {
        handler?.close()
      }
    },
    rmExtension(str: string, index: number) {
      const rmExtension = str.replace('.mp3', '')
      return `${rmExtension}\n${this.chara[index]}`
    },
  },
})
</script>
