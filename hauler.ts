import { U } from './utils';
import * as _ from "lodash";
import { Traveler } from './Traveler';

var tier = 
    [
        [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
        [CARRY, CARRY, MOVE]
    ]

export namespace Hauler
{
    export var MAX_HAULERS = 3;

    export function init(): void
    {
    }

    export function spawn(s_name: string): void
    {
        var n_haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler').length;
        if(n_haulers < MAX_HAULERS) {
            for(let i = 0; i < tier.length; i++) {
                if(Game.spawns[s_name].spawnCreep(tier[i], 'hauler' + n_haulers, 
                    { 
                        memory: 
                        {
                            role: 'hauler', 
                            state: 'spawning',
                            spawn: s_name, 
                            targetId: ''
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
            creep.memory.state = 'finding';
            _finding(creep);
        }
    }

    export function _finding(creep: Creep): void
    {
        var resources = creep.room.find(FIND_DROPPED_RESOURCES);
        var target: any = _.max(resources, 'amount');
        creep.memory.targetId = target.id;
        creep.memory.state = 'moving';
        _moving(creep);
    }

    export function _moving(creep: Creep): void
    {
        var target: any = Game.getObjectById(creep.memory.targetId);
        if(creep.pickup(target) == ERR_NOT_IN_RANGE)
            creep.travelTo(target, { movingTarget: false });
        else {
            creep.memory.state = 'hauling';
            _hauling(creep);
        }
    }

    export function _hauling(creep: Creep): void
    {
        var s_name: string = creep.memory.spawn;
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