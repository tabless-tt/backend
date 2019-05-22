const db = require("../../database/dbConfig");

const Auth = require("./authModel.js");

describe("auth model", () => {

  afterEach(async () => {
    await db("users").truncate();
  });

  describe("add()", () => {

    it("should insert new user", async () => {
      await Auth.add({ username: "irving", password: "irving" });
      const user = await db("users");
      expect(user).toHaveLength(1);
    });

    it("should insert provided user", async () => {
      let user = await Auth.add({ username: "irving", password: "irving" });
      expect(user.username).toBe("irving");

      user = await Auth.add({ username: "sam", password: "same" });
      expect(user.username).toBe("sam");

      const users = await db("users");
      expect(users).toHaveLength(2);
    });
  });

  describe("find()", () => {
    it("should return an array", async () => {
      const find = await Auth.find();
      const array = [];
      expect(find).toEqual(array);
    });
  });

  describe("add(), findById() together", () => {
    it("should return users info, email null", async () => {
      let user = await Auth.add({ username: "irving", password: "irving" });
      // expect(user.username).toBe("irving");

      const find = await Auth.findById(1);
      const array = [];
      expect(find).toEqual({
        email: null,
        id: 1,
        password: "irving",
        username: "irving"
      });
    });

    it("should return users info", async () => {
      let user = await Auth.add({
        username: "irving",
        password: "irving",
        email: "irving@gmail.com"
      });
      // expect(user.username).toBe("irving");

      const find = await Auth.findById(1);
      const array = [];
      expect(find).toEqual({
        email: "irving@gmail.com",
        id: 1,
        password: "irving",
        username: "irving"
      });
    });
  });
});
