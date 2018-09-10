// 2018, Konijima
'use strict'

const EventEmitter = require('events').EventEmitter
const Block = require('./Block')
const Transaction = require('./Transaction')
const TransactionPool = require('./TransactionPool')

/**
 *  Blockchain
 */
class Blockchain extends EventEmitter {

  constructor() {
    super()
    this.chain = [this.createGenesisBlock()]
    this.transactionPool = new TransactionPool()
    this.emit('initialized', this)
  }

  createGenesisBlock() {
    return new Block(0, Date.now() , "Genesis Block")
  }

  getHeight() {
    return this.chain.length - 1
  }

  getBlockByHash(hash) {

  }

  getBlockByHeight(height) {

  }

  addBlock(block) {
    block.previousHash = this.chain[this.chain.length - 1].hash
    block.height = this.chain[this.chain.length - 1].height + 1
    block.calculateHash()
    this.chain.push(block)
    this.emit('block_added')
  }

  validateChain() {
    return true
  }

}

module.exports = Blockchain
