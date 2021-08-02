
export interface VehicleParking { // interface to store vehicle that is parked in a lot
  vehiclePlate: string 
  timestamp: number
  isUsed: boolean
}

export interface ParkingInput { // interface to map input to actions
  action: string
  vehicleType?: string
  vehiclePlate: string
  timestamp: number
}