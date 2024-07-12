// pages/app/[id].tsx

import { useRouter } from 'next/router';
import React from 'react';

const AppPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div className="container">
            <h1 className="title">Welcome to the App Page</h1>
            <p>ID: {id}</p>
        </div>
    );
};

export default AppPage;
