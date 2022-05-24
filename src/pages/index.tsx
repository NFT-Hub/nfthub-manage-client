import type { NextPage } from 'next';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { pages } from '../const/pages';
import DashboardCard from '../components/DashboardCard';

const Home: NextPage = () => {
    return (
        <div
            style={{
                height: 500,
                width: '100%',
                padding: '50px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 30,
            }}
        >
            {pages.map((el) => (
                <DashboardCard key={el.route} route={el.route} name={el.name} />
            ))}
        </div>
    );
};

export default Home;
