import axios from "axios";
import path from "path";
import fs from 'fs'
import { randomtitle } from "./random";
export default async function (link: string, type: "png" | "mp4" | "mp3") {

    const caminho = path.resolve("assets", "temp", `${randomtitle()}.${type}`)
    const arquivo: Buffer = await (await axios.get(link, { responseType: "arraybuffer" })).data
    await fs.writeFileSync(caminho, arquivo)

    return caminho
}