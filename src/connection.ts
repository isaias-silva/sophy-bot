import makeWaSocket, {
  DisconnectReason,
  makeWASocket,
  useMultiFileAuthState,
} from "@whiskeysockets/baileys";


import { Boom } from "@hapi/boom";
import * as path from "path";
import NodeCache from "node-cache";

export const connect = async () => {

  const { state, saveCreds } = await useMultiFileAuthState(
    path.resolve("cache", `auth`)
  );


  const msgRetryCounterCache = new NodeCache()


  const socket = makeWASocket({
    qrTimeout: 30000,
    auth: state,
    
    defaultQueryTimeoutMs: 20000,
    printQRInTerminal: true,
    msgRetryCounterCache,
    version: [2, 2323, 4],

  })


  socket.ev.on("connection.update", async (action: any) => {
    const update = action;
    const { connection, lastDisconnect } = update;

   
    if (connection === "close") {
     
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
