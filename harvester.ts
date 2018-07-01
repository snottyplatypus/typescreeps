import { U } from './utils';
import * as _ from "lodash";
import { Traveler } from './Traveler';

Creep.prototype.travelTo = function (destination, options) {
    return Traveler.travelTo(this, destination, options);
};

export namespace Harvester 
{
    // number of sources per room
    var sources = {} as U.Dictionary_a;
    
    // possible tiers of harvester
    var h_tier = 
    [
        [WORK, WORK, WORK, WORK, WORK, MOVE],
        [WORK, WORK, MOVE]
    ]
    
    export function init(): void
    {
        for(let s_name in Game.spawns) {
            sources[s_name] = Game.spawns[s_name].room.find(FIND_SOURCES);
        }
    }

    export function spawn(s_name: string): void
    {
        var n_harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length;
        if(n_harvesters < sources[s_name].length) {
            let t: number = 0;
            sources[s_name].forEach(source => {
                for(let name in Game.creeps) {
                    let creep = Game.creeps[name];
                    if(creep.memory.role == 'harvester' && creep.memory.sourceId == source.id)
                        ++t;
                }
            });
            let target: string = sources[s_name][t].id;
            for(let i = 0; i < h_tier.length; i++) {
                if(Game.spawns[s_name].spawnCreep(h_tier[i], 'harvester' + n_harvesters, { 
                    memory: {
                        role: 'harvester', 
                        state: 'spawning',
                        spawn: s_name, 
                        sourceId: target
                    } 
                }) == OK)
                {
                    break;
                }
            }
        }
    }

    export function _spawning(creep: Creep): void
    {
        if(!creep.spawning)
        {
            creep.memory.state = 'moving';
            _moving(creep);
        }    
    }

    export function _moving(creep: Creep): void
    {
        var source: any = Game.getObjectById(creep.memory.sourceId);
        if(creep.harvest(source) == ERR_NOT_IN_RANGE)
            creep.travelTo(source, { movingTarget: false });
        else {
            creep.memory.state = 'harvesting';
            _harvesting(creep);
        }
    }

    export function _harvesting(creep: Creep): void
    {
        var source: any = Game.getObjectById(creep.memory.sourceId);
        creep.harvest(source);
    }
}