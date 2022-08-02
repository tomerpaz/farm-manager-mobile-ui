import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { SECOND_TOP_LINE } from '../App';


export const DataContainer = (props) => (
    <Typography component="div" sx={{ backgroundColor: '#F2F5F4' }} >
        {props.children}
    </Typography>
)

export const TabsBox = styled(Box)(({ theme }) => ({
    flex: 1,
    flexGrow: 1,
    backgroundColor: SECOND_TOP_LINE,
    color: theme.palette.secondary.dark,

}));


export const height160 = (window.innerHeight - 160);
export const height170 = (window.innerHeight - 170);

export const bodyHeight = (window.innerHeight - 180);

export const height220 = (window.innerHeight - 220);
export const height290 = (window.innerHeight - 290);

export const height200 = (window.innerHeight - 200);

export const height270 = (window.innerHeight - 270);
export const height260 = (window.innerHeight - 260);

export const height240 = (window.innerHeight - 240);
export const height280 = (window.innerHeight - 280);

export const height120 = (window.innerHeight - 120);
export const height145 = (window.innerHeight - 145);

export const height140 = (window.innerHeight - 140);
export const height60 = (window.innerHeight - 60);
export const height80 = (window.innerHeight - 80);
export const height100 = (window.innerHeight - 100);
export const height110 = (window.innerHeight - 110);

export const height360 = (window.innerHeight - 360);

export const height300 = (window.innerHeight - 330);

export const height350 = (window.innerHeight - 350);
export const height375 = (window.innerHeight - 375);
export const height400 = (window.innerHeight - 400);

export const height410 = (window.innerHeight - 410);

export const height450 = (window.innerHeight - 450);

export const height470 = (window.innerHeight - 470);

export const height500 = (window.innerHeight - 500);
export const height520 = (window.innerHeight - 520);

export const masterDetails = (window.innerHeight - 180);
export const pageableModuleTable = (window.innerHeight - 235);
export const standAloneForm = (window.innerHeight - 130);


export const width100 = (window.innerWidth - 100);
export const width500 = (window.innerWidth - 500);
