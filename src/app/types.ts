export interface Options {
  dateTime: Date;
  nethouseLink: string;
  place: string;
  price?: string;
}

export interface IPreviews {
  url: string;
  title?: string;
  subtitle?: string;
}

export interface DataTransferObject {
  title: string;
  shortDesc: string;
  desc: string;
  mapKey?: string;
  options: Array<Options>;
  ym: number;
  coverUrl: string;
  miniCoverUrl: string;
  galleryUrl: string;
  previews: Array<IPreviews>;
}
