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
    FormHelperText,
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
        sizes: [],
        attachments: [],
    })

    const [newSize, setNewSize] = useState({ size: "", amount: "" })
    const [newCategory, setNewCategory] = useState(null)
    const [selectedFiles, setSelectedFiles] = useState([])
    const [loading, setLoading] = useState(false)

    const [errors, setErrors] = useState({
        name: "",
        price: "",
        categoryId: "",
        sizes: "",
        attachments: "",
    })

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
        setErrors({
            name: "",
            price: "",
            categoryId: "",
            sizes: "",
            attachments: "",
        })
    }, [product, open])

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
        setErrors((prev) => ({ ...prev, attachments: "" }))
    }

    const handleRemoveAttachment = (index) => {
        setProductForm((prev) => ({
            ...prev,
            attachments: prev.attachments.filter((_, i) => i !== index),
        }))
    }

    const handleAddSize = () => {
        if (newSize.size && newSize.amount) {
            const exists = productForm.sizes.some((s) => s.size === newSize.size)
            if (exists) return
            setProductForm((prev) => ({
                ...prev,
                sizes: [...prev.sizes, { ...newSize }],
            }))
            setNewSize({ size: "", amount: "" })
            setErrors((prev) => ({ ...prev, sizes: "" }))
        }
    }

    const handleRemoveSize = (index) => {
        setProductForm((prev) => ({
            ...prev,
            sizes: prev.sizes.filter((_, i) => i !== index),
        }))
    }

    const validateForm = () => {
        const newErrors = {
            name: "",
            brand: "",
            description: "",
            price: "",
            categoryId: "",
            sizes: "",
            attachments: "",
        }

        let isValid = true

        if (!productForm.name || productForm.name.trim() === "") {
            newErrors.name = "Mahsulot nomini kiriting!"
            isValid = false
        }

        if (!productForm.brand || productForm.brand.trim() === "") {
            newErrors.brand = "Mahsulot brendini kiriting!"
            isValid = false
        }

        if (!productForm.price || productForm.price <= 0) {
            newErrors.price = "Mahsulot narxini kiriting!"
            isValid = false
        }

        if (!productForm.description || productForm.description.trim() === "") {
            newErrors.description = "Mahsulot tavsifini kiriting!"
            isValid = false
        }

        if (!productForm.categoryId) {
            newErrors.categoryId = "Kategoriyani tanlang!"
            isValid = false
        }

        if (productForm.sizes.length === 0) {
            newErrors.sizes = "Kamida bitta o'lcham qo'shing!"
            isValid = false
        }

        if (selectedFiles.length === 0 && productForm.attachments.length === 0) {
            newErrors.attachments = "Kamida bitta rasm qo'shing!"
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const handleSaveProduct = async () => {
        if (!validateForm()) {
            return
        }

        try {
            setLoading(true);

            let attachmentIds = productForm.attachments
                .filter((a) => !a.file)
                .map((a) => a.id);

            if (selectedFiles.length > 0) {
                const uploadedKeys = await AttachmentService.uploadFiles(selectedFiles);
                attachmentIds = [...attachmentIds, ...uploadedKeys];
            }

            if (attachmentIds.length === 0) {
                throw new Error("Kamida bitta attachment kerak!");
            }

            const dataToSave = {
                ...productForm,
                attachmentKeys: attachmentIds,
                attachments: undefined
            };

            await ProductService.persistToLS(dataToSave);

            if (onProductSaved) {
                onProductSaved("Mahsulot muvaffaqiyatli saqlandi!", "success");
            }
            onClose();
        } catch (err) {
            console.error("Error saving product:", err);
            if (onProductSaved) {
                onProductSaved(err.message || "Mahsulotni saqlashda xatolik yuz berdi!", "error");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleClearData = async () => {
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
        setErrors({
            name: "Mahsulot nomini kiriting!",
            brand: "Mahsulot brendini kiriting!",
            description: "Mahsulot tavsifini kiriting!",
            price: "Mahsulot narxini kiriting!",
            categoryId: "Kategoriyani tanlang!",
            sizes: "Kamida bitta o'lcham qo'shing!",
            attachments: "Kamida bitta rasm qo'shing!",
        })
    }

    const availableSizes = sizes.filter((s) => !productForm.sizes.some((sel) => sel.size === s.value))

    const availableCategories = [
        { id: 1, name: "Ko'ylaklar" },
        { id: 2, name: "Soatlar" },
        { id: 3, name: "Jensiylar" },
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
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                        <Typography variant="h6">{productForm.id ? "Mahsulotni tahrirlash" : "Mahsulot qo'shish"}</Typography>
                        <Button
                            onClick={handleClearData}
                            variant="outlined"
                            color="error"
                            sx={{
                                px: 3,
                                py: 1,
                                borderRadius: 3,
                                textTransform: "none",
                                fontWeight: 500,
                            }}
                        >
                            Tozalash
                        </Button>
                    </Box>
                </Typography>

                {/* === FORM USTI QISMI === */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} md={4} sx={{ width: { xs: "100%", md: "30%" } }}>
                        <TextField
                            fullWidth
                            label="Nomi"
                            value={productForm.name}
                            onChange={(e) => {
                                setProductForm({ ...productForm, name: e.target.value })
                                setErrors((prev) => ({ ...prev, name: "" }))
                            }}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Brend"
                            value={productForm.brand}
                            onChange={(e) => {
                                setProductForm({...productForm, brand: e.target.value})
                                setErrors((prev) => ({ ...prev, brand: "" }))
                            }}
                            error={!!errors.brand}
                            helperText={errors.brand}
                        />
                    </Grid>
                    <Box sx={{ width: { xs: '100%', md: '23%' }, mb: 2 }}>
                        <FormControl fullWidth variant="outlined" error={!!errors.categoryId}>
                            <InputLabel id="category-label">Kategoriya</InputLabel>
                            <Select
                                labelId="category-label"
                                id="category"
                                value={productForm.categoryId || ""}
                                label="Kategoriya"
                                onChange={(e) => {
                                    setProductForm({ ...productForm, categoryId: e.target.value })
                                    setErrors((prev) => ({ ...prev, categoryId: "" }))
                                }}
                            >
                                {availableCategories.map((cat) => (
                                    <MenuItem key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.categoryId && <FormHelperText>{errors.categoryId}</FormHelperText>}
                        </FormControl>
                    </Box>

                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Narx so'm"
                            value={productForm.price}
                            onChange={(e) => {
                                setProductForm({ ...productForm, price: e.target.value })
                                setErrors((prev) => ({ ...prev, price: "" }))
                            }}
                            error={!!errors.price}
                            helperText={errors.price}
                        />
                    </Grid>
                </Grid>

                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Tavsif"
                    value={productForm.description}
                    onChange={(e) => {
                        setProductForm({...productForm, description: e.target.value})
                        setErrors((prev) => ({ ...prev, description: "" }))
                    }}
                    error={!!errors.description}
                    helperText={errors.description}
                    sx={{ mb: 3 }}
                />

                {/* === RASMLAR & O'LCHAMLAR BLOKI === */}
                <Grid item xs={12}>
                    <Box className="flex flex-col md:flex-row gap-4" sx={{ maxHeight: 600, overflow: "hidden", mt: 0 }}>
                        {/* ==== CHAP: RASMLAR ==== */}
                        <Box className="flex-1 flex flex-col">
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

                            {errors.attachments && (
                                <Typography color="error" variant="caption" sx={{ mb: 1, display: "block" }}>
                                    {errors.attachments}
                                </Typography>
                            )}

                            <Box sx={{ flexGrow: 1, maxHeight: 400, borderRadius: "6px", overflowY: "auto", pr: 1 }}>
                                {productForm.attachments.length > 0 ? (
                                    <Box className="grid grid-cols-2 gap-3">
                                        {productForm.attachments.map((att, index) => (
                                            <Box key={index} className="relative">
                                                <img
                                                    src={att.url || "/placeholder.svg"}
                                                    alt="preview"
                                                    className="w-full object-cover rounded-lg"
                                                    style={{ height: "18rem" }}
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
                                ) : (
                                    <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                                        <Typography sx={{ color: "text.secondary", textAlign: "center" }}>
                                            Hech qanday rasm qo'shilmagan
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </Box>

                        {/* ==== O'NG: O'LCHAMLAR ==== */}
                        <Box
                            className="flex-1 flex flex-col border-l border-gray-300 pl-4"
                            sx={{
                                overflowY: "auto",
                                maxHeight: 492,
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ mb: 2 }}>
                                O'lchamlar
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 2,
                                    mb: 2,
                                }}
                            >
                                <Box sx={{ flex: { xs: "0 0 100%", sm: "0 0 34%" } }}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="size-label">O'lcham</InputLabel>
                                        <Select
                                            labelId="size-label"
                                            id="size"
                                            value={newSize.size || ""}
                                            label="O'lcham"
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

                                <Box sx={{ flex: { xs: "0 0 100%", sm: "0 0 33.33%" } }}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        label="Miqdor"
                                        value={newSize.amount}
                                        onChange={(e) => setNewSize({ ...newSize, amount: e.target.value })}
                                    />
                                </Box>

                                <Box sx={{ flex: { xs: "0 0 100%", sm: "0 0 25%" } }}>
                                    <Button variant="outlined" onClick={handleAddSize} fullWidth sx={{ height: "100%" }}>
                                        Qo'shish
                                    </Button>
                                </Box>
                            </Box>

                            {errors.sizes && (
                                <Typography color="error" variant="caption" sx={{ mb: 1, display: "block" }}>
                                    {errors.sizes}
                                </Typography>
                            )}

                            <Box className="overflow-y-auto flex-grow space-y-2 pr-1">
                                {productForm.sizes.length > 0 ? (
                                    productForm.sizes.map((size, index) => (
                                        <Box
                                            key={index}
                                            className="flex justify-between items-center border border-gray-300 rounded-lg p-2"
                                        >
                                            <Typography>
                                                {size.size}: {size.amount} ta
                                            </Typography>
                                            <IconButton onClick={() => handleRemoveSize(index)} color="error">
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    ))
                                ) : (
                                    <Typography sx={{ color: "text.secondary", textAlign: "center", py: 2 }}>
                                        Hech qanday o'lcham qo'shilmagan
                                    </Typography>
                                )}
                            </Box>

                            {/* === ACTIONS === */}
                            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
                                <Button
                                    onClick={onClose}
                                    variant="outlined"
                                    color="warning"
                                    sx={{
                                        px: 3,
                                        py: 1,
                                        borderRadius: 3,
                                        textTransform: "none",
                                        fontWeight: 500,
                                    }}
                                >
                                    Bekor qilish
                                </Button>
                                <Button
                                    onClick={handleSaveProduct}
                                    variant="outlined"
                                    color="success"
                                    disabled={loading}
                                    sx={{
                                        px: 3,
                                        py: 1,
                                        borderRadius: 3,
                                        textTransform: "none",
                                        fontWeight: 500,
                                    }}
                                >
                                    {loading ? "Saqlanmoqda..." : "Saqlash"}
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Box>
        </Modal>
    )
}

export default AddModal
