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
    if (this.loadedWallet)
      return this.getAddressBalance(this.loadedWallet.publicKey)
  }

  getAddressBalance(addressPublicKey) {
    var balance = 0
    var relatedTxs = []
    var chain = this.blockchain.chain

    for (var x = 0; x < chain.length; x++) {
      var parsed = JSON.parse(chain[x].data)
      if (parsed.txs.length >= 0) {
        for (var y in parsed.txs) {
          if (parsed.txs[y].to === addressPublicKey || parsed.txs[y].from === addressPublicKey) {
            relatedTxs.push(parsed.txs[y])
          }
        }
      }
    }

    // Sort by timestamp
    var orderTxs = relatedTxs.sort(function(a, b) {
      return a.timestamp - b.timestamp;
    });
    for (var i in orderTxs) {
      var tx = orderTxs[i]
      if (tx.to === addressPublicKey) {
        balance += tx.amount
      }
      else if (tx.from === addressPublicKey) {
        balance -= tx.amount
      }
    }

    return balance.toFixed(4)
  }

  static generateWallet() {
    return new WalletContainer(Utils.keyPair(256))
  }

}

module.exports = Wallet
