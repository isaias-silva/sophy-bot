import { toJsonArrays } from "../functions/importJsonData";
import { Ibot } from "../interfaces/Ibot";
import { Igroup } from "../interfaces/Igroup"
export async function regras(bot: Ibot) {
    const { extractGroupData, isGroup, reply, webMessage, isAdmin, imAdmin } = bot
    const { participant } = webMessage.key

    if (!participant || !isGroup) {
        return reply(`regras de que? não estamos em um grupo!`)
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
    try{
    const data: Igroup = await extractGroupData()

    return reply(`${data.groupTitle}
    ${data.description}
    `)
    }catch{
    
    return reply(`grupo Anarquísta sem regras... fazer oque?😗`)
   }

    
}