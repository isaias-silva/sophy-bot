//modules
import path from 'path'
import { data } from "./config/data";
import { connect } from "./connection";
import { getBotfunctions } from "./functions/botFunction";
import { toJsonArrays } from './functions/importJsonData';

import { isLink } from "./functions/isLink";
//funções de tratamento de comandos
import { caseComand, isComand, searchComand } from "./functions/treatComand";

//exportando a inicialização do bot
export async function bot() {
    //conectando
    const socket = await connect()
    //socket monitorando evento de messagem recebida
    socket.ev.on('messages.upsert', async (msg) => {
        
        //extraindo mensagem
        const [wMessage] = msg.messages
        const message = wMessage.message
        //barreiras
        //se message nao existe
        if (!message) {
            return
        }
        const botF =  getBotfunctions(socket, wMessage)
        const {reply,isAdmin,participant,remoteJid}=botF
        if(participant){
         const caminho=path.resolve("cache","antilink.json")
         const isAntilink=toJsonArrays(caminho).find(element=>element.id==wMessage.key.remoteJid)
         if(isAntilink){
            if(isLink(message)){
                const isAdm=await isAdmin(participant)
                if(!isAdm){
                reply(`eu já avisei:\n*proibido link no grupo!* olha o ban chegando..🗡️🗡️🗡️`)
                if(!remoteJid){ return}
               return setTimeout(async()=>{
                    await socket.groupParticipantsUpdate(
                        remoteJid,
                        [participant],
                        "remove"
                    )
                    return reply(`😊 espero que não sigam o exemplo aí em cima e sigam as regras`);
                },3000)
              
                    
                   
                }
                return reply(`adm mandou link, mas nao vou remover porque sou contra a revolta das máquinas💆`)
            }
         }

        }
        //se message nao tem o prefixo
        if (!isComand(message)) {
            return
        }
      
        //se o comando nao existe
     
        if (!searchComand(wMessage)) {
            
            return reply(`comando não encontrado! para ver os comandos digite *${data.prefix}comandos*`)
        }
        //sem barreiras, comandos seguem apartir daqui
       await caseComand(botF)
    })
}