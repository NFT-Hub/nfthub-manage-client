import { Paper } from '@mui/material';
import { ReactNode } from 'react';

const ModalPaper = ({ children }: { children: ReactNode }) => {
    return <Paper sx={modalStyle}>{children}</Paper>;
};
const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60vw',
    maxWidth: '1000px',
    minWidth: '750px',
    height: '90vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    display: 'flex',
};
export default ModalPaper;
