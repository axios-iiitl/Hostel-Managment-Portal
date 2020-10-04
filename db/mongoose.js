const mongoose = require("mongoose");
const keys = require("../config/keys");
mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((e) => {
    console.log(e.message);
    console.log("error in connecting to monogdb");
  });

mongoose.connection.on("connected", () => {
  console.log("mongoose connected to db");
});

mongoose.connection.on("error", (err) => {
  console.log(err.message);
  console.log("Error in connecting mongoose to monogdb");
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose Disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
