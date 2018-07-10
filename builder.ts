import { U } from './utils';
import * as _ from "lodash";
import { Traveler } from './Traveler';

export namespace Builder
{
    export var MAX_BUILDERS = 3;
    var tier =
    [
        [WORK, CARRY, MOVE, MOVE],
        [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
    ]

    export function init(): void
    {
    }

    export function spawn(s_name: string, t: number, max = MAX_BUILDERS): void
    {
        var n_builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder').length;

        if(n_builders < max) {
            Game.spawns[s_name].spawnCreep(tier[t], 'builder' + n_builders, 
            { 
                memory: 
                {
                    role: 'builder', 
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
        var targets: any = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(targets.length > 0) {
            creep.memory.targetId = targets[0].id;
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
                    return structure.structureType == STRUCTURE_EXTENSION ||
                           structure.structureType == STRUCTURE_SPAWN;
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
        var target: any = Game.getObjectById(creep.memory.targetId);
        if(target == null) {
            creep.memory.state = 'finding';
            return;
        }
        if(creep.build(target) == ERR_NOT_IN_RANGE)
            creep.travelTo(target, { movingTarget: false });
        if(target.progress == target.progressTotal)
            creep.memory.state = 'finding';
        else if(creep.carry.energy == 0)
            creep.memory.state = 'gathering';
    }

}