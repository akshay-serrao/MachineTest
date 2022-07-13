const express = require('express')
const app = express()

global.config = require('./config.json')
global.pool = require('./services/dbConnect')
global.myDecrypt = require('./services/encryptDecrypt').myDecrypt
global.myEncrypt = require('./services/encryptDecrypt').myEncrypt
global.httpError = require('./services/httpResponseHandlers').httpError
global.httpFailure = require('./services/httpResponseHandlers').httpFailure
global.httpSuccess = require('./services/httpResponseHandlers').httpSuccess
global.dbQuery = require('./services/dbQuery')

app.use(express.json())

app.use('/ping', (req, res) => res.json('pong'))

const indexRouter = require('./routes/index')
app.use('/api', indexRouter)

const port = 5000
app.listen(port, () => {
	console.log(`Express App working on port ${port}`)
	console.log(`Sample API is localhost:${port}/ping`)
})
