import { _Creep } from './creep';

export class Harvester extends _Creep
{
    constructor()
    {
        super();
        console.log("Created Harvester");
    }

    public tick(): void
    {  
        console.log("Harvester");
    }
}