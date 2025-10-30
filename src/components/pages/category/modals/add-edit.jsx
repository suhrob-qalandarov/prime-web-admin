// src/components/modals/AddEditModal.jsx
import React, { useState } from "react";
import { Box, Modal, TextField, MenuItem, CircularProgress, Alert } from "@mui/material";
import { spotlights } from "../../../../constants/spotlights";
import CategoryService from "../../../../service/category";

const AddEditModal = ({ open, onClose, category = null, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: category?.name || "",
        spotlight: category?.spotlightName || "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.name.trim() || !formData.spotlight) {
            setError("Iltimos, barcha maydonlarni to'ldiring.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const payload = {
                name: formData.name.trim(),
                spotlightName: formData.spotlight, // backendda shu nomda kutilyapti
            };

            if (category?.id) {
                // Tahrirlash
                //await CategoryService.updateCategory(category.id, payload);
            } else {
                // Yangi qo'shish
                await CategoryService.persistToLS(payload);
            }

            // Muvaffaqiyatli bo'lsa
            onSuccess?.(); // ota komponentga xabar berish (masalan, jadvalni yangilash)
            onClose();
        } catch (err) {
            console.error("Kategoriya saqlanmadi:", err);
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
            <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-stone-900">
                        {category ? "Kategoriyani Tahrirlash" : "Kategoriya Qo'shish"}
                    </h2>
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="text-stone-500 hover:text-stone-700 transition disabled:opacity-50"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {error && (
                    <Alert severity="error" className="mb-4" onClose={() => setError("")}>
                        {error}
                    </Alert>
                )}

                <div className="space-y-5">
                    {/* Kategoriya nomi */}
                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                            Kategoriya Nomi
                        </label>
                        <TextField
                            fullWidth
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Masalan: Ko'ylaklar"
                            size="small"
                            disabled={loading}
                            required
                        />
                    </div>

                    {/* Toifa (Spotlight) - Select */}
                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                            Toifa
                        </label>
                        <TextField
                            select
                            fullWidth
                            name="spotlight"
                            value={formData.spotlight}
                            onChange={handleChange}
                            size="small"
                            disabled={loading}
                            required
                        >
                            {spotlights.map((item) => (
                                <MenuItem key={item.name} value={item.name}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-8">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="px-6 py-2 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition font-medium disabled:opacity-50"
                    >
                        Bekor qilish
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-6 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-900 transition font-medium disabled:opacity-50 flex items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <CircularProgress size={16} color="inherit" />
                                Saqlanmoqda...
                            </>
                        ) : (
                            "Saqlash"
                        )}
                    </button>
                </div>
            </Box>
        </Modal>
    );
};

export default AddEditModal;