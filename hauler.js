"use strict";
exports.__esModule = true;
var _ = require("lodash");
var Hauler;
(function (Hauler) {
    Hauler.MAX_HAULERS = 3;
    var tier = [
        [CARRY, CARRY, MOVE],
        [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
        [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
    ];
    function init() {
    }
    Hauler.init = init;
    function spawn(s_name, t, max) {
        if (max === void 0) { max = Hauler.MAX_HAULERS; }
        var n_haulers = _.filter(Game.creeps, function (creep) { return creep.memory.role == 'hauler'; }).length;
        if (n_haulers < max) {
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
        creep.memory.targetId = '';
        var n_haulers = _.filter(Game.creeps, function (creep) { return creep.memory.role == 'hauler'; }).length;
        var resources = creep.room.find(FIND_DROPPED_RESOURCES);
        _.sortBy(resources, 'amount').reverse();
        var target;
        if (resources.length >= n_haulers) {
            var t = 0;
            do {
                for (var name_1 in Game.creeps) {
                    var creep_1 = Game.creeps[name_1];
                    if (creep_1.memory.role == 'hauler') {
                        var not_available = (creep_1.memory.targetId == resources[t].id);
                        if (not_available)
                            ++t;
                    }
                }
            } while (not_available && t < resources.length);
            target = resources[t];
        }
        else {
            target = _.max(resources, 'amount');
        }
        if (target) {
            creep.memory.targetId = target.id;
            creep.memory.state = 'moving';
            _moving(creep);
        }
    }
    Hauler._finding = _finding;
    function _moving(creep) {
        var target = Game.getObjectById(creep.memory.targetId);
        if (target == null) {
            creep.memory.state = 'finding';
            return;
        }
        if (creep.pickup(target) == ERR_NOT_IN_RANGE)
            creep.travelTo(target, { movingTarget: false });
        else {
            creep.memory.state = 'hauling';
        }
    }
    Hauler._moving = _moving;
    function _hauling(creep) {
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
