const mysql = require('mysql2/promise')
const config = require('../config.json')

const decodedPass = Buffer.from(config.MySql.password, 'base64').toString('ascii')

const pool = mysql.createPool({
	connectionLimit : config.MySql.connectionLimit,
	host            : config.MySql.host,
	user            : config.MySql.user,
	password        : decodedPass,
	database        : config.MySql.database
})

module.exports = pool
