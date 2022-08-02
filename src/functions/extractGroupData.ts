
import { proto } from "@adiwajshing/baileys";



export async function groupGetData(socket:any,webMessage:proto.IWebMessageInfo){
 
      if(!webMessage.key.participant){
        return {}
      }
     let fragmentPhoneBot = (socket.user.id).split(`:`)
      fragmentPhoneBot[1]=fragmentPhoneBot[1].split(`@`)
      const botphone =fragmentPhoneBot[0]+`@`+fragmentPhoneBot[1][1]
    const groupData = await socket.groupMetadata(webMessage.key.remoteJid)
return {
    isAdmin: function(id:string){
     let admins= this.partipants.filter((element:any)=>element.admin==`admin` || element.admin==`superadmin` )
   
    return admins.find((element:any)=>element.id==id)?true:false
    }, 
    isSuperAdmin: function(id:string){
      let admins= this.partipants.filter((element:any)=> element.admin==`superadmin` )
     
     return admins.find((element:any)=>element.id==id)?true:false
     },
     imAdmin: function(){
      let admins= this.partipants.filter((element:any)=> element.admin==`admin` )
      return admins.find((element:any)=>element.id==botphone)?true:false
     },
    groupTitle:groupData?.subject,
    groupJid:groupData?.id,
    partipants:groupData?.participants,
    locked:groupData?.announce,
    description: groupData?.desc?.toString()
}
}
