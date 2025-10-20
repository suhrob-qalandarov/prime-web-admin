import React, { useState } from "react"

const mockWarehouseItems = [
    {
        id: 1,
        productName: "Mahsulot 1",
        sku: "SKU-001",
        category: "Kategoriya A",
        quantity: 150,
        minStock: 50,
        location: "Raf 1-A",
        status: "Normal",
        active: true,
        addedAt: "2023-10-01",
        price: 25000,
        supplier: "Supplier A",
        reorderPoint: 50,
        reorderQuantity: 100,
        lastRestocked: "2024-10-15",
        batch: "BATCH-2024-001",
        stockHistory: [
            { date: "2024-10-15", quantity: 50, type: "Restock", notes: "Regular restock" },
            { date: "2024-10-10", quantity: -20, type: "Sale", notes: "Online order" },
        ],
    },
    {
        id: 2,
        productName: "Mahsulot 2",
        sku: "SKU-002",
        category: "Kategoriya B",
        quantity: 30,
        minStock: 50,
        location: "Raf 2-B",
        status: "Low Stock",
        active: true,
        addedAt: "2023-09-15",
        price: 45000,
        supplier: "Supplier B",
        reorderPoint: 50,
        reorderQuantity: 75,
        lastRestocked: "2024-10-12",
        batch: "BATCH-2024-002",
        stockHistory: [
            { date: "2024-10-12", quantity: 50, type: "Restock", notes: "Emergency restock" },
            { date: "2024-10-08", quantity: -30, type: "Sale", notes: "Bulk order" },
        ],
    },
    {
        id: 3,
        productName: "Mahsulot 3",
        sku: "SKU-003",
        category: "Kategoriya C",
        quantity: 0,
        minStock: 20,
        location: "Raf 3-C",
        status: "Out of Stock",
        active: false,
        addedAt: "2023-08-20",
        price: 15000,
        supplier: "Supplier C",
        reorderPoint: 20,
        reorderQuantity: 50,
        lastRestocked: "2024-09-20",
        batch: "BATCH-2024-003",
        stockHistory: [
            { date: "2024-09-20", quantity: 50, type: "Restock", notes: "Seasonal stock" },
            { date: "2024-09-15", quantity: -50, type: "Sale", notes: "Clearance sale" },
        ],
    },
]

const Warehouse = () => {
    const [filteredItems, setFilteredItems] = useState(mockWarehouseItems)
    const [searchTerm, setSearchTerm] = useState("")
    const [openAddEditModal, setOpenAddEditModal] = useState(false)
    const [openViewModal, setOpenViewModal] = useState(false)
    const [expandedRows, setExpandedRows] = useState({})
    const [selectedItem, setSelectedItem] = useState(null)
    const [itemForm, setItemForm] = useState({
        id: null,
        productName: "",
        sku: "",
        category: "",
        quantity: "",
        minStock: "",
        location: "",
        status: "Normal",
        active: true,
        price: "",
        supplier: "",
        reorderPoint: "",
        reorderQuantity: "",
        batch: "",
    })

    const totalItems = mockWarehouseItems.length
    const lowStockItems = mockWarehouseItems.filter((item) => item.quantity < item.minStock).length
    const outOfStockItems = mockWarehouseItems.filter((item) => item.quantity === 0).length
    const totalValue = mockWarehouseItems.reduce((sum, item) => sum + item.quantity * item.price, 0)

    const handleSearch = () => {
        const filtered = mockWarehouseItems.filter(
            (item) =>
                item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.category.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        setFilteredItems(filtered)
    }

    const handleClearSearch = () => {
        setSearchTerm("")
        setFilteredItems(mockWarehouseItems)
    }

    const handleOpenAddEditModal = (item = null) => {
        setSelectedItem(item)
        setItemForm({
            id: item?.id || null,
            productName: item?.productName || "",
            sku: item?.sku || "",
            category: item?.category || "",
            quantity: item?.quantity || "",
            minStock: item?.minStock || "",
            location: item?.location || "",
            status: item?.status || "Normal",
            active: item?.active ?? true,
            price: item?.price || "",
            supplier: item?.supplier || "",
            reorderPoint: item?.reorderPoint || "",
            reorderQuantity: item?.reorderQuantity || "",
            batch: item?.batch || "",
        })
        setOpenAddEditModal(true)
    }

    const handleCloseAddEditModal = () => {
        setOpenAddEditModal(false)
    }

    const handleSaveItem = () => {
        console.log("Saved item:", itemForm)
        handleCloseAddEditModal()
    }

    const handleOpenViewModal = (item) => {
        setSelectedItem(item)
        setOpenViewModal(true)
    }

    const handleCloseViewModal = () => {
        setOpenViewModal(false)
    }

    const toggleRowExpand = (id) => {
        setExpandedRows((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "Normal":
                return "bg-green-100 text-green-800"
            case "Low Stock":
                return "bg-yellow-100 text-yellow-800"
            case "Out of Stock":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const handleReorder = (item) => {
        console.log(`Reordering ${item.reorderQuantity} units of ${item.productName}`)
        alert(`Reorder request created for ${item.reorderQuantity} units`)
    }

    const handleExport = () => {
        const csv = [
            ["ID", "SKU", "Product Name", "Category", "Quantity", "Min Stock", "Price", "Total Value", "Supplier", "Status"],
            ...filteredItems.map((item) => [
                item.id,
                item.sku,
                item.productName,
                item.category,
                item.quantity,
                item.minStock,
                item.price,
                item.quantity * item.price,
                item.supplier,
                item.status,
            ]),
        ]
            .map((row) => row.join(","))
            .join("\n")

        const blob = new Blob([csv], { type: "text/csv" })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "warehouse-inventory.csv"
        a.click()
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Ombor Boshqaruvi</h1>
                <p className="text-gray-600">E-commerce inventorini boshqaring va kuzatib boring</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-medium">Jami Mahsulotlar</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{totalItems}</p>
                        </div>
                        <div className="text-4xl text-blue-500 opacity-20">📦</div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-medium">Kam Qolgan</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{lowStockItems}</p>
                        </div>
                        <div className="text-4xl text-yellow-500 opacity-20">⚠️</div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-medium">Tugatgan</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{outOfStockItems}</p>
                        </div>
                        <div className="text-4xl text-red-500 opacity-20">🚫</div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-medium">Jami Qiymat</p>
                            <p className="text-2xl font-bold text-gray-900 mt-2">{(totalValue / 1000000).toFixed(1)}M</p>
                        </div>
                        <div className="text-4xl text-green-500 opacity-20">📈</div>
                    </div>
                </div>
            </div>

            {/* Main Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Ombor Ro'yxati</h2>
                    <div className="flex gap-3">
                        <button
                            onClick={handleExport}
                            className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition"
                        >
                            ⬇️ Export
                        </button>
                        <button
                            onClick={() => handleOpenAddEditModal()}
                            className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition"
                        >
                            ➕ Qo'shish
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex gap-2">
                        <div className="flex-1 relative">
                            <span className="absolute left-3 top-3 text-gray-400">🔍</span>
                            <input
                                type="text"
                                placeholder="Mahsulot, SKU yoki kategoriya qidirish..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            onClick={handleSearch}
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition font-medium"
                        >
                            Qidirish
                        </button>
                        <button
                            onClick={handleClearSearch}
                            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition font-medium"
                        >
                            Tozalash
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-100 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700"></th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">SKU</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Mahsulot</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Kategoriya</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Miqdor</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Narx</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Jami Qiymat</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Amallar</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredItems.map((item) => (
                            <React.Fragment key={item.id}>
                                <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => toggleRowExpand(item.id)}
                                            className="text-gray-500 hover:text-gray-700 text-lg"
                                            title="Kengaytirish"
                                        >
                                            {expandedRows[item.id] ? "▲" : "▼"}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.sku}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{item.productName}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.quantity}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{item.price.toLocaleString()} so'm</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                        {(item.quantity * item.price).toLocaleString()} so'm
                                    </td>
                                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                                    </td>
                                    <td className="px-6 py-4 flex gap-2">
                                        <button
                                            onClick={() => handleOpenViewModal(item)}
                                            className="text-blue-500 hover:text-blue-700 transition text-lg"
                                            title="Ko'rish"
                                        >
                                            👁️
                                        </button>
                                        <button
                                            onClick={() => handleOpenAddEditModal(item)}
                                            className="text-green-500 hover:text-green-700 transition text-lg"
                                            title="Tahrirlash"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => handleReorder(item)}
                                            className="text-purple-500 hover:text-purple-700 transition text-lg"
                                            title="Qayta buyurtma"
                                        >
                                            🔄
                                        </button>
                                    </td>
                                </tr>

                                {/* Expanded Row - Stock History & Details */}
                                {expandedRows[item.id] && (
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <td colSpan="9" className="px-6 py-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* Left Column - Details */}
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-3">Mahsulot Tafsilotlari</h4>
                                                    <div className="space-y-2 text-sm">
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Minimal Stok:</span>
                                                            <span className="font-medium text-gray-900">{item.minStock}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Joylashuv:</span>
                                                            <span className="font-medium text-gray-900">{item.location}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Batch:</span>
                                                            <span className="font-medium text-gray-900">{item.batch}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Supplier:</span>
                                                            <span className="font-medium text-gray-900">{item.supplier}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Qayta buyurtma Nuqtasi:</span>
                                                            <span className="font-medium text-gray-900">{item.reorderPoint}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Qayta buyurtma Miqdori:</span>
                                                            <span className="font-medium text-gray-900">{item.reorderQuantity}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Oxirgi Qayta Stok:</span>
                                                            <span className="font-medium text-gray-900">{item.lastRestocked}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right Column - Stock History */}
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-3">Stok Tarixi</h4>
                                                    <div className="space-y-2 max-h-40 overflow-y-auto">
                                                        {item.stockHistory.map((history, idx) => (
                                                            <div key={idx} className="text-sm border-l-2 border-blue-300 pl-3 py-1">
                                                                <div className="flex justify-between">
                                                                    <span className="font-medium text-gray-900">{history.type}</span>
                                                                    <span
                                                                        className={
                                                                            history.quantity > 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"
                                                                        }
                                                                    >
                                      {history.quantity > 0 ? "+" : ""}
                                                                        {history.quantity}
                                    </span>
                                                                </div>
                                                                <div className="text-gray-600 text-xs">{history.date}</div>
                                                                <div className="text-gray-500 text-xs">{history.notes}</div>
                                                            </div>
                                                        ))}
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
            {openAddEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900">
                                {itemForm.id ? "Elementni Tahrirlash" : "Element Qo'shish"}
                            </h3>
                            <button onClick={handleCloseAddEditModal} className="text-gray-500 hover:text-gray-700 text-2xl">
                                ✕
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Mahsulot Nomi"
                                    value={itemForm.productName}
                                    onChange={(e) => setItemForm({ ...itemForm, productName: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="text"
                                    placeholder="SKU"
                                    value={itemForm.sku}
                                    onChange={(e) => setItemForm({ ...itemForm, sku: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="text"
                                    placeholder="Kategoriya"
                                    value={itemForm.category}
                                    onChange={(e) => setItemForm({ ...itemForm, category: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="number"
                                    placeholder="Miqdor"
                                    value={itemForm.quantity}
                                    onChange={(e) => setItemForm({ ...itemForm, quantity: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="number"
                                    placeholder="Minimal Stok"
                                    value={itemForm.minStock}
                                    onChange={(e) => setItemForm({ ...itemForm, minStock: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="text"
                                    placeholder="Joylashuv"
                                    value={itemForm.location}
                                    onChange={(e) => setItemForm({ ...itemForm, location: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="number"
                                    placeholder="Narx"
                                    value={itemForm.price}
                                    onChange={(e) => setItemForm({ ...itemForm, price: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="text"
                                    placeholder="Supplier"
                                    value={itemForm.supplier}
                                    onChange={(e) => setItemForm({ ...itemForm, supplier: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="number"
                                    placeholder="Qayta Buyurtma Nuqtasi"
                                    value={itemForm.reorderPoint}
                                    onChange={(e) => setItemForm({ ...itemForm, reorderPoint: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="number"
                                    placeholder="Qayta Buyurtma Miqdori"
                                    value={itemForm.reorderQuantity}
                                    onChange={(e) => setItemForm({ ...itemForm, reorderQuantity: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="text"
                                    placeholder="Batch"
                                    value={itemForm.batch}
                                    onChange={(e) => setItemForm({ ...itemForm, batch: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex items-center gap-2 pt-4">
                                <input
                                    type="checkbox"
                                    checked={itemForm.active}
                                    onChange={(e) => setItemForm({ ...itemForm, active: e.target.checked })}
                                    className="w-4 h-4 rounded border-gray-300"
                                />
                                <label className="text-gray-700 font-medium">Faol</label>
                            </div>
                        </div>

                        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex justify-end gap-3">
                            <button
                                onClick={handleCloseAddEditModal}
                                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
                            >
                                Bekor qilish
                            </button>
                            <button
                                onClick={handleSaveItem}
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
                            >
                                Saqlash
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Modal */}
            {openViewModal && selectedItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900">Mahsulot Ma'lumotlari</h3>
                            <button onClick={handleCloseViewModal} className="text-gray-500 hover:text-gray-700 text-2xl">
                                ✕
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-gray-600 text-sm">ID</p>
                                    <p className="text-gray-900 font-semibold">{selectedItem.id}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">SKU</p>
                                    <p className="text-gray-900 font-semibold">{selectedItem.sku}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">Mahsulot Nomi</p>
                                    <p className="text-gray-900 font-semibold">{selectedItem.productName}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">Kategoriya</p>
                                    <p className="text-gray-900 font-semibold">{selectedItem.category}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">Miqdor</p>
                                    <p className="text-gray-900 font-semibold">{selectedItem.quantity}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">Narx</p>
                                    <p className="text-gray-900 font-semibold">{selectedItem.price.toLocaleString()} so'm</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">Jami Qiymat</p>
                                    <p className="text-gray-900 font-semibold">
                                        {(selectedItem.quantity * selectedItem.price).toLocaleString()} so'm
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">Supplier</p>
                                    <p className="text-gray-900 font-semibold">{selectedItem.supplier}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">Batch</p>
                                    <p className="text-gray-900 font-semibold">{selectedItem.batch}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">Qayta Buyurtma Nuqtasi</p>
                                    <p className="text-gray-900 font-semibold">{selectedItem.reorderPoint}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">Oxirgi Qayta Stok</p>
                                    <p className="text-gray-900 font-semibold">{selectedItem.lastRestocked}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">Status</p>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedItem.status)}`}>
                    {selectedItem.status}
                  </span>
                                </div>
                            </div>
                        </div>

                        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex justify-end gap-3">
                            <button
                                onClick={handleCloseViewModal}
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
                            >
                                Yopish
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Warehouse
