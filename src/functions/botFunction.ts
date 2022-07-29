import { proto } from "@adiwajshing/baileys";
import { Ibot } from "../interfaces/Ibot";
import fs from 'fs'
import { Imenu } from "../interfaces/Imenu";
//exportando as funções do bot
export const getBotfunctions= (socket: any, webMessage: proto.IWebMessageInfo):Ibot => {
    //ids
    const { remoteJid } = webMessage.key

    //booleans
    const isImage= webMessage.message?.imageMessage ? true : false
    const isAudio= webMessage.message?.audioMessage ? true : false
    const isSticker = webMessage.message?.stickerMessage ? true : false
    const isDocument = webMessage.message?.documentMessage ? true : false
    const isVideo = webMessage.message?.videoMessage ? true : false
    const isGroup = webMessage.key.participant ? true : false
    
    //enviar somente texto
    const sendText: Ibot["sendText"] = async (txt: string) => {
        return socket.sendMessage(remoteJid, { text: txt })
    }
    //responder mensagem
    const reply= async (txt: string) => {
        return socket.sendMessage(remoteJid, { text: txt }, { quoted: webMessage })
    }
    //marcar usuario
    const mark= async (txt: string, id: string) => {
        return socket.sendMessage(remoteJid, { text: `@${id.split(`@`)[0]}, ${txt}`, mentions: [id] })
    }
    const sendImage= async (pathOrBuffer: Buffer | string, caption?: string, isReply?: boolean) => {
        const image = pathOrBuffer instanceof Buffer ? pathOrBuffer : fs.readFileSync(pathOrBuffer);
        const params = {
            image,
            caption: caption
        }
        let options = isReply == true ? { quoted: webMessage } : {}
        return socket.sendMessage(remoteJid, params, options)
    }
    const sendAudio= async (pathOrBuffer: Buffer | string, isReply?: boolean, ptt?: boolean) => {
        const audio = pathOrBuffer instanceof Buffer ? pathOrBuffer : fs.readFileSync(pathOrBuffer);
        const params = {
            audio,
            mimetype: 'audio/mp4',
            ptt

        }
        let options = isReply == true ? { quoted: webMessage } : {}
        return socket.sendMessage(remoteJid, params, options)
    }
    const sendmenu= async (object: Imenu) => {

        return socket.sendMessage(remoteJid, object)
    }
    return {
        sendText,
        reply,
        mark,
        sendImage,
        sendAudio,
        sendmenu,
        remoteJid,
        isImage,
        isAudio,
        isDocument,
        isSticker,
        isVideo,
        isGroup,
        webMessage,
        socket,


    }

}