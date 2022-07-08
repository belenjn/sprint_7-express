const request = require("supertest");
const app = require("../app");
const users = require("../data/users.json");

const user = {
  name_user: "Tony DuBuque",
  id: 32,
  email_user: "Camron_Hand64@yahoo.com",
  phone_user: "041-858-3833",
  start_date: "2018-11-10",
  description:
    "duis pariatur aliquip duis culpa sint laborum esse labore exercitation adipisicing",
  status: "true",
};

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
    expect(res.body).toMatchObject(users);

  });

  it("get one user", async () => {
    const res = await request(app)
      .get("/users/32")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject(user);

  });

  it("delete one user", async () => {
    const res = await request(app)
      .delete("/users/:id")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: "User deleted",
    });
  });

  it("update one user", async () => {
    const res = await request(app)
      .put("/users/:id")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: "User updated",
    });
  });

  it("create new user", async () => {
    const res = await request(app)
      .post("/users")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: "New user created",
    });
  });
});
