"use client"

import React, { useState } from "react"
import { Box, Modal, Button } from "@mui/material"

const mockClothingProducts = [
    {
        id: 1,
        name: "Klassik Oq Ko'ylak",
        sku: "SHIRT-001",
        category: "Ko'ylaklar",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        basePrice: 85000,
        status: "NEW",
        discount: 0,
        warehouse: "A1",
        maxOrderQty: 50,
        minAlertQty: 10,
        lastTransaction: {
            date: "2024-10-18",
            type: "output",
            channel: "online",
            quantity: 5,
            size: "L",
        },
        stockBySize: {
            XS: 15,
            S: 22,
            M: 35,
            L: 28,
            XL: 18,
            XXL: 12,
        },
    },
    {
        id: 2,
        name: "Qora Jeans",
        sku: "JEANS-001",
        category: "Shim",
        sizes: ["28", "30", "32", "34", "36", "38"],
        basePrice: 125000,
        status: "HOT",
        discount: 0,
        warehouse: "B2",
        maxOrderQty: 40,
        minAlertQty: 8,
        lastTransaction: {
            date: "2024-10-17",
            type: "input",
            channel: null,
            quantity: 20,
            size: "32",
        },
        stockBySize: {
            28: 8,
            30: 12,
            32: 25,
            34: 18,
            36: 14,
            38: 10,
        },
    },
    {
        id: 3,
        name: "Qizil Futbolka",
        sku: "TSHIRT-001",
        category: "Futbolkalar",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        basePrice: 45000,
        status: "SALE",
        discount: 25,
        warehouse: "C3",
        maxOrderQty: 100,
        minAlertQty: 20,
        lastTransaction: {
            date: "2024-10-16",
            type: "output",
            channel: "offline",
            quantity: 3,
            size: "M",
        },
        stockBySize: {
            XS: 5,
            S: 8,
            M: 12,
            L: 10,
            XL: 7,
            XXL: 4,
        },
    },
    {
        id: 4,
        name: "Qora Blazer",
        sku: "BLAZER-001",
        category: "Kurtka",
        sizes: ["S", "M", "L", "XL", "XXL"],
        basePrice: 250000,
        status: "NEW",
        discount: 0,
        warehouse: "A2",
        maxOrderQty: 20,
        minAlertQty: 3,
        lastTransaction: {
            date: "2024-10-15",
            type: "input",
            channel: null,
            quantity: 10,
            size: "L",
        },
        stockBySize: {
            S: 3,
            M: 5,
            L: 8,
            XL: 6,
            XXL: 2,
        },
    },
    {
        id: 5,
        name: "Oq Sneaker",
        sku: "SHOE-001",
        category: "Oyoq kiyim",
        sizes: ["39", "40", "41", "42", "43", "44", "45"],
        basePrice: 180000,
        status: "HOT",
        discount: 0,
        warehouse: "D1",
        maxOrderQty: 30,
        minAlertQty: 5,
        lastTransaction: {
            date: "2024-10-18",
            type: "output",
            channel: "online",
            quantity: 2,
            size: "42",
        },
        stockBySize: {
            39: 4,
            40: 6,
            41: 8,
            42: 12,
            43: 10,
            44: 7,
            45: 3,
        },
    },
]

const Warehouse = () => {
    const [filteredItems, setFilteredItems] = useState(mockClothingProducts)
    const [searchTerm, setSearchTerm] = useState("")
    const [expandedRows, setExpandedRows] = useState({})
    const [selectedItem, setSelectedItem] = useState(null)
    const [openAddModal, setOpenAddModal] = useState(false)
    const [openDetailPanel, setOpenDetailPanel] = useState(false)

    const [formData, setFormData] = useState({
        product: "",
        size: "",
        quantity: "",
        warehouse: "",
        maxOrderQty: "",
        minAlertQty: "",
        status: "NEW",
        discount: "",
    })

    const totalProducts = mockClothingProducts.length
    const totalStock = mockClothingProducts.reduce(
        (sum, product) => sum + Object.values(product.stockBySize).reduce((a, b) => a + b, 0),
        0,
    )
    const saleItems = mockClothingProducts.filter((p) => p.status === "SALE").length
    const hotItems = mockClothingProducts.filter((p) => p.status === "HOT").length

    const handleSearch = () => {
        const filtered = mockClothingProducts.filter(
            (item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.category.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        setFilteredItems(filtered)
    }

    const handleClearSearch = () => {
        setSearchTerm("")
        setFilteredItems(mockClothingProducts)
    }

    const toggleRowExpand = (id) => {
        setExpandedRows((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    const handleOpenAddModal = () => {
        setFormData({
            product: "",
            size: "",
            quantity: "",
            warehouse: "",
            maxOrderQty: "",
            minAlertQty: "",
            status: "NEW",
            discount: "",
        })
        setOpenAddModal(true)
    }

    const handleCloseAddModal = () => {
        setOpenAddModal(false)
    }

    const handleSaveItem = () => {
        console.log("[v0] Saved item:", formData)
        handleCloseAddModal()
    }

    const handleOpenDetailPanel = (item) => {
        setSelectedItem(item)
        setOpenDetailPanel(true)
    }

    const handleCloseDetailPanel = () => {
        setOpenDetailPanel(false)
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

    const getTotalStock = (product) => {
        return Object.values(product.stockBySize).reduce((a, b) => a + b, 0)
    }

    const getDiscountedPrice = (basePrice, discount) => {
        return Math.round(basePrice * (1 - discount / 100))
    }

    const handleExport = () => {
        const csv = [
            ["SKU", "Mahsulot", "Kategoriya", "Jami Stok", "Narx", "Status", "Ombor"],
            ...filteredItems.map((item) => [
                item.sku,
                item.name,
                item.category,
                getTotalStock(item),
                item.basePrice,
                getStatusLabel(item.status),
                item.warehouse,
            ]),
        ]
            .map((row) => row.join(","))
            .join("\n")

        const blob = new Blob([csv], { type: "text/csv" })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "kiyim-ombor.csv"
        a.click()
    }

    const selectedProduct = formData.product ? mockClothingProducts.find((p) => p.id == formData.product) : null

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-50 via-stone-100 to-stone-50 p-6 md:p-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600 hover:shadow-lg transition">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-stone-600 text-sm font-medium">Jami Mahsulotlar</p>
                            <p className="text-3xl font-bold text-stone-900 mt-2">{totalProducts}</p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600 hover:shadow-lg transition">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-stone-600 text-sm font-medium">Jami Stok</p>
                            <p className="text-3xl font-bold text-stone-900 mt-2">{totalStock}</p>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-lg">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20 7l-8-4-8 4m0 0l8 4m-8-4v10l8 4m0-10l8 4m-8-4v10"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-600 hover:shadow-lg transition">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-stone-600 text-sm font-medium">Sof Mahsulotlar</p>
                            <p className="text-3xl font-bold text-stone-900 mt-2">{hotItems}</p>
                        </div>
                        <div className="bg-red-100 p-3 rounded-lg">
                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600 hover:shadow-lg transition">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-stone-600 text-sm font-medium">Chegirma Mahsulotlar</p>
                            <p className="text-3xl font-bold text-stone-900 mt-2">{saleItems}</p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-lg">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Search Bar */}
                <div className="p-6 border-b border-stone-200 relative">
                    {/* Oldingi search bar ichidagi elementlar */}
                    <div className="flex gap-2">
                        <div className="flex gap-3">
                            <button
                                onClick={handleOpenAddModal}
                                className="bg-white text-stone-800 hover:bg-stone-100 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Kiritish
                            </button>
                            <button
                                onClick={handleOpenAddModal}
                                className="bg-white text-stone-800 hover:bg-stone-100 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Chiqarish
                            </button>
                        </div>
                        <div className="flex-1 relative" style={{ maxWidth: '600px' }}>
                            <svg
                                className="absolute left-3 top-3 w-5 h-5 text-stone-400"
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
                                placeholder="Mahsulot, SKU yoki kategoriya qidirish..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                                className="w-full pl-10 pr-10 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
                            />
                            <button
                                onClick={handleSearch}
                                className="absolute right-2 top-2 p-1 text-stone-400 hover:text-stone-600 transition"
                            >
                                <svg
                                    className="w-5 h-5"
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
                            </button>
                        </div>
                    </div>
                    <div className="absolute right-6 top-6 flex items-center gap-3">
                        <button
                            onClick={handleExport}
                            className="bg-white text-stone-800 hover:bg-stone-100 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
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
                            className="text-stone-700 hover:text-stone-900 transition p-1"
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
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 8V4h4M4 16v4h4M20 8V4h-4M20 16v4h-4"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-stone-100 border-b border-stone-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700"></th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">SKU</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Mahsulot</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Kategoriya</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Stok</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Narx so'm</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Sotuvda</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-stone-700">Amallar</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredItems.map((item) => {
                            const totalStock = getTotalStock(item)
                            const displayPrice =
                                item.status === "SALE" ? getDiscountedPrice(item.basePrice, item.discount) : item.basePrice
                            const statusColor = getStatusColor(item.status)

                            return (
                                <React.Fragment key={item.id}>
                                    <tr className="border-b border-stone-200 hover:bg-stone-50 transition">
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => toggleRowExpand(item.id)}
                                                className="text-stone-500 hover:text-stone-700"
                                            >
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
                                        <td className="px-6 py-4 text-sm font-medium text-stone-900">{item.sku}</td>
                                        <td className="px-6 py-4 text-sm text-stone-700">{item.name}</td>
                                        <td className="px-6 py-4 text-sm text-stone-600">{item.category}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-stone-900">{totalStock}</td>
                                        <td className="px-6 py-4 text-sm">
                                            {item.status === "SALE" ? (
                                                <div className="flex items-center gap-2">
                                                    <span className="line-through text-stone-400">{item.basePrice.toLocaleString()}</span>
                                                    <span className="font-medium text-stone-600">{displayPrice.toLocaleString()}</span>
                                                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
        -{item.discount}%
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
                          {getStatusLabel(item.status)}
                        </span>
                                        </td>
                                        <td className="px-6 py-4 flex gap-2">
                                            <button
                                                onClick={() => handleOpenDetailPanel(item)}
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
                                            <button
                                                className="text-stone-600 hover:text-stone-900 transition p-1 hover:bg-stone-100 rounded"
                                                title="Qayta buyurtma"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                    />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>

                                    {expandedRows[item.id] && (
                                        <tr className="bg-stone-50 border-b border-stone-200">
                                            <td colSpan="8" className="px-6 py-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {/* Left Column - Size Stock */}
                                                    <div>
                                                        <h4 className="font-semibold text-stone-900 mb-4">O'lcham bo'yicha Stok</h4>
                                                        <div className="grid grid-cols-3 gap-2">
                                                            {item.sizes.map((size) => (
                                                                <div
                                                                    key={size}
                                                                    className="bg-white border border-stone-200 rounded-lg p-3 text-center hover:border-stone-400 transition"
                                                                >
                                                                    <div className="text-xs font-medium text-stone-600 mb-1">{size}</div>
                                                                    <div className="text-lg font-bold text-stone-900">{item.stockBySize[size]}</div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Right Column - Product Info */}
                                                    <div>
                                                        <h4 className="font-semibold text-stone-900 mb-4">Mahsulot Ma'lumotlari</h4>
                                                        <div className="space-y-3 text-sm">
                                                            <div className="flex justify-between border-b border-stone-200 pb-2">
                                                                <span className="text-stone-600">Ombor:</span>
                                                                <span className="font-medium text-stone-900">{item.warehouse}</span>
                                                            </div>
                                                            <div className="flex justify-between border-b border-stone-200 pb-2">
                                                                <span className="text-stone-600">Maks Buyurtma:</span>
                                                                <span className="font-medium text-stone-900">{item.maxOrderQty}</span>
                                                            </div>
                                                            <div className="flex justify-between border-b border-stone-200 pb-2">
                                                                <span className="text-stone-600">Min Xabar Miqdori:</span>
                                                                <span className="font-medium text-stone-900">{item.minAlertQty}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-stone-600">Status:</span>
                                                                <span
                                                                    className="px-2 py-1 rounded text-xs font-semibold border"
                                                                    style={{
                                                                        backgroundColor: statusColor.bg,
                                                                        color: statusColor.text,
                                                                        borderColor: statusColor.border,
                                                                    }}
                                                                >
                                    {getStatusLabel(item.status)}
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
            </div>

            {/* Add/Edit Modal */}
            <Modal open={openAddModal} onClose={handleCloseAddModal}>
                <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-stone-900">Mahsulot Qo'shish</h2>
                        <button onClick={handleCloseAddModal} className="text-stone-500 hover:text-stone-700">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="space-y-4">
                        {/* Product Selection */}
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-2">Mahsulot Tanlang</label>
                            <select
                                value={formData.product}
                                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
                            >
                                <option value="">-- Mahsulot Tanlang --</option>
                                {mockClothingProducts.map((product) => (
                                    <option key={product.id} value={product.id}>
                                        {product.name} ({product.sku})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Size Selection */}
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-2">O'lcham Tanlang</label>
                            <select
                                value={formData.size}
                                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
                                disabled={!formData.product}
                            >
                                <option value="">-- O'lcham Tanlang --</option>
                                {selectedProduct &&
                                    selectedProduct.sizes.map((size) => (
                                        <option key={size} value={size}>
                                            {size}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        {/* Quantity */}
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-2">Miqdor</label>
                            <input
                                type="number"
                                value={formData.quantity}
                                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                placeholder="Miqdorni kiriting"
                                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
                            />
                        </div>

                        {/* Warehouse Location */}
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-2">Ombor Joylashuvi</label>
                            <select
                                value={formData.warehouse}
                                onChange={(e) => setFormData({ ...formData, warehouse: e.target.value })}
                                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
                            >
                                <option value="">-- Ombor Tanlang --</option>
                                <option value="A1">A1</option>
                                <option value="A2">A2</option>
                                <option value="B1">B1</option>
                                <option value="B2">B2</option>
                                <option value="C1">C1</option>
                                <option value="C3">C3</option>
                                <option value="D1">D1</option>
                            </select>
                        </div>

                        {/* Max Order Quantity */}
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-2">Maks Buyurtma Miqdori</label>
                            <input
                                type="number"
                                value={formData.maxOrderQty}
                                onChange={(e) => setFormData({ ...formData, maxOrderQty: e.target.value })}
                                placeholder="Maks miqdor"
                                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
                            />
                        </div>

                        {/* Min Alert Quantity */}
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-2">Min Xabar Miqdori</label>
                            <input
                                type="number"
                                value={formData.minAlertQty}
                                onChange={(e) => setFormData({ ...formData, minAlertQty: e.target.value })}
                                placeholder="Min miqdor"
                                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-2">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
                            >
                                <option value="NEW">Yangi</option>
                                <option value="HOT">Sof</option>
                                <option value="SALE">Chegirma</option>
                            </select>
                        </div>

                        {formData.status === "SALE" && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <label className="block text-sm font-medium text-stone-700 mb-2">Chegirma %</label>
                                <input
                                    type="number"
                                    value={formData.discount}
                                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                                    placeholder="Chegirma foizini kiriting"
                                    min="0"
                                    max="100"
                                    className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                {formData.discount && selectedProduct && (
                                    <div className="mt-3 p-3 bg-white rounded border border-green-200">
                                        <p className="text-xs text-stone-600 mb-2">Narx hisoblash:</p>
                                        <div className="flex items-center gap-2">
                                            <span className="line-through text-stone-400">{selectedProduct.basePrice.toLocaleString()}</span>
                                            <span className="text-green-600 font-bold">
                        {getDiscountedPrice(
                            selectedProduct.basePrice,
                            Number.parseInt(formData.discount),
                        ).toLocaleString()}
                      </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 mt-8">
                        <button
                            onClick={handleCloseAddModal}
                            className="px-6 py-2 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition font-medium"
                        >
                            Bekor qilish
                        </button>
                        <button
                            onClick={handleSaveItem}
                            className="px-6 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-900 transition font-medium"
                        >
                            Saqlash
                        </button>
                    </div>
                </Box>
            </Modal>

            {openDetailPanel && selectedItem && (
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
                            {/* Product Info */}
                            <div>
                                <h4 className="font-semibold text-stone-900 mb-3">Mahsulot Ma'lumotlari</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-stone-600">Nomi:</span>
                                        <span className="font-medium text-stone-900">{selectedItem.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-stone-600">SKU:</span>
                                        <span className="font-medium text-stone-900 font-mono">{selectedItem.sku}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-stone-600">Kategoriya:</span>
                                        <span className="font-medium text-stone-900">{selectedItem.category}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-stone-600">Ombor:</span>
                                        <span className="font-medium text-stone-900">{selectedItem.warehouse}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Last Transaction */}
                            <div>
                                <h4 className="font-semibold text-stone-900 mb-3">So'ngi Tranzaksiya</h4>
                                <div className="bg-stone-50 rounded-lg p-4 space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-stone-600">Sana:</span>
                                        <span className="font-medium text-stone-900">{selectedItem.lastTransaction.date}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-stone-600">Turi:</span>
                                        <span
                                            className={`font-medium flex items-center gap-1 ${selectedItem.lastTransaction.type === "output" ? "text-red-600" : "text-green-600"}`}
                                        >
                      {selectedItem.lastTransaction.type === "output" ? (
                          <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3v-6"
                                  />
                              </svg>
                              Chiqarilish
                          </>
                      ) : (
                          <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v6"
                                  />
                              </svg>
                              Kirilish
                          </>
                      )}
                    </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-stone-600">Miqdor:</span>
                                        <span className="font-medium text-stone-900">{selectedItem.lastTransaction.quantity}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-stone-600">O'lcham:</span>
                                        <span className="font-medium text-stone-900">{selectedItem.lastTransaction.size}</span>
                                    </div>
                                    {selectedItem.lastTransaction.type === "output" && selectedItem.lastTransaction.channel && (
                                        <div className="flex justify-between pt-2 border-t border-stone-200">
                                            <span className="text-stone-600">Kanal:</span>
                                            <span className="font-medium text-stone-900">
                        {selectedItem.lastTransaction.channel === "online" ? "Online" : "Offline"}
                      </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Stock by Size */}
                            <div>
                                <h4 className="font-semibold text-stone-900 mb-3">O'lcham bo'yicha Stok</h4>
                                <div className="grid grid-cols-3 gap-2">
                                    {selectedItem.sizes.map((size) => (
                                        <div key={size} className="bg-stone-100 rounded-lg p-2 text-center">
                                            <div className="text-xs font-medium text-stone-600">{size}</div>
                                            <div className="text-lg font-bold text-stone-900">{selectedItem.stockBySize[size]}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Warehouse
