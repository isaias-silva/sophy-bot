import { downloadYtVideo } from "../functions/youtubeFunctions";
import { Ibot } from "../interfaces/Ibot";

export async function ytdownload(bot:Ibot,link:string){
   let file= await downloadYtVideo(link)
   console.log(file)
}