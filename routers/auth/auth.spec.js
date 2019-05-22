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

      user = await Auth.add({ username: "sam", password: "same"  });
      expect(user.username).toBe("sam");

      const users = await db("users");
      expect(users).toHaveLength(2);

      expect(Auth.find()).toBeArray()
    });
    
    it("should return an array", async () => {
      expect(Auth.find()).toBeArray()
    })
  });


});
