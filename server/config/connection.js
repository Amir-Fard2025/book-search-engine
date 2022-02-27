const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://l27.0.0.1/googlebooks", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
