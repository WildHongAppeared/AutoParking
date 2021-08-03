# AutoParking
Automated parking system

## Prequisites
- Required library
  1) NodeJS 14
  2) Yarn 1.22 or above
---
## Assumptions
- Input will be in csv format as show below 
```
3,4
Enter,motorcycle,SGX1234A,1613541902
Enter,car,SGF9283P,1613541902
Exit,SGX1234A,1613545602
Enter,car,SGP2937F,1613546029
Enter,car,SDW2111W,1613549730
Enter,car,SSD9281L,1613549740
Exit,SDW2111W,1613559745
```
- The program will only use input.csv under the root directory as input. A sample working file has been provided in the root directory
- The program will read from the file and log the output as text in the console that it is run on. There is no user interaction required in the program
- The program only supports `Exit` and `Enter` on the first column as input
- The program only supports `car` and `motorcycle` on the second column as input
- The program only accepts alphanumeric string on the third column as input
- The program only supports timestamps as an acceptable date format in the fourth column as input
---
## Design Decisions
- Input are in csv instead of plaintext as it is more easily readable by a person in case of large quantities of data (Read as excel format). Also allows for easier parsing of data format
- There are 2 classes in the program that will be used by the index file (Parking and ParkingInputMapper)
- ParkingInputMapper is the class that handles the parsing of the input file into a standard object usable by the program
- Parking is the class that uses the object output from ParkingInputMapper and performs the actual tracking of the parkings and fare calculation
- Justification for splitting into 2 different classes is to allow for more extensibility. For example, in the future we might decide to change the fare calculation formula. In this case, we can clearly separate the concern between the mapper and the Parking class and we can assume that there would be no impact to the mapper even before a single line of code is written. Having separate classes like this also makes it easier to unit test individual implementation with smaller pieces of fixture data
---
## Steps to run
- Install NodeJS [For Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04)
- Install Yarn [For Ubuntu](https://www.linuxcloudvps.com/blog/how-to-install-yarn-on-ubuntu-16-04/)
- run `yarn install` on the root directory of the program
- run `yarn start` to run the program
---
## Steps to run unit test
- Install NodeJS [For Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04) (Can be skipped if already done in Steps to run)
- Install Yarn [For Ubuntu](https://www.linuxcloudvps.com/blog/how-to-install-yarn-on-ubuntu-16-04/) (Can be skipped if already done in Steps to run)
- run `yarn test:class` on root directory of the program
