"use strict";
exports.__esModule = true;
var _ = require("lodash");
var Traveler_1 = require("./Traveler");
Creep.prototype.travelTo = function (destination, options) {
    return Traveler_1.Traveler.travelTo(this, destination, options);
};
var Harvester;
(function (Harvester) {
    // number of sources per room
    var sources = {};
    // possible tiers of harvester
    var tier = [
        [WORK, WORK, WORK, WORK, WORK, MOVE],
        [WORK, WORK, MOVE]
    ];
    function init() {
        for (var s_name in Game.spawns) {
            sources[s_name] = Game.spawns[s_name].room.find(FIND_SOURCES);
        }
    }
    Harvester.init = init;
    function spawn(s_name) {
        var n_harvesters = _.filter(Game.creeps, function (creep) { return creep.memory.role == 'harvester'; }).length;
        if (n_harvesters < 1 /*ources[s_name].length*/) {
            var t_1 = 0;
            sources[s_name].forEach(function (source) {
                for (var name_1 in Game.creeps) {
                    var creep = Game.creeps[name_1];
                    if (creep.memory.role == 'harvester' && creep.memory.sourceId == source.id)
                        ++t_1;
                }
            });
            var target = sources[s_name][t_1].id;
            for (var i = 0; i < tier.length; i++) {
                if (Game.spawns[s_name].spawnCreep(tier[i], 'harvester' + n_harvesters, {
                    memory: {
                        role: 'harvester',
                        state: 'spawning',
                        spawn: s_name,
                        sourceId: target
                    }
                }) == OK) {
                    break;
                }
            }
        }
    }
    Harvester.spawn = spawn;
    function _spawning(creep) {
        if (!creep.spawning) {
            creep.memory.state = 'moving';
            _moving(creep);
        }
    }
    Harvester._spawning = _spawning;
    function _moving(creep) {
        var source = Game.getObjectById(creep.memory.sourceId);
        if (creep.harvest(source) == ERR_NOT_IN_RANGE)
            creep.travelTo(source, { movingTarget: false });
        else {
            creep.memory.state = 'harvesting';
            _harvesting(creep);
        }
    }
    Harvester._moving = _moving;
    function _harvesting(creep) {
        var source = Game.getObjectById(creep.memory.sourceId);
        creep.harvest(source);
    }
    Harvester._harvesting = _harvesting;
})(Harvester = exports.Harvester || (exports.Harvester = {}));
