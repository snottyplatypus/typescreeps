import { U } from './utils';
import * as _ from "lodash";

export namespace Harvester 
{
    // number of sources per room
    var sources = {} as U.Dictionary_a;
    
    export function init(): void
    {
        for(let s_name in Game.spawns) {
            sources[s_name] = Game.spawns[s_name].room.find(FIND_SOURCES);
        }
    }

    export function spawn(s_name: string): void
    {
        var n_harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length;
        console.log('source: ' + s_name + ' length: ' + sources[s_name].length + ' n_har: ' + n_harvesters);
        if(n_harvesters < sources[s_name].length) {
            Game.spawns[s_name].spawnCreep([WORK, WORK, MOVE], 'harvester' + n_harvesters, { memory: {role: 'harvester'} });
        }
    }

    export function _harvester(creep: any): void
    {
    }
}