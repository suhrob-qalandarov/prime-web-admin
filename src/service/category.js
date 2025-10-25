import axios from './api';

// Constants for localStorage key
const STORAGE_KEY = 'categories-data';

const CategoryService = {
    // Load categories from backend
    async loadData() {
        try {
            const response = await axios.get('/v2/admin/category/dashboard', {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data; // Expected: AdminCategoryDashboardRes
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw new Error('Failed to load categories. Please try again later.');
        }
    },

    // Get categories from localStorage or fetch from backend
    async getCategoriesData() {
        let data = JSON.parse(localStorage.getItem(STORAGE_KEY));
        let needReload = false;

        if (!data || !data.responseDate) {
            needReload = true;
        } else {
            const responseDate = new Date(data.responseDate);
            const now = new Date();
            // Reload if current time is after the backend-provided expiration date
            if (now > responseDate) {
                needReload = true;
            }
        }

        if (needReload) {
            data = await this.loadData();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }

        return data?.categoryResList || [];
    },

    // Get category counts (total, active, inactive)
    async getCategoriesCountData() {
        let data = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (!data) {
            data = await this.loadData();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
        return {
            totalCount: data?.totalCount || 0,
            activeCount: data?.activeCount || 0,
            inactiveCount: data?.inactiveCount || 0,
        };
    },
};

export default CategoryService;