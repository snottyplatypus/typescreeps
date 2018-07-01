"use strict";
exports.__esModule = true;
var creep_1 = require("./creep");
creep_1.Creep.init();
module.exports.loop = function () {
    creep_1.Creep.free();
    creep_1.Creep.spawn();
    creep_1.Creep.tick();
};
