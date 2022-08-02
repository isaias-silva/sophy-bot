
import { Ibot } from "../interfaces/Ibot";

export async function groupData(socket:any, bot:Ibot){
    if(bot.isGroup){
        const id=bot.remoteJid
    const groupData = await socket.groupMetadata(id)
return {
    groupTitle:groupData.subject,
    groupJid:groupData.id,
    partipants:groupData.participants,
    locked:groupData.announce,
    description: groupData.desc.toString()
}
}
}