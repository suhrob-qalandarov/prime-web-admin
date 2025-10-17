import { useState, useEffect } from "react"
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Grid,
    Paper,
    Alert,
    CircularProgress,
    Chip,
} from "@mui/material"
import { Add as AddIcon, Edit as EditIcon, Visibility as VisibilityIcon } from "@mui/icons-material"
import { EditMenuModal, AddModal, ViewModal } from "./modals"
import CustomSnackbar from "../../bars/snackbar/snackbar"
import ProductService from "../../../service/product"

const Product = () => {
    const [allProducts, setAllProducts] = useState([
        {
            id: 1,
            name: "Product 1",
            brand: null,
            attachmentCount: 0,
            categoryName: "Category 1",
            price: 100000,
            status: "NEW",
            active: true,
            discount: 0,
            createdAt: "2025-10-04 18:07:33.000000",
        },
        {
            id: 2,
            name: "Long Product Name 2",
            brand: "Brand 1",
            attachmentCount: 3,
            categoryName: "Category 2",
            price: 202000,
            status: "HOT",
            active: false,
            discount: 0,
            createdAt: "2025-10-04 18:07:33.000000",
        },
        {
            id: 3,
            name: "Product 3",
            brand: "Long Name Brand 3",
            attachmentCount: null,
            categoryName: "Category 3",
            price: 330000,
            status: "SALE",
            active: true,
            discount: 10,
            createdAt: "",
        },
    ])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [openAddModal, setOpenAddModal] = useState(false)
    const [openEditMenuModal, setOpenEditMenuModal] = useState(false)
    const [openViewModal, setOpenViewModal] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        type: "success",
    })

    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = async () => {
        try {
            setIsLoading(true)
            const data = await ProductService.getAll()
            //setAllProducts(data)
        } catch (err) {
            setError("Mahsulotlarni yuklashda xatolik yuz berdi")
            showSnackbar("Mahsulotlarni yuklashda xatolik yuz berdi", "error")
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleOpenEditMenuModal = (product) => {
        setSelectedProduct(product)
        setOpenEditMenuModal(true)
    }

    const handleCloseEditMenuModal = () => {
        setOpenEditMenuModal(false)
        setSelectedProduct(null)
    }

    const handleOpenAddEditModal = (product = null) => {
        setSelectedProduct(product)
        setOpenAddModal(true)
    }

    const handleCloseAddEditModal = () => {
        setOpenAddModal(false)
        setSelectedProduct(null)
    }

    const handleOpenViewModal = (product) => {
        setSelectedProduct(product)
        setOpenViewModal(true)
    }

    const handleCloseViewModal = () => {
        setOpenViewModal(false)
        setSelectedProduct(null)
    }

    const handleProductUpdated = () => {
        loadProducts()
        handleCloseEditMenuModal()
    }

    const showSnackbar = (message, type) => {
        setSnackbar({
            open: true,
            message,
            type,
        })
    }

    const handleCloseSnackbar = () => {
        setSnackbar({
            ...snackbar,
            open: false,
        })
    }

    const handleProductSaved = (message, type) => {
        loadProducts()
        handleCloseAddEditModal()
        if (message && type) {
            showSnackbar(message, type)
        }
    }

    if (isLoading) {
        return (
            <Box className="flex justify-center items-center h-screen">
                <CircularProgress />
                <Typography className="ml-4">Loading...</Typography>
            </Box>
        )
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>
    }

    return (
        <Container maxWidth="xl" className="py-8">
            <Grid container spacing={3} className="mb-8">
                <Grid item xs={12} md={4}>
                    <Card className="shadow-lg rounded-xl bg-indigo-100">
                        <CardContent className="flex items-center">
                            <Box className="p-4 bg-indigo-500 text-white rounded-lg mr-4">
                                <i className="fas fa-box-open text-3xl" />
                            </Box>
                            <Box>
                                <Typography variant="h4" className="font-bold">
                                    {allProducts.length}
                                </Typography>
                                <Typography>Jami mahsulotlar</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card className="shadow-lg rounded-xl bg-green-100">
                        <CardContent className="flex items-center">
                            <Box className="p-4 bg-green-500 text-white rounded-lg mr-4">
                                <i className="fas fa-check-circle text-3xl" />
                            </Box>
                            <Box>
                                <Typography variant="h4" className="font-bold">
                                    {allProducts.filter((prod) => prod.active).length}
                                </Typography>
                                <Typography>Faol mahsulotlar</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card className="shadow-lg rounded-xl bg-yellow-100">
                        <CardContent className="flex items-center">
                            <Box className="p-4 bg-yellow-500 text-white rounded-lg mr-4">
                                <i className="fas fa-pause-circle text-3xl" />
                            </Box>
                            <Box>
                                <Typography variant="h4" className="font-bold">
                                    {allProducts.filter((prod) => !prod.active).length}
                                </Typography>
                                <Typography>Nofaol mahsulotlar</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Card className="shadow-lg rounded-xl overflow-hidden">
                <CardHeader
                    title="Mahsulotlar ro'yxati"
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                    action={
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => handleOpenAddEditModal()}
                            className="text-indigo-600"
                        >
                            Qo'shish
                        </Button>
                    }
                />
                <CardContent>
                    <TableContainer component={Paper} className="shadow-md rounded-lg overflow-hidden">
                        <Table>
                            <TableHead className="bg-gray-200">
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Rasmlar</TableCell>
                                    <TableCell>Nomi</TableCell>
                                    <TableCell>Brend</TableCell>
                                    <TableCell>Kategoriya</TableCell>
                                    <TableCell>Sotuv va Chegirma</TableCell>
                                    <TableCell>Narx</TableCell>
                                    <TableCell>Holati</TableCell>
                                    <TableCell>Yaratilgan vaqt</TableCell>
                                    <TableCell>Amallar</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allProducts.map((prod) => (
                                    <TableRow key={prod.id} className="hover:bg-gray-50">
                                        <TableCell>{prod.id}</TableCell>
                                        <TableCell>{prod.attachmentCount == null ? "---" : `${prod.attachmentCount} ta`}</TableCell>
                                        <TableCell>{prod.name}</TableCell>
                                        <TableCell>{prod.brand ?? "---"}</TableCell>
                                        <TableCell>{prod.categoryName}</TableCell>
                                        <TableCell>
                                            {prod.status === "SALE" ? (
                                                <Box display="flex" alignItems="center" gap={1}>
                                                    {/* STATUS */}
                                                    <Chip
                                                        label="SALE"
                                                        color="warning"
                                                        size="small"
                                                        sx={{
                                                            fontWeight: "bold",
                                                            color: "#fff",
                                                        }}
                                                    />

                                                    {/* DISCOUNT % */}
                                                    <Chip
                                                        label={`${prod.discount}% off`}
                                                        color="warning"
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{
                                                            borderColor: "#ffa726",
                                                            color: "#f57c00",
                                                            fontWeight: 500,
                                                        }}
                                                    />
                                                </Box>
                                            ) : (
                                                <Chip
                                                    label={prod.status}
                                                    color={prod.status === "NEW" ? "success" : prod.status === "HOT" ? "error" : "warning"}
                                                    size="small"
                                                    sx={{ fontWeight: "bold" }}
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {prod.status === "SALE" ? (
                                                <Box display="flex" flexDirection="column" alignItems="flex-start">
                                                    {/* ASL NARX */}
                                                    <Typography
                                                        variant="body2"
                                                        sx={{ textDecoration: "line-through", color: "#1976d2", fontSize: 12 }}
                                                    >
                                                        {Intl.NumberFormat("uz-UZ").format(prod.price)} so'm
                                                    </Typography>

                                                    {/* CHEGIRMADAN KEYINGI NARX */}
                                                    <Typography variant="body2" sx={{ color: "#f57c00", fontWeight: 600, fontSize: 13 }}>
                                                        {Intl.NumberFormat("uz-UZ").format(prod.price - (prod.price * prod.discount) / 100)} so'm
                                                    </Typography>
                                                </Box>
                                            ) : (
                                                <Typography variant="body2" sx={{ color: "#1976d2", fontWeight: 600, fontSize: 13 }}>
                                                    {Intl.NumberFormat("uz-UZ").format(prod.price - (prod.price * prod.discount) / 100)} so'm
                                                </Typography>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={prod.active ? "Faol" : "Nofaol"}
                                                color={prod.active ? "success" : "error"}
                                                size="small"
                                                variant="outlined"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {prod.createdAt && !isNaN(new Date(prod.createdAt)) ? (
                                                new Date(prod.createdAt).toLocaleString("uz-UZ", {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })
                                            ) : (
                                                <Typography color="text.secondary" fontStyle="italic">
                                                    Nomaʼlum
                                                </Typography>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleOpenViewModal(prod)}>
                                                <VisibilityIcon className="text-blue-500" />
                                            </IconButton>
                                            <IconButton onClick={() => handleOpenEditMenuModal(prod)}>
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

            {/* Modals */}
            <EditMenuModal
                open={openEditMenuModal}
                onClose={handleCloseEditMenuModal}
                product={selectedProduct}
                onProductUpdated={handleProductUpdated}
            />

            <ViewModal open={openViewModal} onClose={handleCloseViewModal} product={selectedProduct} />

            <AddModal
                open={openAddModal}
                onClose={handleCloseAddEditModal}
                product={selectedProduct}
                onProductSaved={handleProductSaved}
            />

            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                type={snackbar.type}
                onClose={handleCloseSnackbar}
            />
        </Container>
    )
}

export default Product