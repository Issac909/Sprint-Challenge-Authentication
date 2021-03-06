const db = require("../database/dbConfig.js");

module.exports = {
  find,
  findById,
  findBy,
  addUser
};

function find() {
  return db("users").select("id", "username");
}

function findById(id) {
  return db("users")
    .select("id", "username")
    .where({ id })
    .first();
}

function findBy(data) {
  return db("users").where(data);
}

async function addUser(userData) {
  const [id] = await db("users").insert(userData, "id");
  return db("users")
    .where({ id })
    .first();
}