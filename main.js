"use strict";
exports.__esModule = true;
var creep_1 = require("./creep");
var harvester_1 = require("./harvester");
var upgrader_1 = require("./upgrader");
var creeps = new Array();
var harvesters = new Array();
var upgraders = new Array();
creeps.push(harvesters);
creeps.push(upgraders);
module.exports.loop = function () {
    //get arrays from memory
    harvesters = Memory.harvesters;
    upgraders = Memory.upgraders;
    //spawn creeps if there's not enough
    if (harvesters.length < creep_1.Creep.MAX_HARVESTERS) {
        creep_1.Creep.add_creep(harvesters, 'harvester', new harvester_1.Harvester('harvester'), [WORK, CARRY, MOVE]);
    }
    if (upgraders.length < creep_1.Creep.MAX_UPGRADERS) {
        creep_1.Creep.add_creep(upgraders, 'upgrader', new upgrader_1.Upgrader('upgrader'), [WORK, CARRY, MOVE]);
    }
    //tick every creep
    creeps.forEach(function (creep_type) {
        creep_type.forEach(function (creep) {
            creep.tick();
        });
    });
    //free memory
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            creep_1.Creep.delete_creep(creeps, name);
            console.log('Clearing non-existing creep memory: ', name);
        }
    }
    //put persistent arrays in memory, as they might get empptyed after some ticks
    Memory.harvesters = harvesters;
    Memory.upgraders = upgraders;
};
