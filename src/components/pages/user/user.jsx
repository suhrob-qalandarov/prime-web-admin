"use client"

import { useState } from "react"
import {
    Search,
    Person,
    Phone,
    AdminPanelSettings,
    ToggleOn,
    ToggleOff,
    CalendarMonth,
} from "@mui/icons-material"

// Mock data for users
const MOCK_USERS = [
    {
        telegramId: 1234567890,
        firstName: "Alisher",
        lastName: "Karimov",
        username: "@alisher_k",
        phone: "+998901234567",
        roles: ["ADMIN", "USER"],
        active: true,
        createdAt: "2024-01-15T10:30:00",
    },
    {
        telegramId: 1234567891,
        firstName: "Malika",
        lastName: "Toshmatova",
        username: "@malika_t",
        phone: "+998907654321",
        roles: ["USER"],
        active: true,
        createdAt: "2024-01-15T11:15:00",
    },
    {
        telegramId: 1234567892,
        firstName: "Bobur",
        lastName: "Rahimov",
        username: "@bobur_r",
        phone: "+998901111111",
        roles: ["USER"],
        active: false,
        createdAt: "2024-01-14T14:00:00",
    },
    {
        telegramId: 1234567893,
        firstName: "Gulnora",
        lastName: "Saidova",
        username: "@gulnora_s",
        phone: "+998912345678",
        roles: ["ADMIN"],
        active: true,
        createdAt: "2024-01-13T16:45:00",
    },
]

const Users = () => {
    const [users, setUsers] = useState(MOCK_USERS)
    const [searchTerm, setSearchTerm] = useState("")

    // Filter users by search term
    const filteredUsers = users.filter(
        (user) =>
            user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.telegramId.toString().includes(searchTerm),
    )

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("uz-UZ", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    // Get role badge color
    const getRoleBadgeColor = (role) => {
        switch (role) {
            case "ADMIN":
                return "bg-blue-100 text-blue-800"
            case "USER":
                return "bg-green-100 text-green-800"
            default:
                return "bg-slate-100 text-slate-800"
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-8">
            <div className="max-w-8xl mx-auto">
                {/* Search */}
                <div className="bg-white rounded-lg p-4 mb-8 shadow-sm flex flex-col sm:flex-row gap-4 items-center">
                    <div className="flex-1 relative w-full">
                        <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Ism, familiya, username yoki Telegram ID bo'yicha qidirish..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    Telegram ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    Ism va Familiya
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    Username
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    Telefon
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    Rollari
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    Holat
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    Yaratilgan Sana
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-200">
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-4 text-center text-slate-400">
                                        <div className="flex flex-col items-center justify-center py-8">
                                            <Person className="w-8 h-8 mb-2 opacity-50" />
                                            <p className="text-sm">Foydalanuvchilar mavjud emas</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user.telegramId} className="hover:bg-slate-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                            {user.telegramId}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                            {user.firstName} {user.lastName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                            {user.username}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-4 h-4" />
                                                <span>{user.phone}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                            <div className="flex gap-2">
                                                {user.roles.map((role) => (
                                                    <span
                                                        key={role}
                                                        className={`${getRoleBadgeColor(role)} text-xs font-semibold px-2 py-1 rounded`}
                                                    >
                                                            {role}
                                                        </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                            {user.active ? (
                                                <ToggleOn className="w-6 h-6 text-green-600" />
                                            ) : (
                                                <ToggleOff className="w-6 h-6 text-slate-400" />
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                            <div className="flex items-center gap-2">
                                                <CalendarMonth className="w-4 h-4" />
                                                <span>{formatDate(user.createdAt)}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Users