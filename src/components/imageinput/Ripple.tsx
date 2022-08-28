import styled from '@emotion/styled';
import React, { MouseEventHandler, TouchEventHandler, useEffect, useRef, useState } from 'react';

// ripple lifeCycle
// - isRippling => 리플이 나타나고 사라지기까지 사이클 (mousedown 시 사이클 시작, isDisappearing 사이클 끝날 시 사이클 종료)
// - isDisappearing => 사라지는 효과가 지속되는 사이클 (mouseup 시 사이클 시작, 사라지는 효과 종료시 사이클 종료)

const getRippleEffect = (evtCX: number, evtCY: number, domRect: DOMRect, isPosCenter: boolean) => {
    const size = domRect.width > domRect.height ? domRect.width : domRect.height;
    if (isPosCenter) {
        return {
            x: 0,
            y: 0,
            size,
        };
    }
    const x = evtCX - domRect.left - size / 2;
    const y = evtCY - domRect.top - size / 2;
    return {
        x,
        y,
        size,
    };
};

/**
 * 부모 노드에 다음 속성 적용시 작동
 * - position: relative
 * - overflow: hidden
 * - (권장)  -webkit-tap-highlight-color: transparent
 * */
const Ripple = ({
    duration = 500,
    color = '#ddd',
    disableInDesktop = true,
    posCenter = false,
}: {
    duration?: number;
    color?: string;
    disableInDesktop?: boolean;
    posCenter?: boolean;
}) => {
    const [isRippling, setIsRippling] = useState(false);
    const [isMouseUp, setIsMouseUp] = useState(false);
    const isDisappearing = isRippling && isMouseUp;
    const disappearTimer = useRef<any>(null);
    const [rippleEffect, setRippleEffect] = useState<
        { x: number; y: number; size: number } | undefined
    >(undefined);

    const addRipple: MouseEventHandler = (e) => {
        if (isRippling) return;
        setIsRippling(true);
        const rippleContainer = e.currentTarget.getBoundingClientRect();
        setRippleEffect(getRippleEffect(e.clientX, e.clientY, rippleContainer, posCenter));
    };

    const addRippleTouch: TouchEventHandler = (e) => {
        if (isRippling) return;
        setIsRippling(true);
        const rippleContainer = e.currentTarget.getBoundingClientRect();
        setRippleEffect(
            getRippleEffect(e.touches[0].clientX, e.touches[0].clientY, rippleContainer, posCenter)
        );
    };

    useEffect(() => {
        const disappearRipple = () => {
            if (!isRippling || isDisappearing) return;
            setIsMouseUp(true);
            const timer = setTimeout(() => {
                setIsMouseUp(false);
                setIsRippling(false);
                setRippleEffect(undefined);
            }, duration);
            disappearTimer.current = timer;
        };
        window.addEventListener('mouseup', disappearRipple);
        window.addEventListener('touchend', disappearRipple);
        return () => {
            window.removeEventListener('mouseup', disappearRipple);
            window.removeEventListener('touchend', disappearRipple);
        };
    }, [isDisappearing, isRippling]);

    // timer 정리 안함으로인한 memory leak error 방지
    useEffect(() => {
        return () => {
            const timer = disappearTimer.current;
            if (timer) clearTimeout(timer);
        };
    }, []);

    return (
        <RippleContainer onTouchStart={addRippleTouch} onMouseDown={addRipple}>
            {rippleEffect && (
                <RippleEffect
                    disappearing={isDisappearing}
                    duration={duration}
                    color={color}
                    style={{
                        top: rippleEffect.y + 'px',
                        left: rippleEffect.x + 'px',
                        width: rippleEffect.size + 'px',
                        height: rippleEffect.size + 'px',
                        opacity: isDisappearing ? '0' : '0.4',
                    }}
                />
            )}
        </RippleContainer>
    );
};

const RippleContainer = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    -webkit-tap-highlight-color: transparent !important;
`;

const RippleEffect = styled.div<{
    color: string;
    duration: number;
    disappearing: boolean;
}>`
    transform: scale(0);
    border-radius: 100%;
    position: absolute;
    background-color: ${(props) => props.color};
    animation: ${({ duration }) => `ripple ${duration}ms ease-out 0s forwards`};
    transition: opacity ${({ duration }) => duration}ms ease-in-out;

    @keyframes ripple {
        to {
            transform: scale(2);
        }
    }
`;

export default React.memo(Ripple);
