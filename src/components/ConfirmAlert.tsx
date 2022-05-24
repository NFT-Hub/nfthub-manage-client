import React, { FC } from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { FlexboxToCenterItems, FlexboxColumnItems } from '../../styles/layout';
import { red } from '@mui/material/colors';

const ConfirmAlert = React.forwardRef<
    any,
    {
        onClickConfirm: () => void;
        onClickCancel: () => void;
        message: string;
        errorMessage: string;
    }
>(({ onClickCancel, onClickConfirm, message, errorMessage }, ref) => (
    <Paper
        sx={{
            width: 350,
            height: 220,
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: 7,
            overflow: 'scroll',
        }}
    >
        <FlexboxColumnItems
            style={{
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Typography>{message}</Typography>
            <FlexboxToCenterItems
                style={{
                    padding: 0,
                }}
            >
                <Button variant={'contained'} onClick={onClickConfirm}>
                    확인하기
                </Button>
                <Button onClick={onClickCancel}>취소하기</Button>
            </FlexboxToCenterItems>
            {errorMessage && (
                <FlexboxColumnItems>
                    <Typography
                        sx={{
                            fontSize: 13,
                            color: red['600'],
                        }}
                    >
                        {errorMessage}
                    </Typography>
                </FlexboxColumnItems>
            )}
        </FlexboxColumnItems>
    </Paper>
));
ConfirmAlert.displayName = 'ConfirmAlert';

export default ConfirmAlert;
