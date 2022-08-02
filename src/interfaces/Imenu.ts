export interface Imenu {
   image?:{url:string}
    caption: string
    footer: string
    templateButtons: {
        index: number,
        urlButton?: { displayText: string ,url:string},
        callButton?: { displayText: string },
        quickReplyButton?: { displayText: string },
      
    }[]
  
}