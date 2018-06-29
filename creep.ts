import { U } from './utils';
import { Harvester } from './harvester';

export namespace Creep {

    export var _roles = {} as U.Dictionary_f;

    export function init(): void
    {
        Harvester.init();
        _roles['harvester'] = Harvester._harvester;
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
        }
    }

    export function tick(): void
    {
        for(let name in Game.creeps)
        {
            let creep = Game.creeps[name];
            _roles[creep.memory.role](creep);
        }
    }
    /*
    export function add_creep<T>(creep_array: Array<T>, type: string, creep: T, body: any ): void
    {
        //each creep with have it's array pos as name 
        let name: string = type + creep_array.length;
        let err:any = Game.spawns['Spawn1'].spawnCreep(body, name, { memory: {role: type} });
        if(err == 0) {
            console.log('Created ' + type);
            creep_array.push(creep);
        }
        if(err == ERR_NOT_ENOUGH_ENERGY)
            console.log('Not enough energy to create creep of type: ' + type);
    }

    export function delete_creep(creep_array: any, name: string){
        delete Memory.creeps[name];
        //we filter each array so it doesn't contain the deleted creep anymore
        creep_array.array.forEach(element => {
            element = element.filter(function(element){ 
                return element.name !== name;
            });
        });
    }
    */
}