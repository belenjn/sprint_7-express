const mongoose = require("mongoose");
const { uri } = require("./env");

const { roomsSchema } = require("./models/Rooms");

const mongoConnection = async () => {
  try {
    const Room = mongoose.model("Rooms", roomsSchema);

    await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    const room = new Room({
      room_number: 2,
      bed_type: ["single", "double"],
      description: "jdbfjkdndsf",
      offer: 23,
      price: 400,
      discount: 0,
      cancellation: "test",
      amenities: "testing",
    });

    console.log(room);
  } catch (error) {
    console.log(error);
  }
};

mongoConnection();
