// Local Testing
const axios = require('axios')

var config = {
	headers: {
		'Content-Type': 'application/json',
	}
}

axios.post('http://127.0.0.1:3000', { // Local Testing
	user: 'bob',
	password: 'password1'
}, config).then(response => { 
		console.log(response)
})
.catch(error => {
	    console.log(error.response)
});