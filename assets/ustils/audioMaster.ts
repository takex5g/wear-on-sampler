export default class AudioHandler {
  _filename: string
  _audioCtx = new AudioContext()
  _audioBuffer: AudioBuffer | null = null
  _audioBufferNode: AudioBufferSourceNode | null = null

  constructor(filename: string) {
    this._filename = filename
  }

  public async fetch() {
    // fetch で sound.mp3 ファイルをダウンロードして ArrayBuffer を取得
    const response = await fetch(this._filename)
    const responseBuffer = await response.arrayBuffer()

    // ArrayBuffer をデコードして AudioBuffer オブジェクトを取得
    this._audioBuffer = await this._audioCtx.decodeAudioData(responseBuffer)
    // 初回再生のために準備を行う
    this.prepareAudioBufferNode()
    return this._filename
  }

  // 音源再生のために準備を行う
  private prepareAudioBufferNode() {
    this._audioBufferNode = this._audioCtx.createBufferSource()
    this._audioBufferNode.buffer = this._audioBuffer
    this._audioBufferNode.connect(this._audioCtx.destination)
  }

  public play() {
    if (!this._audioBufferNode) return
    // オーディオを再生
    this._audioBufferNode.start(0)
    // 次回の再生のために準備を行う
    this.prepareAudioBufferNode()
  }

  public close() {
    // メモリ解放
    this._audioCtx.close()
  }
}
