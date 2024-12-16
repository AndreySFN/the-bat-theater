// types.ts

export interface NethouseLinks {
  other: string;
  [key: string]: string;
}

export interface IOption {
  nethouseId: string;
  ticketsTotalCount?: number;
  ticketUrls: NethouseLinks;
  dateTime: Date; // Обновлено с string | Date на Date
  place: string;
  price?: string;
  unsoldTicketsCount?: number | null;
}

export interface IPreviews {
  url: string;
  blurDataUrl?: string;
  title?: string;
  subtitle?: string;
}

export interface IActor {
  role?: string;
  actorName: string;
  src?: string;
  blurDataUrl?: string;
}

export interface IRecordObjectElement {
  title: string;
  schedule?: Array<string>;
  shortDesc: string;
  desc: string;
  mapKey?: string;
  coverUrl?: string;
  blurCoverUrl?: string;
  miniCoverUrl?: string;
  blurMiniCoverUrl?: string;
  troupe?: Array<IActor>;
  gallery?: string[];
  ym: number;
  options: IOption[];
  previews?: IPreviews[];
}

export interface IRootObject {
  title: string;
  label: string;
  elements: {
    [key: string]: IRecordObjectElement;
  };
}

export type TDataObject = Record<string, IRootObject>;

export enum EUrlSearchKeyList {
  SOURCE = 'source',
}

export interface ITroupeElement {
  src: string;
  actorName: string;
  role: string;
  blurDataUrl: string;
}
