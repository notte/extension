const demo = require("./demo.scss");
import { parse, subTitleType } from "subtitle";

class Youtube {
  private subCache: any;
  
  constructor(){
    this.subCache = {};
  }

  public async getSubs(language: string):Promise<any> {
    if(!language){
      return;
    }
    const videoId = getVideoId();
    // console.log(language, videoId, 1);
    // console.log(subCache, videoId, language )
    let urlObject: URL = new URL(this.subCache[videoId][language]);
  
  
    console.log(urlObject, 2)
    
    
      // urlObject.searchParams.set('fmt', 'vtt')
      // const subUri: string = urlObject.href
  
      // const resp = await fetch(subUri)
      // const text = await resp.text()
      // const res = parse(text);
      // return parse(text)
  }
}




function getVideoId(): string {
  const regExpression = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = window.location.href.match(regExpression)
  if (match && match[2].length === 11) {
    return match[2]
  }
  console.error("Can't get youtube video id")
  return ''
}


// setTimeout(() => {
//   const video: HTMLVideoElement | null = document.querySelector("video");
//   if (video) {
//     console.log(video.currentTime);
//     console.log(video.dataset);
//   }

// }, 3000);

// function processSubData(event: any): void {
//   console.log(event)
//   const urlObject = new URL(event.detail)
//   const lang = urlObject.searchParams.get('tlang') || urlObject.searchParams.get('lang') || ''
//   const videoId = urlObject.searchParams.get('v') || ''
//   subCache[videoId] = {}
//   subCache[videoId][lang] = urlObject.href
// }
// var p = document.createElement("h1");
// p.textContent = "This paragraph was added by a page script.";
// p.setAttribute("id", "page-script-para");
// document.body.appendChild(p);



export {};
