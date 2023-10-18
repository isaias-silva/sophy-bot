import { Ibot } from "../interfaces/Ibot";
import path from "path"
import { data } from "../config/data";
import comandsList from "../config/comandsList";
import { readFileSync } from "fs";
export async function comandos(bot: Ibot) {

    const { sendImage } = bot
    let template = `olá me chamo ${data.botname}, agora com upgrades\n estou bem mais forte!\n seguem todos os meus comandos:\n`

    template += `\n*👑FUNÇÕES ADMIN👑* \n___________________\n`

    comandsList.filter(x => x.admin).forEach((value) => {
        return template += `\n |✪ *${data.prefix}* ${value.comand}`
    })
    template += '\n'
    template += `\n🧢*FUNÇÕES MEMBROS*🧢 \n___________________________\n`
    comandsList.filter(x => !x.admin).forEach((value) => {
        return template += `\n |✪ *${data.prefix}* ${value.comand}`
    })
    const buff = readFileSync(path.resolve(`assets`, `img`, `profile.jpg`))
    return sendImage(buff, template, true)
}
