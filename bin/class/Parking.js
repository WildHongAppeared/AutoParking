"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var EMPTY_PARKING = { isUsed: false, timestamp: 0, vehiclePlate: '' };
var Parking = /** @class */ (function () {
    function Parking(carParkingLotCount, motorParkingLotCount) {
        this.carParkingLots = this.initParkingLots(carParkingLotCount);
        this.motorParkingLots = this.initParkingLots(motorParkingLotCount);
    }
    Parking.prototype.initParkingLots = function (numberOfLot) {
        var parkingLots = [];
        for (var i = 0; i < numberOfLot; i++) {
            parkingLots.push(EMPTY_PARKING);
        }
        return parkingLots;
    };
    Parking.prototype.calculateFare = function (vehicleType, enterTimestamp, exitTimestamp) {
        var startDate = new Date(enterTimestamp * 1000);
        var endDate = new Date(exitTimestamp * 1000);
        var diff = Math.abs(endDate.getTime() - startDate.getTime());
        var minutes = Math.round(diff / 60000);
        var parkingFareHour = Math.floor(minutes / 60); //get base hour for rate
        parkingFareHour = minutes % 60 > 0 ? parkingFareHour + 1 : parkingFareHour; //if overflow from current hour add 1 hour to fare
        switch (vehicleType) {
            case constants_1.VEHICLE_TYPES.car:
                return parkingFareHour * constants_1.CAR_PARKING_RATE_PER_HOUR;
            case constants_1.VEHICLE_TYPES.motorcycle:
                return parkingFareHour * constants_1.MOTOR_PARKING_RATE_PER_HOUR;
        }
    };
    Parking.prototype.vehicleEnter = function (input) {
        switch (input.vehicleType) {
            case constants_1.VEHICLE_TYPES.car:
                var hasCarParkingLot = this.carParkingLots.find(function (lot) { return lot.isUsed === false; });
                if (!hasCarParkingLot) { //no lot for vehicle to park, rejected
                    console.log('Reject');
                }
                for (var lotNumber = 0; lotNumber < this.carParkingLots.length; lotNumber++) {
                    var lot = this.carParkingLots[lotNumber];
                    if (!lot.isUsed) {
                        this.carParkingLots[lotNumber] = { vehiclePlate: input.vehiclePlate, timestamp: input.timestamp, isUsed: true };
                        console.log("Accept Car Lot " + (lotNumber + 1)); //index + 1 because display should not start from zero
                        break;
                    }
                }
                break;
            case constants_1.VEHICLE_TYPES.motorcycle:
                var hasMotorParkingLot = this.motorParkingLots.find(function (lot) { return lot.isUsed === false; });
                if (!hasMotorParkingLot) { //no lot for vehicle to park, rejected
                    console.log('Reject');
                }
                for (var lotNumber = 0; lotNumber < this.carParkingLots.length; lotNumber++) {
                    var lot = this.motorParkingLots[lotNumber];
                    if (!lot.isUsed) {
                        this.motorParkingLots[lotNumber] = { vehiclePlate: input.vehiclePlate, timestamp: input.timestamp, isUsed: true };
                        console.log("Accept Motorcycle Lot " + (lotNumber + 1)); //index + 1 because display should not start from zero
                        break;
                    }
                }
                break;
        }
    };
    Parking.prototype.vehicleExit = function (input) {
        var _this = this;
        this.carParkingLots.forEach(function (lot, index) {
            if ((lot === null || lot === void 0 ? void 0 : lot.vehiclePlate) === input.vehiclePlate) { //init parking lot to null if vehicle is found (exit parking action)
                console.log("Car Lot " + (index + 1) + " " + _this.calculateFare(constants_1.VEHICLE_TYPES.car, lot.timestamp, input.timestamp)); //index + 1 because display should not start from zero
                _this.carParkingLots[index] = EMPTY_PARKING;
                return;
            }
        });
        this.motorParkingLots.forEach(function (lot, index) {
            if ((lot === null || lot === void 0 ? void 0 : lot.vehiclePlate) === input.vehiclePlate) { //init parking lot to null if vehicle is found (exit parking action)
                console.log("Motorcycle Lot " + (index + 1) + " " + _this.calculateFare(constants_1.VEHICLE_TYPES.motorcycle, lot.timestamp, input.timestamp)); //index + 1 because display should not start from zero
                _this.motorParkingLots[index] = EMPTY_PARKING;
            }
        });
    };
    Parking.prototype.processInputRows = function (rows) {
        var _this = this;
        rows.forEach(function (row) {
            console.log('@ACTION - ', row.action);
            switch (row.action) {
                case constants_1.ACTION_TYPES.enter:
                    _this.vehicleEnter(row);
                    break;
                case constants_1.ACTION_TYPES.exit:
                    _this.vehicleExit(row);
                    break;
            }
        });
    };
    return Parking;
}());
exports.default = Parking;
