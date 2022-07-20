require("../db");
const Room = require("../models/Rooms");

const getRooms = async (req, res) => {
  const rooms = await Room.find();
  return res.json(rooms);
};

const getRoom = async (req, res) => {
  try {
    const room = await Room.findOne({ _id: req.params.id });
    return res.json(room);
  } catch (error) {
    res.status(404).json({ success: false, message: "Room not found" });
    console.log(error);
  }
};

const deleteRoom = async (req, res) => {
  try {
    await Room.findOneAndDelete({ _id: req.params.id });
    return res.json({ success: true, message: "Room successfully deleted" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Room not found" });
    console.log(error);
  }
};

const updateRoom = async (req, res) => {
  try {
    await Room.findOneAndUpdate(
      { _id: req.params.id },
      {
        room_number: req.body.room_number,
        bed_type: req.body.bed_type,
        offer: req.body.offer,
        price: req.body.price,
        discount: req.body.discount,
        cancellation: req.body.cancellation,
        amenities: req.body.amenities,
        images: req.body.images,
      }
    );
    return res.json({ success: true, message: "Room successfully updated" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Room not found" });
    console.log(error);
  }
};

const newRoom = async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    await newRoom.save();
    return res.json({ success: true, message: "Room successfully added" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Room not found" });
    console.log(error);
  }
};

module.exports = {
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  newRoom,
};
