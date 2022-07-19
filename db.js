const mongoose = require("mongoose");
const { uri } = require("./env");


const mongoConnection = async () => {
  try {

    await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
   
  } catch (error) {
    console.log(error);
  }
};

mongoConnection();
