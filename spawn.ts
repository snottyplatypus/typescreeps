import { U } from './utils';
import * as _ from "lodash";
import { Harvester } from './harvester';
import { Hauler } from './hauler';

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
        if( _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length > 1)
            Hauler.spawn(s_name, 0, 2);
        Harvester.spawn(s_name, 0, 2);
    }

    export function _prod(s_name: string): void
    {
        Hauler.spawn(s_name, 2);
        Harvester.spawn(s_name, 1);
    }

    export function _army(s_name: string): void
    {

    }
}