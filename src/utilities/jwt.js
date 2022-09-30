const jwt = require("jsonwebtoken");
const config = require("../database/config/index");

const secretKey = config.JWT_KEY;
/**
 *
 */
module.exports = class jwtHelper {
  /**
   * @param {object} payload - The details to be signed
   * @param {string} secret - The JWT secret key
   * @returns {string} The JWT signed token
   */
  static async generateToken(payload, secret = secretKey) {
    const token = await jwt.sign(payload, secret, { expiresIn: "1d" });
    return token;
  }
};
