import { U } from './utils';
import { Harvester } from './harvester';
import { Hauler } from './hauler';

export namespace Creep {

    export var _roles = {} as U.Dictionary_f;

    export function init(): void
    {
        Harvester.init();
        _roles['harvester_spawning'] = Harvester._spawning;
        _roles['harvester_moving'] = Harvester._moving;
        _roles['harvester_harvesting'] = Harvester._harvesting;
        Hauler.init();
        _roles['hauler_spawning'] = Hauler._spawning;
        _roles['hauler_finding'] = Hauler._finding;
        _roles['hauler_moving'] = Hauler._moving;
        _roles['hauler_hauling'] = Hauler._hauling;
    }

    export function free(): void
    {
        for(let name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory: ', name);
            }
        }
    }

    export function spawn(): void
    {
        for(let s_name in Game.spawns)
        {
            Harvester.spawn(s_name);
            Hauler.spawn(s_name);
        }
    }

    export function tick(): void
    {
        for(let name in Game.creeps)
        {
            let creep = Game.creeps[name];
            _roles[creep.memory.role + '_' + creep.memory.state](creep);
        }
    }
}