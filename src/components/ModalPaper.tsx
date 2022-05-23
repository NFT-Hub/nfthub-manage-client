import { Paper } from '@mui/material';
import React, { ReactNode } from 'react';
import { SystemCssProperties, Theme } from '@mui/system';

const ModalPaper = React.forwardRef<any, { children: ReactNode }>((props, ref) => (
    <Paper sx={modalStyle}>{props.children}</Paper>
));
ModalPaper.displayName = 'ModalPaper';

const modalStyle: SystemCssProperties<Theme> = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60vw',
    maxWidth: '1000px',
    minWidth: '750px',
    padding: '60px',
    height: '90vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    display: 'flex',
};
export default ModalPaper;
