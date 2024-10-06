// types.ts

export interface NethouseLinks {
  other: string;
  [key: string]: string;
}

export interface Option {
  nethouseLinks: NethouseLinks;
  dateTime: Date; // Обновлено с string | Date на Date
  place: string;
  price?: string;
}

export interface IPreviews {
  url: string;
  title?: string;
  subtitle?: string;
}

export interface RecordObjectElement {
  title: string;
  subtitle?: string;
  shortDesc: string;
  desc: string;
  mapKey?: string;
  coverUrl?: string;
  miniCoverUrl?: string;
  gallery?: string[];
  ym: number;
  options: Option[];
  previews?: IPreviews[];
}

export interface RootObject {
  title: string;
  elements: {
    [key: string]: RecordObjectElement;
  };
}

export type TDataObject = Record<string, RootObject>;
