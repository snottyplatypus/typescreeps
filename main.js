"use strict";
exports.__esModule = true;
var creep_1 = require("./creep");
var harvester_1 = require("./harvester");
var creeps = new Array();
var harvesters = new Array();
var upgraders = new Array();
creeps.push(harvesters);
creeps.push(upgraders);
module.exports.loop = function () {
    harvesters = Memory.harvesters;
    upgraders = Memory.upgraders;
    if (harvesters.length < creep_1.Creep.MAX_HARVESTERS) {
        creep_1.Creep.add_creep(harvesters, 'harvester', new harvester_1.Harvester(), [WORK, CARRY, MOVE]);
    }
    if (harvesters.length < creep_1.Creep.MAX_UPGRADERS) {
        creep_1.Creep.add_creep(harvesters, 'upgrader', new harvester_1.Harvester(), [WORK, CARRY, MOVE]);
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
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory: ', name);
        }
    }
    Memory.harvesters = harvesters;
    Memory.upgraders = upgraders;
};
