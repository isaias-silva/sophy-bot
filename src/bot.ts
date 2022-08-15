//modules
import { data } from "./config/data";
import { connect } from "./connection";
import { getBotfunctions } from "./functions/botFunction";
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
        
        if(wMessage.key.participant){
            
        }
        //se message nao tem o prefixo
        if (!isComand(message)) {
            return
        }
        //buscando funções do bot
        const botF =  getBotfunctions(socket, wMessage)
        const {reply}=botF
        //se o comando nao existe
     
        if (!searchComand(wMessage)) {
            
            return reply(`comando não encontrado! para ver os comandos digite *${data.prefix}comandos*`)
        }
        //sem barreiras, comandos seguem apartir daqui
       await caseComand(botF)
    })
}