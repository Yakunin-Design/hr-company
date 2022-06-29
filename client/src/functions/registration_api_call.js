import axios from 'axios'

async function registration_api_call(data) {
    const response = await axios.post("http://localhost:6969/signup", data)

    return response
}

export default registration_api_call