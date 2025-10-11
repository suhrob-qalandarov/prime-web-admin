import React, { useState, useEffect } from 'react';

const Product = () => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div style={{ padding: '20px', marginLeft: 'var(--sidebar-width)' }}>
            <h1>Products Page</h1>
            {/* Add your admin dashboard content here */}
        </div>
    );
};

export default Product;