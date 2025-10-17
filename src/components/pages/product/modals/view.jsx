import { useState } from "react"
import {
    Box,
    Button,
    IconButton,
    Chip,
    Grid,
    Modal,
    Typography,
    Paper
} from "@mui/material"
import { Close, ChevronLeft, ChevronRight } from "@mui/icons-material"
import AttachmentService from "../../../../service/attachment"

const ViewModal = ({ open, onClose, product }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)

    if (!product) return null

    const images = product.picturesKeys && product.picturesKeys.length > 0 ? product.picturesKeys : []

    const currentImage = images[selectedImageIndex]

    const handlePrevImage = () => {
        setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }

    const handleNextImage = () => {
        setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "NEW":
                return "success"
            case "HOT":
                return "error"
            case "SALE":
                return "warning"
            default:
                return "default"
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                className="w-full max-w-5xl max-h-[90vh] overflow-y-auto"
                sx={{
                    backgroundColor: "background.paper",
                    borderRadius: "16px",
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                    position: "relative",
                }}
            >
                {/* Close Button */}
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 1)",
                        },
                        zIndex: 10,
                    }}
                >
                    <Close />
                </IconButton>

                <Box className="p-8">
                    {/* Header */}
                    <Typography variant="h4" className="font-bold text-gray-900 mb-8" sx={{ textAlign: "center" }}>
                        Mahsulot ma'lumotlari
                    </Typography>

                    <Grid container spacing={6}>
                        {/* Image Gallery Section */}
                        <Grid item xs={12} md={5}>
                            <Paper
                                elevation={0}
                                className="bg-gray-50 rounded-xl overflow-hidden"
                                sx={{ border: "1px solid #e5e7eb" }}
                            >
                                {/* Main Image */}
                                {images.length > 0 ? (
                                    <Box className="relative bg-white">
                                        <img
                                            src={AttachmentService.getImageUrl(currentImage) || "/placeholder.svg"}
                                            alt={`Product ${selectedImageIndex + 1}`}
                                            className="w-full h-80 object-cover"
                                            onError={(e) => {
                                                e.target.src = "/diverse-products-still-life.png"
                                            }}
                                        />

                                        {/* Navigation Arrows */}
                                        {images.length > 1 && (
                                            <>
                                                <IconButton
                                                    onClick={handlePrevImage}
                                                    sx={{
                                                        position: "absolute",
                                                        left: 8,
                                                        top: "50%",
                                                        transform: "translateY(-50%)",
                                                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                                                        "&:hover": {
                                                            backgroundColor: "rgba(255, 255, 255, 1)",
                                                        },
                                                    }}
                                                >
                                                    <ChevronLeft />
                                                </IconButton>
                                                <IconButton
                                                    onClick={handleNextImage}
                                                    sx={{
                                                        position: "absolute",
                                                        right: 8,
                                                        top: "50%",
                                                        transform: "translateY(-50%)",
                                                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                                                        "&:hover": {
                                                            backgroundColor: "rgba(255, 255, 255, 1)",
                                                        },
                                                    }}
                                                >
                                                    <ChevronRight />
                                                </IconButton>
                                            </>
                                        )}

                                        {/* Image Counter */}
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                bottom: 12,
                                                right: 12,
                                                backgroundColor: "rgba(0, 0, 0, 0.6)",
                                                color: "white",
                                                padding: "4px 12px",
                                                borderRadius: "20px",
                                                fontSize: "12px",
                                                fontWeight: 600,
                                            }}
                                        >
                                            {selectedImageIndex + 1} / {images.length}
                                        </Box>
                                    </Box>
                                ) : (
                                    <Box className="w-full h-80 flex items-center justify-center bg-gray-100">
                                        <Typography className="text-gray-500">Rasmlar mavjud emas</Typography>
                                    </Box>
                                )}

                                {/* Thumbnail Gallery */}
                                {images.length > 1 && (
                                    <Box className="p-3 bg-white border-t border-gray-200">
                                        <Grid container spacing={2}>
                                            {images.map((url, index) => (
                                                <Grid item xs={3} key={index}>
                                                    <Box
                                                        onClick={() => setSelectedImageIndex(index)}
                                                        className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                                                            selectedImageIndex === index
                                                                ? "border-blue-500 shadow-md"
                                                                : "border-gray-200 hover:border-gray-300"
                                                        }`}
                                                    >
                                                        <img
                                                            src={AttachmentService.getImageUrl(url) || "/placeholder.svg"}
                                                            alt={`Thumbnail ${index + 1}`}
                                                            className="w-full h-20 object-cover"
                                                            onError={(e) => {
                                                                e.target.src = "/generic-thumbnail.png"
                                                            }}
                                                        />
                                                    </Box>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                )}
                            </Paper>
                        </Grid>

                        {/* Product Details Section */}
                        <Grid item xs={12} md={7}>
                            <Box className="space-y-6">
                                {/* Product Name */}
                                <Box>
                                    <Typography className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                        Mahsulot nomi
                                    </Typography>
                                    <Typography variant="h5" className="font-bold text-gray-900">
                                        {product.name}
                                    </Typography>
                                </Box>

                                {/* Status and Active */}
                                <Box className="flex gap-3 flex-wrap">
                                    <Chip
                                        label={product.status || "NORMAL"}
                                        color={getStatusColor(product.status)}
                                        variant="filled"
                                        sx={{ fontWeight: 600 }}
                                    />
                                    <Chip
                                        label={product.active ? "✓ Faol" : "✗ Nofaol"}
                                        color={product.active ? "success" : "default"}
                                        variant="outlined"
                                    />
                                </Box>

                                {/* Price, Discount, and Description Section */}
                                <Paper
                                    elevation={0}
                                    className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200"
                                >
                                    <Typography className="text-sm text-gray-600 mb-1">Narx</Typography>
                                    <Typography variant="h4" className="font-bold text-blue-900">
                                        {product.price?.toLocaleString()} so'm
                                    </Typography>
                                    {product.discount > 0 && (
                                        <Typography className="text-sm text-blue-700 mt-2">Chegirma: {product.discount}%</Typography>
                                    )}
                                    <Typography className="text-sm text-gray-600 mt-4 mb-1">Tavsif</Typography>
                                    <Typography className="text-gray-900">{product.description || "Tavsif mavjud emas"}</Typography>
                                </Paper>

                                {/* Details Grid */}
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <Box>
                                            <Typography className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                                ID
                                            </Typography>
                                            <Typography className="text-gray-900 font-medium">{product.id}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box>
                                            <Typography className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                                Brend
                                            </Typography>
                                            <Typography className="text-gray-900 font-medium">{product.brand || "—"}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box>
                                            <Typography className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                                Kategoriya
                                            </Typography>
                                            <Typography className="text-gray-900 font-medium">{product.categoryName}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box>
                                            <Typography className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                                O'lchamlar soni
                                            </Typography>
                                            <Typography className="text-gray-900 font-medium">{product.sizeCount || 0}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box>
                                            <Typography className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                                Yaratilgan vaqti
                                            </Typography>
                                            <Typography className="text-gray-900 font-medium">
                                                {new Date(product.createdAt).toLocaleString("uz-UZ")}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>

                    {/* Action Buttons */}
                    <Box className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                        <Button
                            onClick={onClose}
                            variant="contained"
                            sx={{
                                backgroundColor: "#3b82f6",
                                color: "white",
                                textTransform: "none",
                                fontSize: "16px",
                                fontWeight: 600,
                                padding: "10px 24px",
                                borderRadius: "8px",
                                "&:hover": {
                                    backgroundColor: "#2563eb",
                                },
                            }}
                        >
                            Yopish
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default ViewModal