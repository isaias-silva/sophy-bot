//conexão
import { connect } from "./connection";
import { getBotfunctions } from "./functions/botFunction";
import path from 'path'
//exportando a inicialização do bot
export async function bot() {
    //conectando
    const socket = await connect()
    //socket monitorando evento de messagem recebida
    socket.ev.on('messages.upsert', async (msg) => {
        const [wMessage] = msg.messages
     
        const message = wMessage.message?.conversation
        const botF = getBotfunctions(socket, wMessage)

        if (message == "hello") {
           
        }
    })
}