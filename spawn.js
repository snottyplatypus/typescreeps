"use strict";
exports.__esModule = true;
var utils_1 = require("./utils");
var _ = require("lodash");
var harvester_1 = require("./harvester");
var hauler_1 = require("./hauler");
var upgrader_1 = require("./upgrader");
var Spawn;
(function (Spawn) {
    Spawn._state = {};
    function init() {
        Spawn._state[''] = utils_1.U.empty;
        Spawn._state['launch'] = _launch;
        Spawn._state['prod'] = _prod;
        Spawn._state['army'] = _army;
    }
    Spawn.init = init;
    function spawn(s_name) {
        var spawn = Game.spawns[s_name];
        Spawn._state[spawn.memory.state](s_name);
    }
    Spawn.spawn = spawn;
    function _launch(s_name) {
        var spawn = Game.spawns[s_name];
        if (_.filter(Game.creeps, function (creep) { return creep.memory.role == 'harvester'; }).length >= 1)
            hauler_1.Hauler.spawn(s_name, 0, 2);
        harvester_1.Harvester.spawn(s_name, 0, 2);
        if (_.filter(Game.creeps, function (creep) { return creep.memory.role == 'hauler'; }).length >= 2)
            upgrader_1.Upgrader.spawn(s_name, 0);
        var max_energy = 0;
        var extensions = spawn.room.find(FIND_STRUCTURES, {
            filter: function (structure) {
                return (structure.structureType == STRUCTURE_EXTENSION);
            }
        });
        for (var i = 0; i < extensions.length; i++)
            max_energy += extensions[i].energyCapacity;
        max_energy += spawn.energyCapacity;
        console.log(max_energy);
        if (max_energy > 600)
            spawn.memory.state = "prod";
    }
    Spawn._launch = _launch;
    function _prod(s_name) {
        hauler_1.Hauler.spawn(s_name, 2);
        harvester_1.Harvester.spawn(s_name, 1);
        upgrader_1.Upgrader.spawn(s_name, 0);
    }
    Spawn._prod = _prod;
    function _army(s_name) {
    }
    Spawn._army = _army;
})(Spawn = exports.Spawn || (exports.Spawn = {}));
