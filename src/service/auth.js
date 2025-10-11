import axios from'./api'

const AuthService = {
    async checkAdminWithCredentials() {
        const response = await axios.get(`/auth/admin`,{withCredentials: true})
        return response.data
    },
}

export default AuthService