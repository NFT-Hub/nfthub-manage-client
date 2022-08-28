import styled from '@emotion/styled';
import { Modal, Tooltip } from '@mui/material';
import { ChangeEvent, DragEventHandler, useEffect, useState } from 'react';
import { FaExpand } from 'react-icons/fa';
import { MdFileUpload } from 'react-icons/md';
import { RiImageAddLine } from 'react-icons/ri';
import { baseColor, borderRadius } from '../../../styles/base';

import ImagePreview from './ImagePreview';
import ModalPaper from '../ModalPaper';

interface Props {
    id: string;
    image: string | File | undefined;
    setImage?: (image: File) => void;
    isError?: boolean;
}

const ImageInput = ({ id, setImage = () => {}, image, isError = false }: Props) => {
    const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);
    const [isDragOvering, setIsDragOvering] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target?.files || e.target.files.length === 0) return;
        setImage(e.target.files[0]);
    };

    useEffect(() => {
        if (!image) return;
        if (typeof image === 'string') {
            setImagePreview(image);
            return;
        }
        const reader = new FileReader();
        reader.onloadend = (e) => {
            if (e.target && image.type.includes('image')) {
                setImagePreview(e.target.result as string);
            }
        };
        reader.readAsDataURL(image);
    }, [image]);

    const onDropFile: DragEventHandler = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsDragOvering(false);
        const files = e.dataTransfer.files;
        if (!files || files.length === 0) return;
        setImage(files[0]);
    };
    const onDragOver: DragEventHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOvering(true);
    };
    const onDragLeave: DragEventHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOvering(false);
    };
    const onDragEnter: DragEventHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOvering(true);
    };

    return (
        <>
            {!imagePreview ? (
                <Tooltip title={<h6 style={tooltipStyle}>사진 단일 업로드</h6>}>
                    <Input
                        htmlFor={`image-source ${id}`}
                        isError={isError}
                        onDrop={onDropFile}
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDragEnter={onDragEnter}
                    >
                        <RiImageAddLine />
                        {isDragOvering && (
                            <DraggingField>
                                <MdFileUpload className={'dragging'} />
                            </DraggingField>
                        )}
                    </Input>
                </Tooltip>
            ) : (
                <PreviewBox
                    isError={isError}
                    onDrop={onDropFile}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDragEnter={onDragEnter}
                >
                    <PreviewImage src={imagePreview} />
                    <ControlField>
                        <Tooltip title={<h6 style={tooltipStyle}>사진 수정하기</h6>}>
                            <UploadButton htmlFor={`image-source ${id}`}>
                                <MdFileUpload className={'upload'} />
                            </UploadButton>
                        </Tooltip>
                        <Tooltip title={<h6 style={tooltipStyle}>사진 확대하기</h6>}>
                            <ExpandButton
                                onClick={() => {
                                    if (!imagePreview) return;
                                    setModalOpen(true);
                                }}
                            >
                                <FaExpand className={'expand'} />
                            </ExpandButton>
                        </Tooltip>
                    </ControlField>
                    {isDragOvering && (
                        <DraggingField>
                            <MdFileUpload className={'dragging'} />
                        </DraggingField>
                    )}
                </PreviewBox>
            )}
            <input
                style={{ display: 'none' }}
                id={`image-source ${id}`}
                type={'file'}
                onChange={onChangeInput}
            />
            <Modal
                open={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                }}
            >
                <ModalPaper>
                    <ImagePreview
                        image={imagePreview || ''}
                        onClickCloseButton={() => {
                            if (!imagePreview) return;
                            setModalOpen(false);
                        }}
                    />
                </ModalPaper>
            </Modal>
        </>
    );
};
const tooltipStyle = {
    color: baseColor.font.white,
};

const PreviewBox = styled.div<{ isError: boolean }>`
    position: relative;
    width: 13rem;
    height: 8rem;
    border: 2px dashed ${({ isError }) => (isError ? baseColor.box.error : baseColor.box.grayThick)};
`;
const PreviewImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
`;

const DraggingField = styled.div`
    position: absolute;
    pointer-events: none;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    background-color: ${baseColor.box.black};
    opacity: 0.8;
    border-radius: ${borderRadius.input};
    svg {
        width: 5rem;
        height: 5rem;
        fill: #ffffff;
        opacity: 1;
    }
`;

const ControlField = styled.div`
    position: absolute;

    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: ${baseColor.box.black};
    opacity: 0;
    border-radius: ${borderRadius.input};
    :hover {
        opacity: 0.85;
    }
    svg {
        width: 2rem;
        height: 2rem;
        fill: #ffffff;
        opacity: 1;
        cursor: pointer;
    }
    transition: all 0.2s;
`;
const ExpandButton = styled.div`
    position: absolute;
    right: 2px;
    bottom: 2px;
`;
const UploadButton = styled.label`
    position: absolute;
    right: 2px;
    top: 2px;
`;

const Input = styled.label<{ isError: boolean }>`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 13rem;
    height: 8rem;
    cursor: pointer;
    border: 2px dashed ${({ isError }) => (isError ? baseColor.box.error : baseColor.box.grayThick)};
    opacity: ${({ isError }) => isError && '.8'};
    svg {
        width: 5rem;
        height: 5rem;
        pointer-events: none;
        fill: ${({ isError }) => (isError ? baseColor.box.error : baseColor.box.grayThick)};
        opacity: ${({ isError }) => isError && '.8'};
    }
`;

export default ImageInput;
