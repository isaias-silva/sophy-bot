
import { proto } from "@adiwajshing/baileys";
import { Ibot } from "../interfaces/Ibot";


export async function groupGetData(socket:any,webMessage:proto.IWebMessageInfo){
 
      if(!webMessage.key.participant){
        return {}
      }
    const groupData = await socket.groupMetadata(webMessage.key.remoteJid)
return {
    isAdmin: function(id:string){
     let admins= this.partipants.filter((element:any)=>element.admin==`admin` || element.admin==`superadmin` )
     console.log(this.partipants)
    return admins.find((element:any)=>element.id==id)?true:false
    }, 
    isSuperAdmin: function(id:string){
      let admins= this.partipants.filter((element:any)=> element.admin==`superadmin` )
      console.log(this.partipants)
     return admins.find((element:any)=>element.id==id)?true:false
     },
    groupTitle:groupData?.subject,
    groupJid:groupData?.id,
    partipants:groupData?.participants,
    locked:groupData?.announce,
    description: groupData?.desc?.toString()
}
}
