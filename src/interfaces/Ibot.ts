import { proto } from "@adiwajshing/baileys";
//interface do bot
export interface Ibot {
    //enviar apenas texto
    sendText: (txt: string) => Promise<proto.WebMessageInfo>,
    reply: (txt: string) => Promise<proto.WebMessageInfo>,
    mark: (txt: string, id:any ) => Promise<proto.WebMessageInfo>,

    //enviar midias
    sendImage: (pathOrBuffer: string | Buffer, caption?: string, isReply?: boolean) => Promise<proto.WebMessageInfo>,
    sendVideo: (pathOrBuffer: string | Buffer, caption?: string, isReply?: boolean) => Promise<proto.WebMessageInfo>,
    sendAudio: (pathOrBuffer: string | Buffer, caption?: string, isReply?: boolean) => Promise<proto.WebMessageInfo>
    sendDoc: (pathOrBuffer: string | Buffer, caption?: string, isReply?: boolean) => Promise<proto.WebMessageInfo>,
    sendSticker: (pathOrBuffer: string | Buffer, caption?: string, isReply?: boolean) => Promise<proto.WebMessageInfo>

    //socket
    socket: any;
    //id da mensagem
    remoteJid: string;
    //id que marca
    replyJid: string;
    //seu id
    userJid: string;
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
    //comand
}