import { Creep } from './creep';

export class Upgrader extends Creep._Creep
{
    constructor(name: string)
    {
        super();
        this.name = name;
    }

    public tick(): void
    {  
    }
}