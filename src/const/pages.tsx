import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CategoryIcon from '@mui/icons-material/Category';

export const pages = [
    {
        name: '매거진 관리',
        route: '/manage-magazine',
        icon: <ImportContactsIcon />,
    },
    // {
    //     name: '유저 관리',
    //     route: '/manage-user',
    //     icon: <PersonOutlineIcon />,
    // },
    {
        name: '태그 관리',
        route: '/manage-tag',
        icon: <LocalOfferIcon />,
    },
    // {
    //     name: '카테고리 관리',
    //     route: '/manage-category',
    //     icon: <CategoryIcon />,
    // },
];
