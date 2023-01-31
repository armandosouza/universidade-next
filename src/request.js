import axios from 'axios'

//endpoints
const mainEndpoint = 'https://universidade-next-api.vercel.app'
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