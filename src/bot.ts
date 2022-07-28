//conexão
import { connect } from "./connection";
import { getBotfunctions } from "./functions/botFunction";
import { isComand, searchComand } from "./functions/comand";

//exportando a inicialização do bot
export async function bot() {
    //conectando
    const socket = await connect()
    //socket monitorando evento de messagem recebida
    socket.ev.on('messages.upsert', async (msg) => {
        const [wMessage] = msg.messages
     
        const message = wMessage.message
       const botF= getBotfunctions(socket, wMessage)

        if (!message) {
            return
        }
      
        if (!isComand(message)) {
            return

        }
       

    })
}