// 2018, Konijima
'use strict'

const Transaction = require('./Transaction')

/**
 *  TransactionPool
 */
class TransactionPool {

  constructor() {
    this.pool = []
  }

  addTransaction(transaction) {
    if (transaction instanceof Transaction) {
      this.pool.push(transaction)
    }
    else throw Error('Must be a Transaction object')
  }

}

module.exports = TransactionPool
