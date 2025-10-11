import React, { useState, useEffect } from 'react';
import Loading from "../../loading/loading";

const Category = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 2 soniya kutish (delay)
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Delay tugagandan keyin bajariladigan kod
                console.log("2 soniya o‘tdi!");
            } catch (error) {
                console.error("Failed:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <Loading message="Loading..." />;
    }

    return (
        <div style={{ padding: '20px', marginLeft: 'var(--sidebar-width)' }}>
            <h1>Categorys Page</h1>
            {/* Add your admin dashboard content here */}
        </div>
    );
};

export default Category;