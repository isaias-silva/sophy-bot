import { proto } from "@adiwajshing/baileys";
import { Ibot } from "../interfaces/Ibot";
import fs from 'fs'
//exportando as funções do bot
export const getBotfunctions = (socket: any, webMessage: proto.IWebMessageInfo) => {
    //id do chat onde foi enviada a messangem
    const { remoteJid } = webMessage.key
    //enviar somente texto
    const sendText: Ibot["sendText"] = async (txt: string) => {
        return socket.sendMessage(remoteJid, { text: txt })
    }
    //responder mensagem
    const reply: Ibot["reply"] = async (txt: string) => {
        return socket.sendMessage(remoteJid, { text: txt }, { quoted: webMessage })
    }
    //marcar usuario
    const mark: Ibot["mark"] = async (txt: string, id: string) => {
        return socket.sendMessage(remoteJid, { text: `@${id.split(`@`)[0]}, ${txt}`, mentions: [id] })
    }
    const sendImage: Ibot["sendImage"] = async (pathOrBuffer: Buffer | string, caption?: string, isReply?: boolean) => {
        const image = pathOrBuffer instanceof Buffer ? pathOrBuffer : fs.readFileSync(pathOrBuffer);
        const params = {
            image,
            caption: caption
        }
        let options = isReply == true ? { quoted: webMessage } : {}
        return socket.sendMessage(remoteJid, params, options)
    }
    return {
        sendText,
        reply,
        mark,
        sendImage,
        remoteJid,

    }

}