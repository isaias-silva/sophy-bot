import { data } from "../config/data";
import { Ibot } from "../interfaces/Ibot";

export function sticker(bot:Ibot){
    const {isImage,webMessage,isReply,sendSticker,reply}=bot
    if(!isImage){
        if(!isReply){
        return reply(`para converter como figurinha \n envie uma imagem com o comando ${data.prefix}sticker`)
        }
        return reply(`é reply vou procurar a imagem`)
    }
}