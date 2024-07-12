import Link from 'next/link';
import React from 'react';

const HomePage: React.FC = () => {
    return (
        <div className="container">
            <h1 className="title">Home Page</h1>
            <Link href="/123">Go to App Page with ID 123</Link>
        </div>
    );
};

export default HomePage;
