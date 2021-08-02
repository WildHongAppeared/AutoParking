"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Parking_1 = __importDefault(require("./class/Parking"));
var ParkingInputMapper_1 = __importDefault(require("./class/ParkingInputMapper"));
var fs = require('fs');
var path = require('path');
var inputData = fs.readFileSync(path.join(__dirname, "input.csv"), "utf8");
var parkingInputMap = new ParkingInputMapper_1.default(inputData); //map file contents to usable objects
var parkingClass = new Parking_1.default(parkingInputMap.getCarLotCount(), parkingInputMap.getMotorLotCount()); //init parking class with mapped data
parkingClass.processInputRows(parkingInputMap.getParkingInputs()); //process input rows
