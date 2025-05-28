require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.MONGODB_URL;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const entrySchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Entry = mongoose.model("Entry", entrySchema);

if (process.argv.length < 4) {
  Entry.find({}).then(result => {
    console.log("phonebook:");

    result.forEach(entry => {
      console.log(`${entry.name} ${entry.number}`);
    });
    mongoose.connection.close();
  });

} else {
  const entry = new Entry({
    name: process.argv[3],
    number: process.argv[4]
  });

  entry.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
}


