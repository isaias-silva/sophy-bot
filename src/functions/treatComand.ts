//dados do bot
import { data } from "../config/data"
import comandsList from "../config/comandsList"
//proto
import { proto } from "@adiwajshing/baileys"
//interface
import { Ibot } from "../interfaces/Ibot"
//funções de comandos

import { menu } from "../comands/menu"
import { sticker } from "../comands/sticker"
import { comandos } from "../comands/comandos"
import { toimg } from "../comands/toimg"
import { ban } from "../comands/ban"
import { regras } from "../comands/regras"
import { marcar } from "../comands/marcar"
import { ytdownload } from "../comands/ytdownload"
import { playmusic } from "../comands/playMusic"
import { playvideo } from "../comands/playVideo"
import { dj } from "../comands/dj"

//checar se mensagem é um comando
export function isComand(message: proto.IMessage) {

    const texto = message?.conversation || message?.imageMessage?.caption || message?.extendedTextMessage?.text || message.videoMessage?.caption || message.templateButtonReplyMessage?.selectedId

    if (!texto) { return }
    let prefix = texto.split("")[0]
    if (prefix == data.prefix) {
        return true
    } else return false
}
//procurar comando da comandlist
export function searchComand(Webmessage: proto.IWebMessageInfo) {
    const { message } = Webmessage

    const comand = parameters(extractComand(message))
    let exists = comandsList.find(str => str.comand == comand[0])
    if (exists) {
        return true
    } else {
        return false
    }
}
//extrair parametro
export function parameters(comand: string) {
    const array= comand.split(" ").filter((x) => { return x.length > 1 })
    let parametro=array.filter(element=>element!=array[0])
  
return [array[0],parametro.toString().replace(/,/g, " ")]
}
//cases de comandos
export async function caseComand(bot: Ibot) {
    const comand = parameters(extractComand(bot.webMessage.message))

    console.log(comand)
    switch (comand[0]) {
        case `menu`:
            await menu(bot)
            break
        case `sticker`:
            await sticker(bot)
            break
        case `comandos`:
            await comandos(bot)
            break
        case `toimg`:
            await toimg(bot)
            break
        case `ban`:
            await ban(bot, comand[1])
            break
        case `regras`:
            await regras(bot)
            break
        case `marcar`:
            await marcar(bot)
            break
        case `ytdownload`:
            await ytdownload(bot, comand[1])
            break
        case `playmusic`:

            await playmusic(bot, comand[1])
            break
            case `playvideo`:

                await playvideo(bot, comand[1])
                break
            case `dj`:

            await dj(bot, comand[1])
            break
        default:
            await bot.reply('erro no comando ou comando nao existe')
            break


    }
}
//extrair comando da mensagem
export function extractComand(msg: proto.IMessage | any) {
    const texto = msg.conversation || msg.imageMessage?.caption || msg.extendedTextMessage?.text || msg.videoMessage?.caption || msg.templateButtonReplyMessage?.selectedId
    const comand = texto?.replace(data.prefix, "")
    return comand
}