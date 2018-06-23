import { Harvester } from './harvester';

var creeps = new Array();
var harvesters = new Array();
var upgraders = new Array();

harvesters.push(new Harvester());

creeps.push(harvesters);
creeps.push(upgraders);

declare var module: any;
module.exports.loop = function()
{
    //tick every creep
    creeps.forEach(creep_type => {
        creep_type.forEach(creep => {
            creep.tick();
        });
    });
}   