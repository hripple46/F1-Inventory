#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);
delete require.cache[require.resolve("./models/teamPrincipal")];

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Team = require("./models/team");
const TeamPrincipal = require("./models/teamPrincipal");
const Car = require("./models/car");
const Driver = require("./models/driver");

const teams = [];
const teamPrincipals = [];
const cars = [];
const drivers = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");

  await createTeamPrincipals();
  await createCars();
  await createDrivers();
  await createTeams();

  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function teamCreate(name, teamprincipal, driver, car) {
  const team = new Team({
    name: name,
    teamprincipal: teamprincipal,
    driver: driver,
    car: car,
  });
  await team.save();
  teams.push(team);
  console.log(`Added team: ${name}`);
}
async function teamPrincipalCreate(name, age) {
  const teamPrincipal = new TeamPrincipal({
    name: name,
    age: age,
  });
  await teamPrincipal.save();
  teamPrincipals.push(teamPrincipal);
  console.log(`Added team principal: ${name}`);
}

async function createTeams() {
  console.log("Adding teams");
  const teamNames = ["Red Bull", "Mercedes", "Ferrari"];
  await Promise.all([
    teamCreate(teamNames[0], teamPrincipals[0], drivers[0], cars[0]),
    teamCreate(teamNames[1], teamPrincipals[1], drivers[1], cars[1]),
    teamCreate(teamNames[2], teamPrincipals[2], drivers[2], cars[2]),
  ]);
}

async function createTeamPrincipals() {
  console.log("Adding team principals");
  const teamPrincArray = ["Christian Horner", "Toto Wolff", "Mattias Binotto"];
  for (const teamPrinc of teamPrincArray) {
    try {
      await teamPrincipalCreate(teamPrinc, 99);
    } catch (err) {
      console.error("Error when creating team principal", err);
    }
  }
}
async function carCreate(name) {
  const car = new Car({
    name: name,
  });
  await car.save();
  cars.push(car);
}

async function createCars() {
  const carArray = ["RB19", "W14", "SF-23"];
  for (let i = 0; i < carArray.length; i++) {
    await carCreate(carArray[i], teams[i]);
  }
}

async function driverCreate(name, age) {
  const driver = new Driver({
    name: name,
    age: age,
  });
  await driver.save();
  drivers.push(driver);
}

async function createDrivers() {
  const driverArray = ["Max Verstappen", "Lewis Hamilton", "Charles Leclerc"];
  for (let i = 0; i < driverArray.length; i++) {
    await driverCreate(driverArray[i], 99);
  }
}
