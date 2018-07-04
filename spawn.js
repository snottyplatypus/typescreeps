"use strict";
exports.__esModule = true;
var utils_1 = require("./utils");
var harvester_1 = require("./harvester");
var hauler_1 = require("./hauler");
var Spawn;
(function (Spawn) {
    Spawn._state = {};
    function init() {
        Spawn._state[''] = utils_1.U.empty;
        Spawn._state['launch'] = _launch;
        Spawn._state['prod'] = _prod;
        Spawn._state['army'] = _army;
    }
    Spawn.init = init;
    function spawn(s_name) {
        var spawn = Game.spawns[s_name];
        Spawn._state[spawn.memory.state](s_name);
    }
    Spawn.spawn = spawn;
    function _launch(s_name) {
        harvester_1.Harvester.spawn(s_name, 0, 2);
        hauler_1.Hauler.spawn(s_name, 0, 2);
    }
    Spawn._launch = _launch;
    function _prod(s_name) {
    }
    Spawn._prod = _prod;
    function _army(s_name) {
    }
    Spawn._army = _army;
})(Spawn = exports.Spawn || (exports.Spawn = {}));
