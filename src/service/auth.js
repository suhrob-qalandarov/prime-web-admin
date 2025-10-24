import axios from'./api'

const AuthService = {
    async checkAdminWithCredentials() {
        const response = await axios.get(`/v2/auth/admin`,{withCredentials: true})
        return response.data
    },
}

export default AuthService