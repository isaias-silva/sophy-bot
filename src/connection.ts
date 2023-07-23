import makeWaSocket,{
  DisconnectReason,
  makeWASocket,
  useMultiFileAuthState,
} from "@whiskeysockets/baileys";


import { Boom } from "@hapi/boom";
import path from "path";

export const connect =async () => {
  
  const { state, saveCreds } = await useMultiFileAuthState(
    path.resolve( "cache", `auth`)
  );
  //antiloop

  //construção do socket de eventos do whatsapp
  const socket = makeWASocket({
    qrTimeout: 20000,
    auth: state,
    defaultQueryTimeoutMs: undefined,
    printQRInTerminal: true
  });
  socket.ev.on("connection.update", async (action: any) => {
    const update = action;
    const { connection, lastDisconnect } = update;

    //se a conexão estiver fechada
    if (connection === "close") {
      //altera status do bot
  
      const statusCode = (lastDisconnect?.error as Boom)?.output?.statusCode;
      const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) {
        await connect();
      }
      
    }
  
  });


  socket.ev.on("creds.update", async () => {
    await saveCreds();
  });
  return socket;
};
