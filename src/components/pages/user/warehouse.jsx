import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    IconButton,
    Modal,
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
    Chip,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Visibility as VisibilityIcon,
    Search as SearchIcon,
    Clear as ClearIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';

const mockWarehouseItems = [
    {
        id: 1,
        productName: 'Mahsulot 1',
        category: 'Kategoriya A',
        quantity: 150,
        minStock: 50,
        location: 'Raf 1-A',
        status: 'Normal',
        active: true,
        addedAt: '2023-10-01',
    },
    {
        id: 2,
        productName: 'Mahsulot 2',
        category: 'Kategoriya B',
        quantity: 30,
        minStock: 50,
        location: 'Raf 2-B',
        status: 'Low Stock',
        active: true,
        addedAt: '2023-09-15',
    },
    {
        id: 3,
        productName: 'Mahsulot 3',
        category: 'Kategoriya C',
        quantity: 0,
        minStock: 20,
        location: 'Raf 3-C',
        status: 'Out of Stock',
        active: false,
        addedAt: '2023-08-20',
    },
    // Qo'shimcha mock data qo'shish mumkin
];

const Warehouse = () => {
    const [filteredItems, setFilteredItems] = useState(mockWarehouseItems);
    const [searchTerm, setSearchTerm] = useState('');
    const [openAddEditModal, setOpenAddEditModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [itemForm, setItemForm] = useState({
        id: null,
        productName: '',
        category: '',
        quantity: '',
        minStock: '',
        location: '',
        status: 'Normal',
        active: true,
    });

    const totalItems = mockWarehouseItems.length;
    const lowStockItems = mockWarehouseItems.filter(item => item.quantity < item.minStock).length;
    const outOfStockItems = mockWarehouseItems.filter(item => item.quantity === 0).length;

    const handleSearch = () => {
        const filtered = mockWarehouseItems.filter(item =>
            item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredItems(filtered);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setFilteredItems(mockWarehouseItems);
    };

    const handleOpenAddEditModal = (item = null) => {
        setSelectedItem(item);
        setItemForm({
            id: item?.id || null,
            productName: item?.productName || '',
            category: item?.category || '',
            quantity: item?.quantity || '',
            minStock: item?.minStock || '',
            location: item?.location || '',
            status: item?.status || 'Normal',
            active: item?.active ?? true,
        });
        setOpenAddEditModal(true);
    };

    const handleCloseAddEditModal = () => {
        setOpenAddEditModal(false);
    };

    const handleSaveItem = () => {
        // Mock save: Konsolga chiqarish
        console.log('Saved item:', itemForm);
        handleCloseAddEditModal();
        // Real loyihada bu yerda mock data yangilanishi mumkin
    };

    const handleToggleItem = (id) => {
        // Mock toggle
        console.log('Toggled item:', id);
    };

    const handleOpenViewModal = (item) => {
        setSelectedItem(item);
        setOpenViewModal(true);
    };

    const handleCloseViewModal = () => {
        setOpenViewModal(false);
    };

    return (
        <Container maxWidth="xl" className="py-8">
            <Grid container spacing={3} className="mb-8">
                <Grid item xs={12} md={4}>
                    <Card className="shadow-lg rounded-xl bg-blue-100">
                        <CardContent className="flex items-center">
                            <Box className="p-4 bg-blue-500 text-white rounded-lg mr-4">
                                <i className="fas fa-warehouse text-3xl" />
                            </Box>
                            <Box>
                                <Typography variant="h4" className="font-bold">{totalItems}</Typography>
                                <Typography>Jami mahsulotlar</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card className="shadow-lg rounded-xl bg-yellow-100">
                        <CardContent className="flex items-center">
                            <Box className="p-4 bg-yellow-500 text-white rounded-lg mr-4">
                                <i className="fas fa-exclamation-triangle text-3xl" />
                            </Box>
                            <Box>
                                <Typography variant="h4" className="font-bold">{lowStockItems}</Typography>
                                <Typography>Kam qolgan mahsulotlar</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card className="shadow-lg rounded-xl bg-red-100">
                        <CardContent className="flex items-center">
                            <Box className="p-4 bg-red-500 text-white rounded-lg mr-4">
                                <i className="fas fa-ban text-3xl" />
                            </Box>
                            <Box>
                                <Typography variant="h4" className="font-bold">{outOfStockItems}</Typography>
                                <Typography>Tugatgan mahsulotlar</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Card className="shadow-lg rounded-xl overflow-hidden">
                <CardHeader
                    title="Ombor ro'yxati"
                    className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white"
                    action={
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => handleOpenAddEditModal()}
                            className="bg-white text-blue-600 hover:bg-gray-100"
                        >
                            Qo'shish
                        </Button>
                    }
                />
                <CardContent>
                    <Grid container spacing={2} className="mb-4">
                        <Grid item xs={12} md={6}>
                            <Box className="flex">
                                <TextField
                                    fullWidth
                                    placeholder="Mahsulot qidirish..."
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
                    </Grid>
                    <TableContainer component={Paper} className="shadow-md rounded-lg overflow-hidden">
                        <Table>
                            <TableHead className="bg-gray-200">
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Mahsulot Nomi</TableCell>
                                    <TableCell>Kategoriya</TableCell>
                                    <TableCell>Miqdor</TableCell>
                                    <TableCell>Minimal Stok</TableCell>
                                    <TableCell>Joylashuv</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Holati</TableCell>
                                    <TableCell>Qo'shilgan</TableCell>
                                    <TableCell>Amallar</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredItems.map((item) => (
                                    <TableRow key={item.id} className="hover:bg-gray-50">
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.productName}</TableCell>
                                        <TableCell>{item.category}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{item.minStock}</TableCell>
                                        <TableCell>{item.location}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={item.status}
                                                color={item.status === 'Normal' ? 'success' : item.status === 'Low Stock' ? 'warning' : 'error'}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Switch checked={item.active} onChange={() => handleToggleItem(item.id)} color="primary" />
                                        </TableCell>
                                        <TableCell>{item.addedAt}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleOpenViewModal(item)}>
                                                <VisibilityIcon className="text-blue-500" />
                                            </IconButton>
                                            <IconButton onClick={() => handleOpenAddEditModal(item)}>
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
                        {itemForm.id ? 'Elementni tahrirlash' : 'Element qo\'shish'}
                    </Typography>
                    <TextField
                        fullWidth
                        label="Mahsulot Nomi"
                        value={itemForm.productName}
                        onChange={(e) => setItemForm({ ...itemForm, productName: e.target.value })}
                        className="mb-4"
                    />
                    <TextField
                        fullWidth
                        label="Kategoriya"
                        value={itemForm.category}
                        onChange={(e) => setItemForm({ ...itemForm, category: e.target.value })}
                        className="mb-4"
                    />
                    <TextField
                        fullWidth
                        type="number"
                        label="Miqdor"
                        value={itemForm.quantity}
                        onChange={(e) => setItemForm({ ...itemForm, quantity: e.target.value })}
                        className="mb-4"
                    />
                    <TextField
                        fullWidth
                        type="number"
                        label="Minimal Stok"
                        value={itemForm.minStock}
                        onChange={(e) => setItemForm({ ...itemForm, minStock: e.target.value })}
                        className="mb-4"
                    />
                    <TextField
                        fullWidth
                        label="Joylashuv"
                        value={itemForm.location}
                        onChange={(e) => setItemForm({ ...itemForm, location: e.target.value })}
                        className="mb-4"
                    />
                    <Box className="flex items-center mb-4">
                        <Switch
                            checked={itemForm.active}
                            onChange={(e) => setItemForm({ ...itemForm, active: e.target.checked })}
                            color="primary"
                        />
                        <Typography>Faol</Typography>
                    </Box>
                    <Box className="flex justify-end space-x-2">
                        <Button onClick={handleCloseAddEditModal} variant="outlined">
                            Bekor qilish
                        </Button>
                        <Button onClick={handleSaveItem} variant="contained" color="primary">
                            Saqlash
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* View Modal */}
            <Modal open={openViewModal} onClose={handleCloseViewModal}>
                <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
                    <Typography variant="h6" className="mb-4">Element ma'lumotlari</Typography>
                    {selectedItem && (
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography className="font-semibold">ID:</Typography>
                                <Typography>{selectedItem.id}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography className="font-semibold">Mahsulot Nomi:</Typography>
                                <Typography>{selectedItem.productName}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography className="font-semibold">Kategoriya:</Typography>
                                <Typography>{selectedItem.category}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography className="font-semibold">Miqdor:</Typography>
                                <Typography>{selectedItem.quantity}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography className="font-semibold">Minimal Stok:</Typography>
                                <Typography>{selectedItem.minStock}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography className="font-semibold">Joylashuv:</Typography>
                                <Typography>{selectedItem.location}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography className="font-semibold">Status:</Typography>
                                <Typography>{selectedItem.status}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography className="font-semibold">Holati:</Typography>
                                <Typography>{selectedItem.active ? 'Faol' : 'Nofaol'}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography className="font-semibold">Qo'shilgan:</Typography>
                                <Typography>{selectedItem.addedAt}</Typography>
                            </Grid>
                        </Grid>
                    )}
                    <Box className="flex justify-end mt-4">
                        <Button onClick={handleCloseViewModal} variant="outlined">Yopish</Button>
                    </Box>
                </Box>
            </Modal>
        </Container>
    );
};

export default Warehouse;