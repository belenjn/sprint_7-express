const request = require("supertest");
const app = require("../app");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjU3MTk5NDc5fQ.Cx-4bmnIBiw_-RAo65TmdEXtezaX2J4mAJcn-xhPfM0";

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
  });

  it("get one booking", async () => {
    const res = await request(app)
      .get("/bookings/:id")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });

  it("delete one booking", async () => {
    const res = await request(app)
      .delete("/bookings/:id")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });

  it("update one booking", async () => {
    const res = await request(app)
      .put("/bookings/:id")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });

  it("create new booking", async () => {
    const res = await request(app)
      .post("/bookings/:id")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });
});
