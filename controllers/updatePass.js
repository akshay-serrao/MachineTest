const updatePass = async (req, res) => {
	try {
		const { username, password } = req.body

		const updatePassResult = await dbQuery('UPDATE auth SET password=? WHERE username=?', [ password, username ])

		if (updatePassResult[0].affectedRows > 0) {
			httpSuccess(res, 'Changed password successfully')
		} else httpFailure(res, 'Failed to change password')
	} catch (e) {
		console.log('Error in CATCH for updatePass is', e)
		httpError(res, e, 'Failed to change password')
	}
}

module.exports = updatePass
