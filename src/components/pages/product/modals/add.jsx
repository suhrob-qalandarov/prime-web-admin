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
        brand: "",
        description: "",
        price: "",
        categoryId: "",
        status: "NEW",
        sizes: [],
        attachments: [],
    })

    const [newSize, setNewSize] = useState({ size: "", amount: "" })
    const [newCategory, setNewCategory] = useState(null)
    const [selectedFiles, setSelectedFiles] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (product) {
            setProductForm({
                id: product.id,
                name: product.name || "",
                brand: product.brand || "",
                description: product.description || "",
                price: product.price || "",
                categoryId: product.categoryId || "",
                status: product.status || "NEW",
                sizes: product.sizes || [],
                attachments: product.attachments || [],
            })
        } else {
            setProductForm({
                id: null,
                name: "",
                brand: "",
                description: "",
                price: "",
                categoryId: "",
                status: "NEW",
                sizes: [],
                attachments: [],
            })
        }
    }, [product])

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files)
        setSelectedFiles(files)
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
            // agar bu o‘lcham allaqachon mavjud bo‘lsa, qaytmaydi
            const exists = productForm.sizes.some((s) => s.size === newSize.size)
            if (exists) return
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
            let attachmentUrls = productForm.attachments.filter((a) => !a.file)
            if (selectedFiles.length > 0) {
                const uploaded = await AttachmentService.uploadFiles(selectedFiles)
                attachmentUrls = [...attachmentUrls, ...uploaded]
            }
            const dataToSave = { ...productForm, attachments: attachmentUrls }

            if (productForm.id) await ProductService.update(productForm.id, dataToSave)
            else await ProductService.create(dataToSave)

            if (onProductSaved) onProductSaved()
            onClose()
        } catch (err) {
            console.error("Error saving product:", err)
        } finally {
            setLoading(false)
        }
    }

    // mavjud o‘lchamlarni filterlab, Select’da faqat tanlanmaganlarini ko‘rsatish
    const availableSizes = sizes.filter(
        (s) => !productForm.sizes.some((sel) => sel.size === s.value)
    )

    const availableCategories = [
        {id: 1, name: 'Rubashkalar'},
        {id: 2, name: 'Soatlar'},
        {id: 3, name: 'Jensiylar'},
    ]

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
                    overflow: "hidden",
                }}
            >
                <Typography variant="h6" sx={{ mb: 4 }}>
                    {productForm.id ? "Mahsulotni tahrirlash" : "Mahsulot qo‘shish"}
                </Typography>

                {/* === FORM USTI QISMI === */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Nomi"
                            value={productForm.name}
                            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Brend"
                            value={productForm.brand}
                            onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                        />
                    </Grid>
                    <Box sx={{ width: { xs: '100%', md: '20%' }, mb: 2 }}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="category-label">Kategoriya</InputLabel>
                            <Select
                                labelId="category-label"
                                id="category"
                                value={productForm.categoryId || ""}
                                label="Kategoriya"
                                onChange={(e) =>
                                    setProductForm({ ...productForm, categoryId: e.target.value })
                                }
                            >
                                {availableCategories.map((cat) => (
                                    <MenuItem key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Narx"
                            value={productForm.price}
                            onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                        />
                    </Grid>
                </Grid>

                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Tavsif"
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    sx={{ mb: 3 }}
                />

                {/* === RASMLAR & O‘LCHAMLAR BLOKI === */}
                <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                        Rasmlar va O‘lchamlar
                    </Typography>

                    <Box className="flex flex-col md:flex-row gap-4" sx={{ maxHeight: 400, overflow: "hidden" }}>
                        {/* ==== CHAP: RASMLAR ==== */}
                        <Box className="flex-1 flex flex-col">
                            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                Rasmlar
                            </Typography>

                            <Input
                                type="file"
                                inputProps={{ multiple: true, accept: "image/*" }}
                                onChange={handleFileChange}
                                fullWidth
                                sx={{ mb: 2 }}
                            />

                            <Box
                                className="grid grid-cols-2 gap-3 overflow-y-auto"
                                sx={{
                                    flexGrow: 1,
                                    maxHeight: 300,
                                    pr: 1,
                                }}
                            >
                                {productForm.attachments.map((att, index) => (
                                    <Box key={index} className="relative">
                                        <img
                                            src={att.url || "/placeholder.svg"}
                                            alt="preview"
                                            className="w-full object-cover rounded-lg"
                                            style={{ height: "16rem" }}
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
                                ))}
                            </Box>
                        </Box>

                        {/* ==== O‘NG: O‘LCHAMLAR ==== */}
                        {/* ==== O‘NG: O‘LCHAMLAR ==== */}
                        <Box
                            className="flex-1 flex flex-col border-l border-gray-300 pl-4"
                            sx={{
                                overflowY: "auto",
                                maxHeight: 400,
                            }}
                        >
                            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                O‘lchamlar
                            </Typography>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 2,
                                    mb: 2,
                                }}
                            >
                                <Box sx={{ flex: { xs: '0 0 100%', sm: '0 0 30%' } }}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="size-label">O‘lcham</InputLabel>
                                        <Select
                                            labelId="size-label"
                                            id="size"
                                            value={newSize.size || ""}
                                            label="O‘lcham"
                                            onChange={(e) => setNewSize({ ...newSize, size: e.target.value })}
                                        >
                                            {availableSizes.map((s) => (
                                                <MenuItem key={s.value} value={s.value}>
                                                    {s.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>

                                <Box sx={{ flex: { xs: '0 0 100%', sm: '0 0 33.33%' } }}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        label="Miqdor"
                                        value={newSize.amount}
                                        onChange={(e) => setNewSize({ ...newSize, amount: e.target.value })}
                                    />
                                </Box>

                                <Box sx={{ flex: { xs: '0 0 100%', sm: '0 0 25%' } }}>
                                    <Button
                                        variant="contained"
                                        onClick={handleAddSize}
                                        fullWidth
                                        sx={{ height: "100%" }}
                                    >
                                        Qo‘shish
                                    </Button>
                                </Box>
                            </Box>

                            <Box className="overflow-y-auto flex-grow space-y-2 pr-1">
                                {productForm.sizes.map((size, index) => (
                                    <Box
                                        key={index}
                                        className="flex justify-between items-center border border-gray-300 rounded-lg p-2"
                                    >
                                        <Typography>
                                            {size.size}: {size.amount}
                                        </Typography>
                                        <IconButton onClick={() => handleRemoveSize(index)} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Grid>

                {/* === ACTIONS === */}
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
