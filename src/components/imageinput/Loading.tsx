//import LoadingImage from '../../../public/img/utils/loading2.svg';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

interface LoadingProps {
    isLoading: boolean;
    wrapStyle?: any;
    loadingStyle?: any;
    loadingMessage?: string;
    positionIsTop?: boolean;
    noBackground?: boolean;
}

const contentIsActive = keyframes`
  0%{
    opacity: 0.4;
  }
  100%{
    opacity: 1;
  }
`;

/**
 * loading 대상인 부분에 position:relative 필요
 * */
const Loading = ({
    isLoading,
    wrapStyle = '',
    loadingStyle = '',
    loadingMessage = '',
    noBackground = false,
    positionIsTop = false,
}: LoadingProps) => {
    return (
        <LoadingStyle
            noBackground={noBackground}
            isLoading={isLoading}
            custom={wrapStyle}
            positionIsTop={positionIsTop}
        >
            <LoadingImage
                className={'loading-img'}
                src={'/img/loading/loading2.svg'}
                custom={loadingStyle}
            />
            {loadingMessage && <h5>{loadingMessage}</h5>}
        </LoadingStyle>
    );
};

const LoadingStyle = styled.div<{
    isLoading: boolean;
    custom: any;
    positionIsTop: boolean;
    noBackground: boolean;
}>`
    display: ${(props) => (props.isLoading ? 'flex' : 'none')};
    position: absolute;
    z-index: 20;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;

    background-color: ${({ noBackground }) => !noBackground && '#ffffff55'};
    flex-direction: column;
    justify-content: ${({ positionIsTop }) => (positionIsTop ? 'flex-start' : 'center')};

    align-items: center;
    ${(props) => props.custom};
    transition: all 0.5s;
    .loading-img {
        animation: ${contentIsActive} 0.8s forwards;
        transition: all 0.5s;
    }
`;
const LoadingImage = styled.img<{ custom: any }>`
    position: relative;
    width: 50%;
    max-width: 8rem;
    ${(props) => props.custom};
`;

export default Loading;
