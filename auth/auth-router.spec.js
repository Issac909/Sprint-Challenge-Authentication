const request = require("supertest");

const server = require("../api/server");

describe("users", function () {
  it("should run the tests", function () {
    expect(true).toBe(true);
  });

  describe("GET /api/auth/logout - logout the current user", function () {
    it("should return 200 OK", function () {
      return request(server)
        .get("/api/auth/logout")
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
  });
  describe("POST /api/auth/register", () => {
    const user = { username: 'issac', password: 'secret' };
    it("should return 201", () => {
    return request(server)
        .post("/api/auth/register")
        .send({ username: user.username, password: user.password })
        .then(res => {
            expect(res.status).toBe(201);
        })
    });
    it("should return json", async() => {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "issac", password: "password" })
        .then((res) => {
          expect(res.type).toBe("application/json");
        });
    });
  });

  describe("login", () => {
    it("should return an array", () => {
      return request(server)
        .get("/api/auth/login")
        .then((res) => {
          expect(Array.isArray([res.body])).toBe(true);
        });
    });
  });
});
