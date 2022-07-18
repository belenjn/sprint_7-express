const mongoose = require("mongoose");

const mongoConnection = async () => {
  try {
    const kittySchema = new mongoose.Schema({
      name: String,
    });

    kittySchema.methods.speak = function speak() {
      const greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name";
      console.log(greeting);
    };

    const Kitten = mongoose.model("Kitten", kittySchema);

    const silence = new Kitten({ name: "Silence" });
    console.log(silence.name);
    const fluffy = new Kitten({ name: "fluffy" });
    fluffy.speak();

    await mongoose.connect("mongodb://localhost:27017/test");
    await fluffy.save();
    fluffy.speak();

    const kittens = await Kitten.find();
    console.log(kittens);
  } catch (error) {
    console.log(error);
  }
};

mongoConnection();