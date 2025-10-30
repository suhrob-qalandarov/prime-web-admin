import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography,
    FormHelperText,
    CircularProgress,
    Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import { spotlights } from "../../../../constants/spotlights";
import CategoryService from "../../../../service/category";

const AddEditModal = ({ open, onClose, category = null, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: "",
        spotlight: "",
    });

    const [errors, setErrors] = useState({
        name: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // === Clearing Form (only when the button is pressed) ===
    const handleClearData = () => {
        setFormData({
            name: "",
            spotlight: "",
        });
        // Show errors — only when cleaning
        setErrors({
            name: "Kategoriya nomini kiriting!"
        });
    };

    useEffect(() => {
        if (open) {
            if (category) {
                setFormData({
                    name: category.name || "",
                    spotlight: category.spotlightName || "",
                });
                setErrors({ name: "" });
            } else {
                setFormData({ name: "", spotlight: "" });
                setErrors({ name: "" });
            }
        }
    }, [category, open]);

    // === Input changes ===
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear errors
        if (value.trim()) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    // === Validation ===
    const validateForm = () => {
        const newErrors = { name: "" };
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = "Kategoriya nomini kiriting!";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // === Save ===
    const handleSubmit = async () => {
        if (!validateForm()) return;

        setLoading(true);
        setError("");

        try {
            const payload = {
                name: formData.name.trim(),
                spotlightName: formData.spotlight,
            };

            if (category?.id) {
                // Edit service
            } else {
                // Add new
                await CategoryService.persistToLS(payload);
            }

            onSuccess?.();
            onClose();
        } catch (err) {
            console.error("Saqlashda xatolik:", err);
            setError(
                err.response?.data?.message ||
                "Kategoriyani saqlashda xatolik yuz berdi. Qayta urinib ko'ring."
            );
        } finally {
            setLoading(false);
        }
    };

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
                    maxWidth: 600,
                    maxHeight: "90vh",
                    overflow: "hidden",
                }}
            >
                {/* Title + Clear Button */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                    <Typography variant="h6" component="h2">
                        {category ? "Tahrirlash" : "Qo'shish"}
                    </Typography>
                    <Button
                        onClick={handleClearData}
                        variant="outlined"
                        color="error"
                        disabled={loading}
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

                {/* Common error */}
                {error && (
                    <Alert severity="error" className="mb-4" onClose={() => setError("")}>
                        {error}
                    </Alert>
                )}

                {/* Form fields */}
                <Grid spacing={3} sx={{ mb: 2 }}>
                    {/* Category name */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Kategoriya Nomi"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Masalan: Oq Ko'ylaklar"
                            error={!!errors.name}
                            helperText={errors.name}
                            disabled={loading}
                            required
                            sx={{
                                marginBottom: 2,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                }
                            }}
                        />
                    </Grid>

                    {/* Spotlight */}
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined" error={!!errors.spotlight}>
                            <InputLabel id="spotlight-label">Toifa</InputLabel>
                            <Select
                                labelId="spotlight-label"
                                id="spotlight"
                                name="spotlight"
                                value={formData.spotlight}
                                label="Toifa"
                                onChange={handleChange}
                                disabled={loading}
                                required
                                sx={{ borderRadius: 2 }}
                            >
                                {/* The first option is "Not selected" */}
                                <MenuItem value={null}>
                                    <em>Tanlanmagan</em>
                                </MenuItem>

                                {/* Asosiy toifalar */}
                                {spotlights.map((item) => (
                                    <MenuItem key={item.name} value={item.name}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.spotlight && <FormHelperText>{errors.spotlight}</FormHelperText>}
                        </FormControl>
                    </Grid>
                </Grid>

                {/* Buttons */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>

                    {/* Cancel Button */}
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        color="warning"
                        disabled={loading}
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

                    {/* Submit(Save) Button */}
                    <Button
                        onClick={handleSubmit}
                        variant="outlined"
                        color="success"
                        disabled={loading}
                        sx={{
                            px: 3,
                            py: 1,
                            borderRadius: 3,
                            textTransform: "none",
                            fontWeight: 500,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        {loading ? (
                            <>
                                <CircularProgress size={16} color="inherit" />
                                Saqlanmoqda...
                            </>
                        ) : (
                            "Saqlash"
                        )}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddEditModal;