import { Button, Link } from '@mui/material';
import { BACKGROUND } from '../../../../App';
import { styled } from '@mui/material/styles';

const TopButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    whiteSpace: 'nowrap',
    color: BACKGROUND,
    borderTop: '2px solid',
    borderColor: theme.palette.primary.dark,
    borderRadius: 0,
    fontSize: theme.typography.subtitle1.fontSize,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),

}));

const SelectedButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    whiteSpace: 'nowrap',
    borderTop: '2px solid',
    borderColor: theme.palette.common.white,
    fontSize: theme.typography.subtitle1.fontSize,
    borderRadius: 0,
    fontWeight: 700,
    color: theme.palette.common.white,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(),

}));


const LinkButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    whiteSpace: 'nowrap',
    color: BACKGROUND,
    borderTop: '2px solid',
    borderColor: theme.palette.primary.dark,
    fontSize: theme.typography.subtitle1.fontSize,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),

    '&:hover': {
        textDecoration: 'none',
        color: theme.palette.common.white,
        fontWeight: 700,
    },
    
}));






const AppBarButton = ({ onClick, history, label, path, href }) => {

    if (href) {
        return <LinkButton component={Link} onClick={onClick} target="_blank" rel="noopener" href={href} >{label} </LinkButton>
    }
    else if (history && history.location.pathname && history.location.pathname.startsWith(path)) {
        return <SelectedButton onClick={onClick}>{label}</SelectedButton>
    }
    return <TopButton onClick={onClick}>{label}</TopButton>

}

export default AppBarButton;



