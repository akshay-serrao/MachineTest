const myDecrypt = (pass) => {
	return pass ? Buffer.from(pass, 'base64').toString('ascii') : pass
}

const myEncrypt = (val) => {
	return val ? Buffer.from(val, 'ascii').toString('base64') : val
}

module.exports = { myDecrypt, myEncrypt }
