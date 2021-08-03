import Parking from '../../class/Parking'
import { expect } from 'chai'
import 'mocha'
import { ACTION_TYPES, VEHICLE_TYPES } from '../../constants'
const fs = require('fs')
const path = require('path')

describe('Parking Unit Test', () => {

  let rows = [{
      vehicleType: VEHICLE_TYPES.car,
      vehiclePlate: 'TESTPLATE',
      timestamp: 1613549730,
      action: ACTION_TYPES.enter
    },{
      vehiclePlate: 'TESTPLATE',
      timestamp: 1613559745,
      action: ACTION_TYPES.exit
    }]
  let errorEnterInput = {
  }
  let errorEnterInput1 = {
    vehiclePlate: 'TESTPLATE',
  }
  it('should allocate proper number of parking space', () => {
    let parking = new Parking(4,4)
    expect(parking.getCarParkingLots().length).to.eql(4)
    expect(parking.getMotorParkingLots().length).to.eql(4)
  })

  it('should allocate proper parking space object', () => {
    let parking = new Parking(1,1)
    let expectedParkingArr = parking.getCarParkingLots()
    expect(expectedParkingArr[0]).to.have.property('isUsed')
    expect(expectedParkingArr[0]).to.have.property('timestamp')
    expect(expectedParkingArr[0]).to.have.property('vehiclePlate')
    expect(expectedParkingArr[0].isUsed).to.be.false
  })

  it('should calculate correct fare', () => {
    let parking = new Parking(1,1)
    let fare = parking.calculateFare(VEHICLE_TYPES.car, 1613549730,1613559745)
    expect(fare).to.eql(6)
  })

  it('should handle invalid time during fare calculation', () => {
    let parking = new Parking(1,1)
    let fare = parking.calculateFare(VEHICLE_TYPES.car, 1613559745, 1613549730)
    expect(fare).to.eql(0)
  })

  it('should handle vehicle enter and exit correctly', () => {
    let parking = new Parking(1,1)
    parking.vehicleEnter(rows[0])
    let carParkingActual = parking.getCarParkingLots()
    expect(carParkingActual[0].isUsed).to.be.true
    expect(carParkingActual[0].timestamp).to.eql(rows[0].timestamp)
    expect(carParkingActual[0].vehiclePlate).to.eql(rows[0].vehiclePlate)
    parking.vehicleExit(rows[1])
    let carParkingEmptyActual = parking.getCarParkingLots()
    expect(carParkingEmptyActual[0].isUsed).to.be.false
    expect(carParkingEmptyActual[0].timestamp).to.eql(0)
  })

  it('should process input row in order', () => {
    let parking = new Parking(1,1)
    parking.processInputRows(rows)
    let carParkingEmptyActual = parking.getCarParkingLots()
    expect(carParkingEmptyActual[0].isUsed).to.be.false
    expect(carParkingEmptyActual[0].timestamp).to.eql(0)
  })

  it('should validate input row (Enter)', () => {
    let parking = new Parking(1,1)
    let result = parking.validateEnterAction(errorEnterInput,'1')
    expect(result.length).to.eql(3)
    let result1 = parking.validateEnterAction(errorEnterInput1,'1')
    expect(result1.length).to.eql(2)
  })

  it('should validate input row (Exit)', () => {
    let parking = new Parking(1,1)
    let result = parking.validateExitAction(errorEnterInput,'1')
    expect(result.length).to.eql(2)
    let result1 = parking.validateExitAction(errorEnterInput1,'1')
    expect(result1.length).to.eql(1)
  })


})


