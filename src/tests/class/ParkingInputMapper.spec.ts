import ParkingInputMapper from '../../class/ParkingInputMapper'
import { expect } from 'chai'
import 'mocha'
const fs = require('fs')
const path = require('path')

const testData = fs.readFileSync(path.join(__dirname, "test_input.csv"), "utf8") 
describe('ParkingInputMapper Unit Test', () => {

  let parkingInputMapper = new ParkingInputMapper(testData)
  it('Should map input data to proper objects', () => {
    expect(parkingInputMapper.getCarLotCount()).to.eql(3)
    expect(parkingInputMapper.getMotorLotCount()).to.eql(4)
  })

  it('Should map csv row to proper ParkingInput', () => {
    let rows = parkingInputMapper.getParkingInputs()
    expect(rows[0]).to.have.property('action')
    expect(rows[0]).to.have.property('vehiclePlate')
    expect(rows[0]).to.have.property('timestamp')
  })

  it('Should have correct number of rows', () => {
    let rows = parkingInputMapper.getParkingInputs()
    expect(rows.length).to.eql(7)
  })

})


