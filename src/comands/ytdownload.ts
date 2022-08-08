import { downloadYtVideo } from "../functions/youtubeFunctions";
import { Ibot } from "../interfaces/Ibot";

export async function ytdownload(bot:Ibot,link:string){
    await downloadYtVideo(link)
}