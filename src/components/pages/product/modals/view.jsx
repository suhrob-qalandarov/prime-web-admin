import { Box, Button, Chip, Grid, Modal, Typography } from "@mui/material"

const ViewModal = ({ open, onClose, product }) => {
    if (!product) return null

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
                }}
            >
                <Typography variant="h6" sx={{ mb: 4 }}>
                    Mahsulot ma'lumotlari
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={5}>
                        <Typography variant="subtitle1" sx={{ mb: 2 }}>
                            Rasmlar
                        </Typography>
                        <Grid container spacing={2}>
                            {product.attachments &&
                                product.attachments.map((url, index) => (
                                    <Grid item xs={6} key={index}>
                                        <img
                                            src={url || "/placeholder.svg"}
                                            alt="product"
                                            style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 8 }}
                                        />
                                    </Grid>
                                ))}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography sx={{ fontWeight: 600 }}>ID:</Typography>
                                <Typography>{product.id}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography sx={{ fontWeight: 600 }}>Nomi:</Typography>
                                <Typography>{product.name}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography sx={{ fontWeight: 600 }}>Tavsif:</Typography>
                                <Typography>{product.description}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography sx={{ fontWeight: 600 }}>Narx:</Typography>
                                <Typography>{product.price} so'm</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography sx={{ fontWeight: 600 }}>Kategoriya:</Typography>
                                <Typography>{product.categoryName}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography sx={{ fontWeight: 600 }}>Status:</Typography>
                                <Chip
                                    label={product.status}
                                    color={product.status === "NEW" ? "success" : product.status === "HOT" ? "error" : "warning"}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography sx={{ fontWeight: 600 }}>Holati:</Typography>
                                <Typography>{product.active ? "Faol" : "Nofaol"}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography sx={{ fontWeight: 600 }}>Kolleksiya:</Typography>
                                <Typography>{product.collection || "-"}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography sx={{ fontWeight: 600 }}>Yaratilgan:</Typography>
                                <Typography>{new Date(product.createdAt).toLocaleString()}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography sx={{ fontWeight: 600 }}>Yangilangan:</Typography>
                                <Typography>{new Date(product.updatedAt).toLocaleString()}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography sx={{ fontWeight: 600 }}>O'lchamlar:</Typography>
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                                    {product.sizes &&
                                        product.sizes.map(({ size, amount }, index) => (
                                            <Chip key={index} label={`${size}: ${amount}`} color="primary" />
                                        ))}
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
                    <Button onClick={onClose} variant="outlined">
                        Yopish
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default ViewModal