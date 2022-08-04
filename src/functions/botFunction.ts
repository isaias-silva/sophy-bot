import { proto } from "@adiwajshing/baileys";
import { Ibot } from "../interfaces/Ibot";
import fs from 'fs'
import { Imenu } from "../interfaces/Imenu";
import { Igroup } from "../interfaces/Igroup";

//exportando as funções do bot
export const getBotfunctions = (socket: any, webMessage: proto.IWebMessageInfo): Ibot => {
    //ids
    const { remoteJid, participant } = webMessage.key
    const botInfo=socket.user
  
    //group data
      const  extractGroupData=async function ():Promise<Igroup> {
        if(!isGroup){
            return {}
        }
        const data=await socket.groupMetadata(webMessage.key.remoteJid)
        
        return {
            groupTitle:data.subject,
            groupJid:data.id,
            partipants:data.participants,
            locked:data.announce,
            description: data.desc.toString()
        }
      }
     const isAdmin= async function(id:string){
          const data=await socket.groupMetadata(webMessage.key.remoteJid)
            const {participants}=data
         let admins= participants.filter((element:any)=>element.admin==`admin` || element.admin==`superadmin` )
     
      return admins.find((element:any)=>element.id==id)?true:false
     }
      const isSuperAdmin= async function(id:string){
        const data=await socket.groupMetadata(webMessage.key.remoteJid)
        const {participants}=data
        let admins= participants.filter((element:any)=> element.admin==`superadmin` )
       
       return admins.find((element:any)=>element.id==id)?true:false
       }
    const imAdmin= async function () {
        let botid=botInfo.id.split(`:`)
      botid[1]=botid[1].split(`@`)
      const botphone =botid[0]+`@`+botid[1][1]
        const data=await socket.groupMetadata(webMessage.key.remoteJid)
        const {participants}=data
        console.log(botphone)
        let admins= participants.filter((element:any)=> element.admin==`admin` || element.admin==`superadmin` )
       
       return admins.find((element:any)=>element.id==botphone)?true:false   
    }
      
    //booleans

    const isImage = webMessage.message?.imageMessage ? true : false
    const isAudio = webMessage.message?.audioMessage ? true : false
    const isSticker = webMessage.message?.stickerMessage ? true : false
    const isDocument = webMessage.message?.documentMessage ? true : false
    const isVideo = webMessage.message?.videoMessage ? true : false
    const isGroup = participant ? true : false
const isReply= webMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage? true: false
const isButtonRes=webMessage.message?.templateButtonReplyMessage?true:false
   

//enviar somente texto
    const sendText: Ibot["sendText"] = async (txt: string) => {
        return socket.sendMessage(remoteJid, { text: txt })
    }
    //responder mensagem
    const reply = async (txt: string) => {
        return socket.sendMessage(remoteJid, { text: txt }, { quoted: webMessage })
    }
    //marcar usuario
    const mark = async (txt: string, id: string) => {
        return socket.sendMessage(remoteJid, { text: `@${id.split(`@`)[0]}, ${txt}`, mentions: [id] })
    }
    const sendImage = async (pathOrBuffer: Buffer | string, caption?: string, isReply?: boolean) => {
        const image = pathOrBuffer instanceof Buffer ? pathOrBuffer : fs.readFileSync(pathOrBuffer);
        const params = {
            image,
            caption: caption
        }
        let options = isReply == true ? { quoted: webMessage } : {}
        return socket.sendMessage(remoteJid, params, options)
    }
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
    const sendVideo = async (pathOrBuffer: string | Buffer, caption?: string, isReply?: boolean) => {
        const video = pathOrBuffer instanceof Buffer ? pathOrBuffer : fs.readFileSync(pathOrBuffer);
        const params = {
            video,
            caption: caption,


        }
        let options = isReply == true ? { quoted: webMessage } : {}
        return socket.sendMessage(remoteJid, params, options)
    }

    const sendmenu = async (templateMessage: Imenu) => {

        return socket.sendMessage(remoteJid, templateMessage)
    }

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