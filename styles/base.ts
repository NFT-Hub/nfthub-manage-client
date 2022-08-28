import { css } from '@emotion/react';

export const baseColor = {
    background: '#F6F6F6',
    box: {
        background: '#F6F6F6',
        white: '#ffffff',
        gray: '#F6F6F6',
        grayPale: '#fcfcfc',
        grayThick: '#cccccc',
        blackPale: '#727171',
        black: '#2b2b2b',
        blackThick: '#252525',
        beige: '#efeee9',
        main: '#172F5A',
        red: '#dd6666',
        error: '#dd4545',
    },
    font: {
        black: '#111111',
        blackPale: '#222222',
        white1: '#dddddd',
        white: '#ffffff',
        grayThick: '#727171',
        gray: '#595757',
        grayLight: '#8e9090',
        active: '#172f5a',
        isError: '#ee3535',
    },
    border: {
        white: '#b5b5b6',
        main: '#B4B4B5',
        nav: '#dadad9',
        input: '#bfbfbf',
        inputDisabled: '#d6d6d6',
        box: '#c4c4c5',
    },
    gn: {
        g50: '#f9fafb',
        g100: '#f2f4f6',
        g200: '#e5e8eb',
        g300: '#d1d6db',
        g400: '#b0b8c1',
        g500: '#8b95a1',
        g600: '#6b7684',
        g700: '#4e5968',
        g800: '#333d4b',
        g900: '#191f28',
    },
    gon: {
        go50: 'rgba(0,23,51,0.02)',
        go100: 'rgba(2,32,71,0.05)',
        go200: 'rgba(0,27,55,0.1)',
        go300: 'rgba(0,29,58,0.18)',
        go400: 'rgba(0,29,54,0.31)',
        go500: 'rgba(3,24,50,0.46)',
        go600: 'rgba(0,19,43,0.58)',
        go700: 'rgba(3,18,40,0.7)',
        go800: 'rgba(0,12,30,0.8)',
        go900: 'rgba(2,9,19,0.91)',
    },
    excel: '#217346',
};

export const adminBaseColor = {
    bg: {
        paper: '#f1f2f8',
    },
    buttonBg: {
        add: baseColor.box.blackPale,
        update: baseColor.box.main,
        delete: baseColor.box.red,
        reset: baseColor.box.black,
    },
};

// font
export const baseFontSize: { [k: string]: string } = {
    h1: '4.5rem',
    h2: '3rem',
    h3: '2.5rem',
    h3Small: '2.3rem',
    h4Big: '2.2rem',
    h4: '2rem',
    h4Small: '1.8rem',
    h5Big: '1.6rem',
    h5: '1.5rem',
    h6: '1.3rem',
};

// border
export const borderStyle = {
    main: `solid 1px ${baseColor.border.main};`,
    nav: `solid 1px ${baseColor.border.nav};`,
    input: `1px solid ${baseColor.border.input}`,
};
export const borderRadius = {
    box: '1rem',
    input: '0.3rem',
    paper: '2rem',
};

// z-index
export const zIndex = {
    tableHeader: 100,
    loading: 200,
    navigation: 300,
    modal: 500,
    alert: 700,
};

// breakPoint
export const breakPoint = {
    smallMobile: 420,
    mobile: 560,
    smallTablet: 768,
    tablet: 968,
    bigTablet: 1020,
};

export const boxShadow = {
    base: '0 0 1px 1px #55555555',
};
