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
    Chip,
} from "@mui/material"
import { Delete as DeleteIcon } from "@mui/icons-material"
import ProductService from "../../../../service/product"
import AttachmentService from "../../../../service/attachment"
import { sizes } from "../../../../constants/product-sizes"

const EditModal = ({ open, onClose, product, onProductUpdated }) => {
    const [productForm, setProductForm] = useState({
        name: "",
        brand: "",
        price: "",
        description: "",
        attachments: [],
        existingSizes: [],
    })

    const [newSize, setNewSize] = useState({ size: "", amount: "" })
    const [newSizes, setNewSizes] = useState([])
    const [selectedFiles, setSelectedFiles] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (product) {
            setProductForm({
                name: product.name || "",
                brand: product.brand || "",
                price: product.price || "",
                description: product.description || "",
                attachments: product.attachments || [],
                existingSizes: product.sizes || [],
            })
            setNewSizes([])
        }
    }, [product])

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files)
        setSelectedFiles(files)
        const previews = files.map((file) => ({
            url: URL.createObjectURL(file),
            file,
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
            let attachmentUrls = productForm.attachments.filter((a) => !a.file)
            if (selectedFiles.length > 0) {
                const uploaded = await AttachmentService.uploadFiles(selectedFiles)
                attachmentUrls = [...attachmentUrls, ...uploaded]
            }

            const dataToSave = {
                name: productForm.name,
                brand: productForm.brand,
                price: productForm.price,
                description: productForm.description,
                attachments: attachmentUrls,
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

    // Faqat hali qo‘shilmagan o‘lchamlar chiqsin:
    const availableSizes = sizes.filter(
        (s) =>
            !productForm.existingSizes.some((ex) => ex.size === s.value) &&
            !newSizes.some((n) => n.size === s.value)
    )

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
                    Mahsulotni tahrirlash
                </Typography>

                {/* === NOMI, BREND, NARX === */}
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
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Narx"
                            value={productForm.price}
                            disabled
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

                    <Box
                        className="flex flex-col md:flex-row gap-4"
                        sx={{
                            maxHeight: 400,
                            overflow: "hidden",
                        }}
                    >
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
                                            className="w-full h-64 object-cover rounded-lg" // <-- 2x katta height
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
                        <Box
                            className="flex-1 flex flex-col border-l border-gray-300 pl-4"
                            sx={{
                                overflowY: "auto",
                                maxHeight: 400,
                            }}
                        >
                            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                Mavjud o‘lchamlar (faqat ko‘rinadi)
                            </Typography>

                            {productForm.existingSizes.map((size, index) => (
                                <Box
                                    key={index}
                                    className="flex justify-between items-center border border-gray-300 rounded-lg p-2 mb-2 bg-gray-50"
                                >
                                    <Typography>
                                        {size.size}: {size.amount}
                                    </Typography>
                                    <Chip label="Mavjud" size="small" />
                                </Box>
                            ))}

                            <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
                                Yangi o‘lcham qo‘shish
                            </Typography>

                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid item xs={5}>
                                    <FormControl fullWidth>
                                        <InputLabel>O‘lcham</InputLabel>
                                        <Select
                                            value={newSize.size}
                                            onChange={(e) => setNewSize({ ...newSize, size: e.target.value })}
                                            label="O‘lcham"
                                        >
                                            {availableSizes.map((s) => (
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
                                        Qo‘shish
                                    </Button>
                                </Grid>
                            </Grid>

                            {newSizes.map((size, index) => (
                                <Box
                                    key={index}
                                    className="flex justify-between items-center border border-green-400 rounded-lg p-2 mb-2 bg-green-50"
                                >
                                    <Typography>
                                        {size.size}: {size.amount}
                                    </Typography>
                                    <IconButton onClick={() => handleRemoveNewSize(index)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            ))}
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

export default EditModal