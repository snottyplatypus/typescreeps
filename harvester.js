"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var creep_1 = require("./creep");
var Harvester = /** @class */ (function (_super) {
    __extends(Harvester, _super);
    function Harvester() {
        return _super.call(this) || this;
    }
    Harvester.prototype.tick = function () {
    };
    return Harvester;
}(creep_1.Creep._Creep));
exports.Harvester = Harvester;