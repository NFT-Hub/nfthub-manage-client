import styled from '@emotion/styled';
import { ReactNode } from 'react';

import Ripple from './Ripple';

const IconBox = ({
    children,
    onClick,
    custom,
    rippleColor = 'black',
}: {
    children: ReactNode;
    onClick?: any;
    custom?: any;
    rippleColor?: string;
}) => {
    const wrapperOption = {
        ...(onClick && { onClick }),
        ...(custom && { custom }),
    };
    return (
        <Wrapper {...wrapperOption}>
            {children}
            <Ripple disableInDesktop={false} posCenter={true} color={rippleColor} />
        </Wrapper>
    );
};

const Wrapper = styled.div<{ custom?: any }>`
    padding: 0.8rem;
    cursor: pointer;
    border-radius: 10rem;
    position: relative;
    overflow: hidden;
    -webkit-tap-highlight-color: transparent !important;
    ${({ custom }) => custom && custom}
`;

export default IconBox;
