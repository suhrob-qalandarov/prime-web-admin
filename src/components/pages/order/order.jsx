"use client"

import { useState } from "react"
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

// Mock data for orders - Updated for clothing store
const MOCK_ORDERS = [
    {
        id: 1001,
        customerName: "Alisher Karimov",
        customerPhone: "+998901234567",
        status: "PENDING",
        totalAmount: 250000,
        orderDate: "2024-01-15T10:30:00",
        items: [
            { id: 1, name: "Qora Ko'ylak", quantity: 1, price: 200000 },
            { id: 2, name: "Oq Futbolka", quantity: 1, price: 50000 },
        ],
    },
    {
        id: 1002,
        customerName: "Malika Toshmatova",
        customerPhone: "+998907654321",
        status: "PENDING",
        totalAmount: 180000,
        orderDate: "2024-01-15T11:15:00",
        items: [{ id: 3, name: "Jeans Shim", quantity: 1, price: 180000 }],
    },
    {
        id: 1003,
        customerName: "Bobur Rahimov",
        customerPhone: "+998901111111",
        status: "ACCEPT",
        totalAmount: 320000,
        orderDate: "2024-01-15T09:45:00",
        items: [
            { id: 4, name: "Klassik Kurtka", quantity: 1, price: 300000 },
            { id: 5, name: "Qora Shim", quantity: 1, price: 20000 },
        ],
    },
    {
        id: 1004,
        customerName: "Gulnora Saidova",
        customerPhone: "+998912345678",
        status: "ACCEPT",
        totalAmount: 120000,
        orderDate: "2024-01-14T14:00:00",
        items: [{ id: 6, name: "Sneaker Oyoq kiyim", quantity: 1, price: 120000 }],
    },
    {
        id: 1005,
        customerName: "Eshmat",
        customerPhone: "+9989123456567",
        status: "ACCEPT",
        totalAmount: 300000,
        orderDate: "2024-01-14T14:00:00",
        items: [{ id: 6, name: "Rang-barang Aksessuar", quantity: 1, price: 150000 }],
    },
    {
        id: 1006,
        customerName: "Farhod Olimov",
        customerPhone: "+998934567890",
        status: "DELIVERED",
        totalAmount: 75000,
        orderDate: "2024-01-13T16:45:00",
        items: [{ id: 7, name: "Qo'lqop va Shlyapa", quantity: 1, price: 75000 }],
    },
    {
        id: 1007,
        customerName: "Zarina Abdullayeva",
        customerPhone: "+998998765432",
        status: "DELIVERED",
        totalAmount: 450000,
        orderDate: "2024-01-12T13:20:00",
        items: [
            { id: 8, name: "Formal Ko'ylak", quantity: 1, price: 400000 },
            { id: 9, name: "Qora Shim", quantity: 1, price: 50000 },
        ],
    },
]

const Orders = () => {
    const [orders, setOrders] = useState(MOCK_ORDERS)
    const [searchTerm, setSearchTerm] = useState("")
    const [draggedOrder, setDraggedOrder] = useState(null)
    const [expandedOrder, setExpandedOrder] = useState(null)

    // Filter orders by search term
    const filteredOrders = orders.filter(
        (order) =>
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || order.id.toString().includes(searchTerm),
    )

    // Get stats
    const stats = {
        total: orders.length,
        pending: orders.filter((o) => o.status === "PENDING").length,
        accepted: orders.filter((o) => o.status === "ACCEPT").length,
        delivered: orders.filter((o) => o.status === "DELIVERED").length,
        cancelled: orders.filter((o) => o.status === "CANCELLED").length,
    }

    // Get orders by status
    const getOrdersByStatus = (status) => {
        return filteredOrders.filter((order) => order.status === status)
    }

    // Handle drag start
    const handleDragStart = (e, order) => {
        setDraggedOrder(order)
        e.dataTransfer.effectAllowed = "move"
    }

    // Handle drag over
    const handleDragOver = (e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = "move"
    }

    // Handle drop
    const handleDrop = (e, newStatus) => {
        e.preventDefault()
        if (draggedOrder) {
            setOrders(orders.map((order) => (order.id === draggedOrder.id ? { ...order, status: newStatus } : order)))
            setDraggedOrder(null)
        }
    }

    // Format price
    const formatPrice = (price) => {
        return new Intl.NumberFormat("uz-UZ").format(price)
    }

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("uz-UZ", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    // Get status color
    const getStatusColor = (status) => {
        switch (status) {
            case "PENDING":
                return "border-l-amber-500 bg-amber-50"
            case "ACCEPT":
                return "border-l-blue-500 bg-blue-50"
            case "DELIVERED":
                return "border-l-green-500 bg-green-50"
            case "CANCELLED":
                return "border-l-red-500 bg-red-50"
            default:
                return "border-l-slate-500 bg-slate-50"
        }
    }

    // Get status badge color
    const getStatusBadgeColor = (status) => {
        switch (status) {
            case "PENDING":
                return "bg-amber-100 text-amber-800"
            case "ACCEPT":
                return "bg-blue-100 text-blue-800"
            case "DELIVERED":
                return "bg-green-100 text-green-800"
            case "CANCELLED":
                return "bg-red-100 text-red-800"
            default:
                return "bg-slate-100 text-slate-800"
        }
    }

    // Get status text
    const getStatusText = (status) => {
        switch (status) {
            case "PENDING":
                return "Kutilmoqda"
            case "ACCEPT":
                return "Tasdiqlandi"
            case "DELIVERED":
                return "Yetkazildi"
            case "CANCELLED":
                return "Bekor qilindi"
            default:
                return status
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="max-w-8xl mx-auto">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                    {/* Total Orders */}
                    <div className="bg-white rounded-lg border-l-4 border-l-slate-500 p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-slate-600 text-sm font-medium mb-1">Jami buyurtmalar</p>
                                <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
                            </div>
                            <div className="bg-slate-100 p-3 rounded-lg">
                                <ShoppingBag className="w-6 h-6 text-slate-600" />
                            </div>
                        </div>
                    </div>

                    {/* Pending Orders */}
                    <div className="bg-white rounded-lg border-l-4 border-l-amber-500 p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-slate-600 text-sm font-medium mb-1">Kutilayotgan</p>
                                <p className="text-3xl font-bold text-amber-600">{stats.pending}</p>
                            </div>
                            <div className="bg-amber-100 p-3 rounded-lg">
                                <AccessTime className="w-6 h-6 text-amber-600" />
                            </div>
                        </div>
                    </div>

                    {/* Accepted Orders */}
                    <div className="bg-white rounded-lg border-l-4 border-l-blue-500 p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-slate-600 text-sm font-medium mb-1">Tasdiqlangan</p>
                                <p className="text-3xl font-bold text-blue-600">{stats.accepted}</p>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <CheckCircle className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    {/* Delivered Orders */}
                    <div className="bg-white rounded-lg border-l-4 border-l-green-500 p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-slate-600 text-sm font-medium mb-1">Yetkazildi</p>
                                <p className="text-3xl font-bold text-green-600">{stats.delivered}</p>
                            </div>
                            <div className="bg-green-100 p-3 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border-l-4 border-l-red-500 p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-slate-600 text-sm font-medium mb-1">Bekor qilindi</p>
                                <p className="text-3xl font-bold text-red-600">{stats.cancelled}</p>
                            </div>
                            <div className="bg-red-100 p-3 rounded-lg">
                                <Close className="w-6 h-6 text-red-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Actions */}
                <div className="bg-white rounded-lg p-6 mb-8 shadow-sm relative">
                    <div className="flex items-center justify-center">
                        {/* Left buttons */}
                        <div className="flex gap-4 absolute left-6 top-6">
                            <button className="bg-white text-slate-800 hover:bg-slate-100 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition border border-slate-300">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Qo'shish
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
                                placeholder="Buyurtma ID yoki mijoz nomini qidirish..."
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
                        <div className="absolute right-6 top-6 flex items-center gap-3">
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

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Cancelled Column - Narrower */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden lg:col-span-1">
                        <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-slate-900 text-sm">Bekor qilish</h3>
                                <span className="bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {getOrdersByStatus("CANCELLED").length}
                </span>
                            </div>
                        </div>
                        <div
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, "CANCELLED")}
                            className="p-4 min-h-96 bg-slate-50 overflow-y-auto space-y-3"
                        >
                            {getOrdersByStatus("CANCELLED").length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-slate-400 py-8">
                                    <Inventory className="w-8 h-8 mb-2 opacity-50" />
                                    <p className="text-sm">Buyurtmalar mavjud emas</p>
                                </div>
                            ) : (
                                getOrdersByStatus("CANCELLED").map((order) => (
                                    <CancelledOrderCard key={order.id} order={order} onDragStart={handleDragStart} />
                                ))
                            )}
                        </div>
                    </div>

                    {/* Pending Column */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-slate-900">Kutilayotgan</h3>
                                <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {getOrdersByStatus("PENDING").length}
                </span>
                            </div>
                        </div>
                        <div
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, "PENDING")}
                            className="p-4 min-h-96 bg-slate-50 overflow-y-auto space-y-3"
                        >
                            {getOrdersByStatus("PENDING").length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-slate-400 py-8">
                                    <Inventory className="w-8 h-8 mb-2 opacity-50" />
                                    <p className="text-sm">Buyurtmalar mavjud emas</p>
                                </div>
                            ) : (
                                getOrdersByStatus("PENDING").map((order) => (
                                    <OrderCard
                                        key={order.id}
                                        order={order}
                                        onDragStart={handleDragStart}
                                        onExpandClick={() => setExpandedOrder(expandedOrder?.id === order.id ? null : order)}
                                        isExpanded={expandedOrder?.id === order.id}
                                        getStatusColor={getStatusColor}
                                        getStatusBadgeColor={getStatusBadgeColor}
                                        getStatusText={getStatusText}
                                        formatPrice={formatPrice}
                                        formatDate={formatDate}
                                    />
                                ))
                            )}
                        </div>
                    </div>

                    {/* Accepted Column */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-slate-900">Tasdiqlangan</h3>
                                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {getOrdersByStatus("ACCEPT").length}
                </span>
                            </div>
                        </div>
                        <div
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, "ACCEPT")}
                            className="p-4 min-h-96 bg-slate-50 overflow-y-auto space-y-3"
                        >
                            {getOrdersByStatus("ACCEPT").length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-slate-400 py-8">
                                    <Inventory className="w-8 h-8 mb-2 opacity-50" />
                                    <p className="text-sm">Buyurtmalar mavjud emas</p>
                                </div>
                            ) : (
                                getOrdersByStatus("ACCEPT").map((order) => (
                                    <OrderCard
                                        key={order.id}
                                        order={order}
                                        onDragStart={handleDragStart}
                                        onExpandClick={() => setExpandedOrder(expandedOrder?.id === order.id ? null : order)}
                                        isExpanded={expandedOrder?.id === order.id}
                                        getStatusColor={getStatusColor}
                                        getStatusBadgeColor={getStatusBadgeColor}
                                        getStatusText={getStatusText}
                                        formatPrice={formatPrice}
                                        formatDate={formatDate}
                                    />
                                ))
                            )}
                        </div>
                    </div>

                    {/* Delivered Column */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-slate-900">Yetkazildi</h3>
                                <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {getOrdersByStatus("DELIVERED").length}
                </span>
                            </div>
                        </div>
                        <div
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, "DELIVERED")}
                            className="p-4 min-h-96 bg-slate-50 overflow-y-auto space-y-3"
                        >
                            {getOrdersByStatus("DELIVERED").length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-slate-400 py-8">
                                    <Inventory className="w-8 h-8 mb-2 opacity-50" />
                                    <p className="text-sm">Buyurtmalar mavjud emas</p>
                                </div>
                            ) : (
                                getOrdersByStatus("DELIVERED").map((order) => (
                                    <OrderCard
                                        key={order.id}
                                        order={order}
                                        onDragStart={handleDragStart}
                                        onExpandClick={() => setExpandedOrder(expandedOrder?.id === order.id ? null : order)}
                                        isExpanded={expandedOrder?.id === order.id}
                                        getStatusColor={getStatusColor}
                                        getStatusBadgeColor={getStatusBadgeColor}
                                        getStatusText={getStatusText}
                                        formatPrice={formatPrice}
                                        formatDate={formatDate}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const CancelledOrderCard = ({ order, onDragStart }) => {
    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, order)}
            className="border-l-4 border-l-red-500 bg-red-50 rounded-lg p-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-all"
        >
            <div className="flex items-center justify-between">
                <p className="font-bold text-slate-900 text-lg">#{order.id}</p>
                <Close className="w-5 h-5 text-red-600" />
            </div>
        </div>
    )
}

// Order Card Component
const OrderCard = ({
                       order,
                       onDragStart,
                       onExpandClick,
                       isExpanded,
                       getStatusColor,
                       getStatusBadgeColor,
                       getStatusText,
                       formatPrice,
                       formatDate,
                   }) => {
    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, order)}
            className={`${getStatusColor(order.status)} border-l-4 rounded-lg p-4 cursor-grab active:cursor-grabbing hover:shadow-md transition-all`}
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <p className="font-bold text-slate-900">#{order.id}</p>
                    <p className="text-sm text-slate-600 mt-1">{order.customerName}</p>
                </div>
                <span className={`${getStatusBadgeColor(order.status)} text-xs font-semibold px-2 py-1 rounded`}>
          {getStatusText(order.status)}
        </span>
            </div>

            <div className="space-y-2 mb-3 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="w-4 h-4" />
                    <span>{order.customerPhone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                    <CalendarMonth className="w-4 h-4" />
                    <span>{formatDate(order.orderDate)}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                    <Inventory className="w-4 h-4" />
                    <span>{order.items.length} ta kiyim</span>
                </div>
            </div>

            <div className="border-t border-slate-200 pt-3 mb-3">
                <p className="font-bold text-slate-900">{formatPrice(order.totalAmount)} so'm</p>
            </div>

            {isExpanded && (
                <div className="bg-white bg-opacity-60 rounded p-3 mt-3 border border-slate-200">
                    <h4 className="font-semibold text-slate-900 mb-2 text-sm">Kiyimlar:</h4>
                    <div className="space-y-2">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm text-slate-600">
                                <span>{item.name}</span>
                                <span className="font-medium text-slate-900">x{item.quantity}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <button
                onClick={onExpandClick}
                className="w-full mt-3 flex items-center justify-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
                <ExpandMore className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                {isExpanded ? "Yashirish" : "Batafsil"}
            </button>
        </div>
    )
}

export default Orders