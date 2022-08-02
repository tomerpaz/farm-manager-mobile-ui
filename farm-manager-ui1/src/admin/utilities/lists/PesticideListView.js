import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';
import PesticideListForm from "./PesticideListForm";
import PesticideTable from "./PesticideTable";
import PdfIcon from "../../../icons/PdfIcon";
import ExcelIcon from "../../../icons/ExcelIcon";
import Duplicate from '../../../icons/Duplicate';
import { getReport } from "../../../actions/FileActions";
import { iconButton } from "../../../utils/StyleUtils";
import { FormTitle, OutlinedButton } from '../../../components/core';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
        color: theme.palette.primary.dark,
        borderColor: theme.palette.primary.dark,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),

    },
    iconButton: iconButton(theme),
    title: {
        margin: theme.spacing(2),
        color: theme.palette.common.black,
        fontWeight: 700
    },
}));



const PesticideListView = (props) => {
    const classes = useStyles();
    const { text, lang, view, flipButtonText, onViewChange, selectedPesticideList, isAdmin, duplicatePesticideList } = props;
    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <FormTitle title={text.pesticideList} />

                {selectedPesticideList.id && <OutlinedButton onClick={onViewChange} >
                    {text[flipButtonText]}
                </OutlinedButton>}
                <div style={{ flex: 1 }}></div>
                {selectedPesticideList.id && isAdmin &&
                    <IconButton
                        onClick={() => duplicatePesticideList(selectedPesticideList.id)}
                        variant="outlined"
                    >
                        <Duplicate />
                    </IconButton>}
                {selectedPesticideList.id && <IconButton
                    onClick={() => getReport('pesticideList', lang, 'pdf', null, null, [{ value: `pesticide_list_${selectedPesticideList.id}` }], null)}
                    variant="outlined"
                    className={classes.iconButton}>
                    <PdfIcon />
                </IconButton>}
                {selectedPesticideList.id && <IconButton
                    onClick={() => getReport('pesticideList', lang, 'xls', null, null, [{ value: `pesticide_list_${selectedPesticideList.id}` }], null)}
                    variant="outlined"
                    className={classes.iconButton}>
                    <ExcelIcon />
                </IconButton>}
            </div>
            {view === 'settings' && <PesticideListForm {...props} />}
            {view === 'substances' && <PesticideTable {...props} />}
        </div>

    )

}

export default PesticideListView;