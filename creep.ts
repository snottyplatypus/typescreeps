export namespace Creep {

    export var MAX_HARVESTERS = 2;
    export var MAX_UPGRADERS = 1;

    export var roles: Array<string> = [ 'harvester', 'upgrader'];

    export class _Creep
    {
        public tick(): void {}

        public name: string;
    }

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

}