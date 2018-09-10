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
    this.difficulty = 5

    setTimeout(() => {
      this.emit('initialized')
    }, 0)
  }

  createGenesisBlock() {
    return new Block(0, Date.now() , "Genesis Block")
  }

  createNextBlock(newBlock) {
    newBlock.previousHash = this.chain[this.chain.length - 1].hash
    newBlock.height = this.chain[this.chain.length - 1].height + 1
    newBlock.calculateHash()

    this.chain.push(newBlock)
    this.emit('block_added', newBlock)
  }

  getHeight() {
    return this.chain.length - 1
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1]
  }

  getBlockByHash(hash) {

  }

  getBlockByHeight(height) {

  }

  replaceChain(newChain) {
    if (!this.isValidChain(newChain)) {
      this.emit('invalid_chain_given')
      return null
    }

    if (newChain.length > this.chain.length) {
      var oldChain = this.chain
      this.chain = newChain
      this.emit('chain_switched_longer_chain')
    }
    else {
      this.emit('chain_not_replaced')
    }
  }

  isValidNewBlock(newBlock, previousBlock) {
    if (previousBlock.height + 1 !== newBlock.height) {
      return false;
    }
    else if (previousBlock.hash !== newBlock.previousHash) {
      return false;
    }
    else if (newBlock.calculateHash() !== newBlock.hash) {
      return false;
    }

    return true;
  }

  isValidChain(newChain) {
    return true
  }

  validateProofOfWork(block, difficulty) {
    if (block.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      return true;
    }
  }

}

module.exports = Blockchain
