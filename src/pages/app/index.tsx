import Link from 'next/link';
import React from 'react';

const HomePage: React.FC = () => {
    return (
        <div className="container">
            <h1 className="title text-center">Home Page</h1>
            <a className="btn btn-primary">Go to App Page with ID 123</a>
        </div>
    );
};

export default HomePage;
