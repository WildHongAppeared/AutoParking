"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var ParkingInputMapper = /** @class */ (function () {
    function ParkingInputMapper(fileContent) {
        var _this = this;
        var rows = fileContent.split("\n");
        var row = rows[0]; //get first row containing counts for parking lots
        var countRow = row.split(',');
        this.carParkingLotCount = Number(countRow[0].trim());
        this.motorParkingLotCount = Number(countRow[1].trim());
        rows.shift(); //remove first row containing counts so remaining rows are inputs
        var filteredRows = rows.filter(function (row) { return row && row.length > 0; }); //remove empty rows
        this.parkingInputs = filteredRows.map(function (row) { return _this.parkingInputMap(row); });
    }
    ParkingInputMapper.prototype.parkingInputMap = function (row) {
        var formattedRow = row.split(',');
        var action = formattedRow[0].trim().toUpperCase();
        switch (action) {
            case constants_1.ACTION_TYPES.enter:
                return {
                    action: action,
                    vehicleType: formattedRow[1].trim().toUpperCase(),
                    vehiclePlate: formattedRow[2].trim().toUpperCase(),
                    timestamp: Number(formattedRow[3].trim())
                };
            case constants_1.ACTION_TYPES.exit:
                return {
                    action: formattedRow[0].trim().toUpperCase(),
                    vehiclePlate: formattedRow[1].trim().toUpperCase(),
                    timestamp: Number(formattedRow[2].trim())
                };
            default:
                return {
                    action: action,
                    vehicleType: formattedRow[1].trim().toUpperCase(),
                    vehiclePlate: formattedRow[2].trim().toUpperCase(),
                    timestamp: Number(formattedRow[3].trim())
                };
        }
    };
    ParkingInputMapper.prototype.getCarLotCount = function () {
        return this.carParkingLotCount;
    };
    ParkingInputMapper.prototype.getMotorLotCount = function () {
        return this.motorParkingLotCount;
    };
    ParkingInputMapper.prototype.getParkingInputs = function () {
        return this.parkingInputs;
    };
    return ParkingInputMapper;
}());
exports.default = ParkingInputMapper;
