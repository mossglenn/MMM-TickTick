"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NodeHelper = require("node_helper");
var Log = require("logger");
module.exports = NodeHelper.create({
    start: function () {
        Log.debug("".concat(this.name, " is started!"));
    },
});
