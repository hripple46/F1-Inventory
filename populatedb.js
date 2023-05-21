#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Team = require("./models/team");

const teams = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createTeams();

  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function teamCreate(name) {
  const team = new Team({
    name: name,
  });
  await team.save();
  teams.push(team);
  console.log(`Added team: ${name}`);
}

async function createTeams() {
  console.log("Adding teams");
  await Promise.all([
    teamCreate("Red Bull"),

    teamCreate("Mercedes"),

    teamCreate("Ferarri"),
  ]);
}
