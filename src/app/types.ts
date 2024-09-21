export interface Options {
    dateTime: Date;
    nethouseLink: string;
    place: string;
}

export interface DataTransferObject {
    title: string;
    shortDesc: string
    desc: string;
    options: Array<Options>    
}
