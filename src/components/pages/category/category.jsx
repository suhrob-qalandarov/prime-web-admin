import React, { useEffect, useState } from "react";
import { TrendingUp, Close } from "@mui/icons-material";
import { Box, Chip, Modal } from "@mui/material";
import CategoryService from "../../../service/category";
import { AddEditModal } from "./modals/index";

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [countData, setCountData] = useState({ totalCount: 0, activeCount: 0, inactiveCount: 0 });
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedRows, setExpandedRows] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [orderModalOpen, setOrderModalOpen] = useState(false);
    const [orderList, setOrderList] = useState([]);

    // === Load categories data ===
    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const [categoriesData, countDataRes] = await Promise.all([
                CategoryService.getCategoriesData(),
                CategoryService.getCategoriesCountData(),
            ]);
            setCategories(categoriesData);
            setCountData(countDataRes);
        } catch (err) {
            console.error("Ma'lumotlar yuklanmadi:", err);
        }
    };

    // === Search ===
    const handleSearch = () => {
        const filtered = categories.filter(
            (item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.spotlightName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setCategories(filtered);
    };

    const handleClearSearch = () => {
        setSearchTerm("");
    };

    // === Additional Information Table ===
    const toggleRowExpand = (id) => {
        setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    // === Add/Edit Modal management ===
    const handleOpenModal = (category = null) => {
        setEditingCategory(category);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setEditingCategory(null);
    };

    const handleSuccess = () => {
        loadDashboardData();
    };

    const handleOpenOrderModal = () => {
        setOrderList([...categories]);
        setOrderModalOpen(true);
    };

    const handleCloseOrderModal = () => {
        setOrderModalOpen(false);
    };

    const moveOrderItem = (fromIndex, toIndex) => {
        const newList = [...orderList];
        const [moved] = newList.splice(fromIndex, 1);
        newList.splice(toIndex, 0, moved);
        setOrderList(newList);
    };

    const handleSaveOrder = () => {
        console.log("[v1] Yangi tartib:", orderList);
        // Send data to backend logic
        handleCloseOrderModal();
    };

    // === Export CSV ===
    const handleExport = () => {
        const csv = [
            ["ID", "Kategoriya", "Spotlight Nomi", "Tartib", "Holati", "Mahsulotlar"],
            ...categories.map((item) => [
                item.id,
                item.name,
                item.spotlightName,
                item.order,
                item.active ? "Faol" : "Nofaol",
                item.productCount,
            ]),
        ]
            .map((row) => row.join(","))
            .join("\n");

        const blob = new Blob([csv], { type: "text/csv" })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "kategoriyalar.csv"
        a.click()
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            {/* Main Content */}
            <div className="max-w-8xl mx-auto">
                {/* Search and Actions */}
                <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
                    <div className="flex items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200 flex-wrap">
                        {/* Total Spotlights Count*/}
                        <div className="flex items-center gap-3">
                            <div className="bg-purple-100 p-2 rounded-lg">
                                <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M20 7l-8-4-8 4m0 0l8 4m-8-4v10l8 4m0-10l8 4m-8-4v10"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-stone-600 font-medium">Toifalar</p>
                                <p className="text-lg font-bold text-purple-600">4</p>
                            </div>
                        </div>

                        {/* Total Categories Count */}
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-2 rounded-lg">
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs text-stone-600 font-medium">Kategoriyalar</p>
                                <p className="text-lg font-bold text-blue-600">{countData?.totalCount}</p>
                            </div>
                        </div>

                        {/* Active Categories Count */}
                        <div className="flex items-center gap-3">
                            <div className="bg-green-100 p-2 rounded-lg">
                                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-stone-600 font-medium">Faol</p>
                                <p className="text-lg font-bold text-green-600">{countData?.activeCount}</p>
                            </div>
                        </div>

                        {/* Inactive Categories Count */}
                        <div className="flex items-center gap-3">
                            <div className="bg-red-100 p-2 rounded-lg">
                                <Close className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <p className="text-xs text-stone-600 font-medium">Nofaol</p>
                                <p className="text-lg font-bold text-red-600">{countData?.inactiveCount}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center relative">
                        {/* Left buttons */}
                        <div className="flex gap-4 absolute left-0 top-0">
                            <button
                                onClick={() => handleOpenModal()}
                                className="bg-white text-slate-800 hover:bg-slate-100 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition border border-slate-300"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Qo'shish
                            </button>
                            <button
                                onClick={handleExport}
                                className="bg-white text-slate-800 hover:bg-slate-100 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition border border-slate-300"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                    />
                                </svg>
                                Export
                            </button>
                            <button
                                onClick={handleOpenOrderModal}
                                className="bg-white text-slate-800 hover:bg-slate-100 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition border border-slate-300"
                            >
                                Tartib
                            </button>
                        </div>

                        {/* Center search field */}
                        <div className="flex-1 max-w-xl relative">
                            <svg
                                className="absolute left-3 top-3 w-5 h-5 text-slate-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            <input
                                type="text"
                                placeholder="Kategoriya yoki toifa bo'yicha qidirish..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyUp={(e) => e.key === "Enter" && handleSearch()}
                                className="w-full pl-10 pr-10 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {searchTerm && (
                                <button
                                    onClick={handleClearSearch}
                                    className="absolute right-2 top-2 p-1 text-slate-400 hover:text-slate-600"
                                >
                                    <Close className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        {/* Right buttons */}
                        <div className="absolute right-0 top-0 flex items-center gap-3">
                            <button
                                className="text-slate-600 hover:text-slate-900 transition p-1 hover:bg-slate-100 rounded"
                                title="Qayta yuklash"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    />
                                </svg>
                            </button>

                            <button
                                className="text-slate-700 hover:text-slate-900 transition p-1 hover:bg-slate-100 rounded"
                                aria-label="Fullscreen"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4h4M4 16v4h4M20 8V4h-4M20 16v4h-4" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto bg-white">
                    <table className="w-full">
                        <thead className="bg-transparent border-b border-stone-200 bg-gradient-to-br from-slate-50 to-slate-100 p-6">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700"></th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Kategoriya nomi</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Toifa</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Holati</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Amallar</th>
                        </tr>
                        </thead>
                        <tbody>
                        {categories.map((item) => (
                            <React.Fragment key={item.id}>
                                <tr className="border-b border-stone-200 hover:bg-stone-50 transition">
                                    <td className="px-6 py-4">
                                        <button onClick={() => toggleRowExpand(item.id)} className="text-stone-500 hover:text-stone-700">
                                            {expandedRows[item.id] ? (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                                    />
                                                </svg>
                                            )}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-stone-700">{item.name}</td>
                                    <td className="px-6 py-4 text-sm text-stone-600">{item.spotlightName}</td>
                                    <td className="px-6 py-4">
                                        <Chip
                                            label={item.active ? "Faol" : "Nofaol"}
                                            color={item.active ? "success" : "error"}
                                            size="small"
                                            variant="outlined"
                                        />
                                    </td>
                                    <td className="px-6 py-4 flex gap-2">
                                        <button
                                            onClick={() => handleOpenModal(item)}
                                            className="text-stone-600 hover:text-stone-900 p-1 hover:bg-stone-100 rounded transition"
                                            title="Tahrirlash"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>

                                {expandedRows[item.id] && (
                                    <tr className="bg-stone-50 border-b border-stone-200">
                                        <td colSpan="8" className="px-6 py-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                {/* Left Column - Additional Details Info */}
                                                <div>
                                                    <h4 className="font-semibold text-stone-900 mb-4">Qo'shimcha Ma'lumotlar</h4>
                                                    <div className="space-y-3 text-sm">
                                                        <div className="flex justify-between border-b border-stone-200 pb-2">
                                                            <span className="text-stone-600 ">ID:</span>
                                                            <span className="font-medium text-stone-900">{item.id}</span>
                                                        </div>
                                                        <div className="flex justify-between border-b border-stone-200 pb-2">
                                                            <span className="text-stone-600 ">Tartib raqami:</span>
                                                            <span className="font-medium text-stone-900">{item.order}</span>
                                                        </div>
                                                        <div className="flex justify-between border-b border-stone-200 pb-2">
                                                            <span className="text-stone-600">Mahsulotlar soni:</span>
                                                            <span className="font-medium text-stone-900">{item.productsCount}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-stone-600">Yaratilgan vaqti:</span>
                                                            <span className="font-medium text-stone-900">{item.createdAt}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right Column - Recent Activities */}
                                                <div>
                                                    <h4 className="font-semibold text-stone-900 mb-4">So'nggi harakatlar:</h4>
                                                    <div className="space-y-3 text-sm">
                                                        <div className="flex justify-between border-b border-stone-200 pb-2">
                                                            <span className="font-medium text-stone-900">Kategoriya nomi yangilandi</span>
                                                        </div>
                                                        <div className="flex justify-between border-b border-stone-200 pb-2">
                                                            <span className="text-stone-600">Kategoriya qo'shildi</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit Modal */}
            <AddEditModal
                open={modalOpen}
                onClose={handleCloseModal}
                category={editingCategory}
                onSuccess={handleSuccess}
            />

            {/* Tartib o'zgartirish modal (ixtiyoriy) */}
            <Modal open={orderModalOpen} onClose={handleCloseOrderModal}>
                <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                    <h2 className="text-2xl font-bold text-stone-900 mb-6">Kategoriyalar Tartibini O'zgartirish</h2>
                    <div className="space-y-2 mb-6">
                        {orderList.map((cat, index) => (
                            <div key={cat.id} className="flex justify-between items-center p-3 border border-stone-200 rounded-lg hover:bg-stone-50">
                                <div>
                                    <p className="font-medium text-stone-900">{cat.name}</p>
                                    <p className="text-sm text-stone-600">{cat.spotlightName}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        disabled={index === 0}
                                        onClick={() => moveOrderItem(index, index - 1)}
                                        className="p-1 text-stone-600 hover:text-stone-900 disabled:opacity-50"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                        </svg>
                                    </button>
                                    <button
                                        disabled={index === orderList.length - 1}
                                        onClick={() => moveOrderItem(index, index + 1)}
                                        className="p-1 text-stone-600 hover:text-stone-900 disabled:opacity-50"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={handleCloseOrderModal}
                            className="px-6 py-2 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 font-medium"
                        >
                            Bekor qilish
                        </button>
                        <button
                            onClick={handleSaveOrder}
                            className="px-6 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-900 font-medium"
                        >
                            Saqlash
                        </button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default Category;