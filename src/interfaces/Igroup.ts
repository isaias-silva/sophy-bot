export interface Igroup{
    isAdmin:(id:string)=>boolean,
    imAdmin:()=>boolean
    isSuperAdmin:(id:string)=>boolean,
    groupTitle?: string,
    groupJid?:string,
    partipants?:{},
    locked?:boolean,
    description?: string}