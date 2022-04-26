export default class AudioHandler {
  private _filename: string
  private _audioCtx = new AudioContext()
  private _audioBuffer: AudioBuffer | null = null
  private _audioBufferNode: AudioBufferSourceNode | null = null
  private _playing = false
  private _closeFlag = false // うんこ実装

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
    this._audioBufferNode.onended = () => {
      this._playing = false
      if (this._closeFlag) this._audioCtx.close() // 破棄フラグが出てる場合は閉じる
    }
    this._audioBufferNode.connect(this._audioCtx.destination)
  }

  public play() {
    if (!this._audioBufferNode) return
    // オーディオを再生
    this._audioBufferNode.start(0)
    // 次回の再生のために準備を行う
    this.prepareAudioBufferNode()
    this._playing = true
  }

  public close() {
    // 破棄
    this._closeFlag = true
    // ただし再生中の場合は閉じない
    if (!this._playing) this._audioCtx.close()
  }
}
