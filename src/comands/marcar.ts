import { Ibot } from "../interfaces/Ibot";
import { Igroup } from "../interfaces/Igroup";

export async function marcar(bot: Ibot) {
    const { isGroup, reply, webMessage, isAdmin, imAdmin, extractGroupData, mark } = bot
    const { participant } = webMessage.key

    if (!participant || !isGroup) {
        return reply(`marcar oque? não estamos em um grupo!`)
    }

    let admin = await isAdmin(participant)
    let botadmin = await imAdmin()

    if (!botadmin) {
        return reply('preciso ser adm para fazer isso!')
    }

    if (!admin) {
        return reply('apenas adms podem usar esse comando!')
    }
    //função:
    const groupdata: Igroup = await extractGroupData()
    let tempalte = `🚨CHAMANDO TODOS OS MEMBROS! BORA PARTICIPAR!🚨\n\n`
    groupdata.partipants?.forEach((x) => {
        tempalte += `@${x.id.split('@')[0]}\n`
    })
    const ids = groupdata.partipants?.map((x) => { return x.id })
    if (ids)
        return mark(tempalte, ids, true)
}