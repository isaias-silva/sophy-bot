import { Ibot } from "../interfaces/Ibot";
import fs from 'fs'
export async function funcao(bot: Ibot, param: string) {
    const { isGroup, reply, webMessage, isAdmin, imAdmin } = bot
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
    if (!param) {
        return reply("use on/off para ativar");
    }
    if (param != 'on' && param != 'off'){
        return reply(" use on/off para ativar")
    }
    //função:
    
}