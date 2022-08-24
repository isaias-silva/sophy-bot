import { proto } from "@adiwajshing/baileys"

export default function (message: proto.IMessage) {
    let frase = message.conversation || message.imageMessage?.caption || message.videoMessage?.caption || message.extendedTextMessage?.text
    if (!frase) {
        return false
    }

    const forbiddenwors = [
        "vendo",
        "pack",
        "seguidores",
        "pix",
        "R$",
        "$",
        "SANTANDER",
        "ITAU",
        "LOJAS ITAÚ",
        "HIPER CARD",
        "CREDI CARD",
        "NUBANK",
        "BRADESCO",
        "NEXT",
        "BANCO DO BRASIL","POR MÊS","💰","transferência","transfiro","DUVIDA CHAME NO PV"]
    for (let word of forbiddenwors) {
        if (frase.includes(word.toLowerCase()) || frase.includes(word.toUpperCase()) || frase.includes(word[0].toUpperCase() + word.substring(1))) {
            return true
        }
    }
}