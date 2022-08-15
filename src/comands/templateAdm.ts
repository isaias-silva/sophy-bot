import { Ibot } from "../interfaces/Ibot";

export async function funcao(bot: Ibot) {
    const {isGroup, reply, webMessage, isAdmin, imAdmin } = bot
    const { participant } = webMessage.key
 
    if (!participant || !isGroup) {
        return
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

 
}