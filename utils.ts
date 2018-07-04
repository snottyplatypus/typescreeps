export namespace U 
{
    export interface Dictionary_c {
        [index: string]: (creep: Creep) => void;
    }

    export interface Dictionary_sp {
        [index: string]: (s_name: string) => void;
    }

    export interface Dictionary_s {
        [index: string]: string;
    }

    export interface Dictionary_a {
        [index: string]: any;
    }

    export function empty(arg0?): void {}
}