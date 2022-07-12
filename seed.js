const { faker } = require("@faker-js/faker");
const { connection } = require("./db");

connection.connect(function (err) {
  if (err) throw err;

  //Rellenar tabla users
  const sqlUsers =
    "INSERT INTO users (user_name, user_email, user_phone, start_date, occupation, status, photo, password) VALUES (?)";
  for (let i = 0; i < 10; i++) {
    let values = [
      faker.name.firstName() + faker.name.lastName(),
      faker.internet.email(),
      faker.phone.number("###-###-###"),
      faker.date.past(),
      faker.helpers.arrayElement(["manager", "reception", "room_service"]),
      faker.helpers.arrayElement([0, 1]),
      faker.image.avatar(),
      faker.internet.password(),
    ];
    connection.query(sqlUsers, [values], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });
  }

  //Rellenar tabla contact
  const sqlContact =
    "INSERT INTO contact (contact_name, contact_email, contact_phone, contact_date, subject, comment, viewed, archived) VALUES (?)";
  for (let i = 0; i < 10; i++) {
    let values = [
      faker.name.firstName() + faker.name.lastName(),
      faker.internet.email(),
      faker.phone.number("###-###-###"),
      faker.date.past(),
      faker.hacker.phrase(),
      faker.lorem.sentence(),
      faker.helpers.arrayElement([0, 1]),
      faker.helpers.arrayElement([0, 1]),
    ];
    connection.query(sqlContact, [values], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });
  }

  //Rellenar tabla rooms
  //   const sqlRooms =
  //     "INSERT INTO rooms (room_number, bed_type, description, offer, price, discount, cancellation, amenities) VALUES (?)";
  //   for (let i = 1; i <= 10; i++) {
  //     let values = [
  //       faker.random.numeric(),
  //       faker.helpers.arrayElement([
  //         "single_bed",
  //         "double_bed",
  //         "double_superior",
  //         "suite",
  //       ]),
  //       faker.lorem.sentence(200),
  //       faker.helpers.arrayElement([0, 1]),
  //       faker.finance.amount(50, 100, 0, "$"),
  //       faker.finance.amount(0, 15, 0, "$"),
  //       faker.lorem.sentence(200),
  //       faker.helpers.arrayElements(["cat", "dog", "mouse"], 2),
  //     ];
  //     connection.query(sqlRooms, [values], function (err, result) {
  //       if (err) throw err;
  //       console.log("Number of records inserted: " + result.affectedRows);
  //     });
  //   }
  //Rellenar tabla rooms_images
  //Rellenar tabla bookings
});