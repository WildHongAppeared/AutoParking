import { VEHICLE_TYPES, CAR_PARKING_RATE_PER_HOUR, MOTOR_PARKING_RATE_PER_HOUR, ACTION_TYPES } from '../constants'
import { VehicleParking, ParkingInput } from '../interface'

const EMPTY_PARKING = { isUsed: false, timestamp: 0, vehiclePlate: '' }

export default class Parking{
  private carParkingLots: Array<VehicleParking>
  private motorParkingLots: Array<VehicleParking>

  constructor(carParkingLotCount:number, motorParkingLotCount: number){
    this.carParkingLots = this.initParkingLots(carParkingLotCount)
    this.motorParkingLots = this.initParkingLots(motorParkingLotCount)
  }

  public initParkingLots(numberOfLot: number):Array<VehicleParking>{ //initialize number of available parking lots 
    let parkingLots = []
    for(let i=0; i < numberOfLot; i++){
      parkingLots.push(EMPTY_PARKING)
    }
    return parkingLots
  }

  public calculateFare(vehicleType: VEHICLE_TYPES, enterTimestamp: number, exitTimestamp: number):number{ //calculate parking fare
    var startDate = new Date(enterTimestamp * 1000)
    var endDate = new Date(exitTimestamp * 1000)
    var diff = Math.abs(endDate.getTime() - startDate.getTime());
    const minutes = Math.round(diff / 60000);
    let parkingFareHour = Math.floor(minutes/60) //get base hour for rate
    parkingFareHour = minutes % 60 > 0 ? parkingFareHour + 1: parkingFareHour //if overflow from current hour add 1 hour to fare
    switch(vehicleType){
      case VEHICLE_TYPES.car:
        return parkingFareHour * CAR_PARKING_RATE_PER_HOUR
      case VEHICLE_TYPES.motorcycle:
        return parkingFareHour * MOTOR_PARKING_RATE_PER_HOUR
    }
  }
  

  public vehicleEnter(input: ParkingInput):void{ //function to handle vehicle exit parking 
    switch(input.vehicleType){
      case VEHICLE_TYPES.car: 
        let hasCarParkingLot = this.carParkingLots.find((lot) => lot.isUsed === false)
        if(!hasCarParkingLot){ //no lot for vehicle to park, rejected
          console.log('Reject')
        }
        for(var lotNumber = 0; lotNumber < this.carParkingLots.length; lotNumber ++){
          let lot = this.carParkingLots[lotNumber]
          if(!lot.isUsed){ 
            this.carParkingLots[lotNumber] = { vehiclePlate: input.vehiclePlate, timestamp: input.timestamp, isUsed: true } as VehicleParking
            console.log(`Accept Car Lot ${lotNumber + 1}`) //index + 1 because display should not start from zero
            break
          }
        }
        break
      case VEHICLE_TYPES.motorcycle:
        let hasMotorParkingLot = this.motorParkingLots.find((lot) => lot.isUsed === false)
        if(!hasMotorParkingLot){ //no lot for vehicle to park, rejected
          console.log('Reject')
        }
        for(var lotNumber = 0; lotNumber < this.carParkingLots.length; lotNumber ++){
          let lot = this.motorParkingLots[lotNumber]
          if(!lot.isUsed){ 
            this.motorParkingLots[lotNumber] = { vehiclePlate: input.vehiclePlate, timestamp: input.timestamp, isUsed: true} as VehicleParking
            console.log(`Accept Motorcycle Lot ${lotNumber + 1}`) //index + 1 because display should not start from zero
            break
          }
        }
        break
    }
  }

  public vehicleExit(input: ParkingInput):void{
    this.carParkingLots.forEach((lot, index) => {
      if(lot?.vehiclePlate === input.vehiclePlate ){ //init parking lot to null if vehicle is found (exit parking action)
        console.log(`Car Lot ${index + 1} ${this.calculateFare(VEHICLE_TYPES.car, lot.timestamp, input.timestamp)}`) //index + 1 because display should not start from zero
        this.carParkingLots[index] = EMPTY_PARKING
        return
      }
    })
    this.motorParkingLots.forEach((lot, index) => {
      if(lot?.vehiclePlate === input.vehiclePlate){ //init parking lot to null if vehicle is found (exit parking action)
        console.log(`Motorcycle Lot ${index + 1} ${this.calculateFare(VEHICLE_TYPES.motorcycle, lot.timestamp, input.timestamp)}`) //index + 1 because display should not start from zero
        this.motorParkingLots[index] = EMPTY_PARKING
      }
    })
  }

  public processInputRows(rows: Array<ParkingInput>):void{ //process mapped input rows
    rows.forEach((row) => {
      switch(row.action){
        case ACTION_TYPES.enter:
          this.vehicleEnter(row)
          break
        case ACTION_TYPES.exit:
          this.vehicleExit(row)
          break
      }
    })
  }
}

