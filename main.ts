import { Creep } from './creep';

Creep.init();

declare var module: any;
module.exports.loop = function()
{
    Creep.free();
    Creep.spawn();
    Creep.tick();

}   