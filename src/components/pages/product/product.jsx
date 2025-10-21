import React, { useState, useEffect } from "react"
import { Button } from "@mui/material"
import { EditMenuModal, AddModal, ViewModal } from "./modals"
import CustomSnackbar from "../../bars/snackbar/snackbar"
import ProductService from "../../../service/product"

import {
    ShoppingBag,
    AccessTime,
    CheckCircle,
    TrendingUp,
    Phone,
    CalendarMonth,
    Inventory,
    ExpandMore,
    Close,
} from "@mui/icons-material"

const Product = () => {
    const [allProducts, setAllProducts] = useState([])

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [openAddModal, setOpenAddModal] = useState(false)
    const [openEditMenuModal, setOpenEditMenuModal] = useState(false)
    const [openViewModal, setOpenViewModal] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [expandedRows, setExpandedRows] = useState({})
    const [openDetailPanel, setOpenDetailPanel] = useState(false)

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        type: "success",
    })

    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = async () => {
        try {
            setIsLoading(true)
            const data = await ProductService.getOrLoadData()
            setAllProducts(data)
            showSnackbar("Ma'lumotlar muvaffaqiyatli yuklandi", "success")
        } catch (err) {
            setError("Mahsulotlarni yuklashda xatolik yuz berdi")
            showSnackbar("Mahsulotlarni yuklashda xatolik yuz berdi", "error")
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    const filteredProducts = allProducts.filter(
        (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (product.brand && product.brand.toLowerCase().includes(searchTerm.toLowerCase())) ||
            product.categoryName.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const totalProducts = allProducts.length
    const activeProducts = allProducts.filter((p) => p.active).length
    const inactiveProducts = allProducts.filter((p) => !p.active).length
    const saleProducts = allProducts.filter((p) => p.status === "SALE").length
    const newProducts = 12
    const hotProducts = 8

    const handleSearch = () => {
        // Search is handled by filter above
    }

    const handleClearSearch = () => {
        setSearchTerm("")
    }

    const toggleRowExpand = (id) => {
        setExpandedRows((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    const handleOpenAddEditModal = (product = null) => {
        setSelectedProduct(product)
        setOpenAddModal(true)
    }

    const handleCloseAddEditModal = () => {
        setOpenAddModal(false)
        setSelectedProduct(null)
    }

    const handleOpenEditMenuModal = (product) => {
        setSelectedProduct(product)
        setOpenEditMenuModal(true)
    }

    const handleCloseEditMenuModal = () => {
        setOpenEditMenuModal(false)
        setSelectedProduct(null)
    }

    const handleOpenViewModal = (product) => {
        setSelectedProduct(product)
        setOpenViewModal(true)
    }

    const handleCloseViewModal = () => {
        setOpenViewModal(false)
        setSelectedProduct(null)
    }

    const handleOpenDetailPanel = (product) => {
        setSelectedProduct(product)
        setOpenDetailPanel(true)
    }

    const handleCloseDetailPanel = () => {
        setOpenDetailPanel(false)
    }

    const handleProductUpdated = () => {
        loadProducts()
        handleCloseEditMenuModal()
    }

    const showSnackbar = (message, type) => {
        setSnackbar({
            open: true,
            message,
            type,
        })
    }

    const handleCloseSnackbar = () => {
        setSnackbar({
            ...snackbar,
            open: false,
        })
    }

    const handleProductSaved = (message, type) => {
        loadProducts()
        handleCloseAddEditModal()
        if (message && type) {
            showSnackbar(message, type)
        }
    }

    const handleExport = () => {
        const csv = [
            ["ID", "Nomi", "Brend", "Kategoriya", "Narx", "Holati", "Faol", "Yaratilgan vaqt"],
            ...filteredProducts.map((prod) => [
                prod.id,
                prod.name,
                prod.brand ?? "---",
                prod.categoryName,
                prod.price,
                prod.status,
                prod.active ? "Ha" : "Yo'q",
                prod.createdAt || "---",
            ]),
        ]
            .map((row) => row.join(","))
            .join("\n")

        const blob = new Blob([csv], { type: "text/csv" })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "mahsulotlar.csv"
        a.click()
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "NEW":
                return { bg: "#DCFCE7", text: "#166534", border: "#BBF7D0" }
            case "HOT":
                return { bg: "#FEE2E2", text: "#991B1B", border: "#FECACA" }
            case "SALE":
                return { bg: "#FFF9C4", text: "#B76E00", border: "#FFECB3" }
            default:
                return { bg: "#F3F4F6", text: "#374151", border: "#D1D5DB" }
        }
    }

    const getStatusLabel = (status) => {
        switch (status) {
            case "NEW":
                return "NEW"
            case "HOT":
                return "HOT"
            case "SALE":
                return "SALE"
            default:
                return status
        }
    }

    const getDiscountedPrice = (basePrice, discount) => {
        return Math.round(basePrice * (1 - discount / 100))
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-stone-50 via-stone-100 to-stone-50 p-6 md:p-8 flex justify-center items-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-600 mx-auto mb-4"></div>
                    <p className="text-stone-600">Yuklanmoqda...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-stone-50 via-stone-100 to-stone-50 p-6 md:p-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">{error}</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-50 via-stone-100 to-stone-50 p-6 md:p-8">
            <div className="max-w-8xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Search and Actions */}
                <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
                    <div className="flex items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200 flex-wrap">
                        {/* Total Products */}
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-2 rounded-lg">
                                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M20 7l-8-4-8 4m0 0l8 4m-8-4v10l8 4m0-10l8 4m-8-4v10"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-stone-600 font-medium">Jami</p>
                                <p className="text-lg font-bold text-blue-600">{totalProducts}</p>
                            </div>
                        </div>

                        {/* Active Products */}
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
                                <p className="text-lg font-bold text-green-600">{activeProducts}</p>
                            </div>
                        </div>

                        {/* Inactive Products */}
                        <div className="flex items-center gap-3">
                            <div className="bg-red-100 p-2 rounded-lg">
                                <Close className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <p className="text-xs text-stone-600 font-medium">Nofaol</p>
                                <p className="text-lg font-bold text-red-600">{inactiveProducts}</p>
                            </div>
                        </div>

                        {/* Sale Status Products */}
                        <div className="flex items-center gap-3">
                            <div className="bg-yellow-100 p-2 rounded-lg">
                                <svg className="w-7 h-7 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 012 12V7a4 4 0 014-4z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-stone-600 font-medium">Sale</p>
                                <p className="text-lg font-bold text-yellow-600">{saleProducts}</p>
                            </div>
                        </div>

                        {/* New Status Products */}
                        <div className="flex items-center gap-3">
                            <div className="bg-green-100 p-2 rounded-lg">
                                <TrendingUp className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-xs text-stone-600 font-medium">New</p>
                                <p className="text-lg font-bold text-green-600">{newProducts}</p>
                            </div>
                        </div>

                        {/* Hot Status Products */}
                        <div className="flex items-center gap-3">
                            <div className="bg-orange-100 p-2 rounded-lg">
                                <svg className="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17.657 18.657L13.414 22.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-stone-600 font-medium">Hot</p>
                                <p className="text-lg font-bold text-orange-600">{hotProducts}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center relative">
                        {/* Left buttons */}
                        <div className="flex gap-4 absolute left-0 top-0">
                            <button onClick={() => handleOpenAddEditModal()} className="bg-white text-slate-800 hover:bg-slate-100 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition border border-slate-300">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Qo'shish
                            </button>
                            <button className="bg-white text-slate-800 hover:bg-slate-100 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition border border-slate-300">
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
                                placeholder="Mahsulot, brend yoki kategoriya qidirish..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-10 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="absolute right-2 top-2 p-1 text-slate-400 hover:text-slate-600 transition">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
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

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-stone-100 border-b border-stone-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700"></th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">ID</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Nomi</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Brend</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Kategoriya</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Narx so'm</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Holati</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Amallar</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredProducts.map((prod) => {
                            const displayPrice = prod.status === "SALE" ? getDiscountedPrice(prod.price, prod.discount) : prod.price
                            const statusColor = getStatusColor(prod.status)

                            return (
                                <React.Fragment key={prod.id}>
                                    <tr className="border-b border-stone-200 hover:bg-stone-50 transition">
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => toggleRowExpand(prod.id)}
                                                className="text-stone-500 hover:text-stone-700"
                                            >
                                                {expandedRows[prod.id] ? (
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
                                        <td className="px-6 py-4 text-sm font-medium text-stone-900">{prod.id}</td>
                                        <td className="px-6 py-4 text-sm text-stone-700">{prod.name}</td>
                                        <td className="px-6 py-4 text-sm text-stone-600">{prod.brand ?? "---"}</td>
                                        <td className="px-6 py-4 text-sm text-stone-600">{prod.categoryName}</td>
                                        <td className="px-6 py-4 text-sm">
                                            {prod.status === "SALE" ? (
                                                <div className="flex items-center gap-2">
                                                    <span className="line-through text-stone-400">{prod.price.toLocaleString()}</span>
                                                    <span className="font-medium text-stone-600">{displayPrice.toLocaleString()}</span>
                                                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                              -{prod.discount}%
                            </span>
                                                </div>
                                            ) : (
                                                <span className="text-stone-700">{displayPrice.toLocaleString()}</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                        <span
                            className="px-3 py-1 rounded-full text-xs font-semibold border"
                            style={{
                                backgroundColor: statusColor.bg,
                                color: statusColor.text,
                                borderColor: statusColor.border,
                            }}
                        >
                          {getStatusLabel(prod.status)}
                        </span>
                                        </td>
                                        <td className="px-6 py-4 flex gap-2">
                                            <button
                                                onClick={() => handleOpenViewModal(prod)}
                                                className="text-stone-600 hover:text-stone-900 transition p-1 hover:bg-stone-100 rounded"
                                                title="Ko'rish"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                    />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleOpenEditMenuModal(prod)}
                                                className="text-stone-600 hover:text-stone-900 transition p-1 hover:bg-stone-100 rounded"
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

                                    {expandedRows[prod.id] && (
                                        <tr className="bg-stone-50 border-b border-stone-200">
                                            <td colSpan="8" className="px-6 py-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {/* Left Column - Product Details */}
                                                    <div>
                                                        <h4 className="font-semibold text-stone-900 mb-4">Mahsulot Ma'lumotlari</h4>
                                                        <div className="space-y-3 text-sm">
                                                            <div className="flex justify-between border-b border-stone-200 pb-2">
                                                                <span className="text-stone-600">Rasmlar:</span>
                                                                <span className="font-medium text-stone-900">
                                    {prod.picturesKeys == null ? "---" : `${prod.picturesKeys.length} ta`}
                                  </span>
                                                            </div>
                                                            <div className="flex justify-between border-b border-stone-200 pb-2">
                                                                <span className="text-stone-600">Brend:</span>
                                                                <span className="font-medium text-stone-900">{prod.brand ?? "---"}</span>
                                                            </div>
                                                            <div className="flex justify-between border-b border-stone-200 pb-2">
                                                                <span className="text-stone-600">Kategoriya:</span>
                                                                <span className="font-medium text-stone-900">{prod.categoryName}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-stone-600">Holati:</span>
                                                                <span
                                                                    className="px-2 py-1 rounded text-xs font-semibold border"
                                                                    style={{
                                                                        backgroundColor: statusColor.bg,
                                                                        color: statusColor.text,
                                                                        borderColor: statusColor.border,
                                                                    }}
                                                                >
                                    {getStatusLabel(prod.status)}
                                  </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Right Column - Additional Info */}
                                                    <div>
                                                        <h4 className="font-semibold text-stone-900 mb-4">Qo'shimcha Ma'lumotlar</h4>
                                                        <div className="space-y-3 text-sm">
                                                            <div className="flex justify-between border-b border-stone-200 pb-2">
                                                                <span className="text-stone-600">Faol:</span>
                                                                <span className="font-medium text-stone-900">{prod.active ? "Ha" : "Yo'q"}</span>
                                                            </div>
                                                            <div className="flex justify-between border-b border-stone-200 pb-2">
                                                                <span className="text-stone-600">Chegirma:</span>
                                                                <span className="font-medium text-stone-900">{prod.discount}%</span>
                                                            </div>
                                                            <div className="flex justify-between border-b border-stone-200 pb-2">
                                                                <span className="text-stone-600">Asli Narx:</span>
                                                                <span className="font-medium text-stone-900">{prod.price.toLocaleString()} so'm</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-stone-600">Yaratilgan:</span>
                                                                <span className="font-medium text-stone-900">
                                    {prod.createdAt && !isNaN(new Date(prod.createdAt))
                                        ? new Date(prod.createdAt).toLocaleString("uz-UZ", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                        })
                                        : "Nomaʼlum"}
                                  </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            )
                        })}
                        </tbody>
                    </table>
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-stone-500">Mahsulotlar topilmadi</p>
                    </div>
                )}
            </div>

            {openDetailPanel && selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-end">
                    <div className="bg-white w-full max-w-md h-full shadow-2xl overflow-y-auto">
                        <div className="p-6 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white">
                            <h3 className="text-xl font-bold text-stone-900">Mahsulot Tafsilotlari</h3>
                            <button onClick={handleCloseDetailPanel} className="text-stone-500 hover:text-stone-700">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div>
                                <h4 className="font-semibold text-stone-900 mb-3">Mahsulot Ma'lumotlari</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-stone-600">Nomi:</span>
                                        <span className="font-medium text-stone-900">{selectedProduct.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-stone-600">Brend:</span>
                                        <span className="font-medium text-stone-900">{selectedProduct.brand ?? "---"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-stone-600">Kategoriya:</span>
                                        <span className="font-medium text-stone-900">{selectedProduct.categoryName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-stone-600">Rasmlar:</span>
                                        <span className="font-medium text-stone-900">
                      {selectedProduct.picturesKeys == null ? "---" : `${selectedProduct.picturesKeys.length} ta`}
                    </span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold text-stone-900 mb-3">Narx Ma'lumotlari</h4>
                                <div className="bg-stone-50 rounded-lg p-4 space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-stone-600">Asli Narx:</span>
                                        <span className="font-medium text-stone-900">{selectedProduct.price.toLocaleString()} so'm</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-stone-600">Chegirma:</span>
                                        <span className="font-medium text-stone-900">{selectedProduct.discount}%</span>
                                    </div>
                                    <div className="flex justify-between pt-2 border-t border-stone-200">
                                        <span className="text-stone-600">Yakuniy Narx:</span>
                                        <span className="font-bold text-stone-900">
                      {getDiscountedPrice(selectedProduct.price, selectedProduct.discount).toLocaleString()} so'm
                    </span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold text-stone-900 mb-3">Holati</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-stone-600">Status:</span>
                                        <span
                                            className="px-3 py-1 rounded-full text-xs font-semibold border"
                                            style={{
                                                backgroundColor: getStatusColor(selectedProduct.status).bg,
                                                color: getStatusColor(selectedProduct.status).text,
                                                borderColor: getStatusColor(selectedProduct.status).border,
                                            }}
                                        >
                      {getStatusLabel(selectedProduct.status)}
                    </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-stone-600">Faol:</span>
                                        <span className="font-medium text-stone-900">{selectedProduct.active ? "Ha" : "Yo'q"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-stone-600">Yaratilgan:</span>
                                        <span className="font-medium text-stone-900">
                      {selectedProduct.createdAt && !isNaN(new Date(selectedProduct.createdAt))
                          ? new Date(selectedProduct.createdAt).toLocaleString("uz-UZ", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                          })
                          : "Nomaʼlum"}
                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modals */}
            <EditMenuModal
                open={openEditMenuModal}
                onClose={handleCloseEditMenuModal}
                product={selectedProduct}
                onProductUpdated={handleProductUpdated}
            />

            <ViewModal open={openViewModal} onClose={handleCloseViewModal} product={selectedProduct} />

            <AddModal
                open={openAddModal}
                onClose={handleCloseAddEditModal}
                product={selectedProduct}
                onProductSaved={handleProductSaved}
            />

            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                type={snackbar.type}
                onClose={handleCloseSnackbar}
            />
        </div>
    )
}

export default Product
