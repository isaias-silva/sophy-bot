//modules
import { data } from "./config/data";
import { connect } from "./connection";
import { getBotfunctions } from "./functions/botFunction";
import { caseComand, isComand, searchComand } from "./functions/comand";

//exportando a inicialização do bot
export async function bot() {
    //conectando
    const socket = await connect()
    //socket monitorando evento de messagem recebida
    socket.ev.on('messages.upsert', async (msg) => {
        const [wMessage] = msg.messages
        
        const message = wMessage.message
        const botF = getBotfunctions(socket, wMessage)
        //barreiras
    
        //se message nao existe
        if (!message) {
            return
        }
        if(botF.isButtonRes){
            console.log(message.templateButtonReplyMessage?.selectedId)
        }
        //se message nao tem o prefixo
        if (!isComand(message)) {
          
            return

        }
        //se o comando nao existe
        if (!searchComand(wMessage)) {
           
            return botF.reply(`comando não encontrado! para ver os comandos digite *${data.prefix}menu*`)
        }

        //sem barreiras, comandos seguem apartir daqui
       await caseComand(botF)
    })
}