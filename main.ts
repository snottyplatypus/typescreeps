import { Creep } from './creep';
import { Harvester } from './harvester';
import { Upgrader } from './upgrader';
import { Traveler } from './Traveler';

//TODO 
//hauler with carry, move
//upgrader same

Creep.init();

declare var module: any;
module.exports.loop = function()
{
    Creep.free();

    Creep.spawn();
    
    Creep.tick();
}   