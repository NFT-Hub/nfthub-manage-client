import {
    Collapse,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
} from '@mui/material';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { pages } from '../const/pages';
import { blue } from '@mui/material/colors';
import TopNavigation from './TopNavigation';

const Navigation = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const currentPath = router.asPath;
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: '250px auto',
            }}
        >
            <List
                sx={{
                    width: '250px',
                    bgcolor: 'background.paper',
                    borderLeft: '1px solid black',
                    height: '100vh',
                    overflow: 'scroll',
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        어드민 관리 페이지
                    </ListSubheader>
                }
            >
                {pages.map((page) => {
                    const isActive = page.route === currentPath;
                    return (
                        <ListItemButton
                            key={page.route}
                            sx={[
                                isActive && {
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'primary.main',
                                    },
                                },
                            ]}
                            onClick={() => {
                                router.push(page.route);
                            }}
                        >
                            <ListItemIcon
                                sx={[
                                    isActive && {
                                        color: 'white',
                                    },
                                ]}
                            >
                                {page.icon}
                            </ListItemIcon>
                            <ListItemText primary={page.name} />
                        </ListItemButton>
                    );
                })}
            </List>

            <main
                style={{
                    width: '100%',
                    maxHeight: '100vh',
                    overflow: 'scroll',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <TopNavigation />
                <div
                    style={{
                        padding: '30px',
                    }}
                >
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Navigation;
