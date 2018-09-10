// 2018, Konijima
'use strict'

/**
 *  TransactionPool
 */
class TransactionPool {

  constructor() {
    this.pool = []
  }

  addTransaction(transaction) {
    this.pool.push(transaction)
  }

}

module.exports = TransactionPool
