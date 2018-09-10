// 2018, Konijima
'use strict'

/**
 *  Logger
 */
class Logger {

  constructor(logLevel) {
    if (!logLevel) logLevel = 0
    this.logLevel = logLevel
  }

  info(log) {
    console.log("INFO:", log)
  }

  error(log) {
    console.log("ERROR:", log)
  }

  trace(log) {
    if (this.logLevel >= 1)
      console.log("TRACE:", log)
  }

  debug(log) {
    if (this.logLevel >= 2)
      console.log("DEBUG:", log)
  }

}

module.exports = Logger
