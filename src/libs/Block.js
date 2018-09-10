// 2018, Konijima
'use strict'

const Utils = require('./Utils')

/**
 *  Block
 */
class Block {

  constructor(height, timestamp, data) {
    this.height = height
    this.timestamp = timestamp
    this.data = data
    this.previousHash = 0
    this.nonce = 0
    this.hash = this.calculateHash()
  }

  calculateHash(nonce) {
    if (nonce >= 0) this.nonce = nonce
    return Utils.sha256(this.height + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce)
  }

}

module.exports = Block
