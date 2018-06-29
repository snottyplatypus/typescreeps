import { Creep } from './creep';
import { Harvester } from './harvester';
import { Upgrader } from './upgrader';
import { Traveler } from './Traveler';

//TODO 
//Harvester with work, carry
//gatherer with carry, move
//upgrader same
//CREEP TIERS, spawn the highest possible
//creep state in memory

Creep.init();

declare var module: any;
module.exports.loop = function()
{
    Creep.free();

    Creep.spawn();
    
    Creep.tick();
}   