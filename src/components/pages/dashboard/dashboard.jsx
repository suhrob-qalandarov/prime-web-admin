import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
} from "recharts"

const userGrowthData = [
    { name: "Jan", users: 400 },
    { name: "Feb", users: 300 },
    { name: "Mar", users: 500 },
    { name: "Apr", users: 280 },
    { name: "May", users: 590 },
    { name: "Jun", users: 320 },
    { name: "Jul", users: 450 },
    { name: "Aug", users: 520 },
]

const revenueData = [
    { name: "Jan", revenue: 4000 },
    { name: "Feb", revenue: 3000 },
    { name: "Mar", revenue: 5000 },
    { name: "Apr", revenue: 2800 },
    { name: "May", revenue: 5900 },
    { name: "Jun", revenue: 3200 },
    { name: "Jul", revenue: 4500 },
    { name: "Aug", revenue: 5200 },
]

const categoryData = [
    { name: "Kiyimlar", value: 400 },
    { name: "Aksessuarlar", value: 300 },
    { name: "Oyoq kiyimlar", value: 200 },
    { name: "Duvoykalar", value: 100 },
]

const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"]

const recentActivities = [
    { id: 1, user: "John Doe", action: "Purchased Premium Plan", time: "2 hours ago" },
    { id: 2, user: "Jane Smith", action: "Updated Profile", time: "4 hours ago" },
    { id: 3, user: "Mike Johnson", action: "Completed Tutorial", time: "6 hours ago" },
    { id: 4, user: "Sarah Williams", action: "Left a Review", time: "8 hours ago" },
]

const Dashboard = () => {
    return (
        <div className="w-full min-h-screen bg-background">
            <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground">Overview</h1>
                </div>

                {/* Statistic Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                        { title: "Total Users", value: "2,847", color: "bg-indigo-600", change: "+12%" },
                        { title: "Revenue", value: "$45,678", color: "bg-emerald-500", change: "+8%" },
                        { title: "Active Sessions", value: "1,234", color: "bg-amber-500", change: "+5%" },
                        { title: "Conversion Rate", value: "3.24%", color: "bg-purple-600", change: "+2%" },
                    ].map((item, index) => (
                        <div key={index} className={`${item.color} rounded-lg shadow-lg p-6 text-white`}>
                            <h3 className="text-sm font-semibold opacity-90">{item.title}</h3>
                            <p className="text-2xl font-bold mt-2">{item.value}</p>
                            <p className="text-xs opacity-80 mt-2">{item.change} from last month</p>
                        </div>
                    ))}
                </div>

                {/* User Growth Chart */}
                <div className="w-full bg-card rounded-lg shadow-lg p-6 mb-8">
                    <h2 className="text-lg font-semibold text-foreground mb-6">User Growth</h2>
                    <div className="w-full h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={userGrowthData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="users" fill="#4F46E5" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Sales by Category Chart */}
                <div className="w-full bg-card rounded-lg shadow-lg p-6 mb-8">
                    <h2 className="text-lg font-semibold text-foreground mb-6">Sales by Category</h2>
                    <div className="w-full h-96 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Revenue Trend Chart */}
                <div className="w-full bg-card rounded-lg shadow-lg p-6 mb-8">
                    <h2 className="text-lg font-semibold text-foreground mb-6">Revenue Trend</h2>
                    <div className="w-full h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={revenueData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="w-full bg-card rounded-lg shadow-lg p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-6">Recent Activities</h2>
                    <div className="space-y-4">
                        {recentActivities.map((activity) => (
                            <div key={activity.id} className="pb-4 border-b border-border last:border-b-0">
                                <p className="font-semibold text-foreground">{activity.user}</p>
                                <p className="text-sm text-muted-foreground mt-1">{activity.action}</p>
                                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
