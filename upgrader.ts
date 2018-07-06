import { U } from './utils';
import * as _ from "lodash";
import { Traveler } from './Traveler';

var tier =
    [
        [WORK, CARRY, MOVE, MOVE],
        [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE]
    ]

export namespace Upgrader 
{
    export var MAX_UPGRADERS = 1;

    export function init(): void
    {
    }

    export function spawn(s_name: string, t: number, max = MAX_UPGRADERS)
    {
        var n_upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader').length;

        if(n_upgraders < max) {
            Game.spawns[s_name].spawnCreep(tier[t], 'upgrader' + n_upgraders, 
            { 
                memory: 
                {
                    role: 'upgrader', 
                    state: 'spawning',
                    spawn: s_name, 
                } 
            });
        }  
    }

    export function _spawning(creep: Creep): void
    {
        if(!creep.spawning)
        {
            creep.memory.state = 'gathering';
            _gathering(creep);
        }
    }

    export function _gathering(creep: Creep): void
    {
        var targets: any = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_CONTAINER;
            }
        });
        if(targets.length == 0) {
            targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_SPAWN ||
                           structure.structureType == STRUCTURE_EXTENSION;
                }
            }); 
        }
        if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.travelTo(targets[0], { movingTarget: false });
        }

        if(creep.carry.energy > 0)
            creep.memory.state = 'hauling';
    }

    export function _hauling(creep: Creep): void
    {
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
            creep.travelTo(creep.room.controller, { movingTarget: false });
        if(creep.carry.energy == 0)
            creep.memory.state = 'gathering';
    }
}