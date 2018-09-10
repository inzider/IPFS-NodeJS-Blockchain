// 2018, Konijima
'use strict'

const IPFS = require('ipfs')
const Utils = require('./Utils')
const Logger = require('./Logger')

/**
 *  NodeP2P
 */
class NodeP2P extends IPFS {

  constructor(configs, pipes) {
    super(configs)
    this.blockchain = null
    this.logger = new Logger()

    if (pipes.logger) this.logger = pipes.logger
    if (pipes.blockchain) this.blockchain = pipes.blockchain

    this.on('init', () => {
      this.logger.info('Starting p2p node...')
      this.start()
    })
  }

  emitMany(events) {
    if (!Utils.isArray(events)) throw 'emitMany must be an array of string or objects'

    for (var x = 0; x < events.length; x++) {
      if (Utils.isString(events[x])) {
        this.emit(events[x])
      }
      else if (Utils.isObject(events[x])) {
        this.emit(events[x].name, events[x].data)
      }
      else throw 'emitMany must be an array of string or objects'
    }
  }

}

module.exports = NodeP2P
