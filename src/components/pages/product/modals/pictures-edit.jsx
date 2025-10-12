import { useState, useEffect } from "react"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    Box,
    IconButton,
    Input,
    Typography,
} from "@mui/material"
import { Delete as DeleteIcon } from "@mui/icons-material"
import ProductService from "../../../../service/product"
import AttachmentService from "../../../../service/attachment"

const PicturesEditModal = ({ open, onClose, product, onProductUpdated }) => {
    const [attachments, setAttachments] = useState([])
    const [selectedFiles, setSelectedFiles] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (product && product.attachments) {
            setAttachments(product.attachments)
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
        setAttachments([...attachments, ...previews])
    }

    const handleRemoveAttachment = (index) => {
        setAttachments((prev) => prev.filter((_, i) => i !== index))
    }

    const handleSave = async () => {
        try {
            setLoading(true)

            // Upload new files if any
            if (selectedFiles.length > 0) {
                const uploadedUrls = await AttachmentService.uploadFiles(selectedFiles)
                // Update product with new attachments
                await ProductService.update(product.id, {
                    attachments: [...attachments.filter((a) => !a.file), ...uploadedUrls],
                })
            } else {
                // Just update existing attachments
                await ProductService.update(product.id, {
                    attachments: attachments.filter((a) => !a.file),
                })
            }

            if (onProductUpdated) onProductUpdated()
            onClose()
        } catch (error) {
            console.error("Error updating pictures:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Rasmlarni tahrirlash</DialogTitle>
            <DialogContent dividers>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Rasmlar
                </Typography>
                <Input
                    type="file"
                    inputProps={{ multiple: true, accept: "image/*" }}
                    onChange={handleFileChange}
                    fullWidth
                    sx={{ mb: 4 }}
                />
                <Grid container spacing={2}>
                    {attachments.map((att, index) => (
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
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined">
                    Bekor qilish
                </Button>
                <Button onClick={handleSave} variant="contained" color="primary" disabled={loading}>
                    {loading ? "Saqlanmoqda..." : "Saqlash"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default PicturesEditModal