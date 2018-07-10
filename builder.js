"use strict";
exports.__esModule = true;
var _ = require("lodash");
var Builder;
(function (Builder) {
    Builder.MAX_BUILDERS = 3;
    var tier = [
        [WORK, CARRY, MOVE, MOVE],
        [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
    ];
    function init() {
    }
    Builder.init = init;
    function spawn(s_name, t, max) {
        if (max === void 0) { max = Builder.MAX_BUILDERS; }
        var n_builders = _.filter(Game.creeps, function (creep) { return creep.memory.role == 'builder'; }).length;
        if (n_builders < max) {
            Game.spawns[s_name].spawnCreep(tier[t], 'builder' + n_builders, {
                memory: {
                    role: 'builder',
                    state: 'spawning',
                    spawn: s_name,
                    targetId: ''
                }
            });
        }
    }
    Builder.spawn = spawn;
    function _spawning(creep) {
        if (!creep.spawning) {
            creep.memory.state = 'finding';
            _finding(creep);
        }
    }
    Builder._spawning = _spawning;
    function _finding(creep) {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length > 0) {
            creep.memory.targetId = targets[0].id;
            creep.memory.state = 'gathering';
            _gathering(creep);
        }
    }
    Builder._finding = _finding;
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
    Builder._gathering = _gathering;
    function _hauling(creep) {
        var target = Game.getObjectById(creep.memory.targetId);
        if (target == null) {
            creep.memory.state = 'finding';
            return;
        }
        if (creep.build(target) == ERR_NOT_IN_RANGE)
            creep.travelTo(target, { movingTarget: false });
        if (target.progress == target.progressTotal)
            creep.memory.state = 'finding';
        else if (creep.carry.energy == 0)
            creep.memory.state = 'gathering';
    }
    Builder._hauling = _hauling;
})(Builder = exports.Builder || (exports.Builder = {}));
