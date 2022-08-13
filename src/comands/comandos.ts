import { Ibot } from "../interfaces/Ibot";
import path from "path"
import { data } from "../config/data";
import comandsList from "../config/comandsList";
export async function comandos(bot:Ibot){

    const {sendImage} = bot
    let template = `⚙️ olá me chamo ${data.botname}, seguem todos os meus comandos:\n`
   
    template+=`\n*👑FUNÇÕES ADMIN👑*\n`
    comandsList.filter(x=>x.admin).forEach((value)=>{
        return template+=`\n |✪ *${data.prefix}* ${value.comand}`
    })
    template+='\n'
    template+=`\n🧢*FUNÇÕES MEMBROS*🧢\n`
    comandsList.filter(x=>!x.admin).forEach((value)=>{
        return template+=`\n |✪ *${data.prefix}* ${value.comand}`
    })
    return sendImage(path.resolve(`assets`,`img`,`perfil.webp`),template,true)
}
