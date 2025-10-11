import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div style={{ padding: '20px',}}>
            <h1>Dashboard Page</h1>
            {/* Add your admin dashboard content here */}
        </div>
    );
};

export default Dashboard;