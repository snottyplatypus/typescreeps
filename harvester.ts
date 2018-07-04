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
    var tier = 
    [
        [WORK, WORK, MOVE],
        [WORK, WORK, WORK, WORK, WORK, MOVE],
    ]
    
    export function init(): void
    {
        for(let r_name in Game.rooms) {
            sources[r_name] = Game.rooms[r_name].find(FIND_SOURCES);
        }
    }
  
    export function spawn(s_name: string, t: number, max?: number): void
    {
        var n_sources: number = 0;
        for(let r_name in sources) {
            n_sources += sources[r_name].length;
        }
    
        var max_h;
        if(max)
            max_h = max;
        else
            max_h = n_sources;
        var n_harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length;
        if(n_harvesters < max_h) {
            let s: number = 0;
            for(let r_name in Game.rooms) {
                do {
                    for(let name in Game.creeps) {
                        let creep = Game.creeps[name];
                        var not_available: boolean = (creep.memory.role == 'harvester' && creep.memory.sourceId == sources[r_name][s].id);
                        if(not_available)
                            ++s;
                    }
                } while(not_available);
            }
            let r_name: string = Game.spawns[s_name].room.name;
            let target: string = sources[r_name][s].id;
            Game.spawns[s_name].spawnCreep(tier[t], 'harvester' + n_harvesters, 
            { 
                memory: 
                {
                    role: 'harvester', 
                    state: 'spawning',
                    spawn: s_name, 
                    sourceId: target
                } 
            });
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