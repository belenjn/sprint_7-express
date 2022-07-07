const request = require("supertest");
const app = require("../app");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjU3MTk5NDc5fQ.Cx-4bmnIBiw_-RAo65TmdEXtezaX2J4mAJcn-xhPfM0";

describe("Users route", () => {
  it("can't access without authorization", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(401);
  });

  it("get all users", async () => {
    const res = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });

  it("get one user", async () => {
    const res = await request(app)
      .get("/users/:id")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });

  it("delete one user", async () => {
    const res = await request(app)
      .delete("/users/:id")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });

  it("update one user", async () => {
    const res = await request(app)
      .put("/users/:id")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });

  it("create new user", async () => {
    const res = await request(app)
      .post("/users/:id")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });
});
