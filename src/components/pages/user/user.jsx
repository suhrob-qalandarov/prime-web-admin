import React, { useState, useEffect } from 'react';

const User = () => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div style={{ padding: '20px', marginLeft: 'var(--sidebar-width)' }}>
            <h1>Users Page</h1>
            {/* Add your admin dashboard content here */}
        </div>
    );
};

export default User;