"use strict";
exports.__esModule = true;
var Creep;
(function (Creep) {
    var _Creep = /** @class */ (function () {
        function _Creep() {
        }
        _Creep.prototype.tick = function () { };
        return _Creep;
    }());
    Creep._Creep = _Creep;
    function add_creep(creep_array, type, creep, body) {
        var name = type + creep_array.length;
        var ret = Game.spawns['Spawn1'].spawnCreep(body, name, { memory: { role: type } });
        if (ret == 0) {
            console.log('Created ' + type);
            creep_array.push(creep);
        }
    }
    Creep.add_creep = add_creep;
    Creep.MAX_HARVESTERS = 2;
    Creep.MAX_UPGRADERS = 1;
})(Creep = exports.Creep || (exports.Creep = {}));
