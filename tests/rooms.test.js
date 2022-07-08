const request = require("supertest");
const app = require("../app");
const rooms = require("../data/rooms.json");

const room = {
  id: 96,
  room_name: "Leland Prairie",
  room_number: 20,
  floor_room: 4,
  bed_type: "Double bed",
  facilities: "AC, Shower, Double Bed, Towel, Bathup, Coffee Set, LED TV, Wifi",
  description: "id proident non excepteur occaecat",
  date_room: "2021-06-19 03:13:41",
  rate: 240,
  status: "false",
};

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjU3MTk5NDc5fQ.Cx-4bmnIBiw_-RAo65TmdEXtezaX2J4mAJcn-xhPfM0";

describe("Rooms route", () => {
  it("can't access without authorization", async () => {
    const res = await request(app).get("/rooms");
    expect(res.statusCode).toBe(401);
  });

  it("get all rooms", async () => {
    const res = await request(app)
      .get("/rooms")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject(rooms);

  });

  it("get one room", async () => {
    const res = await request(app)
      .get("/rooms/96")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject(room);

  });

  it("delete one room", async () => {
    const res = await request(app)
      .delete("/rooms/:id")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: "Room deleted",
    });
    
  });

  it("update one room", async () => {
    const res = await request(app)
      .put("/rooms/:id")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: "Room updated",
    });
  });

  it("create new room", async () => {
    const res = await request(app)
      .post("/rooms/")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: "New room created",
    });
  });
});
