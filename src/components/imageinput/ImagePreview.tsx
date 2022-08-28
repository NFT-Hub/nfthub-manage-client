import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

import IconBox from './IconBox';
import Loading from './Loading';

interface Props {
    image: string;
    width?: number;
    height?: number;
    onClickCloseButton?: () => void;
}

const ImagePreview = ({ image, width = 80, height = 80, onClickCloseButton = () => {} }: Props) => {
    const [isLoading, setIsLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [containerSize, setClientSize] = useState({ width: 1, height: 1 });
    const containerRatio = containerSize.width / containerSize.height;
    const [imageSize, setImageSize] = useState({ width: 1, height: 1 });
    const imageRatio = imageSize.width / imageSize.height;
    const imageRatioIsLargeThanContainers = imageRatio > containerRatio;

    useEffect(() => {
        if (!containerRef.current) return;
        setClientSize({
            width: containerRef.current?.clientWidth || 1,
            height: containerRef.current?.clientHeight || 1,
        });
    }, []);
    useEffect(() => {
        if (!image) return;
        const img = new Image();
        img.onload = function () {
            // @ts-ignore
            setImageSize({ width: this.width, height: this.height });
            setIsLoading(false);
        };
        img.src = image;
    }, [image]);
    return (
        <ImagePreviewContainer
            imageWidth={width}
            imageHeight={height}
            imageRatioIsLargeThanContainers={imageRatioIsLargeThanContainers}
            ref={containerRef}
        >
            {!isLoading && <img src={image} />}
            <div className={'close-button'}>
                <IconBox onClick={onClickCloseButton}>
                    <IoCloseOutline color={'white'} />
                </IconBox>
            </div>
            <Loading isLoading={isLoading} wrapStyle={'opacity:.5;'} />
        </ImagePreviewContainer>
    );
};
const ImagePreviewContainer = styled.div<{
    imageRatioIsLargeThanContainers: boolean;
    imageWidth: number;
    imageHeight: number;
}>`
    background-color: #111111;
    min-width: 300px;
    width: ${({ imageWidth }) => imageWidth}vw;
    height: ${({ imageHeight }) => imageHeight}vh;
    padding: 2rem;
    position: relative;
    display: flex;
    justify-content: center;
    border-radius: 2rem;
    align-items: center;
    img {
        ${({ imageRatioIsLargeThanContainers }) =>
            imageRatioIsLargeThanContainers ? 'width:100%' : 'height:100%'};
    }
    .close-button {
        position: absolute;
        right: 0;
        top: 0;
        margin: 1rem 1rem 0 0;
        svg {
            width: 4rem;
            height: 4rem;
        }
    }
`;
const CloseButton = styled.div`
    position: absolute;
    top: -2rem;
    right: -2rem;
    background-color: white;
    opacity: 0.9;
    border-radius: 1rem;
    cursor: pointer;
    box-shadow: 1px 1px 5px 1px gray;
    svg {
        width: 4rem;
        height: 4rem;
    }
    :hover {
        opacity: 1;
    }
    transition: all 0.2s;
`;

export default ImagePreview;
