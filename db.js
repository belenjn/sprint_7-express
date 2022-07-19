const mongoose = require("mongoose");
const { url_local } = require("./env");
const { bookingsSchema } = require("./schemas/Bookings");
const { contactsSchema } = require("./schemas/Contacts");
const { roomsSchema } = require("./schemas/Rooms");
const { usersSchema } = require("./schemas/Users");

const mongoConnection = async () => {
  try {

    const Users = mongoose.model('Users', usersSchema);
    const Contacts = moongose.model('Contacts', contactsSchema);
    const Rooms = moongose.model('Rooms', roomsSchema);
    const Bookings = moongose.model('Bookings', bookingsSchema);

    await mongoose.connect(url_local, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
   
  } catch (error) {
    console.log(error);
  }
};

mongoConnection();
