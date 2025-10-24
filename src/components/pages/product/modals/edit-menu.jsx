import { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, Typography } from "@mui/material"
import {EditModal, AddSizeModal, PicturesEditModal, StatusEditModal } from './index'

const ProductEditMenuModal = ({ open, onClose, product, onProductUpdated }) => {
    const [openEdit, setOpenEdit] = useState(false)
    const [openPicturesEdit, setOpenPicturesEdit] = useState(false)
    const [openStatusEdit, setOpenStatusEdit] = useState(false)
    const [openAddSize, setOpenAddSize] = useState(false)

    if (!product) return null

    const handleOpenEdit = () => {
        setOpenEdit(true)
    }

    const handleOpenPicturesEdit = () => {
        setOpenPicturesEdit(true)
    }

    const handleOpenStatusEdit = () => {
        setOpenStatusEdit(true)
    }

    const handleOpenAddSize = () => {
        setOpenAddSize(true)
    }

    const handleCloseEdit = () => {
        setOpenEdit(false)
    }

    const handleClosePicturesEdit = () => {
        setOpenPicturesEdit(false)
    }

    const handleCloseStatusEdit = () => {
        setOpenStatusEdit(false)
    }

    const handleCloseAddSize = () => {
        setOpenAddSize(false)
    }

    const handleProductUpdated = () => {
        if (onProductUpdated) {
            onProductUpdated()
        }
        onClose()
    }

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 600, color: "primary.main" }}>Mahsulotni tahrirlash</DialogTitle>

                <DialogContent dividers>
                    <Typography variant="subtitle1" gutterBottom>
                        <strong>ID:</strong> {product.id}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        <strong>Nomi:</strong> {product.name}
                    </Typography>
                </DialogContent>

                <DialogActions sx={{ flexDirection: "column", alignItems: "stretch", gap: 2, p: 2 }}>
                    <Stack direction="row" spacing={2} justifyContent="space-between">
                        <Button variant="outlined" color="primary" fullWidth onClick={handleOpenEdit}>
                            Tahrirlash
                        </Button>
                        <Button variant="outlined" color="info" fullWidth onClick={handleOpenPicturesEdit}>
                            Rasmlarni tahrirlash
                        </Button>
                    </Stack>
                </DialogActions>
            </Dialog>

            {/* Sub-modals */}
            <EditModal
                open={openEdit}
                onClose={handleCloseEdit}
                product={product}
                onProductUpdated={handleProductUpdated}
            />

            <PicturesEditModal
                open={openPicturesEdit}
                onClose={handleClosePicturesEdit}
                product={product}
                onProductUpdated={handleProductUpdated}
            />

            <StatusEditModal
                open={openStatusEdit}
                onClose={handleCloseStatusEdit}
                product={product}
                onProductUpdated={handleProductUpdated}
            />

            <AddSizeModal
                open={openAddSize}
                onClose={handleCloseAddSize}
                product={product}
                onProductUpdated={handleProductUpdated}
            />
        </>
    )
}

export default ProductEditMenuModal