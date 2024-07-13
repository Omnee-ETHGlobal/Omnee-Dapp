import { useGraphQLQuery } from '@/hooks/useGraphQlQuery';
import Link from 'next/link';
import React, { use, useEffect } from 'react';

const HomePage: React.FC = () => {
    const {data} = useGraphQLQuery();
    useEffect(() => {
        console.log(data);
    },[data])
    return (
        <div className="container">
            <h1 className="title text-center">Home Page</h1>
            <Link className="btn btn-primary" href='/app/123'>Go to App Page with ID 123</Link>
        </div>
    );
};

export default HomePage;
