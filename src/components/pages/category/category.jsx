import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    Switch,
    Grid,
    Paper,
    Alert,
    CircularProgress,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Visibility as VisibilityIcon,
    Sort as SortIcon,
    Search as SearchIcon,
    Clear as ClearIcon,
    Refresh as RefreshIcon,
    Fullscreen as FullscreenIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import axios from 'axios';

const API_BASE_URL = 'http://localhost';

const Category = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [allCategories, setAllCategories] = useState([]);
    const [activeCategories, setActiveCategories] = useState([]);
    const [inactiveCategories, setInactiveCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [currentStatusFilter, setCurrentStatusFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openAddEditModal, setOpenAddEditModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [openOrderModal, setOpenOrderModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryForm, setCategoryForm] = useState({ id: null, name: '', active: true });
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        loadCategoriesDashboard();
    }, []);

    const apiRequest = async (url, options = {}) => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            // Handle unauthorized
            return null;
        }
        try {
            const response = await axios({
                url: `${API_BASE_URL}${url}`,
                headers: { Authorization: `Bearer ${token}`, ...options.headers },
                ...options,
            });
            return response.data;
        } catch (err) {
            setError(err.message);
            return null;
        }
    };

    const loadCategoriesDashboard = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await apiRequest('/api/v1/admin/category/dashboard');
            if (response) {
                setDashboardData(response);
                setAllCategories(response.categoryResList || []);
                setActiveCategories(response.activeCategoryResList || []);
                setInactiveCategories(response.inactiveCategoryResList || []);
                applyFilter('all');
            }
        } catch (err) {
            setError('Failed to load categories');
        } finally {
            setIsLoading(false);
        }
    };

    const applyFilter = (status) => {
        setCurrentStatusFilter(status);
        let categories;
        switch (status) {
            case 'active':
                categories = activeCategories;
                break;
            case 'inactive':
                categories = inactiveCategories;
                break;
            default:
                categories = allCategories;
        }
        setFilteredCategories(applySearch(categories, searchTerm));
    };

    const applySearch = (categories, term) => {
        if (!term) return categories;
        return categories.filter((cat) => cat.name.toLowerCase().includes(term.toLowerCase()));
    };

    const handleSearch = () => {
        setFilteredCategories(applySearch(getFilteredByStatus(), searchTerm));
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setFilteredCategories(getFilteredByStatus());
    };

    const getFilteredByStatus = () => {
        switch (currentStatusFilter) {
            case 'active':
                return activeCategories;
            case 'inactive':
                return inactiveCategories;
            default:
                return allCategories;
        }
    };

    const handleOpenAddEditModal = (category = null) => {
        setSelectedCategory(category);
        setCategoryForm({
            id: category?.id || null,
            name: category?.name || '',
            active: category?.active ?? true,
        });
        setOpenAddEditModal(true);
    };

    const handleCloseAddEditModal = () => {
        setOpenAddEditModal(false);
    };

    const handleSaveCategory = async () => {
        try {
            const data = { name: categoryForm.name };
            let response;
            if (categoryForm.id) {
                response = await apiRequest(`/api/v1/admin/category/${categoryForm.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    data: JSON.stringify(data),
                });
            } else {
                response = await apiRequest('/api/v1/admin/category', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    data: JSON.stringify(data),
                });
            }
            if (response) {
                loadCategoriesDashboard();
                handleCloseAddEditModal();
            }
        } catch (err) {
            setError('Failed to save category');
        }
    };

    const handleToggleCategory = async (id) => {
        try {
            await apiRequest(`/api/v1/admin/category/toggle/${id}`, { method: 'PATCH' });
            loadCategoriesDashboard();
        } catch (err) {
            setError('Failed to toggle category');
        }
    };

    const handleOpenViewModal = (category) => {
        setSelectedCategory(category);
        setOpenViewModal(true);
    };

    const handleCloseViewModal = () => {
        setOpenViewModal(false);
    };

    const handleOpenOrderModal = () => {
        setOrderList([...filteredCategories]);
        setOpenOrderModal(true);
    };

    const handleCloseOrderModal = () => {
        setOpenOrderModal(false);
    };

    const handleSaveOrder = async () => {
        try {
            const orderMap = {};
            orderList.forEach((cat, index) => {
                orderMap[cat.id] = index + 1;
            });
            await apiRequest('/api/v1/admin/categories/order', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                data: JSON.stringify(orderMap),
            });
            loadCategoriesDashboard();
            handleCloseOrderModal();
        } catch (err) {
            setError('Failed to save order');
        }
    };

    const moveOrderItem = (fromIndex, toIndex) => {
        const newList = [...orderList];
        const [moved] = newList.splice(fromIndex, 1);
        newList.splice(toIndex, 0, moved);
        setOrderList(newList);
    };

    if (isLoading) {
        return (
            <Box className="flex justify-center items-center h-screen">
                <CircularProgress />
                <Typography className="ml-4">Loading...</Typography>
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Container maxWidth="xl" className="py-8">
            <Card className="shadow-lg rounded-xl overflow-hidden">
                <CardHeader
                    title="Kategoriyalar ro'yxati"
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                    action={
                        <Box className="flex space-x-2">
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={() => handleOpenAddEditModal()}
                                className="text-indigo-600 hover:bg-gray-100"
                            >
                                Qo'shish
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<SortIcon />}
                                onClick={handleOpenOrderModal}
                                className="text-indigo-600 hover:bg-gray-100"
                            >
                                Tartiblash
                            </Button>
                        </Box>
                    }
                />
                <Box className="flex justify-between p-4 bg-gray-50">
                    <Box className="flex space-x-4">
                        <Typography className="font-semibold">Jami kategoriyalar: {allCategories.length}</Typography>
                        <Typography className="font-semibold">Faol kategoriyalar: {activeCategories.length}</Typography>
                        <Typography className="font-semibold">Nofaol kategoriyalar: {inactiveCategories.length}</Typography>
                    </Box>
                </Box>
                <CardContent>
                    {/*<Grid container spacing={2} className="mb-4">
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={currentStatusFilter}
                                    onChange={(e) => applyFilter(e.target.value)}
                                    label="Status"
                                >
                                    <MenuItem value="all">Barcha kategoriyalar</MenuItem>
                                    <MenuItem value="active">Faol kategoriyalar</MenuItem>
                                    <MenuItem value="inactive">Nofaol kategoriyalar</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box className="flex">
                                <TextField
                                    fullWidth
                                    placeholder="Kategoriya qidirish..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                />
                                <IconButton onClick={handleSearch} className="ml-2">
                                    <SearchIcon />
                                </IconButton>
                                <IconButton onClick={handleClearSearch} className="ml-2">
                                    <ClearIcon />
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>*/}
                    <TableContainer component={Paper} className="shadow-md rounded-lg overflow-hidden">
                        <Table>
                            <TableHead className="bg-gray-200">
                                <TableRow>
                                    <TableCell>Tartib raqam</TableCell>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Nomi</TableCell>
                                    <TableCell>Mahsulotlar soni</TableCell>
                                    <TableCell>Holati</TableCell>
                                    <TableCell>Yaratilgan</TableCell>
                                    <TableCell>Amallar</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredCategories.map((cat, index) => (
                                    <TableRow key={cat.id} className="hover:bg-gray-50">
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{cat.id}</TableCell>
                                        <TableCell>{cat.name}</TableCell>
                                        <TableCell>{cat.productCount || 0}</TableCell>
                                        <TableCell>
                                            <Switch checked={cat.active} onChange={() => handleToggleCategory(cat.id)} color="primary" />
                                        </TableCell>
                                        <TableCell>{new Date(cat.createdAt).toLocaleString()}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleOpenViewModal(cat)}>
                                                <VisibilityIcon className="text-blue-500" />
                                            </IconButton>
                                            <IconButton onClick={() => handleOpenAddEditModal(cat)}>
                                                <EditIcon className="text-green-500" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            {/* Add/Edit Modal */}
            <Modal open={openAddEditModal} onClose={handleCloseAddEditModal}>
                <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
                    <Typography variant="h6" className="mb-4">
                        {categoryForm.id ? 'Kategoriyani tahrirlash' : 'Kategoriya qo\'shish'}
                    </Typography>
                    <TextField
                        fullWidth
                        label="Kategoriya nomi"
                        value={categoryForm.name}
                        onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                        className="mb-4"
                    />
                    <Box className="flex items-center mb-4">
                        <Switch
                            checked={categoryForm.active}
                            onChange={(e) => setCategoryForm({ ...categoryForm, active: e.target.checked })}
                            color="primary"
                        />
                        <Typography>Faol kategoriya</Typography>
                    </Box>
                    <Box className="flex justify-end space-x-2">
                        <Button onClick={handleCloseAddEditModal} variant="outlined">
                            Bekor qilish
                        </Button>
                        <Button onClick={handleSaveCategory} variant="contained" color="primary">
                            Saqlash
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* View Modal */}
            <Modal open={openViewModal} onClose={handleCloseViewModal}>
                <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
                    <Typography variant="h6" className="mb-4">Kategoriya ma'lumotlari</Typography>
                    {selectedCategory && (
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography className="font-semibold">ID:</Typography>
                                <Typography>{selectedCategory.id}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography className="font-semibold">Nomi:</Typography>
                                <Typography>{selectedCategory.name}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography className="font-semibold">Tartib raqami:</Typography>
                                <Typography>{selectedCategory.order}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography className="font-semibold">Holati:</Typography>
                                <Typography>{selectedCategory.active ? 'Faol' : 'Nofaol'}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography className="font-semibold">Yaratilgan vaqti:</Typography>
                                <Typography>{new Date(selectedCategory.createdAt).toLocaleString()}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography className="font-semibold">Yangilangan vaqti:</Typography>
                                <Typography>{new Date(selectedCategory.updatedAt).toLocaleString()}</Typography>
                            </Grid>
                        </Grid>
                    )}
                    <Box className="flex justify-end mt-4">
                        <Button onClick={handleCloseViewModal} variant="outlined">Yopish</Button>
                    </Box>
                </Box>
            </Modal>

            {/* Order Modal */}
            <Modal open={openOrderModal} onClose={handleCloseOrderModal}>
                <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
                    <Typography variant="h6" className="mb-4">Kategoriyalar tartibini o'zgartirish</Typography>
                    <Box className="mb-4">
                        {orderList.map((cat, index) => (
                            <Box key={cat.id} className="flex justify-between items-center p-2 border-b">
                                <Typography>{cat.name}</Typography>
                                <Box>
                                    <IconButton disabled={index === 0} onClick={() => moveOrderItem(index, index - 1)}>
                                        <i className="fas fa-arrow-up" />
                                    </IconButton>
                                    <IconButton disabled={index === orderList.length - 1} onClick={() => moveOrderItem(index, index + 1)}>
                                        <i className="fas fa-arrow-down" />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    <Box className="flex justify-end space-x-2">
                        <Button onClick={handleCloseOrderModal} variant="outlined">Bekor qilish</Button>
                        <Button onClick={handleSaveOrder} variant="contained" color="primary">Saqlash</Button>
                    </Box>
                </Box>
            </Modal>
        </Container>
    );
};

export default Category;