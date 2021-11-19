import { subTitleType } from "subtitle";
import { Youtube } from "./youtube";
import { myYoutube } from "./myself";
import "./style.scss";

// 每一項影音平台 Class 的 interface 型別
interface Service {
    getSubs(language: string): Promise<subTitleType[]>
    playerContainerSelector(): string
    settingsSelector(): string | HTMLElement
    settingsContentSelector(): string
}

window.onload = () => {

    const platform = new myYoutube();

    const subtitlesBtn = document.querySelector('.ytp-subtitles-button');

    subtitlesBtn?.addEventListener('click', () => {

        if(subtitlesBtn?.getAttribute('aria-pressed') === "true"){
            platform.getSubs()
        }
        
    })
}

// // 建立目前使用的某平台服務實體
// const platform = new Youtube();
// // 如果存在
// if (platform) {
//   // 設定監聽事件
//   console.log('Easysubs initialized. Service:', platform.constructor.name)
//   window.addEventListener('easysubsVideoReady', () => {
//     console.log('TCL: EVENT', 'easysubsVideoReady')
//     window.addEventListener('easysubsRenderSettings', () => {
//     })

//     // 監聽 cc 字幕開關事件
//     window.addEventListener('easysubsSubtitlesChanged', (event: any) => {
//       console.log('TCL: EVENT', 'easysubsSubtitlesChanged')
//       // 取得字幕
//       platform.getSubs(event.detail).then((subs) => {
//       })
//     })
//   })
//   // 觸發平台 class 初始
//   platform.init()
// }
  
export type { Service };
