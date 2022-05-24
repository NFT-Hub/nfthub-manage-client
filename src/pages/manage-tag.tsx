import {
    FlexboxToCenterItems,
    FlexboxColumnItems,
    ItemGridContainer,
    FlexboxRowItems,
} from '../../styles/layout';
import { useTagDeleteMutation, useTagsQuery } from '../queries/useTagQuery';
import EditIcon from '@mui/icons-material/Edit';
import { Card, Chip, css, IconButton, Modal, Pagination, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useMagazineQuery, useMagazinesQuery } from '../queries/useMagazineQuery';
import styled from '@emotion/styled';
import ModalPaper from '../components/ModalPaper';
import MagazineUpdate from '../components/MagazineUpdate';
import ConfirmAlert from '../components/ConfirmAlert';

const ManageTag = () => {
    const tagQuery = useTagsQuery();
    const deleteTag = useTagDeleteMutation();
    const tagList = tagQuery.data;
    const [selectedTagId, setSelectTagId] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [deleteErrorMessage, setDeleteErrorMessage] = useState('');

    const magazineQuery = useMagazinesQuery({
        page: currentPage,
        tagIds: selectedTagId,
        size: 10,
    });

    const [updateId, setUpdateId] = useState<undefined | number>(undefined);
    const [deleteId, setDeleteId] = useState<undefined | number>(undefined);
    const onCloseUpdateModal = () => {
        setUpdateId(undefined);
    };

    const onCloseDeleteConfirmModal = () => {
        setDeleteId(undefined);
    };

    useEffect(() => {
        setCurrentPage(0);
    }, [selectedTagId]);

    useEffect(() => {
        setDeleteErrorMessage('');
    }, [deleteId]);

    const onDeleteTag = () => {
        if (!deleteId) return;
        deleteTag.mutateAsync(
            {
                id: deleteId,
            },
            {
                onSuccess() {
                    onCloseDeleteConfirmModal();
                },
                onError({ response }) {
                    if (!response?.status) return;
                    if (response.status === 409) {
                        setDeleteErrorMessage('사용중인 태그가 아닌지 확인해주세요.');
                    }
                },
            }
        );
    };

    if (!tagList) {
        return <></>;
    }

    return (
        <FlexboxColumnItems>
            <Typography>* 태그를 삭제하려면 태그를 사용중인 컨텐츠가 없어야 합니다.</Typography>
            <FlexboxRowItems
                style={{
                    flexWrap: 'wrap',
                    gap: '10px',
                }}
            >
                {tagList.map((el) => {
                    return (
                        <Chip
                            sx={{
                                ...(selectedTagId.includes(el.id) && {
                                    backgroundColor: blue['100'],
                                }),
                            }}
                            variant={'outlined'}
                            key={el.id}
                            label={el.name}
                            onClick={() => {
                                if (selectedTagId.includes(el.id)) {
                                    return setSelectTagId((prev) => {
                                        return prev.filter((id) => id !== el.id);
                                    });
                                }
                                return setSelectTagId((prev) => [...prev, el.id]);
                            }}
                            onDelete={() => {
                                setDeleteId(el.id);
                            }}
                        />
                    );
                })}
            </FlexboxRowItems>
            {magazineQuery.data && (
                <Container>
                    {magazineQuery.data.content.map((el) => {
                        return (
                            <Card
                                sx={{
                                    width: 300,
                                    height: 300,
                                    padding: 3,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,

                                    position: 'relative',
                                }}
                                key={el.id}
                            >
                                <Typography>{el.title || '-'}</Typography>
                                <Typography
                                    sx={{
                                        fontSize: 12,
                                    }}
                                >
                                    {el.description || '-'}
                                </Typography>
                                <Typography
                                    sx={{
                                        cursor: 'pointer',
                                        color: grey[700],
                                        fontSize: 14,
                                    }}
                                    onClick={() => {
                                        window.open(el.url);
                                    }}
                                >
                                    등록한 주소
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 14,
                                    }}
                                >
                                    {el.author || '-'}
                                </Typography>
                                <FlexboxRowItems
                                    style={{
                                        flexWrap: 'wrap',
                                        gap: 10,
                                    }}
                                >
                                    {el.tags.map((el) => {
                                        return <Chip key={el.id} label={el.name} />;
                                    })}
                                </FlexboxRowItems>
                                <IconButton
                                    onClick={() => {
                                        setUpdateId(el.id);
                                    }}
                                    sx={{
                                        position: 'absolute',
                                        top: 10,
                                        right: 10,
                                    }}
                                >
                                    <EditIcon />
                                </IconButton>
                            </Card>
                        );
                    })}
                </Container>
            )}
            {magazineQuery.data && (
                <FlexboxToCenterItems>
                    <Pagination
                        onChange={(e, value) => {
                            setCurrentPage(value - 1);
                        }}
                        count={magazineQuery.data.totalPages}
                        page={currentPage + 1}
                        onClick={(e) => {}}
                    />
                </FlexboxToCenterItems>
            )}
            <Modal open={!!updateId} onClose={onCloseUpdateModal}>
                <ModalPaper>
                    {updateId && (
                        <MagazineUpdate onClickCloseButton={onCloseUpdateModal} id={updateId} />
                    )}
                </ModalPaper>
            </Modal>
            <Modal open={!!deleteId}>
                <ConfirmAlert
                    errorMessage={deleteErrorMessage}
                    onClickConfirm={onDeleteTag}
                    onClickCancel={onCloseDeleteConfirmModal}
                    message={'태그를 삭제하시겠습니까?'}
                />
            </Modal>
        </FlexboxColumnItems>
    );
};

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
`;

export default ManageTag;
