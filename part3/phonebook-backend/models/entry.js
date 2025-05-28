const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URL;

console.log("connecting to", url);

mongoose.connect(url)
  .then(result => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("error connecting to MongoDB", error.message)
  });

const entrySchema = new mongoose.Schema({
  name: String,
  number: String,
});

entrySchema.set("toJSON", {
  transform: (document, returned) => {
    returned.id = returned._id.toString();
    delete returned._id;
    delete returned.__v;
  }
});

module.exports = mongoose.model("Entry", entrySchema);


