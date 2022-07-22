import { proto } from "@adiwajshing/baileys";
import { Ibot } from "../interfaces/Ibot";
export const getBotfunctions = (socket: any, webMessage: proto.IWebMessageInfo) => {
    const { remoteJid } = webMessage.key
    const sendText: Ibot["sendText"] = async (txt: string) => {
        return socket.sendMessage(remoteJid, { text: txt })
    }
    const reply: Ibot["reply"] = async (txt: string) => {
        return socket.sendMessage(remoteJid, { text: txt }, { quoted: webMessage })
    }


    return {
        sendText,
        reply,
    }

}