const Vonage = require('@vonage/server-sdk')

module.exports = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET
});