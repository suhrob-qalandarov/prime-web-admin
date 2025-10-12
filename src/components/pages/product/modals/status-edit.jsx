import { useState, useEffect } from "react"
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
} from "@mui/material"
import ProductService from "../../../../service/product"

const StatusEditModal = ({ open, onClose, product, onProductUpdated }) => {
    const [formData, setFormData] = useState({
        status: "NEW",
        discount: 0,
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (product) {
            setFormData({
                status: product.status || "NEW",
                discount: product.discount || 0,
            })
        }
    }, [product])

    const handleSave = async () => {
        try {
            setLoading(true)
            await ProductService.update(product.id, formData)
            if (onProductUpdated) onProductUpdated()
            onClose()
        } catch (error) {
            console.error("Error updating status:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Status va Discount tahrirlash</DialogTitle>
            <DialogContent dividers>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        label="Status"
                    >
                        <MenuItem value="NEW">Yangi</MenuItem>
                        <MenuItem value="HOT">Issiq</MenuItem>
                        <MenuItem value="SALE">Sotuvda</MenuItem>
                    </Select>
                </FormControl>

                {formData.status === "SALE" && (
                    <TextField
                        fullWidth
                        type="number"
                        label="Discount (%)"
                        value={formData.discount}
                        onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                        margin="normal"
                        inputProps={{ min: 0, max: 100 }}
                    />
                )}
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

export default StatusEditModal