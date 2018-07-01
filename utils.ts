export namespace U 
{
    export interface Dictionary_f {
        [index: string]: (creep: Creep) => void;
    }

    export interface Dictionary_s {
        [index: string]: string;
    }

    export interface Dictionary_a {
        [index: string]: any;
    }
}