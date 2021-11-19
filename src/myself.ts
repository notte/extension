
class myYoutube {

    constructor(){
    }

    getSubs(){
        // let video = document.getElementById('movie_player');
        let captions = document.getElementById('ytp-caption-window-container');
        let caption = captions?.getElementsByTagName('span');
        
        
        console.log(captions, toString.call(captions), 'captions')
        console.log(caption, toString.call(caption), 'caption')
        // ytp-caption-segment
    }
}


export { myYoutube }