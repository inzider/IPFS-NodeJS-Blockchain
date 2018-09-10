// 2018, Konijima
'use strict'

const Block = require('./libs/Block')
const NodeP2P = require('./libs/NodeP2P')
const Blockchain = require('./libs/Blockchain')

let nodeP2P = null
let blockchain = new Blockchain()

blockchain.on('initialized', () => {
  console.log('Blockchain has been initialized successfully!')
})
