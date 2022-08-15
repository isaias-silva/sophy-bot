import { proto } from "@adiwajshing/baileys"

export function isLink(message: proto.IMessage) {
    let text = message.conversation || message.imageMessage?.caption || message.videoMessage?.caption
    if(!text){
        return false
    }
    let response = false
    if(text?.search(/(https?:\/\/[^\s]+)/g)!=-1){
        response=true
    }
    console.log(text?.search(/(https?:\/\/[^\s]+)/g))
   // console.log(`${text} is link? ${response}`)
 
    return response
}