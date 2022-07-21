//conexão
import { connect } from "./connection";

//exportando a inicialização do bot
export async function bot() {
    //conectando
    const socket = await connect()
    //socket monitorando evento de messagem recebida
    socket.ev.on('messages.upsert', async (msg) => {
        const [wMessage] = msg.messages
        console.log(`messagem recebida: ${wMessage.message?.conversation}`)

    })
}