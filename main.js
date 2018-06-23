"use strict";
exports.__esModule = true;
var harvester_1 = require("./harvester");
var creeps = new Array();
var harvesters = new Array();
harvesters.push(new harvester_1.Harvester());
creeps.push(harvesters);
module.exports.loop = function () {
    creeps.forEach(function (creep_type) {
        harvesters.forEach(function (creep) {
            creep.tick();
        });
    });
    console.log('harvester :' + harvesters.length);
};
