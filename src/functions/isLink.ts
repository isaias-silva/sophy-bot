import { proto } from "@adiwajshing/baileys"

export function isLink(message: proto.IMessage) {
    let text = message.conversation || message.imageMessage?.caption || message.videoMessage?.caption || message.extendedTextMessage?.text
    if(!text){
        return false
    }
    let response = false
    if(text?.search(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi)!=-1){
        response=true
    }
    if(text.includes('.io')
    || text.includes('.com')
    || text.includes('.net') ){
        response=true
    }
 
    return response
}