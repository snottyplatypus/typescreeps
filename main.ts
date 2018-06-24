import { Creep } from './creep';
import { Harvester } from './harvester';
import { Upgrader } from './upgrader';
import { Traveler } from './Traveler';

var creeps = new Array();
var harvesters = new Array();
var upgraders = new Array();

creeps.push(harvesters);
creeps.push(upgraders);

declare var module: any;
module.exports.loop = function()
{
    //get arrays from memory
    harvesters = Memory.harvesters;
    upgraders = Memory.upgraders;

    //spawn creeps if there's not enough
    if(harvesters.length < Creep.MAX_HARVESTERS) {
        Creep.add_creep(harvesters, 'harvester', new Harvester('harvester'), [WORK, CARRY, MOVE]);
    }
    if(upgraders.length < Creep.MAX_UPGRADERS) {
        Creep.add_creep(upgraders, 'upgrader', new Upgrader('upgrader'), [WORK, CARRY, MOVE]);
    }

    //tick every creep
    creeps.forEach(creep_type => {
        creep_type.forEach(creep => {
            creep.tick();
        });
    });

    //free memory
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            Creep.delete_creep(creeps, name);
            console.log('Clearing non-existing creep memory: ', name);
        }
    }

    //put persistent arrays in memory, as they might get empptyed after some ticks
    Memory.harvesters = harvesters;
    Memory.upgraders = upgraders;
}   