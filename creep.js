"use strict";
exports.__esModule = true;
var harvester_1 = require("./harvester");
var Creep;
(function (Creep) {
    Creep._roles = {};
    function init() {
        harvester_1.Harvester.init();
        Creep._roles['harvester'] = harvester_1.Harvester._harvester;
    }
    Creep.init = init;
    function free() {
        for (var name_1 in Memory.creeps) {
            if (!Game.creeps[name_1]) {
                delete Memory.creeps[name_1];
                console.log('Clearing non-existing creep memory: ', name_1);
            }
        }
    }
    Creep.free = free;
    function spawn() {
        for (var s_name in Game.spawns) {
            harvester_1.Harvester.spawn(s_name);
        }
    }
    Creep.spawn = spawn;
    function tick() {
        for (var name_2 in Game.creeps) {
            var creep = Game.creeps[name_2];
            Creep._roles[creep.memory.role](creep);
        }
    }
    Creep.tick = tick;
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
})(Creep = exports.Creep || (exports.Creep = {}));
