import React from 'react';
import { styled, } from '@mui/material/styles';
import { CircularProgress, Box } from '@mui/material';

const Root = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
}));

const RootNoBackGround = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: 1,
    backgroundColor: theme.palette.secondary.light,

    alignItems: 'center',
    justifyContent: 'center',
}));

function CircularIndeterminate(props) {
    // const { noBackGroundColor } = props;

    return (
        <Box paddingTop={20} display={'flex'} flex={1} justifyContent='center'>
            <CircularProgress size={50} />
        </Box>

    )
}


export default CircularIndeterminate;