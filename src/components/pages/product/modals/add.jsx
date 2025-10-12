import { useState, useEffect } from "react"
import {
    Box,
    Button,
    FormControl,
    Grid,
    IconButton,
    Input,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    Switch,
    TextField,
    Typography,
} from "@mui/material"
import { Delete as DeleteIcon } from "@mui/icons-material"
import ProductService from "../../../../service/product"
import AttachmentService from "../../../../service/attachment"
import { sizes } from "../../../../constants/product-sizes"

const AddModal = ({ open, onClose, product, onProductSaved }) => {
    const [productForm, setProductForm] = useState({
        id: null,
        name: "",
        description: "",
        price: "",
        categoryId: "",
        status: "NEW",
        collection: "",
        active: true,
        sizes: [],
        attachments: [],
    })
    const [newSize, setNewSize] = useState({ size: "", amount: "" })
    const [selectedFiles, setSelectedFiles] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (product) {
            setProductForm({
                id: product.id,
                name: product.name || "",
                description: product.description || "",
                price: product.price || "",
                categoryId: product.categoryId || "",
                status: product.status || "NEW",
                collection: product.collection || "",
                active: product.active ?? true,
                sizes: product.sizes || [],
                attachments: product.attachments || [],
            })
        } else {
            setProductForm({
                id: null,
                name: "",
                description: "",
                price: "",
                categoryId: "",
                status: "NEW",
                collection: "",
                active: true,
                sizes: [],
                attachments: [],
            })
        }
    }, [product])

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files)
        setSelectedFiles(files)

        // Preview images
        const previews = files.map((file) => ({
            url: URL.createObjectURL(file),
            file: file,
        }))
        setProductForm((prev) => ({
            ...prev,
            attachments: [...prev.attachments, ...previews],
        }))
    }

    const handleRemoveAttachment = (index) => {
        setProductForm((prev) => ({
            ...prev,
            attachments: prev.attachments.filter((_, i) => i !== index),
        }))
    }

    const handleAddSize = () => {
        if (newSize.size && newSize.amount) {
            setProductForm((prev) => ({
                ...prev,
                sizes: [...prev.sizes, { ...newSize }],
            }))
            setNewSize({ size: "", amount: "" })
        }
    }

    const handleRemoveSize = (index) => {
        setProductForm((prev) => ({
            ...prev,
            sizes: prev.sizes.filter((_, i) => i !== index),
        }))
    }

    const handleSaveProduct = async () => {
        try {
            setLoading(true)

            // Upload attachments if any
            let attachmentUrls = productForm.attachments.filter((a) => !a.file)
            if (selectedFiles.length > 0) {
                const uploaded = await AttachmentService.uploadFiles(selectedFiles)
                attachmentUrls = [...attachmentUrls, ...uploaded]
            }

            const dataToSave = {
                ...productForm,
                attachments: attachmentUrls,
            }

            if (productForm.id) {
                await ProductService.update(productForm.id, dataToSave)
            } else {
                await ProductService.create(dataToSave)
            }

            if (onProductSaved) onProductSaved()
            onClose()
        } catch (error) {
            console.error("Error saving product:", error)
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
                    maxWidth: 1000,
                    maxHeight: "90vh",
                    overflowY: "auto",
                }}
            >
                <Typography variant="h6" sx={{ mb: 4 }}>
                    {productForm.id ? "Mahsulotni tahrirlash" : "Mahsulot qo'shish"}
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
                            type="number"
                            label="Narx"
                            value={productForm.price}
                            onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={productForm.status}
                                onChange={(e) => setProductForm({ ...productForm, status: e.target.value })}
                                label="Status"
                            >
                                <MenuItem value="NEW">Yangi</MenuItem>
                                <MenuItem value="HOT">Issiq</MenuItem>
                                <MenuItem value="SALE">Sotuvda</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="Kolleksiya"
                            value={productForm.collection}
                            onChange={(e) => setProductForm({ ...productForm, collection: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Switch
                                checked={productForm.active}
                                onChange={(e) => setProductForm({ ...productForm, active: e.target.checked })}
                                color="primary"
                            />
                            <Typography>Faol</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" sx={{ mb: 2 }}>
                            Rasmlar
                        </Typography>
                        <Input
                            type="file"
                            inputProps={{ multiple: true, accept: "image/*" }}
                            onChange={handleFileChange}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <Grid container spacing={2}>
                            {productForm.attachments.map((att, index) => (
                                <Grid item xs={4} key={index}>
                                    <Box sx={{ position: "relative" }}>
                                        <img
                                            src={att.url || "/placeholder.svg"}
                                            alt="preview"
                                            style={{ width: "100%", height: 128, objectFit: "cover", borderRadius: 8 }}
                                        />
                                        <IconButton
                                            sx={{
                                                position: "absolute",
                                                top: 0,
                                                right: 0,
                                                bgcolor: "error.main",
                                                color: "white",
                                                "&:hover": { bgcolor: "error.dark" },
                                            }}
                                            size="small"
                                            onClick={() => handleRemoveAttachment(index)}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                        <Typography variant="subtitle1" sx={{ mt: 4, mb: 2 }}>
                            O'lchamlar
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
                                <Button variant="contained" onClick={handleAddSize} fullWidth>
                                    Qo'shish
                                </Button>
                            </Grid>
                        </Grid>
                        {productForm.sizes.map((size, index) => (
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
                                }}
                            >
                                <Typography>
                                    {size.size}: {size.amount}
                                </Typography>
                                <IconButton onClick={() => handleRemoveSize(index)} color="error">
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

export default AddModal