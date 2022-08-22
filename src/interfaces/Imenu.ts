//interface de menu de buttons
export interface Imenu {
   image?:{url:string}
    caption?: string
    footer: string
    buttons: {
        buttonId: string, buttonText: {displayText: string}, type: number
      
    }[]
  
}