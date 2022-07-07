const request = require("supertest");
const app = require("../app");

describe("Login route", () => {
  it("correct login", async () => {
    const res = await request(app).post("/login").send({
      username: "belen@hotel.com",
      password: "1234",
    });
    expect(res.statusCode).toEqual(200);
  });
  
  it("incorrect login", async () => {
    const res = await request(app).post("/login").send({
      username: "belen@hotel.com",
      password: "12",
    });
    expect(res.statusCode).toEqual(500);
  });
});
