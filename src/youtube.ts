import { parse, subTitleType } from "subtitle";
import { Service } from "./service";

class Youtube implements Service {
  // Youtube 的私有屬性 subCache
  private subCache: any;


  // 在 class 被建立時執行
  constructor() {
    // 設定為空物件
    this.subCache = {}

    // 不會執行，建立一個新函式覆蓋 processSubData
    // 帶入的事件參數為呼叫函式的 this
    this.processSubData = this.processSubData.bind(this)

    // 監聽 easysubs_data 事件，接收字幕的 url 及 lang
    window.addEventListener('easysubs_data', this.processSubData)
  }

  // 初始化
  public init(): void {
    this.injectScript()
  }

  // 取得字幕
  public async getSubs(language: string): Promise<subTitleType[]> {
    if (language === '') return parse('')
    const videoId = this.getVideoId()

    const urlObject: URL = new URL(this.subCache[videoId][language])
    urlObject.searchParams.set('fmt', 'vtt')
    console.log(urlObject.searchParams);
    const subUri: string = urlObject.href
    const resp = await fetch(subUri)
    const text = await resp.text()

    return parse(text)
  }

  // 取得影片 id
  private getVideoId(): string {
    const regExpression = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = window.location.href.match(regExpression)
    if (match && match[2].length === 11) {
      return match[2]
    }
    console.error("Can't get youtube video id")
    return ''
  }

  // 將內容插入網頁結構
  private injection = () => {

    // 每半秒執行一次函式
    window.setInterval(() => {
      // 獲取到 YouTube 影片播放器
      const player: any = document.getElementById('movie_player')
      // 獲取切換 cc 字幕的按鈕
      const subsToggleElement = document.querySelector('.ytp-subtitles-button')

      // 如果存在 YouTube 影片播放器
      if (player) {
        // window 中不存在 isLoaded，驗證確定沒有後直接建立屬性
        // 也代表 window 物件已被建立完，才能確定沒有該屬性
        if (!window.isLoaded) {
          window.isLoaded = true

          // 發送自定義事件，自己建立事件週期
          // target.dispatchEvent(event)
          // new CustomEvent 建立事件物件
          // event 要被觸發的事件（event 物件）
          // target 觸發事件的目標，會被轉為 Event.target
          window.dispatchEvent(new CustomEvent('easysubsVideoReady'))
          window.dispatchEvent(new CustomEvent('easysubsRenderSettings'))

          // 如果存在 subsToggleElement
          // 並且 subsToggleElement.getAttribute 中的值為 true（字幕開啟）
          if (subsToggleElement && subsToggleElement.getAttribute('aria-pressed') === 'true') {
            player.toggleSubtitles()
            player.toggleSubtitles()
          } else {
            // 呼叫事件
            // 可選是否設定 detail，帶入與事件相關值
            // 會被監聽器一同接收
            window.dispatchEvent(new CustomEvent('easysubsSubtitlesChanged', { detail: '' }))
          }
        }
      } else {
        // 不存在 YouTube 影片播放器，表示 window 尚未載入完畢
        window.isLoaded = false
      }

      // 如果有 cc 字幕的按鈕
      if (subsToggleElement) {
        // 如果有 subtitlesEnabled 以及 aria-pressed 為 false（字幕關閉）
        if (window.subtitlesEnabled && subsToggleElement.getAttribute('aria-pressed') === 'false') {
          
          // 建立該屬性（表示未啟用字幕）
          window.subtitlesEnabled = false
          // 發送事件
          window.dispatchEvent(new CustomEvent('easysubsSubtitlesChanged', { detail: '' }))
        }
      }
    }, 500);

    // 立即函式
    // 帶入 XMLHttpRequest.prototype.open
    ((open) => {

      // 改寫原型中的 open
      // method 可能為 GET、PUT⋯⋯
      XMLHttpRequest.prototype.open = function (method: string, url: string) {

        // url 不是空值，並且為 http 開頭
        if (url.match(/^http/g) !== null) {  
          // 建立 URL 物件
          const urlObject = new URL(url)

          // 如果 pathname 正確，才會拆解並傳遞事件
          if (urlObject.pathname === '/api/timedtext') {
            // 已啟用字幕
            window.subtitlesEnabled = true

            // 找尋 url 中的語言參數
            const lang = urlObject.searchParams.get('tlang') || urlObject.searchParams.get('lang')
            
            // 發送事件，並傳遞正確的路徑和語言
            window.dispatchEvent(new CustomEvent('easysubs_data', { detail: urlObject.href }))
            window.dispatchEvent(new CustomEvent('easysubsSubtitlesChanged', { detail: lang }))
          }
        }

        // 遞迴，由函式自己 call 自己
        // 參數為指定的 this、呼叫發法、url、是否為異步執行
        // 因為 youtube 開啟後背景繼續會獲取資料
        // 跟隨每次瀏覽器發出 Request 而觸發
        open.call(this, method, url, true)
      }
    })(XMLHttpRequest.prototype.open)
  }

  private processSubData(event: any): void {

    // event 為呼叫函式的 this，也就是 easysubs_data
    // 並接收發出事件時，所帶入的參數 detail

    // 建立 url 物件
    const urlObject = new URL(event.detail)

    // 分析 lang
    const lang = urlObject.searchParams.get('tlang') || urlObject.searchParams.get('lang') || ''
    const videoId = urlObject.searchParams.get('v') || ''

    
    this.subCache[videoId] = {}
    this.subCache[videoId][lang] = urlObject.href
  }

  // 在 HTML head 中插入 script
  private injectScript(): void {
    const sc = document.createElement('script')

    // toString() 將 injection 轉為字串
    // ${ } 字串樣板
    // ()() 變數宣告的立即函式
    // ` ` 包住字串樣板，並可插入變數
    sc.innerHTML = `(${this.injection.toString()})()`
    
    document.head.appendChild(sc)
    document.head.removeChild(sc)
  }

  public settingsSelector(): string {
    return '.ytp-right-controls > .ytp-size-button'
  }
  public settingsContentSelector(): string {
    return '.easysubs-settings-container'
  }
  public playerContainerSelector(): string {
    return '.html5-video-player'
  }
}

export { Youtube };
