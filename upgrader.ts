import { _Creep } from './creep';

export class Upgrader extends _Creep
{
    constructor()
    {
        super();
        console.log("Created Upgrader");
    }

    public tick(): void
    {  
        console.log("Upgrader");
    }
}