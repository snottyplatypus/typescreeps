"use strict";
exports.__esModule = true;
var Creep;
(function (Creep) {
    Creep.MAX_HARVESTERS = 2;
    Creep.MAX_UPGRADERS = 1;
    Creep.roles = ['harvester', 'upgrader'];
    var _Creep = /** @class */ (function () {
        function _Creep() {
        }
        _Creep.prototype.tick = function () { };
        return _Creep;
    }());
    Creep._Creep = _Creep;
    function add_creep(creep_array, type, creep, body) {
        //each creep with have it's array pos as name 
        var name = type + creep_array.length;
        var err = Game.spawns['Spawn1'].spawnCreep(body, name, { memory: { role: type } });
        if (err == 0) {
            console.log('Created ' + type);
            creep_array.push(creep);
        }
        if (err == ERR_NOT_ENOUGH_ENERGY)
            console.log('Not enough energy to create creep of type: ' + type);
    }
    Creep.add_creep = add_creep;
    function delete_creep(creep_array, name) {
        delete Memory.creeps[name];
        //we filter each array so it doesn't contain the deleted creep anymore
        creep_array.array.forEach(function (element) {
            element = element.filter(function (element) {
                return element.name !== name;
            });
        });
    }
    Creep.delete_creep = delete_creep;
})(Creep = exports.Creep || (exports.Creep = {}));
