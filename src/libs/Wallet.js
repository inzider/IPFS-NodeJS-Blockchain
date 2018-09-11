// 2018, Konijima
'use strict'

const fs = require('fs')
const EventEmitter = require('events').EventEmitter
const Utils = require('./Utils')
const Logger = require('./Logger')
const WalletContainer = require('./WalletContainer')

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

  load(walletFilename, password) {
    try {
      var fileData = Utils.loadFile(walletFilename)
      var decrypted = Utils.decryptWithPassword(fileData, password)
      decrypted = JSON.parse(decrypted)
      if (Utils.isObject(decrypted)) {
        this.loadedWallet = new WalletContainer(decrypted)
        decrypted = null
        this.logger.trace(`Wallet '${walletFilename}' has loaded!`)
        return true
      }
    }
    catch (e) {
      return false
    }
  }

  save() {
    if (this.loadedWallet instanceof WalletContainer) {

    }
    else this.logger.error('Cannot save without an active wallet!')
  }

  reset() {

  }

  send(to, amount) {

  }

  getBalance() {

  }

  getAddressBalance(addressPublicKey) {

  }

  static generateWallet() {
    return new WalletContainer(Utils.keyPair(256))
  }

}

module.exports = Wallet
