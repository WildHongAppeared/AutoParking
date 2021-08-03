export enum VEHICLE_TYPES {
  motorcycle = 'MOTORCYCLE',
  car = 'CAR'
}

export enum ACTION_TYPES {
  enter = 'ENTER',
  exit = 'EXIT'
}

export const CAR_PARKING_RATE_PER_HOUR = 2
export const MOTOR_PARKING_RATE_PER_HOUR = 1


export enum ERROR_MESSAGE {
  plateMissing = 'Vehicle plate missing for row {index}. Skipping row',
  typeMissing = 'Vehicle type missing for row {index}. Skipping row',
  timestampMissing = 'Timestamp missing for row {index}. Skipping row',
  actionMissing = 'Enter/Exit action missing for row {index}. Skipping row',
  invalidTimeStamp = 'Enter time later than exit time. Invalid',
  invalidFare = 'Invalid fare, resetting parking space {lot}',
  parkingNotFound = 'Parking not found for vehicle {vehiclePlate}. Skipping row'
}