import { Pole } from "./pole";

export interface Filiale {
    filialId?: string,
    filialeName?: string,
    image: string,
    pole?: Pole,
}
