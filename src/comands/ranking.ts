import { Ibot } from "../interfaces/Ibot";
import path from 'path'
import fs, { readFileSync, writeFileSync } from 'fs'
import { IatributeGroup } from "../interfaces/IatributeGroup";
import { data } from "../config/data";
import { toJsonArrays } from "../functions/importJsonData";
import { Igroup } from "../interfaces/Igroup";

export async function ranking(bot: Ibot) {
    const { isGroup, reply, webMessage, isAdmin, imAdmin, remoteJid, extractGroupData ,mark} = bot
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

    const caminho = path.resolve("cache", "grupos.json")
    try {
        readFileSync(caminho)
    } catch (err) {
        writeFileSync(caminho, JSON.stringify([]))
    }
    const grupos: Igroup[] = JSON.parse(readFileSync(caminho).toString())
    const grupo = grupos.find(value => value.groupJid == remoteJid)
    if (!grupo) {
        return reply('não consegui extrair, consultem o zack.')
    }
    const { partipants } = grupo
    if (!partipants) {
        return reply('não consegui extrair, consultem o zack.')

    }

    const template = `🏆ranking dos membros do grupo *${grupo.groupTitle}*🏆\n\n`
    const member: string = partipants.sort((a, b) => {
        return b.count - a.count;
    }).map((value, i) => {
        return `${i} -  @${value.id.split('@')[0]}: ${value.count} mensagens`
    }).toString().replace(/\,/g, '\n')

    const message = template.concat(member).concat('\n\n vamos todos participar! pra tirar o campeão do topo! \n\n\n\n\n e pra moita eu só digo uma coisa...\n 💀você vai levar ban antes do natal💀')
   const marks= partipants.sort((a, b) => {
    return b.count - a.count;
}).map(value=>value.id)
    return mark(message,marks,true)
}