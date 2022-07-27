export interface Imenu {
    text: string
    footer: string
    buttons: {
        buttonId: string,
        buttonText: { displayText: string },
        type: number
    }[]
    headerType: number
}