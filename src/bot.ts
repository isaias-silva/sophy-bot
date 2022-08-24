//modules
import fs from 'fs'
import path from 'path'
import { data } from "./config/data";
import { connect } from "./connection";
import { getBotfunctions } from "./functions/botFunction";
import downloadAxios from './functions/downloadAxios';
import extractAreaCode from './functions/extractAreaCode';
import { toJsonArrays } from './functions/importJsonData';

import { isLink } from "./functions/isLink";
import isVendas from './functions/isVendas';
//funções de tratamento de comandos
import { caseComand, isComand, searchComand } from "./functions/treatComand";

//exportando a inicialização do bot
export async function bot() {
    //conectando
    const socket = await connect()
    //novos participantes
    socket.ev.on('group-participants.update', async (data) => {
        const { action, id, participants } = data
        if (action != 'add' && action != 'remove') {
            return
        }
        if (action === 'add') {
            const [participant] = participants
            let numberParticipant = participant.split("@")[0]
            console.log(numberParticipant)
            const caminhoAntf = path.resolve("cache", "antifake.json")
            const isAntiFake = toJsonArrays(caminhoAntf).find(element => element.id == id && element.ative === true)
            if (isAntiFake) {
                let areacode = extractAreaCode(numberParticipant)
                if (areacode != '55') {
                    return setTimeout(async () => {
                        await socket.groupParticipantsUpdate(id, participants, "remove")
                        await socket.sendMessage(id, { text: 'aqui é proibido fake! capiche?' })
                    }, 2000)

                }
            }
            const caminhoBoas = path.resolve("cache", "boasvindas.json")

            const isGroupBemvindo = toJsonArrays(caminhoBoas).find(element => element.id == id && element.ative === true)
            if (!isGroupBemvindo) {
                return
            }

            const imageUrl = await socket.profilePictureUrl(participant, "image")
            if (imageUrl) {
                const image = await downloadAxios(imageUrl, "png")

                await socket.sendMessage(id, { image: { url: image }, caption: `seja bem vindo(a) @${numberParticipant}, siga as regras e divirta-se!`, mentions: participants })
                return fs.unlinkSync(image)
            }

            return socket.sendMessage(id, { text: `seja bem vindo(a) @${numberParticipant}, siga as regras e divirta-se!`, mentions: participants })
        }
    })
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
        const botF = getBotfunctions(socket, wMessage)
        const { reply, isAdmin, participant, remoteJid } = botF
        if (participant) {

            //
            const caminhoLinks = path.resolve("cache", "antilink.json")
            const caminhoVendas = path.resolve("cache", "antivendas.json")
            const isAntilink = toJsonArrays(caminhoLinks).find(element => element.id == wMessage.key.remoteJid && element.ative === true)
            const isAntivendas = toJsonArrays(caminhoVendas).find(element => element.id == wMessage.key.remoteJid && element.ative === true)
            if (isAntivendas) {
                if (isVendas(message)) {
                    const isAdm = await isAdmin(participant)
                    if (!isAdm) {
                        reply(`eu já avisei:\n*aqui não é feira! olha o ban chegando..🗡️🗡️🗡️`)
                        if (!remoteJid) { return }
                        return setTimeout(async () => {
                            await socket.groupParticipantsUpdate(
                                remoteJid,
                                [participant],
                                "remove"
                            )
                            return reply(`😊 espero que não sigam o exemplo aí em cima e sigam as regras`);
                        }, 2000)



                    }
                    return reply(`adm está a vender algo? 💆`)
                }


            }
            if (isAntilink) {
                if (isLink(message)) {
                    const isAdm = await isAdmin(participant)
                    if (!isAdm) {
                        reply(`eu já avisei:\n*proibido link no grupo!* olha o ban chegando..🗡️🗡️🗡️`)
                        if (!remoteJid) { return }
                        return setTimeout(async () => {
                            await socket.groupParticipantsUpdate(
                                remoteJid,
                                [participant],
                                "remove"
                            )
                            return reply(`😊 espero que não sigam o exemplo aí em cima e sigam as regras`);
                        }, 2000)



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