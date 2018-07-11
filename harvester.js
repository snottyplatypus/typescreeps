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
        [WORK, WORK, MOVE],
        [WORK, WORK, WORK, WORK, WORK, MOVE],
    ];
    function init() {
        for (var r_name in Game.rooms) {
            sources[r_name] = Game.rooms[r_name].find(FIND_SOURCES);
        }
    }
    Harvester.init = init;
    function spawn(s_name, t, max) {
        var n_sources = 0;
        for (var r_name in sources) {
            n_sources += sources[r_name].length;
        }
        var max_h;
        if (max)
            max_h = max;
        else
            max_h = n_sources;
        var n_harvesters = _.filter(Game.creeps, function (creep) { return creep.memory.role == 'harvester'; }).length;
        if (n_harvesters < max_h) {
            var s = 0;
            for (var r_name_1 in Game.rooms) {
                do {
                    for (var name_1 in Game.creeps) {
                        var creep = Game.creeps[name_1];
                        if (creep.memory.role == 'harvester') {
                            var not_available = (creep.memory.sourceId == sources[r_name_1][s].id);
                            if (not_available)
                                ++s;
                        }
                    }
                } while (not_available);
            }
            var r_name = Game.spawns[s_name].room.name;
            var target = sources[r_name][s].id;
            Game.spawns[s_name].spawnCreep(tier[t], 'harvester_' + Game.time.toString(), {
                memory: {
                    role: 'harvester',
                    state: 'spawning',
                    spawn: s_name,
                    sourceId: target
                }
            });
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
        }
    }
    Harvester._moving = _moving;
    function _harvesting(creep) {
        var source = Game.getObjectById(creep.memory.sourceId);
        creep.harvest(source);
    }
    Harvester._harvesting = _harvesting;
})(Harvester = exports.Harvester || (exports.Harvester = {}));
