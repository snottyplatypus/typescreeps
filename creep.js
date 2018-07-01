"use strict";
exports.__esModule = true;
var harvester_1 = require("./harvester");
var hauler_1 = require("./hauler");
var Creep;
(function (Creep) {
    Creep._roles = {};
    function init() {
        harvester_1.Harvester.init();
        Creep._roles['harvester_spawning'] = harvester_1.Harvester._spawning;
        Creep._roles['harvester_moving'] = harvester_1.Harvester._moving;
        Creep._roles['harvester_harvesting'] = harvester_1.Harvester._harvesting;
        hauler_1.Hauler.init();
        Creep._roles['hauler_spawning'] = hauler_1.Hauler._spawning;
        Creep._roles['hauler_finding'] = hauler_1.Hauler._finding;
        Creep._roles['hauler_moving'] = hauler_1.Hauler._moving;
        Creep._roles['hauler_hauling'] = hauler_1.Hauler._hauling;
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
            hauler_1.Hauler.spawn(s_name);
        }
    }
    Creep.spawn = spawn;
    function tick() {
        for (var name_2 in Game.creeps) {
            var creep = Game.creeps[name_2];
            Creep._roles[creep.memory.role + '_' + creep.memory.state](creep);
        }
    }
    Creep.tick = tick;
})(Creep = exports.Creep || (exports.Creep = {}));
