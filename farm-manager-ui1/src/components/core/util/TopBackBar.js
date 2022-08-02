import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { ArrowBackSharp as ArrowLeft, ArrowForwardSharp as ArrowRight } from '@mui/icons-material/'


import { BORDER_COLOR, SECOND_TOP_LINE } from "../../../App";

const TopBackBar = (props) => {
    const { dir, label, history, exitRoute } = props;

    return (
        <Box padding={1} sx={{
            backgroundColor: SECOND_TOP_LINE,
            borderBottom: '1px solid ' + BORDER_COLOR,
        }} >

            <Button margin={1} size={'small'} color={'secondary'} sx={{
                textTransform: 'none',
            }} onClick={() => exitRoute ? history.push(exitRoute) : history.goBack()}>
                {dir === 'ltr' && <ArrowLeft color={'secondary'} />}
                {dir === 'rtl' && <ArrowRight color={'secondary'} />}
                <Typography paddingLeft={2} paddingRight={2} color={'secondary'}>
                    {label}
                </Typography>

            </Button>

        </Box>
    );
}

export default TopBackBar;