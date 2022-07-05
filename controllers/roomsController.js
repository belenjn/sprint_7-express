let rooms = require("../data/rooms.json");

const getRooms = (req, res) => {
  return res.json(rooms);
};

const getRoom = (req, res) => {
  const room = rooms.find((r) => String(r.id) === req.params.id);
  return res.json(room);
};

const deleteRoom = (req, res) => {
  const roomId = rooms.find((room) => String(room.id) === req.params.id);
  rooms.splice(roomId, 1);

  return res.json("room deleted");
};

const updateRoom = (req, res) => {
  rooms.forEach((room, index) => {
    if (room.id === req.params.id) {
      return (rooms[index] = req.body);
    }
  });

  return res.json("room updated");
};

const newRoom = (req, res) => {
  rooms = [...rooms, req.body];
  return res.json("room added");
};

module.exports = {
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  newRoom,
};
