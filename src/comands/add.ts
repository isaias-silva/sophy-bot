import { Ibot } from "../interfaces/Ibot";
import { Igroup } from "../interfaces/Igroup";

export async function add(bot: Ibot, number?: string) {
    const { isGroup, reply, webMessage, isAdmin, imAdmin, socket, remoteJid,extractGroupData } = bot
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
    if (!number || number.match(/[a-zA-Z\u00C0-\u00FF ]+/i)) {
        return reply("escreva o comando com o numero! \n ex *5599999999*")
    }
   const data:Igroup=await extractGroupData()
   if(!data){
    return reply("erro ao extrair dados do grupo")
   }
   const {partipants}=data
  const exists=partipants?.find((alvo)=>{
    let numberalvo=alvo.id.split('@')[0]
    return numberalvo==number;
})
    if(exists){
        return reply("já está no grupo!")
    }
    let formatedNumber = `${number}@s.whatsapp.net`
    try {
        await socket.groupParticipantsUpdate(
            remoteJid,
            [formatedNumber],
            "add"
        )
        reply("adicionado com sucesso!\n")
    } catch {
        return reply("poxa nao consegui adicionar :(")
    }
}