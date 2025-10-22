import axios from'./api'

const UserService = {

    // User data loader using credentials
    async loadData() {
        try {
            const response = await axios.get(
                "/auth/me",
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            return response.data
        } catch (error) {
            console.error("Error fetching products:", error)
            throw error
        }
    },

    async getOrLoadData() {
        let user = JSON.parse(localStorage.getItem("prime-user"))
        if (!user) {
            user = await this.reloadData()
        }
        return user
    },

    async cacheUserData(data) {
        localStorage.setItem("prime-user", JSON.stringify(data))
    },

    async reloadData() {
        const data = await this.loadData()
        localStorage.setItem("prime-user", JSON.stringify(data))
        return data
    },

    async logout () {
        await axios.post(`/auth/logout`, {}, {withCredentials: true}).then(() => {
                localStorage.removeItem("prime-user")
                localStorage.removeItem("prime-orders")
                localStorage.removeItem("prime-products")
            }
        )
    },
};

// Bind methods to ensure correct `this` context
UserService.loadData = UserService.loadData.bind(UserService);
UserService.getOrLoadData = UserService.getOrLoadData.bind(UserService);
UserService.cacheUserData = UserService.cacheUserData.bind(UserService);
UserService.reloadData = UserService.reloadData.bind(UserService);

export default UserService