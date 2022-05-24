import { FC } from 'react';
import { Card, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { blue, grey, red } from '@mui/material/colors';

const DashboardCard: FC<{ route: string; name: string }> = ({ route, name }) => {
    const router = useRouter();
    return (
        <Card
            onClick={async () => {
                await router.push(route);
            }}
            sx={{
                width: 300,
                height: 200,
                padding: 5,
                backgroundColor: grey['100'],
                '&:hover': {
                    bgcolor: blue['500'],
                    color: 'white',
                },
            }}
        >
            <Typography sx={{ fontSize: 18 }}>{name}</Typography>
        </Card>
    );
};

export default DashboardCard;
