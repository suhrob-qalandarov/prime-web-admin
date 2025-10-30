import axios from './api';

// Constants for localStorage key
const STORAGE_KEY = 'category-dashboard-data';

const CategoryService = {
    // Load categories from backend
    async loadData() {
        try {
            const response = await axios.get('/v2/admin/category/dashboard' );
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

    // Persist new category data to backend
    async persistData(formData) {
        try {
            const response = await axios.post('/v2/admin/category', formData);

            if (response.status !== 200 && response.status !== 201) {
                throw new Error("Failed to create category");
            }

            return response.data;
        } catch (error) {
            console.error("Error creating category:", error);
            throw error;
        }
    },

    // Caller product persist function and save response data to local storage
    async persistToLS(categoryData) {
        const newCategory = await this.persistData(categoryData);

        let dashboardData = JSON.parse(localStorage.getItem(STORAGE_KEY));

        if (!dashboardData) {
            dashboardData = await this.loadData();
        }

        if (!dashboardData.categoryResList) {
            dashboardData.categoryResList = [];
        }

        if (!dashboardData.totalCount) {
            dashboardData.totalCount = 0;
        }

        if (dashboardData.inactiveCount) {
            dashboardData.inactiveCount = dashboardData.inactiveCount || 0;
        }

        dashboardData.categoryResList.push(newCategory);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dashboardData));
    },

};

export default CategoryService;