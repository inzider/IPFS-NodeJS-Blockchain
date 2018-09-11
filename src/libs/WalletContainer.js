// 2018, Konijima
'use strict'

/**
 *  WalletContainer
 */
class WalletContainer {

  constructor(data) {
    this.publicKey = data.publicKey
    this.privateKey = data.privateKey
  }

}

module.exports = WalletContainer
