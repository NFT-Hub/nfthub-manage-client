import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Modal, Paper } from '@mui/material';
import useMagazineData from '../hooks/useMagazineData';
import { red } from '@mui/material/colors';
import ModalPaper from '../components/ModalPaper';
import MagazineCreate from '../components/MagazineCreate';
import MagazineUpdate from '../components/MagazineUpdate';
import { useMagazineDeleteMutation, useMagazineInvalidation } from '../queries/useMagazineQuery';
import { useState } from 'react';

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

    const deleteMagazine = useMagazineDeleteMutation();
    const { invalidList } = useMagazineInvalidation();
    const [selectedMagazineIds, setSelectedMagazineIds] = useState<number[]>([]);

    const onClickDelete = async () => {
        for (const id of selectedMagazineIds) {
            await deleteMagazine.mutateAsync({ id: id });
        }
        await invalidList();
    };

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
                onSelectionModelChange={(selected) => {
                    setSelectedMagazineIds(selected as number[]);
                }}
                rowsPerPageOptions={[30, 50, 100]}
                pageSize={size}
                onPageSizeChange={(size) => {
                    setSize(size);
                }}
                rows={rows}
                loading={deleteMagazine.isLoading}
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
                onClick={onClickDelete}
            >
                선택한 매거진 삭제
            </Button>
            <Modal open={!!updateId} onClose={onCloseUpdateModal}>
                <ModalPaper>
                    {updateId && (
                        <MagazineUpdate onClickCloseButton={onCloseUpdateModal} id={updateId} />
                    )}
                </ModalPaper>
            </Modal>
            <Modal open={isCreating} onClose={onCloseCreateModal}>
                <ModalPaper>
                    <MagazineCreate onClickCloseButton={onCloseCreateModal} />
                </ModalPaper>
            </Modal>
        </div>
    );
};

export default ManageMagazine;
