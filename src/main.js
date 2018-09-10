// 2018, Konijima
'use strict'

const Block = require('./libs/Block')
const NodeP2P = require('./libs/NodeP2P')
const Blockchain = require('./libs/Blockchain')

let nodeP2P = null
let blockchain = new Blockchain()

blockchain.on('initialized', () => {
  console.log('Blockchain has been initialized successfully!')

  nodeP2P = new NodeP2P()

  nodeP2P.on('init', () => {
    console.log('P2P peerId has been generated!')
  })

  nodeP2P.on('ready', () => {
    console.log('P2P has initialized!')
    nodeP2P.start()
  })

  nodeP2P.on('start', () => {
    console.log('P2P node has been started successfully!')
  })

  /* Blockchain debug
  var newBlock = new Block(1, Date.now(), {})
  blockchain.addBlock(newBlock)
  console.log(blockchain)*/
})
