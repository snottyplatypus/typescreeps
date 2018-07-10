import { U } from './utils';
import { Harvester } from './harvester';
import { Hauler } from './hauler';
import { Upgrader } from './upgrader';
import { Builder } from './builder';
import { Spawn } from './spawn';

export namespace Creep {

    export var _roles = {} as U.Dictionary_c;

    export function init(): void
    {
        Spawn.init();
        Harvester.init();
        _roles['harvester_spawning'] = Harvester._spawning;
        _roles['harvester_moving'] = Harvester._moving;
        _roles['harvester_harvesting'] = Harvester._harvesting;
        Hauler.init();
        _roles['hauler_spawning'] = Hauler._spawning;
        _roles['hauler_finding'] = Hauler._finding;
        _roles['hauler_moving'] = Hauler._moving;
        _roles['hauler_hauling'] = Hauler._hauling;
        Upgrader.init();
        _roles['upgrader_spawning'] = Upgrader._spawning;
        _roles['upgrader_gathering'] = Upgrader._gathering;
        _roles['upgrader_hauling'] = Upgrader._hauling;
        Builder.init();
        _roles['builder_spawning'] = Builder._spawning;
        _roles['builder_finding'] = Builder._finding;
        _roles['builder_gathering'] = Builder._gathering;
        _roles['builder_hauling'] = Builder._hauling;
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
            if(!Game.spawns[s_name].memory.state)
                Game.spawns[s_name].memory.state = 'launch';
            Spawn.spawn(s_name);
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