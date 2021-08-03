import Parking from "./class/Parking"
import ParkingInputMapper from "./class/ParkingInputMapper"
const fs = require('fs')
const path = require('path')

const inputData = fs.readFileSync(path.join(__dirname, "input.csv"), "utf8") //read file contents (Using CSV as easier to parse and human readable in large quantities)

const parkingInputMap = new ParkingInputMapper(inputData) //map file contents to proper objects
const parkingClass = new Parking(parkingInputMap.getCarLotCount(), parkingInputMap.getMotorLotCount()) //init parking class with mapped data
parkingClass.processInputRows(parkingInputMap.getParkingInputs()) //process input rows

