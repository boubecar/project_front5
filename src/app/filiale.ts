import { Pole } from "./pole";

export interface Filiale {
    filialeId?: string,
    filialeName?: string,
    image:string,
    pole?: Pole,
}
