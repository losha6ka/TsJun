export interface ColorI {
    color: string
}
interface MenuItem {
    id: number;
    list: string;
}
export interface HeaderI {
    width: string,
    height: string,
    bgColor: string,
    logo?: boolean,
    menu?: MenuItem[],
    textColor: string
}
export interface TextBlockI {
    text: string,
    textColor: string,
    textSize: string,
    // textFamily: string,
    textDecoration: string,
    textWeight: string,
    id: number
    decorationOption: string[],
    weightOption: string[]
}
export interface CustomBlockI {
    header: any[],
    main: any[],
    footer: any[],
    textBlock: TextBlockI[],
    buttonsBlock: any[],
    imgBlock: any[]
}
export interface SiteConstructionI {
    headerMainFooter: boolean,
    headerMain: boolean,
    mainFooter: boolean
}