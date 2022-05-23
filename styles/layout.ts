// flex layout
import styled from '@emotion/styled';

export const FlexboxToCenterItems = styled.div<{
    gap?: number;
    paddingTopBottom?: number;
    custom?: any;
}>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ gap }) => (gap != undefined ? gap : 2)}rem;
    padding: ${({ paddingTopBottom }) => (paddingTopBottom != undefined ? paddingTopBottom : 2)}rem
        0;
    transition: all 0.2s;
    ${({ custom }) => custom && custom};
`;

export const FlexboxColumnItems = styled.div<{ gap?: number; custom?: any }>`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ gap }) => (gap !== undefined ? gap : 2)}rem;

    ${({ custom }) => custom && custom};
`;
export const FlexboxRowItems = styled.div<{ gap?: number; width?: string; custom?: any }>`
    width: ${({ width }) => (width ? width : '100%')};
    display: flex;
    align-items: center;
    gap: ${({ gap }) => (gap ? gap : 0)}rem;
    ${({ custom }) => custom && custom};
`;
export const FlexboxRowSpaceBetween = styled.div<{ custom?: any }>`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    ${({ custom }) => custom && custom};
`;

// grid layout
export const ItemGridContainer = styled.div<{
    itemSize: string;
    repeatStrategy?: number | 'auto-fill' | 'auto-fit';
    columnGap?: string;
    rowGap?: string;
    custom?: any;
}>`
    position: relative;
    display: grid;
    width: 100%;
    grid-template-columns: repeat(
        ${({ repeatStrategy }) => (repeatStrategy ? repeatStrategy : 'auto-fill')},
        minmax(${({ itemSize }) => itemSize}, 1fr)
    );
    grid-column-gap: ${({ columnGap }) => (columnGap ? columnGap : '2rem')};
    grid-row-gap: ${({ rowGap }) => (rowGap ? rowGap : '2rem')};
    transition: all 0.2s;
    ${({ custom }) => custom && custom};
`;
