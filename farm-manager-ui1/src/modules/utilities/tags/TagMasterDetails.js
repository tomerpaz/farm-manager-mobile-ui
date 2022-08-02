import React from 'react';
import TagTable from './TagTable';
import TagForm from './TagForm';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {getMasterDetailsStyle} from "../../../utils/StyleUtils";

const useStyles = makeStyles(theme => getMasterDetailsStyle(theme));

const TagMasterDetails = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.master}>
                <TagTable {...props}/>
            </div>
            <Paper className={classes.details}>
                {props.selectedTag && <TagForm defaultValues={props.selectedTag} {...props}/>}
            </Paper>
        </div>
    )
}
export default TagMasterDetails;
