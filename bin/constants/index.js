"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MOTOR_PARKING_RATE_PER_HOUR = exports.CAR_PARKING_RATE_PER_HOUR = exports.ACTION_TYPES = exports.VEHICLE_TYPES = void 0;
var VEHICLE_TYPES;
(function (VEHICLE_TYPES) {
    VEHICLE_TYPES["motorcycle"] = "MOTORCYCLE";
    VEHICLE_TYPES["car"] = "CAR";
})(VEHICLE_TYPES = exports.VEHICLE_TYPES || (exports.VEHICLE_TYPES = {}));
var ACTION_TYPES;
(function (ACTION_TYPES) {
    ACTION_TYPES["enter"] = "ENTER";
    ACTION_TYPES["exit"] = "EXIT";
})(ACTION_TYPES = exports.ACTION_TYPES || (exports.ACTION_TYPES = {}));
exports.CAR_PARKING_RATE_PER_HOUR = 2;
exports.MOTOR_PARKING_RATE_PER_HOUR = 1;
