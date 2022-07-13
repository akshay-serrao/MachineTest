const saveUpdateProfDetails = async (req, res) => {
	try {
		const parsedBody = payload(req.body.jsonString)
		if (parsedBody.badPayload) return httpFailure(res, 'Incorrect input payload')
		const pic = req.file

		let qString, values
		if (parsedBody.flag == 'save') {
			qString = 'INSERT INTO user_details (username, firstName, lastName, age, phoneNo, address, profilePic, picType) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
			values = [ parsedBody.username, parsedBody.fName, parsedBody.lName, parsedBody.age, parsedBody.phone, parsedBody.address, JSON.stringify(pic.buffer.toString('base64')), pic.mimetype ]
		} else if (parsedBody.flag == 'edit') {
			qString = 'UPDATE user_details SET firstName=?, lastName=?, age=?, phoneNo=?, address=?, profilePic=?, picType=? WHERE username=?'
			values = [ parsedBody.fName, parsedBody.lName, parsedBody.age, parsedBody.phone, parsedBody.address, JSON.stringify(pic.buffer.toString('base64')), pic.mimetype, parsedBody.username ]
		} else return httpFailure(res, 'Incorrect flag value')

		const profResult = await dbQuery(qString, values)
		if (profResult[0].affectedRows > 0) {
			httpSuccess(res, `${parsedBody.flag == 'edit' ? 'Profile details updated successfully' : `Saved Profile details successfully. Insert ID - ${profResult[0].insertId}`}`)
		} else {
			httpFailure(res, `${parsedBody.flag == 'edit' ? 'Failed to update Profile details' : 'Failed to save Profile details'}`)
		}
	} catch (e) {
		console.log('Error in CATCH for saveUpdateProfDetails is', e)
		if (e.code == 'ER_DUP_ENTRY') {
			httpFailure(res, 'Profile details for Username already exists')
		} else {
			httpError(res, e, 'Failed to save Profile details')
		}
	}
}

const payload = (jsonString) => {
	try {
		const pObj = JSON.parse(jsonString)
		if (pObj && pObj.username && pObj.fName && pObj.lName && pObj.age && pObj.phone && pObj.address && pObj.flag) return pObj
	} catch (error) {}
	return { badPayload: true }
}

module.exports = saveUpdateProfDetails
