import { ACTION_TYPES } from "../constants"
import { ParkingInput } from "../interface"

export default class ParkingInputMapper {
  private carParkingLotCount: number
  private motorParkingLotCount: number
  private parkingInputs: Array<ParkingInput>

  constructor(fileContent: string){
    const rows = fileContent.split("\n")
    let row = rows[0] //get first row containing counts for parking lots
    const countRow = row.split(',')
    this.carParkingLotCount = Number(countRow[0].trim()) 
    this.motorParkingLotCount = Number(countRow[1].trim())
    rows.shift() //remove first row containing counts so remaining rows are inputs
    const filteredRows = rows.filter(row => row && row.length > 0) //remove empty rows
    this.parkingInputs = filteredRows.map((row) =>  this.parkingInputMap(row))
  }

  private parkingInputMap(row: string):ParkingInput{ //map input rows to ParkingInput type accepted by Parking class
    const formattedRow = row.split(',') //split based on , as csv format
    let action = formattedRow[0].trim().toUpperCase() //row 0 is always action
    switch(action){
      case ACTION_TYPES.enter: // map to enter action type
        return {
          action: action,
          vehicleType: formattedRow[1].trim().toUpperCase(), 
          vehiclePlate: formattedRow[2].trim().toUpperCase(),
          timestamp: Number(formattedRow[3].trim())
        }
      case ACTION_TYPES.exit: // map to exit action type
        return {
          action: formattedRow[0].trim().toUpperCase(),
          vehiclePlate: formattedRow[1].trim().toUpperCase(),
          timestamp: Number(formattedRow[2].trim())
        }
      default: 
        return {
          action: action,
          vehicleType: formattedRow[1].trim().toUpperCase(),
          vehiclePlate: formattedRow[2].trim().toUpperCase(),
          timestamp: Number(formattedRow[3].trim())
        }
    }
  }

  public getCarLotCount(){
    return this.carParkingLotCount
  }

  public getMotorLotCount(){
    return this.motorParkingLotCount
  }

  public getParkingInputs(){
    return this.parkingInputs
  }
}