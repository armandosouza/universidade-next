import axios from 'axios'

//endpoints
const mainEndpoint = 'http://localhost:3001'
const endpoints = {
	"auth": `${mainEndpoint}/api/auth`,
	"user": `${mainEndpoint}/api/user`,
	"lesson": `${mainEndpoint}/api/lesson`,
	"course": `${mainEndpoint}/api/course`,
	"subject": `${mainEndpoint}/api/subject`,
	"question": `${mainEndpoint}/api/course/question`
}

export {endpoints}

//request with jwt token
const request = () => {
	return axios.create({
		headers: {
			authorization: `Bearer ${localStorage.getItem("token")}`
		}
	})
}

export default request