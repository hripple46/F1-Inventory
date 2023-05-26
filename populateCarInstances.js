require("dotenv").config();
const CarInstance = require("./models/carInstance");
const Car = require("./models/car");

const mongoose = require("mongoose");

let cars = [];

const MongoDB =
  "mongodb+srv://" +
  `${process.env.MONGOLOGIN}` +
  ":" +
  `${process.env.MONGOPASSWORD}` +
  "@cluster0.mncxuxu.mongodb.net/?retryWrites=true&w=majority";

const main = async () => {
  await mongoose.connect(MongoDB);
  await requestCars();
  await createCarInstances();
};
main().catch((err) => console.log(err));

async function requestCars() {
  const carArray = ["RB19", "W14", "SF-23"];
  for (let i = 0; i < carArray.length; i++) {
    const RetrievedCar = await Car.findOne({ name: carArray[i] }).exec();
    cars.push(RetrievedCar);
    cars.push(RetrievedCar);
  }
}

async function createCarInstance(
  car,
  engineStatus,
  gearboxStatus,
  bodyWorkStatus
) {
  const NewCar = new CarInstance({
    car: car,
    engineStatus: engineStatus,
    gearboxStatus: gearboxStatus,
    bodyWorkStatus: bodyWorkStatus,
  });

  await NewCar.save();
}

async function createCarInstances() {
  await Promise.all([
    createCarInstance(cars[0], "Good", "Good", "Good"),
    createCarInstance(cars[1], "Good", "Good", "Good"),

    createCarInstance(cars[2], "Good", "Good", "Good"),
    createCarInstance(cars[3], "Good", "Good", "Good"),
    createCarInstance(cars[4], "Good", "Good", "Good"),
    createCarInstance(cars[5], "Good", "Good", "Good"),
  ]);
}
