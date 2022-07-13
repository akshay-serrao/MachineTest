const saveCred = async (req, res) => {
	try {
		const { username, password } = req.body

		const saveCredResult = await dbQuery('INSERT INTO auth (username,password) VALUES (?,?)', [ username, password ])

		if (saveCredResult[0].affectedRows > 0) {
			httpSuccess(res, `Saved credentials successfully. Insert ID - ${saveCredResult[0].insertId}`)
		} else httpFailure(res, `Failed to save credentials`)
	} catch (e) {
		console.log('Error in CATCH for saveCred is', e)
		if (e.code == 'ER_DUP_ENTRY') httpFailure(res, 'Failed to save credentials. Username already in use')
		else httpError(res, e, 'Failed to save credentials')
	}
}

module.exports = saveCred
