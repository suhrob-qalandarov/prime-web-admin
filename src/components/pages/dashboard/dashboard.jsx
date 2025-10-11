"use client"
import { Container, Grid, Card, CardContent, Typography, Box, Button } from "@mui/material"
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
    { name: "Electronics", value: 400 },
    { name: "Clothing", value: 300 },
    { name: "Food", value: 200 },
    { name: "Books", value: 100 },
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
        <Container className="min-h-screen bg-gray-50 py-8">
            <div className="space-y-6">
                <Box className="flex justify-between items-center bg-white p-6 rounded-lg shadow">
                    <Typography variant="h4" className="font-bold text-gray-800">
                        Dashboard Overview
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            background: "var(--primary-color)",
                            textTransform: "none",
                            fontWeight: 600,
                            padding: "0.75rem 1.5rem",
                            borderRadius: "var(--border-radius-sm)",
                        }}
                    >
                        Add New
                    </Button>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className="shadow">
                            <CardContent sx={{ background: "var(--primary-color)", color: "white", padding: "2rem" }}>
                                <Typography variant="h6" className="mb-2" sx={{ fontWeight: 600 }}>
                                    Total Users
                                </Typography>
                                <Typography variant="h4" className="font-bold">
                                    2,847
                                </Typography>
                                <Typography variant="body2" className="mt-2" sx={{ opacity: 0.9 }}>
                                    +12% from last month
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className="shadow">
                            <CardContent sx={{ background: "var(--success-color)", color: "white", padding: "2rem" }}>
                                <Typography variant="h6" className="mb-2" sx={{ fontWeight: 600 }}>
                                    Revenue
                                </Typography>
                                <Typography variant="h4" className="font-bold">
                                    $45,678
                                </Typography>
                                <Typography variant="body2" className="mt-2" sx={{ opacity: 0.9 }}>
                                    +8% from last month
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className="shadow">
                            <CardContent sx={{ background: "var(--warning-color)", color: "white", padding: "2rem" }}>
                                <Typography variant="h6" className="mb-2" sx={{ fontWeight: 600 }}>
                                    Active Sessions
                                </Typography>
                                <Typography variant="h4" className="font-bold">
                                    1,234
                                </Typography>
                                <Typography variant="body2" className="mt-2" sx={{ opacity: 0.9 }}>
                                    +5% from last month
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className="shadow">
                            <CardContent sx={{ background: "var(--secondary-color)", color: "white", padding: "2rem" }}>
                                <Typography variant="h6" className="mb-2" sx={{ fontWeight: 600 }}>
                                    Conversion Rate
                                </Typography>
                                <Typography variant="h4" className="font-bold">
                                    3.24%
                                </Typography>
                                <Typography variant="body2" className="mt-2" sx={{ opacity: 0.9 }}>
                                    +2% from last month
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Card className="shadow">
                            <CardContent sx={{ padding: "2rem" }}>
                                <Typography variant="h6" className="mb-4" sx={{ fontWeight: 600, color: "var(--dark-color)" }}>
                                    User Growth
                                </Typography>
                                <Box className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={userGrowthData}>
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="users" fill="var(--primary-color)" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card className="shadow">
                            <CardContent sx={{ padding: "2rem" }}>
                                <Typography variant="h6" className="mb-4" sx={{ fontWeight: 600, color: "var(--dark-color)" }}>
                                    Sales by Category
                                </Typography>
                                <Box className="h-80 flex items-center justify-center">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={categoryData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                outerRadius={80}
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
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Card className="shadow">
                            <CardContent sx={{ padding: "2rem" }}>
                                <Typography variant="h6" className="mb-4" sx={{ fontWeight: 600, color: "var(--dark-color)" }}>
                                    Revenue Trend
                                </Typography>
                                <Box className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={revenueData}>
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="revenue" stroke="var(--success-color)" strokeWidth={3} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card className="shadow">
                            <CardContent sx={{ padding: "2rem" }}>
                                <Typography variant="h6" className="mb-4" sx={{ fontWeight: 600, color: "var(--dark-color)" }}>
                                    Recent Activities
                                </Typography>
                                <Box className="space-y-4">
                                    {recentActivities.map((activity) => (
                                        <Box key={activity.id} className="border-b pb-3 last:border-b-0">
                                            <Typography variant="body1" sx={{ fontWeight: 600, color: "var(--dark-color)" }}>
                                                {activity.user}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: "var(--gray-600)", marginTop: "0.25rem" }}>
                                                {activity.action}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: "var(--gray-500)", marginTop: "0.25rem" }}>
                                                {activity.time}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </Container>
    )
}

export default Dashboard
