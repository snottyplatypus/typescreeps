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
var Upgrader = /** @class */ (function (_super) {
    __extends(Upgrader, _super);
    function Upgrader() {
        return _super.call(this) || this;
    }
    Upgrader.prototype.tick = function () {
    };
    return Upgrader;
}(creep_1.Creep._Creep));
exports.Upgrader = Upgrader;
