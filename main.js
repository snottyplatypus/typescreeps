"use strict";
exports.__esModule = true;
var creep_1 = require("./creep");
//TODO 
//Harvester with work, carry
//gatherer with carry, move
//upgrader same
//CREEP TIERS, spawn the highest possible
//creep state in memory
creep_1.Creep.init();
module.exports.loop = function () {
    creep_1.Creep.free();
    creep_1.Creep.spawn();
    creep_1.Creep.tick();
};
