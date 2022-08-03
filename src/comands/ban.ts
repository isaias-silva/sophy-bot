import { Ibot } from "../interfaces/Ibot";

export async function ban(bot:Ibot,phoneid:string){
    const {socket,isGroup,reply,remoteJid,webMessage}=bot
   if(!isGroup){
    return reply(`comando só usável em grupos!`)
   }
   return socket.groupParticipantsUpdate(
        remoteJid, 
        ["efgh@s.whatsapp.net"],
        "remove"
    )   
}