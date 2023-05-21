#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Team = require("./models/team");
const TeamPrincipal = require("./models/teamPrincipal");

const teams = [];
const teamPrincipals = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createTeams();
  await createTeamPrincipals();

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
async function teamPrincipalCreate(name, team) {
  const teamPrincipal = new TeamPrincipal({
    name: name,
    team: team,
  });
  await teamPrincipal.save();
  teamPrincipals.push(teamPrincipal);
  console.log(`Added team principal: ${name}`);
}

async function createTeams() {
  console.log("Adding teams");
  const teamNames = ["Red Bull", "Mercedes", "Ferrari"];
  for (const name of teamNames) {
    await teamCreate(name);
  }
}

async function createTeamPrincipals() {
  console.log("Adding team principals");
  await Promise.all([
    teamPrincipalCreate("Christian Horner", teams[0]),

    teamPrincipalCreate("Toto Wolff", teams[1]),

    teamPrincipalCreate("Mattias Binotto", teams[2]),
  ]);
}
