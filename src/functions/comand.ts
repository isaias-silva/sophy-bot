import { proto } from "@adiwajshing/baileys"
import { data } from "../config/data"
import { Ibot } from "../interfaces/Ibot"

export function isComand(message: proto.IMessage) {
   
    const texto = message?.conversation || message?.imageMessage?.caption || message?.extendedTextMessage?.text
    if (!texto) { return }
    console.log(texto)
    let prefix = texto.split("")[0]
    if (prefix == data.prefix) {
        return true
    } else return false
}
export function searchComand(message: proto.IMessage) {
    console.log(message)


}