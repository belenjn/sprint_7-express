const request = require("supertest");
const app = require("../app");
const bookings = require("../data/bookings.json");
const jwt = require("jsonwebtoken");
const { passportKey } = require("../env");
const { timeToRefreshToken } = require("../constants");

const token = jwt.sign({ user: {} }, passportKey, {expiresIn: timeToRefreshToken});

const booking = {
  name_guest: "Eugene West",
  id: 22,
  order_date: "2021-11-01",
  sales: "2021-09-04",
  occupancy: "2023-01-18",
  special_request:
    "minim dolor eiusmod dolor enim ut enim ut cupidatat sit mollit eu deserunt reprehenderit qui",
  room_number: 13,
  rate: 215,
  bed_type: "Suite bed",
  status: "false",
};


describe("Bookings route", () => {
  it("can't access without authorization", async () => {
    const res = await request(app).get("/bookings");
    expect(res.statusCode).toBe(401);
  });

  it("get all bookings", async () => {
    const res = await request(app)
      .get("/bookings")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject(bookings);
  });

  it("get one booking", async () => {
    const res = await request(app)
      .get("/bookings/22")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject(booking);
  });

  it("delete one booking", async () => {
    const res = await request(app)
      .delete("/bookings/:id")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: "Booking deleted",
    });
  });

  it("update one booking", async () => {
    const res = await request(app)
      .put("/bookings/:id")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: "Booking updated",
    });
  });

  it("create new booking", async () => {
    const res = await request(app)
      .post("/bookings")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: "New booking added",
    });
  });
});
