require("dotenv").config();

const mongoose = require("mongoose");
const Drivers = require("./models/driver");

const MongodDB =
  "mongodb+srv://" +
  `${process.env.MONGOLOGIN}` +
  ":" +
  `${process.env.MONGOPASSWORD}` +
  "@cluster0.mncxuxu.mongodb.net/?retryWrites=true&w=majority";
const main = async () => {
  await mongoose.connect(MongodDB);

  await Drivers.updateOne(
    { name: "Charles Leclerc" },
    { $set: { age: 25, championships: 0 } }
  );
  mongoose.connection.close();
};
main();
