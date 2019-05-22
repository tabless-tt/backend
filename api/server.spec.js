const request = require("supertest");

const server = require("./server.js");

describe("server", () => {
  describe("Get /", () => {

    it("should return 200 ok", () => {
      return request(server)
        .get("/")
        .expect(200);
    });

    it("using the sqaud (async/await)", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });

    it("using (async/await) should return JSON", async () => {
      const res = await request(server).get("/");
      expect(res.type).toBe("application/json");
    });

    it("should return JSON using done callback", done => {
        request(server)
          .get("/")
          .then(res => {
            expect(res.type).toBe("application/json");
            done();
          });
      });

    it('should return {api:"Tabless Thursday api running"}', () => {
        return request(server)
          .get("/")
          .then(res => {
            const { body } = res;
            expect(body.api).toBe("Tabless Thursday api running");
          });
      });

      
  });

  describe("POST /", () => {

  })

  describe("PUT /", () => {

  })
  describe("DEL /", () => {

  })
});
