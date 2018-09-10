// 2018, Konijima
'use strict'

const EventEmitter = require('events').EventEmitter
const Utils = require('./Utils')
const Logger = require('./Logger')

/**
 *  Wallet
 */
class Wallet extends EventEmitter {

  constructor(pipes) {
    super()

    this.loadedWallet = null

    this.blockchain = null
    this.logger = new Logger()

    if (pipes.logger) this.logger = pipes.logger
    if (pipes.blockchain) this.blockchain = pipes.blockchain
  }

  load() {

  }

  save() {

  }

  send(to, amount) {
    if (!this.loadedWallet) throw Error("Trying to send coin with no wallet loaded!")
  }

  getBalance() {
    if (!this.loadedWallet) throw Error("Trying to get balance with no wallet loaded!")
  }

  static generateWallet() {
    return Utils.keyPair(256)
  }

}

module.exports = Wallet
