import { Ibot } from "../interfaces/Ibot";
import path from "path"
import { data } from "../config/data";
import comandsList from "../config/comandsList";
import { readFileSync } from "fs";

export async function menu(bot: Ibot) {

  const { sendImage, webMessage } = bot





  const template = `_⚙️sophiaBot v${data.version}_\nᶜʳᶦᵃᵈᵒ ᵖᵒʳ ᶻᵃᶜᵏᵇˡᵃᶜᵏ\n*numero de comandos*:  ${comandsList.length}\n*botname*:  ${data.botname}\n*dono*:  +${data.owner}`
  const buff = readFileSync(path.resolve('assets', 'img', 'perfil.webp'))

  return sendImage(buff, template, true)


}
