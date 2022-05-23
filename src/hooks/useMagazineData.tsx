import { useEffect, useState } from 'react';
import { useMagazinesQuery } from '../queries/useMagazineQuery';
import { useTagsQuery } from '../queries/useTagQuery';
import { GridColDef } from '@mui/x-data-grid';
import { MagazinePageResponse, MagazineResponse } from '../domain/magazine';
import { paginationFactory } from '../domain/pageable';
import { Category } from '../domain/category';
import { Tag } from '../domain/tag';
import { IconButton } from '@mui/material';
import Edit from '@mui/icons-material/Edit';

const useMagazineData = () => {
    const [updateId, setUpdateId] = useState<undefined | number>(undefined);
    const onCloseUpdateModal = () => {
        setUpdateId(undefined);
    };
    const [isCreating, setIsCreating] = useState(false);
    const onCloseCreateModal = () => {
        setIsCreating(false);
    };
    const onOpenCreateModal = () => {
        setIsCreating(true);
    };
    const columns: GridColDef[] = [
        {
            field: 'update',
            headerName: '수정하기',
            renderCell: (params) => {
                return (
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                setUpdateId(params.row.id);
                            }}
                        >
                            <Edit />
                        </IconButton>
                    </div>
                );
            },
        },
        {
            field: 'id',
            headerName: '고유 아이디',
        },
        {
            field: 'title',
            headerName: '제목',

            width: 300,
        },
        {
            field: 'description',
            headerName: '요약',
        },
        {
            field: 'author',
            headerName: '저자',
        },
        {
            field: 'category',
            headerName: '카테고리',
            valueGetter: (params) => {
                const value = params.value as Category | undefined;
                if (!value) return '';
                return value.name;
            },
        },
        {
            field: 'tags',
            headerName: '태그',
            width: 300,
            valueGetter: (params) => {
                const tags = params.value as Tag[];
                return tags.map((el) => el.name).join(', ');
            },
        },
    ];
    const [size, setSize] = useState(30);
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState<MagazineResponse[]>([]);
    const [rowCount, setRowCount] = useState(0);
    const { data } = useMagazinesQuery({
        page: page,
        size: 30,
    });
    useEffect(() => {
        if (!data) return;
        setRows(data.content);
        setRowCount(data.totalElements);
    }, [data]);

    return {
        rows,
        columns,
        size,
        page,
        setSize,
        setPage,
        rowCount,
        updateId,
        isCreating,
        onCloseCreateModal,
        onOpenCreateModal,
        onCloseUpdateModal,
    };
};

export default useMagazineData;
