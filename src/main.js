// 2018, Konijima
'use strict'

const Fork = require('child_process').Fork
const Block = require('./libs/Block')
const NodeP2P = require('./libs/NodeP2P')
const Blockchain = require('./libs/Blockchain')
const Wallet = require('./libs/Wallet')
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
})

console.log(Wallet.generateWallet())
