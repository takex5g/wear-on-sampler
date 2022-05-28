<template>
  <div class="columns">
    <div v-for="(audioName, index) in fileNames" :key="index" class="column">
      <div class="buttons">
        <b-button @click="play(index)" size="is-large" expanded>
          <b-tag rounded size="is-large"
            ><b>{{ audioIndexKey(index) }}</b></b-tag
          >{{ rmExtension(audioName, index) }}</b-button
        >
      </div>
    </div>
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
        this.Audio.push(
          new AudioHandler(this.$router.options.base + `audio/${filename}`)
        )
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
    rmExtension(str: string) {
      const rmExtension = str.replace('.mp3', '')
      return rmExtension
    },
    audioIndexKey(index: number) {
      return this.chara[index]
    },
  },
})
</script>
