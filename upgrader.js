"use strict";
exports.__esModule = true;
var _ = require("lodash");
var tier = [
    [WORK, CARRY, MOVE, MOVE],
    [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE]
];
var Upgrader;
(function (Upgrader) {
    Upgrader.MAX_UPGRADERS = 2;
    function init() {
    }
    Upgrader.init = init;
    function spawn(s_name, t, max) {
        if (max === void 0) { max = Upgrader.MAX_UPGRADERS; }
        var n_upgraders = _.filter(Game.creeps, function (creep) { return creep.memory.role == 'upgrader'; }).length;
        if (n_upgraders < max) {
            Game.spawns[s_name].spawnCreep(tier[t], 'upgrader_' + Game.time.toString(), {
                memory: {
                    role: 'upgrader',
                    state: 'spawning',
                    spawn: s_name
                }
            });
        }
    }
    Upgrader.spawn = spawn;
    function _spawning(creep) {
        if (!creep.spawning) {
            creep.memory.state = 'gathering';
            _gathering(creep);
        }
    }
    Upgrader._spawning = _spawning;
    function _gathering(creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: function (structure) {
                return structure.structureType == STRUCTURE_CONTAINER;
            }
        });
        if (targets.length == 0) {
            targets = creep.room.find(FIND_STRUCTURES, {
                filter: function (structure) {
                    return structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN;
                }
            });
        }
        if (creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.travelTo(targets[0], { movingTarget: false });
        }
        if (creep.carry.energy > 0)
            creep.memory.state = 'hauling';
    }
    Upgrader._gathering = _gathering;
    function _hauling(creep) {
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
            creep.travelTo(creep.room.controller, { movingTarget: false });
        if (creep.carry.energy == 0)
            creep.memory.state = 'gathering';
    }
    Upgrader._hauling = _hauling;
})(Upgrader = exports.Upgrader || (exports.Upgrader = {}));
