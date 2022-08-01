
import { data } from "../config/data";
import { downloadImage, downloadVideo } from "../functions/downloadContent";
import { Ibot } from "../interfaces/Ibot";
import sharp from 'sharp'
import fs from 'fs'
import ffmpeg from 'ffmpeg'
export async function sticker(bot: Ibot) {
    const { isImage, webMessage, isReply, sendSticker, reply,sendVideo ,isVideo } = bot
    if (!isImage) {
        if (!isReply) {
            return reply(`para converter como figurinha \n envie uma imagem com o comando ${data.prefix}sticker ou marque uma imagem e escreva o comando`)
        }
    }
    const imageMessage = isReply ? webMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage : webMessage.message?.imageMessage

    if (imageMessage) {
        const file = await downloadImage(imageMessage)
        if (file) {
            let converter = await sharp(file).resize(200, 200).webp().toBuffer()
            await sendSticker(converter, true)
            return await fs.unlinkSync(file)
        }
    }
    const gif = isVideo ? webMessage.message?.videoMessage : webMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage
    if (gif) {
        let file = await downloadVideo(gif)
        if (file) {
            await sendVideo(file)
            //converter para webm e enviar!
            return await fs.unlinkSync(file)
        }

    }

    return await reply('putz nao consegui converter... certeza que isso é uma imagem?')

}