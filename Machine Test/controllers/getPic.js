const Duplex = require('stream').Duplex

function bufferToStream(buffer) {
	const stream = new Duplex()
	stream.push(buffer)
	stream.push(null)
	return stream
}

const getPic = async (req, res) => {
	try {
		const { username } = req.body

		const picResult = await dbQuery('SELECT profilePic, picType FROM user_details WHERE username=?', username)

		if (picResult[0].length) {
			const finaleRes = bufferToStream(Buffer.from(JSON.parse(picResult[0][0].profilePic), 'base64'))
			res.setHeader('Content-Type', picResult[0][0].picType)
			finaleRes.pipe(res)
		} else {
			httpFailure(res, 'Incorrect Username')
		}
	} catch (e) {
		console.log('Error in CATCH for getPic is ', e)
		httpError(res, e, 'Failed to get profile pic')
	}
}

module.exports = getPic
