const jwt = require("jsonwebtoken");
const config = require("./config");
const bcrypt = require("bcryptjs");

const encryptPassword = (password: string) =>
  new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err: Error, salt: any) => {
      if (err) {
        reject(err);
        return false;
      }
      bcrypt.hash(password, salt, (err: Error, hash: any) => {
        if (err) {
          reject(err);
          return false;
        }
        resolve(hash);
        return true;
      });
    });
  });

const comparePassword = (password: string, hash: any) =>
  new Promise(async (resolve, reject) => {
    try {
      const isMatch = await bcrypt.compare(password, hash);
      resolve(isMatch);
      return true;
    } catch (err) {
      reject(err);
      return false;
    }
  });

const getToken = (payload: any) => {
  const token = jwt.sign(payload, "secret", {
    expiresIn: 60800, // 1 week
  });
  return token;
};

const getPayload = (token: any) => {
  try {
    const payload = jwt.verify(token, "secret" /* config.secret */);
    return { loggedIn: true, payload };
  } catch (err) {
    console.log("Could not get payload, user was not logged in.");
    return { loggedIn: false };
  }
};

module.exports = {
  getToken,
  getPayload,
  encryptPassword,
  comparePassword,
};

export {};
