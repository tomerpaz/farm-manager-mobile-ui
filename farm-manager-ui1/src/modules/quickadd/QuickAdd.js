import React from 'react';
import Action from '@mui/icons-material/Adjust';
import Harvest from '@mui/icons-material/NaturePeople';
import Business from '@mui/icons-material/Business';
import IconButton from '@mui/material/IconButton';
import { GENERAL, MARKET, HARVEST, PROCUREMENT } from '../activity/types';
import { CUSTOMER, SUPPLIER } from '../../reducers/ResourceReducer';


const QuickAdd = (props) => {

    const { type, onClick, user } = props;
    return (
        <div>
            {user.isAdmin && <div>
                {type === GENERAL &&
                    <IconButton onClick={() => onClick(GENERAL)}>
                        <Action />
                    </IconButton>
                }
                {[MARKET, HARVEST].includes(type) &&
                    <IconButton onClick={() => onClick(CUSTOMER)}>
                        <Business />
                    </IconButton>
                }
                {type === HARVEST &&
                    <IconButton onClick={() => onClick(HARVEST)}>
                        <Harvest />
                    </IconButton>
                }
                {[PROCUREMENT].includes(type) &&
                    <IconButton onClick={() => onClick(SUPPLIER)}>
                        <Business />
                    </IconButton>
                }
            </div>}
        </div>
    )
}
export default QuickAdd;



