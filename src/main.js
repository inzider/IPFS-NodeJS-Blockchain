// 2018, Konijima
'use strict'

const Fork = require('child_process').Fork
const Utils = require('./libs/Utils')
const Block = require('./libs/Block')
const NodeP2P = require('./libs/NodeP2P')
const Blockchain = require('./libs/Blockchain')
const Transaction = require('./libs/Transaction')
const Wallet = require('./libs/Wallet')
const WalletContainer = require('./libs/WalletContainer')
const Logger = require('./libs/Logger')

let logger = new Logger(2)
let blockchain = new Blockchain()
let walletSystem = new Wallet({ logger, blockchain })
let nodeP2P = new NodeP2P({init: true, start: false}, { logger, blockchain })

blockchain.on('initialized', () => {
  logger.info('Blockchain has been initialized!')
})

nodeP2P.on('start', () => {
  logger.info('p2p node has been initialized!')

  TEST()
})



/* Wallet Testing */
function TEST() {
  if (!walletSystem.load('default.wallet', '')) { // Wallet not found, creating new one
    var defaultWalletContainer = Wallet.generateWallet()
    walletSystem.loadedWallet = defaultWalletContainer
    var encrypted = Utils.encryptWithPassword(JSON.stringify(defaultWalletContainer), '')
    Utils.saveFile('default.wallet', encrypted, () => {
      logger.info('Default Wallet saved successfully!')
      defaultWalletContainer = null
      encrypted = null
    })
  }
  else { // Wallet found and loaded
    logger.info(`Wallet '${walletSystem.loadedWallet.publicKey}' has been loaded!`)
  }

  /* New Block Testing */
  var height = 1
  var timestamp = Date.now()
  var data = {
    txs: [
      new Transaction('nowallet', walletSystem.loadedWallet.publicKey, 10000, Date.now() - 300),
      new Transaction(walletSystem.loadedWallet.publicKey, 'nowallet', 10000, Date.now() - 200),
      new Transaction('nowallet', walletSystem.loadedWallet.publicKey, 10000, Date.now() - 100)
    ]
  }
  var testBlock = new Block(height, timestamp, data)
  blockchain.createNextBlock(testBlock)

  logger.debug('----------------------------------------------------------------------')
  logger.debug(`Loaded Wallet: ${JSON.stringify(walletSystem.loadedWallet)}`)
  logger.debug('----------------------------------------------------------------------')
  logger.debug(`Last block: ${JSON.stringify(blockchain.getLastBlock())}`)
  logger.debug('----------------------------------------------------------------------')
  logger.debug(`Wallet Public Address: ${walletSystem.loadedWallet.publicKey}`)
  logger.debug(`Balance: ${walletSystem.getBalance()}`)
  logger.debug('----------------------------------------------------------------------')
}
