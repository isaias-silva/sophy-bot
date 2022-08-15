import { Ibot } from "../interfaces/Ibot";
import path from 'path'
import fs from 'fs'
import { IatributeGroup } from "../interfaces/IatributeGroup";
import { data } from "../config/data";
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
   
       
    const caminho=path.resolve(`cache`,`antilink.json`)
   
   switch(param){
    case `on`:
        let obj={
            id:remoteJid,
            ative:true
        }
        try{
        fs.readFileSync(caminho)}
        catch{
        fs.writeFileSync(caminho,JSON.stringify([]))
        }
        const list=fs.readFileSync(caminho).toString()
        const dataa:IatributeGroup[]=JSON.parse(list)
        const exist=dataa.find(element => element.id == obj.id)
       if(exist){
        return reply(`já ativado!`)
       }
        dataa.push(obj)
        console.log(dataa)
        fs.writeFileSync(caminho,JSON.stringify(dataa))
        return reply(`antilink ativado!`)
    case `off`:
        try{
            fs.readFileSync(caminho)}
            catch{
            fs.writeFileSync(caminho,JSON.stringify([]))
            }
            const lista=fs.readFileSync(caminho).toString()
            const array:IatributeGroup[]=JSON.parse(lista)
           const groupExists= array.find(element=>element.id==remoteJid)
           if(!groupExists){
            return reply(`antilink nao foi ativado aqui, para ativar digite *${data.prefix}antilink on*`)
           }
           array.splice(array.indexOf(groupExists),1)
           fs.writeFileSync(caminho,JSON.stringify(array))
           return reply(`antilink desativado`)
    break
    default:
        return reply(" use on/off para ativar")
  
   }
    
}