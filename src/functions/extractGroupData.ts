
import { proto } from "@adiwajshing/baileys";
import { Ibot } from "../interfaces/Ibot";


export async function groupGetData(socket:any,webMessage:proto.IWebMessageInfo){
 
      if(!webMessage.key.participant){
        return {}
      }
    const groupData = await socket.groupMetadata(webMessage.key.remoteJid)
return {
    groupTitle:groupData?.subject,
    groupJid:groupData?.id,
    partipants:groupData?.participants,
    locked:groupData?.announce,
    description: groupData?.desc?.toString()
}
}
