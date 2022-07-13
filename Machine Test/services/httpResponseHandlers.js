function httpSuccess(res, msg) {
	return res.json({ status: 'success', msg })
}

function httpFailure(res, msg) {
	return res.json({ status: 'failure', msg })
}

function httpError(res, errorObj = '', errorMsg = '', code = 500) {
	return res.status(code).send({ errorObj, errorMsg })
}

module.exports = { httpSuccess, httpFailure, httpError }
