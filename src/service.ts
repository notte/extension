import { subTitleType } from "subtitle";
import { Youtube } from "./youtube";
import "./style.scss";

// 每一項影音平台 Class 的 interface 型別
interface Service {
    getSubs(language: string): Promise<subTitleType[]>
    playerContainerSelector(): string
    settingsSelector(): string | HTMLElement
    settingsContentSelector(): string
}

// 建立目前使用的某平台服務實體
const platform = new Youtube();

// 如果存在
if (platform) {
  // 設定監聽事件
  // console.log('Easysubs initialized. Service:', service.constructor.name)
  window.addEventListener('easysubsVideoReady', () => {
    // console.log('TCL: EVENT', 'easysubsVideoReady')
    // window.addEventListener('easysubsRenderSettings', () => {
    //   UI.renderSettings(service.settingsSelector(), service.settingsContentSelector())
    // })

    // 監聽 cc 字幕開關事件
    window.addEventListener('easysubsSubtitlesChanged', (event: any) => {
      // console.log('TCL: EVENT', 'easysubsSubtitlesChanged')
      // UI.renderSubs(service.playerContainerSelector())
      // UI.renderProgressBar(service.playerContainerSelector())
      // UI.renderNotifications()
      
      // 取得字幕
      platform.getSubs(event.detail).then((subs) => {
      })
    })
  })

  // 觸發平台 class 初始
  platform.init()
  // ;(subsStore as any).on(updateSubs, (state: subTitleType[], subs: subTitleType[]) => subs)
}
  
export type { Service };
