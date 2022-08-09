import { Ibot } from "../interfaces/Ibot";
import { Igroup } from "../interfaces/Igroup";

export async function ban(bot: Ibot, phoneid?: string) {
    const { socket, isGroup, isReply, reply, remoteJid, webMessage, isAdmin, isSuperAdmin, imAdmin,extractGroupData } = bot
    const { participant } = webMessage.key
    const phonemark = webMessage.message?.extendedTextMessage?.contextInfo?.participant


    if (!isGroup || !participant) {
        return reply(`comando só usável em grupos!`)
    }


    let number = isReply ? phonemark : `${phoneid?.replace('@', '')}@s.whatsapp.net`
    if (!number) {
        return
    }
    let admin = await isAdmin(participant)
    let superadmin = await isSuperAdmin(number)
    let botadmin = await imAdmin()

    if (!botadmin) {
        return reply('preciso ser adm para fazer isso!')
    }

    if (!admin) {
        return reply('apenas adms podem usar esse comando!')
    }

    if (superadmin) {
        return reply('nao se pode remover o criador do grupo!')
    }
    const group:Igroup=await extractGroupData()
    if(!group){
        return
    }
    const {partipants}=group
    const exists=partipants?.find(element => element.id ==number)
    if(!exists){
        return reply(`user nao existe ou já foi removido`)
    }
    try {
        await reply('removendo...')
        setTimeout(async () => {

            await socket.groupParticipantsUpdate(
                remoteJid,
                [number],
                "remove"
            )
        }, 3000);
        return setTimeout(async () => {
            await reply('alvo removido com sucesso! ⚔️')

        }, 4000)
    } catch (err) {
        console.log(err)
        return reply('erro ao banir')
    }
}