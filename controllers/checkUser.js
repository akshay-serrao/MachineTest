const checkUser = async (req, res) => {
	try {
		const { username } = req.body

		const checkResult = await dbQuery('SELECT COUNT(username) as cnt FROM auth WHERE username=?', username)

		if (checkResult[0][0].cnt == 0) {
			httpSuccess(res, 'Username available')
		} else httpFailure(res, 'Username is already in use')
	} catch (e) {
		console.log('Error in CATCH for checkUser is ', e)
		httpError(res, e, 'Failed to check username')
	}
}

module.exports = checkUser
