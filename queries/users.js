const db = require("../db/dbConfig.js");
//* import bcrypt
const bcrypt = require("bcrypt");
//? saltrounds
const saltRounds = 10;
// GET All Users
const getAllUsers = async () => {
  try {
    const allUsers = await db.any("SELECT * users");
    return allUsers;
  } catch (error) {
    return error;
  }
};
// GET One User
getOneUser = async (id) => {
  try {
    const getUser = await db.one("SELECT * users FROM users WHERE id=$1", id);
    return getUser;
  } catch (error) {
    return error;
  }
};
// CREATE A USER - POST
//* install bcrypt to use salting and hashing
const createUser = async (user) => {
  const { password, username } = user;
  try {
    const salt = await bcrypt.genSalt(saltRounds); //* SALTing
    const hashedPassword = await bcrypt.hash(password, salt); //* HASHing - encrypt password
    //! only send hashedPassword to the database.. never the actual user password
    const newUser = await db.$config(
      "INSERT INTO users (username, password) VALUES($1, $2) RETURNING *",
      [username, hashedPassword]
    );
    if (newUser) {
      return newUser;
    }
  } catch (error) {
    return error;
  }
};
// UPDATE A User - PUT

// DELETE A User

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
