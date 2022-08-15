import { Ibot } from "../interfaces/Ibot";
import path from 'path'
import fs from 'fs'
import { IatributeGroup } from "../interfaces/IatributeGroup";
import { data } from "../config/data";
import { antiLinkgroups } from "../functions/importJsonData";
export async function antiLink(bot: Ibot, param: string) {
    const { isGroup, reply, webMessage, isAdmin, imAdmin,remoteJid } = bot
    const { participant } = webMessage.key

    if (!participant || !isGroup) {
        return reply('comando apenas para grupos')
    }

    let admin = await isAdmin(participant)
    let botadmin = await imAdmin()

    if (!botadmin) {
        return reply('preciso ser adm para fazer isso!')
    }

    if (!admin) {
        return reply('apenas adms podem usar esse comando!')
    }
    if (!param) {
        return reply("use on/off para ativar");
    }
    const list:IatributeGroup[]=antiLinkgroups()
   switch(param){
    case `on`:
        let obj={
            id:remoteJid,
            ative:true
        }
       
      
        const exist=list.find(element => element.id == obj.id)
       if(exist){
        return reply(`já ativado!`)
       }
        list.push(obj)
        fs.writeFileSync(path.resolve(`cache`,`antilink.json`),JSON.stringify(list))
        return reply(`antilink ativado!`)
    case `off`:
       
           const groupExists= list.find(element=>element.id==remoteJid)
           if(!groupExists){
            return reply(`antilink nao foi ativado aqui, para ativar digite *${data.prefix}antilink on*`)
           }
           list.splice(list.indexOf(groupExists),1)
           fs.writeFileSync(path.resolve(`cache`,`antilink.json`),JSON.stringify(list))
           return reply(`antilink desativado`)
    break
    default:
        return reply(" use on/off para ativar")
  
   }
    
}