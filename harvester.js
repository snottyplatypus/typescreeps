"use strict";
exports.__esModule = true;
var _ = require("lodash");
var Harvester;
(function (Harvester) {
    // number of sources per room
    var sources = {};
    function init() {
        for (var s_name in Game.spawns) {
            sources[s_name] = Game.spawns[s_name].room.find(FIND_SOURCES);
        }
    }
    Harvester.init = init;
    function spawn(s_name) {
        var n_harvesters = _.filter(Game.creeps, function (creep) { return creep.memory.role == 'harvester'; }).length;
        console.log('source: ' + s_name + ' length: ' + sources[s_name].length + ' n_har: ' + n_harvesters);
        if (n_harvesters < sources[s_name].length) {
            Game.spawns[s_name].spawnCreep([WORK, WORK, MOVE], 'harvester' + n_harvesters, { memory: { role: 'harvester' } });
        }
    }
    Harvester.spawn = spawn;
    function _harvester(creep) {
    }
    Harvester._harvester = _harvester;
})(Harvester = exports.Harvester || (exports.Harvester = {}));
