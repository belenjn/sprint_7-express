const { connection } = require("../db");

const getRooms = (req, res) => {
  connection.query("SELECT * FROM rooms", (error, results, fields) => {
    return res.json({ rooms: results });
  });
};

const getRoom = (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT room_id, room_number, bed_type, description, offer, price, discount, cancellation, amenities, GROUP_CONCAT(url_image SEPARATOR ', ') AS images FROM rooms INNER JOIN room_images USING (room_id) WHERE room_id = ?; ",
    [id],
    (err, results) => {
      return res.json({ room: results });
    }
  );
};

const deleteRoom = (req, res) => {
  const id = req.params.id;
  connection.query(
    "DELETE FROM rooms WHERE room_id = ?",
    [id],
    (err, results) => {
      return res.json({ success: true, message: "Room successfully deleted" });
    }
  );
};

const updateRoom = (req, res) => {
  const id = req.params.id;
  connection.query(
    "UPDATE rooms SET room_number = ?, bed_type = ?, description = ?, offer = ?, price = ?, discount = ?, cancellation = ?, amenities = ? WHERE room_id = ?",
    [
      req.body.room_number,
      req.body.bed_type,
      req.body.description,
      req.body.offer,
      req.body.price,
      req.body.discount,
      req.body.cancellation,
      req.body.amenities,
      id,
    ],
    (err, results) => {
      return res.json({ success: true, message: "Room successfully updated" });
    }
  );
};

const newRoom = (req, res) => {
  const newRoom = [
    req.body.room_number,
    req.body.bed_type,
    req.body.description,
    req.body.offer,
    req.body.price,
    req.body.discount,
    req.body.cancellation,
    req.body.amenities,
  ];
  connection.query(
    "INSERT INTO rooms (room_number, bed_type, description, offer, price, discount, cancellation, amenities) VALUES (?)",
    [newRoom],
    (err, results) => {
      console.log(newRoom);
      if (err) throw err;
      return res.json({ success: true, message: "Room successfully added" });
    }
  );
};

module.exports = {
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  newRoom,
};
