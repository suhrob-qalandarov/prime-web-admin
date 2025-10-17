import axios from'./api'

const ProductService = {

    // Products loader from backend
    async loadData() {
        try {
            const response = await axios.get(
                "/admin/product",
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

    // Load products from local storage if it doesn't exist call reload function
    async getOrLoadData() {
        let products = JSON.parse(localStorage.getItem("products"))
        if (!products) {
            products = await this.reloadData()
        }
        return products
    },

    // Reloader products from backend and set to local storage
    async reloadData() {
        const data = await this.loadData()
        localStorage.setItem("products", JSON.stringify(data))
        return data
    },

    // Get single product by id, in ls
    async getById(id) {
        /*try {
            const response = await axios(`/api/products/${id}`)
            if (!response.ok) throw new Error("Failed to fetch product")
            return await response.json()
        } catch (error) {
            console.error("Error fetching product:", error)
            throw error
        }*/
    },

    // Persist new product data to backend
    async persistData(productData) {
        try {
            const response = await axios.post(
                "/admin/product", productData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.status !== 200 && response.status !== 201) {
                throw new Error("Failed to create product");
            }

            return response.data;
        } catch (error) {
            console.error("Error creating product:", error);
            throw error;
        }
    },

    // Caller product persist function and save response data to local storage
    async persistToLS(productData) {
        const newProduct = await this.persistData(productData)
        const existing = JSON.parse(localStorage.getItem("products")) || []
        existing.push(newProduct)
        localStorage.setItem("products", JSON.stringify(existing))
        return newProduct
    },

    async updatePictures(productId, productPictures, newPictures) {

    },

    // Update product
    async update(id, productData) {
        /*try {
            const response = await axios(`/api/products/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productData),
            })
            if (!response.ok) throw new Error("Failed to update product")
            return await response.json()
        } catch (error) {
            console.error("Error updating product:", error)
            throw error
        }*/
    },

    // Toggle product active status
    async toggleActive(id) {
        /*try {
            const response = await axios(`/api/products/${id}/toggle`, {
                method: "PATCH",
            })
            if (!response.ok) throw new Error("Failed to toggle product status")
            return await response.json()
        } catch (error) {
            console.error("Error toggling product status:", error)
            throw error
        }*/
    },
}

export default ProductService