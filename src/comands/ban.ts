import { Ibot } from "../interfaces/Ibot";

export async function ban(bot: Ibot, phoneid?: string) {
    const { socket, isGroup, reply, remoteJid, webMessage, isAdmin,isSuperAdmin,imAdmin} = bot
    const { participant } = webMessage.key
  if(!participant){
    return
  }

    if (!isGroup) {
        return reply(`comando só usável em grupos!`)
    }

    if (!phoneid) {
        return reply('marque o numero para banir')
    }
    
    let number = `${phoneid.replace('@', '')}@s.whatsapp.net`
 
    let admin= await isAdmin(participant)
    let superadmin= await isSuperAdmin(number)
    let botadmin= await imAdmin()

    if(!botadmin){
        return reply('preciso ser adm para fazer isso!')
    }

    if(!admin){
        return reply('apenas adms podem usar esse comando!')
    }

    if(superadmin){
        return reply('nao se pode remover o criador do grupo!')
    }

    try {
        await socket.groupParticipantsUpdate(
            remoteJid,
            [number],
            "remove"
        )
    } catch (err) {
        console.log(err)
        return reply('erro ao banir')
    }
}