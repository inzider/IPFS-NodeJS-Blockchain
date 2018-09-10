// 2018, Konijima
'use strict'

const crypto = require('crypto')

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

  calculateHash() {
    return crypto.createHash('sha256').update(this.height + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce).digest("hex")
  }
  
  validateBlock(previousBlock) {
    
  }

}

module.exports = Block
