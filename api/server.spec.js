const request = require("supertest");

const server = require("./server");

describe("server", function () {
  describe("GET /", function () {
    it("should return 200", async function () {
      return request(server) // return async call to let jest know it should wait
        .get("/")
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
  });
});
