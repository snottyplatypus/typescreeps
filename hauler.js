"use strict";
exports.__esModule = true;
var _ = require("lodash");
var tier = [
    [CARRY, CARRY, MOVE],
    [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
    [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
];
var Hauler;
(function (Hauler) {
    Hauler.MAX_HAULERS = 3;
    function init() {
    }
    Hauler.init = init;
    function spawn(s_name, t, max) {
        var n_haulers = _.filter(Game.creeps, function (creep) { return creep.memory.role == 'hauler'; }).length;
        var max_h;
        if (max)
            max_h = max;
        else
            max_h = Hauler.MAX_HAULERS;
        if (n_haulers < max_h) {
            Game.spawns[s_name].spawnCreep(tier[t], 'hauler' + n_haulers, {
                memory: {
                    role: 'hauler',
                    state: 'spawning',
                    spawn: s_name,
                    targetId: ''
                }
            });
        }
    }
    Hauler.spawn = spawn;
    function _spawning(creep) {
        if (!creep.spawning) {
            creep.memory.state = 'finding';
            _finding(creep);
        }
    }
    Hauler._spawning = _spawning;
    function _finding(creep) {
        var resources = creep.room.find(FIND_DROPPED_RESOURCES);
        var target = _.max(resources, 'amount');
        creep.memory.targetId = target.id;
        creep.memory.state = 'moving';
        _moving(creep);
    }
    Hauler._finding = _finding;
    function _moving(creep) {
        var target = Game.getObjectById(creep.memory.targetId);
        if (creep.pickup(target) == ERR_NOT_IN_RANGE)
            creep.travelTo(target, { movingTarget: false });
        else {
            creep.memory.state = 'hauling';
            _hauling(creep);
        }
    }
    Hauler._moving = _moving;
    function _hauling(creep) {
        var s_name = creep.memory.spawn;
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: function (structure) {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_CONTAINER)
                    && structure.energy < structure.energyCapacity;
            }
        });
        if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.travelTo(targets[0], { movingTarget: false });
        }
        if (creep.carry.energy == 0)
            creep.memory.state = 'finding';
    }
    Hauler._hauling = _hauling;
})(Hauler = exports.Hauler || (exports.Hauler = {}));
