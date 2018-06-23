export namespace Creep {

    export class _Creep
    {
        public tick(): void {}
    }

    export function add_creep<T>(creep_array: Array<T>, type: string, creep: T, body: any ): void
    {
        let name: string = type + creep_array.length;
        let ret:any = Game.spawns['Spawn1'].spawnCreep(body, name, { memory: {role: type} });
        if(ret == 0) {
            console.log('Created ' + type);
            creep_array.push(creep);
        }
    }

    export var MAX_HARVESTERS = 2;
    export var MAX_UPGRADERS = 1;
}