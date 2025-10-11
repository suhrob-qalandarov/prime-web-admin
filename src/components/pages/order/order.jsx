import React, { useState, useEffect } from 'react';

const Order = () => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div style={{ padding: '20px', marginLeft: 'var(--sidebar-width)' }}>
            <h1>Orders Page</h1>
            {/* Add your admin dashboard content here */}
        </div>
    );
};

export default Order;