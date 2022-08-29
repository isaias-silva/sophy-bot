//modules
import { proto } from "@adiwajshing/baileys";
import fs from 'fs'
//interfaces
import { Ibot } from "../interfaces/Ibot";
import { Imenu } from "../interfaces/Imenu";
import { Igroup } from "../interfaces/Igroup";

//exportando as funções do bot
export const getBotfunctions = (socket: any, webMessage: proto.IWebMessageInfo): Ibot => {
    //ids
    const { remoteJid, participant } = webMessage.key
    const botInfo = socket.user

    //group data
    const extractGroupData = async function (): Promise<Igroup> {
        if (!isGroup) {
            return {}
        }
        const data = await socket.groupMetadata(webMessage.key.remoteJid)

        return {
            groupTitle: data.subject,
            groupJid: data.id,
            partipants: data.participants,
            locked: data.announce,
            description:data.desc? data.desc.toString():'grupo anarquista e sem regras!'
        }
    }
    //função que checa se id é de admin
    const isAdmin = async function (id: string) {
        const data = await socket.groupMetadata(webMessage.key.remoteJid)
        const { participants } = data
        let admins = participants.filter((element: any) => element.admin == `admin` || element.admin == `superadmin`)

        return admins.find((element: any) => element.id == id) ? true : false
    }
    //função que checa se id é de superadmin(criador do grupo)
    const isSuperAdmin = async function (id: string) {
        const data = await socket.groupMetadata(webMessage.key.remoteJid)
        const { participants } = data
        let admins = participants.filter((element: any) => element.admin == `superadmin`)

        return admins.find((element: any) => element.id == id) ? true : false
    }
    //função que checa se bot é admin
    const imAdmin = async function () {
        let botid = botInfo.id.split(`:`)
        botid[1] = botid[1].split(`@`)
        const botphone = botid[0] + `@` + botid[1][1]
        const data = await socket.groupMetadata(webMessage.key.remoteJid)
        const { participants } = data

        let admins = participants.filter((element: any) => element.admin == `admin` || element.admin == `superadmin`)

        return admins.find((element: any) => element.id == botphone) ? true : false
    }

    //booleans

    const isImage = webMessage.message?.imageMessage ? true : false //se a webmessage tiver uma imagem
    const isAudio = webMessage.message?.audioMessage ? true : false // se a webmessage tiver um audio
    const isSticker = webMessage.message?.stickerMessage ? true : false //se a webmessage tiver uma figurinha
    const isDocument = webMessage.message?.documentMessage ? true : false// se a webmessage tiver um doc
    const isVideo = webMessage.message?.videoMessage ? true : false //se a webmessage tiver um video
    const isGroup = participant ? true : false //se for grupo
    const isReply = webMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage ? true : false //se for resposta
    const isButtonRes = webMessage.message?.templateButtonReplyMessage ? true : false //se for uma resposta de botão


    //enviar somente texto
    const sendText: Ibot["sendText"] = async (txt: string) => {
        return socket.sendMessage(remoteJid, { text: txt })
    }
    //responder mensagem
    const reply = async (txt: string) => {
        return socket.sendMessage(remoteJid, { text: txt }, { quoted: webMessage })
    }
    //marcar usuario
    const mark = async (txt: string, id: string[], isReply?: boolean) => {
        let options = isReply == true ? { quoted: webMessage } : {}
        return socket.sendMessage(remoteJid, { text: `${txt}`, mentions: id }, options)
    }
    //enviar imagem
    const sendImage = async (pathOrBuffer: Buffer | string, caption?: string, isReply?: boolean) => {
        const image = pathOrBuffer instanceof Buffer ? pathOrBuffer : fs.readFileSync(pathOrBuffer);
        const params = {
            image,
            caption: caption
        }
        let options = isReply == true ? { quoted: webMessage } : {}
        return socket.sendMessage(remoteJid, params, options)
    }
    //enviar sticker
    const sendSticker = async (pathOrBuffer: string | Buffer, isReply?: boolean) => {
        let options = {};

        if (isReply) {
            options = {
                quoted: webMessage,
            };
        }

        const sticker =
            pathOrBuffer instanceof Buffer
                ? pathOrBuffer
                : fs.readFileSync(pathOrBuffer);

        return await socket.sendMessage(remoteJid, { sticker }, options);
    }
    //enviar Audio
    const sendAudio = async (pathOrBuffer: Buffer | string, isReply?: boolean, ptt?: boolean) => {
        const audio = pathOrBuffer instanceof Buffer ? pathOrBuffer : fs.readFileSync(pathOrBuffer);
        const params = {
            audio,
            mimetype: 'audio/mp4',
            ptt

        }
        let options = isReply == true ? { quoted: webMessage } : {}
        return socket.sendMessage(remoteJid, params, options)
    }
    //enviar Video
    const sendVideo = async (pathOrBuffer: string | Buffer, caption?: string, isReply?: boolean) => {
        const video = pathOrBuffer instanceof Buffer ? pathOrBuffer : fs.readFileSync(pathOrBuffer);
        const params = {
            video,
            caption: caption,


        }
        let options = isReply == true ? { quoted: webMessage } : {}
        return socket.sendMessage(remoteJid, params, options)
    }
    //enviar Menu
    const sendmenu = async (templateMessage: Imenu) => {

        return socket.sendMessage(remoteJid, templateMessage)
    }
    //retornando todas as funções
    return {
        sendText,
        reply,
        mark,
        sendImage,
        sendAudio,
        sendmenu,
        sendSticker,
        sendVideo,
        remoteJid,
        participant,
        botInfo,
        isAdmin,
        isSuperAdmin,
        imAdmin,
        extractGroupData,
        isImage,
        isAudio,
        isDocument,
        isSticker,
        isVideo,
        isGroup,
        isReply,
        isButtonRes,
        webMessage,
        socket,


    }

}