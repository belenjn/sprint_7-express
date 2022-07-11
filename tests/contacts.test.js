const request = require("supertest");
const app = require("../app");
const contacts = require("../data/contacts.json");
const jwt = require("jsonwebtoken");
const { passportKey } = require("../env");
const { timeToRefreshToken } = require("../constants");

const token = jwt.sign({ user: {} }, passportKey, {expiresIn: timeToRefreshToken});

const contact = {
  id: 1,
  name_guest: "Amanda Pagac",
  email_guest: "Julia_Heaney26@yahoo.com",
  phone_guest: "929-154-7228",
  date_subject: "2021-06-19 03:13:41",
  subject: "cupidatat dolore culpa minim cupidatat do velit esse",
  comment:
    "ut reprehenderit velit amet occaecat consectetur irure nisi in cillum excepteur ipsum reprehenderit proident sint deserunt ea veniam consectetur sint dolor eiusmod ut culpa veniam amet minim laborum dolore consectetur minim laboris qui",
};

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
    expect(res.body).toMatchObject(contacts);
  });

  it("get one contact", async () => {
    const res = await request(app)
      .get("/contacts/1")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject(contact);
  });

  it("delete one contact", async () => {
    const res = await request(app)
      .delete("/contacts/:id")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: "Contact deleted",
    });
  });

  it("update one contact", async () => {
    const res = await request(app)
      .put("/contacts/:id")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: "Contact updated",
    });
  });

  it("create new contact", async () => {
    const res = await request(app)
      .post("/contacts")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: "New contact created",
    });
  });
});
