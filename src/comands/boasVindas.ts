import { Ibot } from "../interfaces/Ibot";
import path from 'path'
import fs from 'fs'
import { IatributeGroup } from "../interfaces/IatributeGroup";
import { data } from "../config/data";
import { toJsonArrays } from "../functions/importJsonData";

export async function boasVindas(bot: Ibot, param: string) {
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
    const caminho=path.resolve("cache","boasvindas.json")
    const list:IatributeGroup[]=toJsonArrays(caminho)
   switch(param){
    case `on`:
        let obj={
            id:remoteJid,
            ative:true
        }
       
      
        const exist=list.find(element => element.id == obj.id)
       if(exist){
        if(exist.ative){
        return reply(`já ativado!`)
        }else{
            list.map((item)=>{if(item.id==remoteJid){
                item.ative=true
            }})
        }
       }else{
       
        list.push(obj)}
        fs.writeFileSync(path.resolve(`cache`,`boasvindas.json`),JSON.stringify(list))
        return reply(`boas vindas ativado!`)
    case `off`:
       
           const groupExists= list.find(element=>element.id==remoteJid && element.ative==false)
           if(groupExists){
            return reply(`boasvindas foi desativado aqui, para reativar digite *${data.prefix}boasvindas on*`)
           }
           list.map((item)=>{if(item.id===remoteJid){item.ative=false}})
           fs.writeFileSync(path.resolve(`cache`,`boasvindas.json`),JSON.stringify(list))
           return reply(`boasvindas desativado`)
   
    default:
        return reply(" use on/off para ativar")
  
   }
    
}