import { U } from './utils';
import * as _ from "lodash";
import { Harvester } from './harvester';
import { Hauler } from './hauler';
import { Upgrader } from './upgrader';
import {Builder } from './builder';

export namespace Spawn
{
    export var _state = {} as U.Dictionary_sp;

    export function init(): void
    {
        _state[''] = U.empty;
        _state['launch'] = _launch;
        _state['prod'] = _prod;
        _state['army'] = _army;
    }

    export function spawn(s_name: string): void
    {
        let spawn = Game.spawns[s_name];
        _state[spawn.memory.state](s_name);
    }

    export function _launch(s_name: string): void
    {
        var spawn = Game.spawns[s_name];
        if( _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length >= 1)
            Hauler.spawn(s_name, 0, 2);
        Harvester.spawn(s_name, 0, 2);
        if( _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler').length >= 2)
            Upgrader.spawn(s_name, 0, 1);
        if(spawn.room.controller.level >= 2)
            Builder.spawn(s_name, 0, 2);
        var max_energy = 0;
        var extensions: any = spawn.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION);
            }
        });
        for(let i = 0; i < extensions.length; i++)
            max_energy += extensions[i].energyCapacity;
        max_energy += spawn.energyCapacity;
        if(max_energy > 550) //Spawn + 5 extensions capacity
            spawn.memory.state = "prod";
    }

    export function _prod(s_name: string): void
    {
        Hauler.spawn(s_name, 2);
        Harvester.spawn(s_name, 1);
        Builder.spawn(s_name, 1);
        Upgrader.spawn(s_name, 0);
    }

    export function _army(s_name: string): void
    {

    }
}