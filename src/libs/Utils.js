// 2018, Konijima
'use strict'

const fs = require('fs')
const crypto = require('crypto')

const ALGORITHM = 'AES-256-CBC'
const HMAC_ALGORITHM = 'SHA256'

/**
 *  Utils
 */
class Utils {

  // sha256
  static sha256(data) {
    return crypto.createHash('sha256').update(data).digest('hex')
  }

  // keyPair
  static keyPair(length) {
    var prime_length = length
    var diffHell = crypto.createDiffieHellman(prime_length)
    diffHell.generateKeys()

    return {
      publicKey: diffHell.getPublicKey('hex'),
      privateKey: diffHell.getPrivateKey('hex')
    }
  }

  // encryptWithPassword
  static encryptWithPassword(data, password) {
    var cipher, encrypted = ""
    cipher = crypto.createCipher('AES-256-CBC', password)
    encrypted = cipher.update(data, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return encrypted;
  }

  // decryptWithPassword
  static decryptWithPassword(data, password) {
    var decipher, decrypted = ""
    decipher = crypto.createDecipher('AES-256-CBC', password)
    decrypted = decipher.update(data, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
  }

  // loadFile
  static loadFile(filename) {
    var result
    try {
      result = fs.readFileSync(filename, 'utf8')
    }
    catch (e) {
      return false
    }
    return result
  }

  // saveFile
  static saveFile(filename, data, callback) {
    fs.writeFile(filename, data, function (err) {
      if (err) throw Error(err)
      if (Utils.isFunction(callback))
        callback()
    });
  }

  // isInt
  static isInt(i) {
    return (typeof s === "number")
  }

  // isString
  static isString(s) {
    return (typeof s === "string")
  }

  // isBool
  static isBool(i) {
    return (typeof s === "boolean")
  }

  // isArray
  static isArray(a) {
    return (!!a) && (a.constructor === Array)
  }

  // isObject
  static isObject(a) {
    return (!!a) && (a.constructor === Object)
  }

  // isFunction
  static isFunction(f) {
    return (typeof f === "function")
  }

}

module.exports = Utils
