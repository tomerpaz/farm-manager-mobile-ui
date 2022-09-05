import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { isStringEmpty } from '../../ui/FarmUtil';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'all',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '800%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const AppBarSearch = ({ value, onChange }) => {

    return (
        <Search >
            <SearchIconWrapper>
                {isStringEmpty(value) && <SearchIcon />}
                {!isStringEmpty(value) && <CloseIcon onClick={()=>onChange('')} />}

            </SearchIconWrapper>
            <StyledInputBase value={value} onChange={(e) => onChange(e.target.value)} />

        </Search>
    )
}

export default AppBarSearch