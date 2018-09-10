// 2018, Konijima
'use strict'

const crypto = require('crypto')

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

}

module.exports = Utils
