import { Ibot } from "../interfaces/Ibot";
import path from "path"
import { data } from "../config/data";
import comandsList from "../config/comandsList";
export async function comandos(bot:Ibot){

    const {sendImage} = bot
    let template = `
    olá me chamo ${data.botname}, seguem todos os meus comandos: \n
    `
    comandsList.forEach((value)=>{
        return template+=`\n |✪ *${data.prefix} ${value}*`
    })

   return sendImage(path.resolve(`assets`,`img`,`perfil.webp`),template,true)
}
