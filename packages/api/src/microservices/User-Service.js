/* eslint-disable no-console */
const { User } = require(`../database/models`);
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);

async function checkUserCredentials(inputPassword, hashedPassword) {
  try {
    const result = await bcrypt.compare(inputPassword, hashedPassword);
    return result;
  }
  catch (error) {
    console.log(error);
    return false;
  }
}
exports.login = async (data) => {
  try {
    const users = await User.findAll();
    const inputPassword = data.data.password;
    for (const user of users) {
      const hashedPassword = user.userPassword;
      const res = await checkUserCredentials(inputPassword, hashedPassword);
      if (res) {
        if (user.userName === data.data.userName) {
          const token = jwt.sign({ userId: user.id }, `secret_key`);
          return { token };
        }
      }
    }
    return -1;
  }
  catch (error) {
    console.error(`Error checking credentials:`, error);
    throw error;
  }

};
