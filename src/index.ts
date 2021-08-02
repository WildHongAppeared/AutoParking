import Parking from "./class/Parking"
import ParkingInputMapper from "./class/ParkingInputMapper"
const fs = require('fs')
const path = require('path')

const inputData = fs.readFileSync(path.join(__dirname, "input.csv"), "utf8")

const parkingInputMap = new ParkingInputMapper(inputData) //map file contents to usable objects
const parkingClass = new Parking(parkingInputMap.getCarLotCount(), parkingInputMap.getMotorLotCount()) //init parking class with mapped data
parkingClass.processInputRows(parkingInputMap.getParkingInputs()) //process input rows

