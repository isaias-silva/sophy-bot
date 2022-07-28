import { proto } from "@adiwajshing/baileys"
import { data } from "../config/data"
import { Ibot } from "../interfaces/Ibot"
import fs from 'fs'
import path from 'path'
import comandsList from "../config/comandsList"
export function isComand(message: proto.IMessage) {

    const texto = message?.conversation || message?.imageMessage?.caption || message?.extendedTextMessage?.text
    if (!texto) { return }

    let prefix = texto.split("")[0]
    if (prefix == data.prefix) {
        return true
    } else return false
}
export function searchComand(Webmessage: proto.IWebMessageInfo) {
    const { message } = Webmessage

    const texto = message?.conversation || message?.imageMessage?.caption || message?.extendedTextMessage?.text
    const comand = texto?.replace(data.prefix, "")
    let exists = comandsList.find(str => str == comand)
    if (exists) {
        return true
    } else {
        return false
    }
}