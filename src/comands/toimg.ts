
import { data } from "../config/data";
import { downloadImage, downloadVideo } from "../functions/downloadContent";
import { Ibot } from "../interfaces/Ibot";
import sharp from 'sharp'
import fs from 'fs'
import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg"
ffmpeg().setFfmpegPath(ffmpegInstaller.path)

export async function toimg(bot: Ibot) {
    const { isSticker, webMessage, sendImage, reply, isVideo, sendVideo } = bot

    const stickerMessage = isSticker ? webMessage.message?.stickerMessage : webMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage?.stickerMessage

    if (!stickerMessage) {
        return reply(`marque uma figurinha com o  comando *${data.prefix}toimg* 😉`)
    }

    await reply(`um segundinho...`)
    if (stickerMessage) {

        const file = await downloadImage(stickerMessage)

        if (file) {
            let converter = await sharp(file).resize(200, 200).jpeg().toBuffer()
            await sendImage(converter, '', true)
            return await fs.unlinkSync(file)
        }

    }


    return await reply(`putz nao consegui converter... marque a sticker com o comando *${data.prefix}toimg*\n ⚠️algumas figurinhas não são convertiveis como imagem.`)

}