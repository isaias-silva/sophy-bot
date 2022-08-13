//interface de grupo
export interface Igroup {

    groupTitle?: string
    groupJid?: string
    partipants?: { id: string, admin: string }[]
    locked?: boolean
    description?: string
}