import { proto } from "@adiwajshing/baileys";
import { Imenu } from "./Imenu";
//interface do bot
export interface Ibot {
    //enviar apenas texto
    sendText: (txt: string) => Promise<proto.WebMessageInfo>,
    reply: (txt: string) => Promise<proto.WebMessageInfo>,
    mark: (txt: string, id: string) => Promise<proto.WebMessageInfo>,
    //buttons
    sendmenu: (object: Imenu) => Promise<proto.WebMessageInfo>
    //enviar midias
    sendImage: (pathOrBuffer: string | Buffer, caption?: string, isReply?: boolean) => Promise<proto.WebMessageInfo>,
    sendVideo: (pathOrBuffer: string | Buffer, caption?: string, isReply?: boolean) => Promise<proto.WebMessageInfo>,
    sendAudio: (pathOrBuffer: string | Buffer, isReply?: boolean, ptt?: boolean) => Promise<proto.WebMessageInfo>
    //sendDoc: (pathOrBuffer: string | Buffer, caption?: string, isReply?: boolean) => Promise<proto.WebMessageInfo>,
   sendSticker: (pathOrBuffer: string | Buffer, isReply?: boolean) => Promise<proto.WebMessageInfo>

    remoteJid?:string | null
    botInfo: {id:string,name:string}
    //socket
    socket: any;
    //objeto da mensagem
    webMessage: proto.IWebMessageInfo;
    //é imagem?
    isImage: boolean;
    //é vídeo?
    isVideo: boolean;
    //é sticker?
    isSticker: boolean;
    //é audio?
    isAudio: boolean;
    //é documento?
    isDocument: boolean;
    //é grupo?
    isGroup: boolean
    //é reply?
    isReply: boolean
    //é button
    isButtonRes: boolean
}