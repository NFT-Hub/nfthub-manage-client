import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Modal, Paper } from '@mui/material';
import { useMagazinesQuery } from '../queries/useMagazineQuery';
import { useTagsQuery } from '../queries/useTagQuery';
import useMagazineData from '../features/magazine/useMagazineData';
import { red } from '@mui/material/colors';
import ModalPaper from '../common/ModalPaper';

const ManageMagazine = () => {
    const {
        columns,
        setSize,
        size,
        page,
        setPage,
        rows,
        rowCount,
        updateId,
        onOpenCreateModal,
        onCloseCreateModal,
        onCloseUpdateModal,
        isCreating,
    } = useMagazineData();

    return (
        <div style={{ height: '80vh', width: '100%' }}>
            <DataGrid
                page={page} // 현재 페이지
                onPageChange={(page) => {
                    setPage(page);
                }} // 페이지 변화할때
                rowCount={rowCount} // 전체 크기
                columns={columns}
                pagination
                checkboxSelection
                rowsPerPageOptions={[30, 50, 100]}
                pageSize={size}
                onPageSizeChange={(size) => {
                    setSize(size);
                }}
                rows={rows}
            />
            <Button
                onClick={onOpenCreateModal}
                sx={{
                    margin: '10px',
                }}
                variant={'contained'}
            >
                새 매거진 등록하기
            </Button>
            <Button
                sx={{
                    margin: '10px',
                    bgcolor: red['400'],
                    '&:hover': {
                        bgcolor: red['300'],
                    },
                }}
                variant={'contained'}
            >
                선택한 매거진 삭제
            </Button>
            <Modal open={!!updateId} onClose={onCloseUpdateModal}>
                <ModalPaper>j</ModalPaper>
            </Modal>
            <Modal open={isCreating} onClose={onCloseCreateModal}>
                <ModalPaper>j</ModalPaper>
            </Modal>
        </div>
    );
};

export default ManageMagazine;
