const EventEmitter = require('events')
const { onAppointmentCreated } = require('./appointments')

class DbEventEmitter extends EventEmitter {}

const dbEventEmitter = new DbEventEmitter()

module.exports = dbEventEmitter

dbEventEmitter.on('appointment-created', onAppointmentCreated)
