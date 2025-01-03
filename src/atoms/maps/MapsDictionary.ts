import { MainMap } from './MainMap';
import { RuzaMap } from './RuzaMap';

export const MapsDictionary: Record<
  string,
  React.FC<{ className?: string }>
> = {
  main: MainMap,
  ruza: RuzaMap,
};

export type TMapKeys = keyof typeof MapsDictionary;
