// types.ts

export interface ITicketUrls {
  other: string;
  [key: string]: string;
}

export interface ITroupeElement {
  src: string;
  actorName: string;
  role: string;
  blurDataUrl?: string;
}

export interface IOption {
  ticketsTotalCount?: number;
  ticketUrls: ITicketUrls;
  dateTime: Date; // Обновлено с string | Date на Date
  place: string;
  price?: string;
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
  url: string;
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
  url: string;
  title: string;
  label: string;
  elements: Array<IRecordObjectElement>;
}

export type TDataObject = Record<string, IRootObject>;

export enum EUrlSearchKeyList {
  SOURCE = 'source',
}
