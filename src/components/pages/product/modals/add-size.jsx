import { useState } from "react"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Box,
    Typography,
    IconButton,
} from "@mui/material"
import { Delete as DeleteIcon } from "@mui/icons-material"
import ProductService from "../../../../service/product"
import { sizes } from "../../../../constants/product-sizes"

const AddSizeModal = ({ open, onClose, product, onProductUpdated }) => {
    const [newSize, setNewSize] = useState({ size: "", amount: "" })
    const [sizesToAdd, setSizesToAdd] = useState([])
    const [loading, setLoading] = useState(false)

    const handleAddSize = () => {
        if (newSize.size && newSize.amount) {
            setSizesToAdd((prev) => [...prev, { ...newSize }])
            setNewSize({ size: "", amount: "" })
        }
    }

    const handleRemoveSize = (index) => {
        setSizesToAdd((prev) => prev.filter((_, i) => i !== index))
    }

    const handleSave = async () => {
        try {
            setLoading(true)

            const existingSizes = product.sizes || []
            const updatedSizes = [...existingSizes, ...sizesToAdd]

            await ProductService.update(product.id, { sizes: updatedSizes })

            if (onProductUpdated) onProductUpdated()
            setSizesToAdd([])
            setNewSize({ size: "", amount: "" })
            onClose()
        } catch (error) {
            console.error("Error adding sizes:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>O'lcham qo'shish</DialogTitle>
            <DialogContent dividers>
                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
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
                    <TextField
                        fullWidth
                        type="number"
                        label="Miqdor"
                        value={newSize.amount}
                        onChange={(e) => setNewSize({ ...newSize, amount: e.target.value })}
                    />
                    <Button variant="contained" onClick={handleAddSize} sx={{ minWidth: 100 }}>
                        Qo'shish
                    </Button>
                </Box>

                {sizesToAdd.length > 0 && (
                    <>
                        <Typography variant="subtitle2" sx={{ mb: 2 }}>
                            Qo'shiladigan o'lchamlar:
                        </Typography>
                        {sizesToAdd.map((size, index) => (
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
                                <IconButton onClick={() => handleRemoveSize(index)} color="error" size="small">
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        ))}
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined">
                    Bekor qilish
                </Button>
                <Button onClick={handleSave} variant="contained" color="primary" disabled={loading || sizesToAdd.length === 0}>
                    {loading ? "Saqlanmoqda..." : "Saqlash"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddSizeModal