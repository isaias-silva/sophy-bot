import { readFileSync, writeFileSync } from "fs";
import { Igroup } from "../interfaces/Igroup";
import path from "path";

export default async function (group: Igroup, participant: string) {
    const caminho = path.resolve("cache", "grupos.json")
    try {
        readFileSync(caminho)
    } catch (err) {
        writeFileSync(caminho, JSON.stringify([]))
    }
    const grupos: Igroup[] = JSON.parse(readFileSync(caminho).toString())

    const groupExists = grupos.find(value => value.groupJid == group.groupJid)
    if (groupExists) {


        
        if (groupExists.partipants) {
            const participantExists = groupExists.partipants?.find(value => value.id == participant)
            if (participantExists) {
              
                participantExists["count"] += 1
               
            }

        }

    } else {

        if (group.partipants) {
            group.partipants.map((value) => value.count = 0)
            const participantExists = group.partipants.find(member => member.id == participant)

            if (participantExists)
                participantExists["count"] = 1

        }
        grupos.push(group)
    }

    writeFileSync(caminho, JSON.stringify(grupos))


}