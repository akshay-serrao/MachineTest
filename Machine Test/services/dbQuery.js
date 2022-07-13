const dbQuery = async (qString, values) => {
	const conn = await pool.getConnection()
	const dbResult = await conn.query(qString, values)
	conn.destroy()
	return dbResult
}

module.exports = dbQuery
