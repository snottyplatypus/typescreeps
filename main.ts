import { Creep } from './creep';
import { Harvester } from './harvester';
import { Upgrader } from './upgrader';

var creeps = new Array();
var harvesters = new Array();
var upgraders = new Array();

creeps.push(harvesters);
creeps.push(upgraders);

declare var module: any;
module.exports.loop = function()
{
    harvesters = Memory.harvesters;
    upgraders = Memory.upgraders;
    
    if(harvesters.length < Creep.MAX_HARVESTERS) {
        Creep.add_creep(harvesters, 'harvester', new Harvester(), [WORK, CARRY, MOVE]);
    }
    if(harvesters.length < Creep.MAX_UPGRADERS) {
        Creep.add_creep(harvesters, 'upgrader', new Harvester(), [WORK, CARRY, MOVE]);
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
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory: ', name);
        }
    }

    Memory.harvesters = harvesters;
    Memory.upgraders = upgraders;
}   