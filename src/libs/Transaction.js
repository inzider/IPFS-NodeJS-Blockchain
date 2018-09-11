// 2018, Konijima
'use strict'

const Utils = require('./Utils')

/**
 *  Transaction
 */
class Transaction {

  constructor(to, from, amount, timestamp) {
    this.to = to
    this.from = from
    this.amount = amount
    this.timestamp = timestamp
  }

}

module.exports = Transaction
