//module
import axios from "axios";
import path from "path";
import fs from 'fs'
//randotitle
import { randomtitle } from "./random";
//função que baixa arquivo de link enviado e retorna o `path` do arquivo.
export default async function (link: string, type: "png" | "mp4" | "mp3") {

    const caminho = path.resolve("assets", "temp", `${randomtitle()}.${type}`)
    const arquivo: Buffer = await (await axios.get(link, { responseType: "arraybuffer" })).data
    await fs.writeFileSync(caminho, arquivo)

    return caminho
}