import { VEHICLE_TYPES, CAR_PARKING_RATE_PER_HOUR, MOTOR_PARKING_RATE_PER_HOUR, ACTION_TYPES, ERROR_MESSAGE } from '../constants'
import { VehicleParking, ParkingInput } from '../interface'

const EMPTY_PARKING = { isUsed: false, timestamp: 0, vehiclePlate: '' }

export default class Parking{
  private carParkingLots: Array<VehicleParking>
  private motorParkingLots: Array<VehicleParking>

  constructor(carParkingLotCount:number, motorParkingLotCount: number){
    this.carParkingLots = this.initParkingLots(carParkingLotCount)
    this.motorParkingLots = this.initParkingLots(motorParkingLotCount)
  }

  private initParkingLots(numberOfLot: number):Array<VehicleParking>{ //initialize number of available parking lots 
    let parkingLots = []
    for(let i=0; i < numberOfLot; i++){
      parkingLots.push(EMPTY_PARKING)
    }
    return parkingLots
  }

  public calculateFare(vehicleType: VEHICLE_TYPES, enterTimestamp: number, exitTimestamp: number):number{ //calculate parking fare
    if(enterTimestamp > exitTimestamp){
      console.log(ERROR_MESSAGE.invalidTimeStamp)
      return 0
    }
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
  

  public vehicleEnter(input: ParkingInput):void{ //function to handle vehicle enter parking 
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

  public vehicleExit(input: ParkingInput):void{ //function to handle vehicle exit parking
    let found = false 
    this.carParkingLots.forEach((lot, index) => {
      if(lot?.vehiclePlate === input.vehiclePlate ){ //reset parking lot to initial state if vehicle is found (exit parking action)
        found = true
        let fare = this.calculateFare(VEHICLE_TYPES.car, lot.timestamp, input.timestamp)
        if(fare < 1){ //invalid fare handling
          console.log(ERROR_MESSAGE.invalidFare.replace('{lot}', `Car Lot ${index + 1}`))
          this.carParkingLots[index] = EMPTY_PARKING
          return
        }
        console.log(`Car Lot ${index + 1} ${fare}`) //index + 1 because display should not start from zero
        this.carParkingLots[index] = EMPTY_PARKING
        return
      }
    })
    this.motorParkingLots.forEach((lot, index) => {
      if(lot?.vehiclePlate === input.vehiclePlate){ //reset parking lot to initial state if vehicle is found (exit parking action)
        found = true
        let fare = this.calculateFare(VEHICLE_TYPES.motorcycle, lot.timestamp, input.timestamp)
        if(fare < 1){ //invalid fare handling
          console.log(ERROR_MESSAGE.invalidFare.replace('{lot}', `Motorcycle Lot ${index + 1}`))
          this.carParkingLots[index] = EMPTY_PARKING
          return
        }
        console.log(`Motorcycle Lot ${index + 1} ${fare}`) //index + 1 because display should not start from zero
        this.motorParkingLots[index] = EMPTY_PARKING
        return
      }
    })
    if(!found){ // unable to find vehicle in both motor and car
      console.log(ERROR_MESSAGE.parkingNotFound.replace('{vehiclePlate}', input.vehiclePlate))
    }
    
  }

  public processInputRows(rows: Array<ParkingInput>):void{ //process mapped input rows
    rows.forEach((row, index) => {
      let errors = []
      switch(row.action){
        case ACTION_TYPES.enter:
          errors = this.validateEnterAction(row, (index + 1).toString()) //validate input before processing
          if(errors.length > 0){
            console.log(errors)
            break
          }
          this.vehicleEnter(row)
          break
        case ACTION_TYPES.exit:
          errors = this.validateExitAction(row, (index + 1).toString()) //validate input before processing
          if(errors.length > 0){
            console.log(errors)
            break
          }
          this.vehicleExit(row)
          break
        default: 
          console.log(ERROR_MESSAGE.actionMissing.replace('{index}', (index + 1).toString()))
      }
    })
  }

  public validateEnterAction(input:any, index:string):Array<string>{ //input validator for enter action
    let errors = []
    if(!input.vehiclePlate || input.vehiclePlate.length < 1){
      errors.push(ERROR_MESSAGE.plateMissing.replace('{index}',index))
    }
    if(!input.vehicleType || input.vehicleType.length < 1){
      errors.push(ERROR_MESSAGE.typeMissing.replace('{index}',index))
    }
    if(!input.timestamp){
      errors.push(ERROR_MESSAGE.timestampMissing.replace('{index}',index))
    }
    return errors
  }

  public validateExitAction(input:any, index:string):Array<string>{ //input validator for exit action
    let errors = []
    if(!input.vehiclePlate || input.vehiclePlate.length < 1){
      errors.push(ERROR_MESSAGE.plateMissing.replace('{index}',index))
    }
    if(!input.timestamp){
      errors.push(ERROR_MESSAGE.timestampMissing.replace('{index}',index))
    }
    return errors
  }

  public getCarParkingLots():Array<VehicleParking>{
    return this.carParkingLots
  }

  public getMotorParkingLots():Array<VehicleParking>{
    return this.motorParkingLots
  }
  
}

