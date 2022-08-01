import { Ibot } from "../interfaces/Ibot";
import path from "path"
import { data } from "../config/data";
import comandsList from "../config/comandsList";
export async function menu(bot:Ibot){

    const {sendImage} = bot
    let template = `
    olá me chamo ${data.botname}, seguem os meus comandos: \n
    `
    comandsList.forEach((value)=>{
        return template+=`\n |✪ *${data.prefix} ${value}*`
    })

   return sendImage(path.resolve(`assets`,`img`,`perfil.png`),template,true)
}
