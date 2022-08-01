import { proto } from "@adiwajshing/baileys"
import { data } from "../config/data"
import { Ibot } from "../interfaces/Ibot"
import fs from 'fs'
import path from 'path'
import comandsList from "../config/comandsList"
import { menu } from "../comands/menu"
import { sticker } from "../comands/sticker"
export function isComand(message: proto.IMessage) {

    const texto = message?.conversation || message?.imageMessage?.caption || message?.extendedTextMessage?.text || message.videoMessage?.caption
    if (!texto) { return }

    let prefix = texto.split("")[0]
    if (prefix == data.prefix) {
        return true
    } else return false
}
export function searchComand(Webmessage: proto.IWebMessageInfo) {
    const { message } = Webmessage

   const comand  = extractComand(message)
    let exists = comandsList.find(str => str == comand)
    if (exists) {
        return comand
    } else {
        return false
    }
}
export async function caseComand(bot:Ibot){
    const comand = extractComand(bot.webMessage.message)
 
    switch(comand){
        case `menu`:
          await menu(bot)
        break
        case `sticker`:
            await sticker(bot)
        break 

    }
}
export function extractComand(msg:proto.IMessage | any){
    const texto = msg.conversation || msg.imageMessage?.caption || msg.extendedTextMessage?.text || msg.videoMessage?.caption
    const comand = texto?.replace(data.prefix, "")
    return comand
}