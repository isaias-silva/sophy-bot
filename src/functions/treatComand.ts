//dados do bot
import { data } from "../config/data"
import comandsList from "../config/comandsList"
//proto
import { proto } from "@whiskeysockets/baileys"
//interface
import { Ibot } from "../interfaces/Ibot"
//funções de comandos


//checar se mensagem é um comando
export function isComand(message: proto.IMessage) {

    const texto = message?.conversation ||
        message?.imageMessage?.caption ||
        message?.extendedTextMessage?.text ||
        message.videoMessage?.caption ||
        message.templateButtonReplyMessage?.selectedId ||
        message.buttonsResponseMessage?.selectedButtonId




    if (!texto) {
        return
    }
    try {
        let prefix = texto.split("")[0]
        if (prefix == data.prefix) {
            return true
        } else return false
    } catch (err) {
        return false
    }
}
//procurar comando da comandlist
export function searchComand(Webmessage: proto.IWebMessageInfo) {
    const { message } = Webmessage

    const comand = parameters(extractComand(message))
    let exists = comandsList.find(str => str.comand == comand[0] || (str.variants && str.variants.filter(v => v == comand[0]).length > 0))
    if (exists) {
        return true
    } else {
        return false
    }
}
//extrair parametro
export function parameters(comand: string) {

    if (!comand) {
        return [comand]
    }
    const array = comand.split(" ").filter((x) => { return x.length > 1 })
    let parametro = array.filter(element => element != array[0])

    return [array[0], parametro.toString().replace(/,/g, " ")].map((value) => {if(value) return value.toLowerCase()})
}
//cases de comandos
export async function caseComand(bot: Ibot) {
    const comandInput = parameters(extractComand(bot.webMessage.message))

  
    let comandUsed = false
    comandsList.forEach(value => {
        if (comandUsed == true) {
            return
        }
        const { comand, fn, variants } = value
        if (comandInput[0] == comand || variants.find(variant=>variant==comandInput[0])) {
       
            fn(bot, comandInput[1])
            comandUsed = true
            return
        }
    })
    if(comandUsed==false){
        bot.reply('Comando não encontrado ou corrompido, consulte o zack.')
    }
}
//extrair comando da mensagem
export function extractComand(msg: proto.IMessage | any) {
    const texto = msg.conversation
        || msg.imageMessage?.caption
        || msg.extendedTextMessage?.text
        || msg.videoMessage?.caption
        || msg.templateButtonReplyMessage?.selectedId
        || msg.buttonsResponseMessage?.selectedButtonId
    const comand = texto?.replace(data.prefix, "")
    return comand
}