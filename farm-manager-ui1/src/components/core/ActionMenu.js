import React from 'react';
import { withStyles } from '@mui/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CloudUpload from '@mui/icons-material/CloudUpload';
import CloudDownload from '@mui/icons-material/CloudDownload';
import Delete from '@mui/icons-material/Delete';
import { Cancel, Check } from '@mui/icons-material';

export const uploadAction = 'upload';
export const deleteAction = 'delete';
export const downloadAction = 'download';
export const inactiveAction = 'inactive';
export const activeAction = 'active';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    // getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus(props) {

  const {onClose, anchorEl, actions, text, onClick} = props;

const renderIcon = (value ) => {
  if(value === deleteAction) return <Delete />
  if(value === downloadAction) return <CloudDownload />
  if(value === uploadAction) return <CloudUpload />
  if(value === inactiveAction) return <Cancel />
  if(value === activeAction) return <Check />


}

  return (
    <div>
      {/* <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Open Menu
      </Button> */}
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        {actions.map(value => 
          <StyledMenuItem key={value} onClick={(e) => onClick(value,e)}>
            <ListItemIcon>
              {renderIcon(value)}
            </ListItemIcon>
            <ListItemText primary={text[value]} />
          </StyledMenuItem>)}
      </StyledMenu>
    </div>
  );
}
