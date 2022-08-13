//proto
import { proto } from "@adiwajshing/baileys";
//interfaces
import { Igroup } from "./Igroup";
import { Imenu } from "./Imenu";

//interface do bot
export interface Ibot {
    botInfo: { id: string, name: string }
    //enviar apenas texto
    sendText: (txt: string) => Promise<proto.WebMessageInfo>,
    reply: (txt: string) => Promise<proto.WebMessageInfo>,
    mark: (txt: string, id: string[], isReply?: boolean) => Promise<proto.WebMessageInfo>,
    //buttons
    sendmenu: (object: Imenu) => Promise<proto.WebMessageInfo>
    //enviar midias
    sendImage: (pathOrBuffer: string | Buffer, caption?: string, isReply?: boolean) => Promise<proto.WebMessageInfo>,
    sendVideo: (pathOrBuffer: string | Buffer, caption?: string, isReply?: boolean) => Promise<proto.WebMessageInfo>,
    sendAudio: (pathOrBuffer: string | Buffer, isReply?: boolean, ptt?: boolean) => Promise<proto.WebMessageInfo>
    sendSticker: (pathOrBuffer: string | Buffer, isReply?: boolean) => Promise<proto.WebMessageInfo>

    remoteJid?: string | null
    participant?: string | null
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
    //group props
    extractGroupData: () => Promise<Igroup> | {}
    isAdmin: (id: string) => Promise<boolean>
    isSuperAdmin: (id: string) => Promise<boolean>
    imAdmin: () => Promise<boolean>
}