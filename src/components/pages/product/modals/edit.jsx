import { useState, useEffect } from "react"
import {
    Box,
    Button,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography,
    Chip,
} from "@mui/material"
import { Delete as DeleteIcon } from "@mui/icons-material"
import ProductService from "../../../../service/product"
import { sizes } from "../../../../constants/product-sizes"

const EditModal = ({ open, onClose, product, onProductUpdated }) => {
    const [productForm, setProductForm] = useState({
        name: "",
        description: "",
        collection: "",
        existingSizes: [],
    })
    const [newSize, setNewSize] = useState({ size: "", amount: "" })
    const [newSizes, setNewSizes] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (product) {
            setProductForm({
                name: product.name || "",
                description: product.description || "",
                collection: product.collection || "",
                existingSizes: product.sizes || [],
            })
            setNewSizes([])
        }
    }, [product])

    const handleAddNewSize = () => {
        if (newSize.size && newSize.amount) {
            setNewSizes((prev) => [...prev, { ...newSize }])
            setNewSize({ size: "", amount: "" })
        }
    }

    const handleRemoveNewSize = (index) => {
        setNewSizes((prev) => prev.filter((_, i) => i !== index))
    }

    const handleSaveProduct = async () => {
        try {
            setLoading(true)

            const dataToSave = {
                name: productForm.name,
                description: productForm.description,
                collection: productForm.collection,
                sizes: [...productForm.existingSizes, ...newSizes],
            }

            await ProductService.update(product.id, dataToSave)

            if (onProductUpdated) onProductUpdated()
            onClose()
        } catch (error) {
            console.error("Error updating product:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    p: 4,
                    borderRadius: 3,
                    boxShadow: 24,
                    width: "100%",
                    maxWidth: 900,
                    maxHeight: "90vh",
                    overflowY: "auto",
                }}
            >
                <Typography variant="h6" sx={{ mb: 4 }}>
                    Mahsulotni tahrirlash
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Nomi"
                            value={productForm.name}
                            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Tavsif"
                            value={productForm.description}
                            onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Kolleksiya"
                            value={productForm.collection}
                            onChange={(e) => setProductForm({ ...productForm, collection: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" sx={{ mb: 2 }}>
                            Mavjud o'lchamlar (o'zgartirib bo'lmaydi)
                        </Typography>
                        {productForm.existingSizes.map((size, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    p: 2,
                                    border: "1px solid #ddd",
                                    borderRadius: 1,
                                    mb: 2,
                                    bgcolor: "#f5f5f5",
                                }}
                            >
                                <Typography>
                                    {size.size}: {size.amount}
                                </Typography>
                                <Chip label="Mavjud" size="small" color="default" />
                            </Box>
                        ))}

                        <Typography variant="subtitle1" sx={{ mt: 4, mb: 2 }}>
                            Yangi o'lcham qo'shish
                        </Typography>
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item xs={5}>
                                <FormControl fullWidth>
                                    <InputLabel>O'lcham</InputLabel>
                                    <Select
                                        value={newSize.size}
                                        onChange={(e) => setNewSize({ ...newSize, size: e.target.value })}
                                        label="O'lcham"
                                    >
                                        {sizes.map((s) => (
                                            <MenuItem key={s.value} value={s.value}>
                                                {s.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Miqdor"
                                    value={newSize.amount}
                                    onChange={(e) => setNewSize({ ...newSize, amount: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="contained" onClick={handleAddNewSize} fullWidth>
                                    Qo'shish
                                </Button>
                            </Grid>
                        </Grid>
                        {newSizes.map((size, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    p: 2,
                                    border: "1px solid #4caf50",
                                    borderRadius: 1,
                                    mb: 2,
                                    bgcolor: "#e8f5e9",
                                }}
                            >
                                <Typography>
                                    {size.size}: {size.amount}
                                </Typography>
                                <IconButton onClick={() => handleRemoveNewSize(index)} color="error">
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        ))}
                    </Grid>
                </Grid>
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
                    <Button onClick={onClose} variant="outlined">
                        Bekor qilish
                    </Button>
                    <Button onClick={handleSaveProduct} variant="contained" color="primary" disabled={loading}>
                        {loading ? "Saqlanmoqda..." : "Saqlash"}
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default EditModal