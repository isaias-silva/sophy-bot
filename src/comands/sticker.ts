
import { data } from "../config/data";
import { downloadImage, downloadVideo } from "../functions/downloadContent";
import { Ibot } from "../interfaces/Ibot";
import sharp from 'sharp'
import fs from 'fs'
import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg"
ffmpeg().setFfmpegPath(ffmpegInstaller.path)
export async function sticker(bot: Ibot) {
    const { isImage, webMessage, sendSticker, reply, isVideo } = bot
    await reply(`um segundinho...`)

    const imageMessage = isImage ? webMessage.message?.imageMessage : webMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage

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
            let newfile = file.replace(`.mp4`, `.webp`)
            return ffmpeg(file)
                .format(`webp`)
                .output(newfile)
                .on(`end`, async () => {
                    await sendSticker(newfile)
                    fs.unlinkSync(newfile)
                    if (file) {
                        fs.unlinkSync(file)
                    }
                }).run()



        }

    }

    return await reply(`putz nao consegui converter...
    para criar figurinhas marque uma imagem com o comando *${data.prefix}sticker*
    ou envie uma imagem`)

}