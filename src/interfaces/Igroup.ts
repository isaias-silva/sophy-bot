//interface de grupo
export interface Igroup {

    groupTitle?: string
    groupJid?: string
    partipants?: { id: string, admin: string ;count:number|0 }[]
    locked?: boolean
    description?: string
}