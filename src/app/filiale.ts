import { Pole } from "./pole";

export interface Filiale {
    filialId?: string,
    filialName?: string,
    image: string,
    pole?: Pole,
}
