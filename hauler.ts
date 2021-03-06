import { U } from './utils';
import * as _ from "lodash";
import { Traveler } from './Traveler';

export namespace Hauler
{
    export var MAX_HAULERS = 3;
    var tier = 
    [
        [CARRY, CARRY, MOVE],
        [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
        [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
    ]

    export function init(): void
    {
    }

    export function spawn(s_name: string, t: number, max = MAX_HAULERS): void
    {
        var n_haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler').length;

        if(n_haulers < max) {
            Game.spawns[s_name].spawnCreep(tier[t], 'hauler_' + Game.time.toString(), 
            { 
                memory: 
                {
                    role: 'hauler', 
                    state: 'spawning',
                    spawn: s_name, 
                    targetId: ''
                } 
            });
        }   
    }

    export function _spawning(creep: Creep): void
    {
        if(!creep.spawning)
        {
            creep.memory.state = 'finding';
            _finding(creep);
        }
    }

    export function _finding(creep: Creep): void
    {
        creep.memory.targetId = '';
        var n_haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler').length;
        var resources: any = creep.room.find(FIND_DROPPED_RESOURCES);
        _.sortBy(resources, 'amount').reverse();
        var target: any;
        if(resources.length >= n_haulers) {
            let t: number = 0;
            do {
                for(let name in Game.creeps) {
                    let creep = Game.creeps[name];
                    if(creep.memory.role == 'hauler') {
                        var not_available: boolean = (creep.memory.targetId == resources[t].id);
                        if(not_available)
                            ++t;
                    }
                }
            } while(not_available && t < resources.length);
            target = resources[t];
        } else {
            target = _.max(resources, 'amount');
        }

        if(target) {
            creep.memory.targetId = target.id;
            creep.memory.state = 'moving';
            _moving(creep);
        }
    }

    export function _moving(creep: Creep): void
    {
        var target: any = Game.getObjectById(creep.memory.targetId);
        if(target == null) {
            creep.memory.state = 'finding';
            return;
        }
        if(creep.pickup(target) == ERR_NOT_IN_RANGE)
            creep.travelTo(target, { movingTarget: false });
        else {
            creep.memory.state = 'hauling';
        }
    }

    export function _hauling(creep: Creep): void
    {
        var targets: any = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_CONTAINER) 
                        && structure.energy < structure.energyCapacity;
            }
        });
        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.travelTo(targets[0], { movingTarget: false });
        }
        
        if(creep.carry.energy == 0)
            creep.memory.state = 'finding';
    }
}