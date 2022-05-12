import type { NextPage } from 'next';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
    const [rows, setRows] = useState([
        {
            id: 1,
            username: 1,
            age: 1,
        },
        {
            id: 2,
            username: 1,
            age: 1,
        },
    ]);
    const [size, setSize] = useState(5);
    const [page, setPage] = useState(0);

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                page={page} // 현재 페이지
                onPageChange={(page) => {
                    console.log(page);
                    setPage(page);
                }} // 페이지 변화할때
                rowCount={100} // 전체 크기
                columns={[{ field: 'username', minWidth: 150 }, { field: 'age' }]}
                pagination
                rowsPerPageOptions={[5, 10, 20]}
                pageSize={size}
                onPageSizeChange={(size) => {
                    setSize(size);
                }}
                rows={rows}
            />
            <Button
                onClick={() => {
                    setRows([
                        {
                            id: 1,
                            username: 2,
                            age: 2,
                        },
                    ]);
                }}
            >
                추가
            </Button>
        </div>
    );
};

export default Home;
