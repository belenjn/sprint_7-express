const request = require("supertest");
const app = require("../app");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjU3MTk5NDc5fQ.Cx-4bmnIBiw_-RAo65TmdEXtezaX2J4mAJcn-xhPfM0";

describe("Contacts route", () => {
  it("can't access without authorization", async () => {
    const res = await request(app).get("/contacts");
    expect(res.statusCode).toBe(401);
  });

  it("get all contacts", async () => {
    const res = await request(app)
      .get("/contacts")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });

  it("get one contact", async () => {
    const res = await request(app)
      .get("/contacts/:id")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });

  it("delete one contact", async () => {
    const res = await request(app)
      .delete("/contacts/:id")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });

  it("update one contact", async () => {
    const res = await request(app)
      .put("/contacts/:id")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });

  it("create new contact", async () => {
    const res = await request(app)
      .post("/contacts/:id")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });
});
